<template>
<b-container>

  <a href="#" class="browse" @click.prevent="showLogShipOrderModal">
    <img src="~assets/images/icons/Icon_Right_Arrow.svg" class="list-bar__arrow" />
  </a>

  <b-modal ref="logShipOrderModal" class="light" hide-footer centered no-close-on-backdrop no-close-on-esc	no-enforce-focus	:title="title">
  <b-form @submit="taskLogSubmit">

    <b-form-group>
      <div >
       <div v-for="(task,index) in tasks_list">


       <div class="orderSummary">

       <div class="order-details">
         <p class="order-date">{{$t('app.orders.placed_on')}} {{formatTimeStampTime(task.order.createdAt)}}</p>

         <div class="checkbox checkbox-info checkbox-circle">
         <input :id="'new'+task.id" type="checkbox" v-model="selectedTasks"  :value="task.key"  :disabled="task.disabled">
         <label  :for="'new'+task.id" ></label>
         </div>



         <p class="customer-name">{{task.order.user_company.objectName}} {{$t('app.orders.of')}} {{getUser(task.order.userId)}}</p>
         <p class="delivery-point">{{$t('app.orders.to_be_delivered')}} {{task.order.delivery_point.objectName}}, {{task.order.delivery_point.objectAddress}} </br> {{$t('app.orders.on')}} {{formatTimeStampTime(task.order.delivery_date)}}</p>

         <p
         v-for="(item,index) in task.order.items"
         class="order-product">
         <span class="num">{{item.quantity}}</span> x
         {{item.name}}
         <span class="price">{{item.price*item.quantity}} kr</span>
         </p>


         <p class="order-product freight">
         <span class="num ">Freight</span>
         <span class="price">{{task.order.freight}} kr</span>
         </p>



         <p class="comment-title">Comments</p>
         <p class="comment-details">{{task.order.comment}}</p>

         <p class="total">{{task.order.total}} kr</p>
         <p>{{task.user}}, <span>{{$t('app.tasks.due')}} {{task.due_date}}</span></p>

       </div>
     </div>
</div>

     </div>

     </b-form-group>

    <b-button size="sm" variant="success" type="submit">
      {{$t('app.general.save')}} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>

  </b-form>
</b-modal>

</b-container>
</template>


<script>

import {
  API
} from "aws-amplify";

import Icon from 'vue-awesome'
import EditTaskNonModal from '~/components/Tasks/EditTaskNonModal.vue'
import NewExceptionNonModal  from '~/components/General/NewExceptionNonModal.vue'

export default {

  components: {
    Icon,
    EditTaskNonModal,
    NewExceptionNonModal
  },
  props: {
    title_prop:{
      type:String,
      required:false
    },
    index:{
      type:Number,
      required:false
    },
    tasks_prop:{
      type:Array,
      required:false
    },
    users_prop:{
      type:Array,
      required:false
    }
  },
  data () {
   return {
     title: this.title_prop,
     tasks: this.tasks_prop,
     users: this.users_prop,
     isLoading:false,
     selectedTasks: [],
      tasks_list: []
   }
 },
 created() {
   console.log(this.tasks);
   for (var x in this.tasks) {

     this.tasks_list.push({
      text: this.tasks[x].taskName,
      type: this.tasks[x].taskType,
      value: this.tasks[x].taskScheduleId,
      locationId: this.tasks[x].locationId,
      assignerId: this.tasks[x].assignerId,
      order: this.tasks[x].order,
      id: this.tasks[x].taskScheduleId,
      key:this.tasks[x].taskScheduleId+','+this.tasks[x].order.cartId+','+this.tasks[x].order.shopId,
      taskId: this.tasks[x].taskId,
      due_date: this.tasks[x].tasksScheduleByTime,
      user: (this.tasks[x].assignees != 'anyone') ? this.getUser(this.tasks[x].assignees) : this.$t('app.tasks.anyone')
     })

   }

 },

  methods : {

    taskLogSubmit(event) {

      event.preventDefault();
      this.isLoading = true

      for (var x in this.selectedTasks){

        let key = this.selectedTasks[x].split(',')
        let task_id = key[0]
        let cart_id = key[1]
        let shop_id = key[2]

        let task_name = ''
        let type = ''

        for (var y in this.tasks){

          if (this.tasks[y].taskScheduleId == task_id ){
            task_name = this.tasks[y].taskName
            type = this.tasks[y].taskType

          }
        }
      this.$emit('logSubmit',task_id,null,this.index,task_name,type)
      this.shipOrder(shop_id,cart_id)
      }

      this.isLoading = false
      this.$refs.logShipOrderModal.hide()

    },
    async shipOrder(shopId,cartId) {

      try {

      await API.put("metamat", "/cart/orders/ship/" + shopId, {
        body: {
          cart_id: cartId
        }
      });



    } catch (e) {
      bugsnagClient.notify(e)
      this.isLoading = false
      this.$notify.error('Can not make this order as shipped', 'success')
    }


    },
    hideModal(){
      this.$refs.logShipOrderModal.hide()
    },

    showLogShipOrderModal(){
      this.$refs.logShipOrderModal.show()
    },

    closeTask(exception_id) {



    },
    reflectTasks(){
      this.$emit('reflectTasks')
    },
    getUser (user_id) {
      console.log(this.users);
      let first_name = ''
      let last_name = ''

      for (var x in this.users)  {

        if (this.users[x].Username == user_id) {

          for (var y in this.users[x].Attributes) {

            if (this.users[x].Attributes[y].Name == 'custom:first_name'){
              first_name = this.users[x].Attributes[y].Value
            }
            if (this.users[x].Attributes[y].Name == 'custom:last_name'){
              last_name = this.users[x].Attributes[y].Value
            }

          }

        }
      }

      return first_name + ' ' + last_name

    }
  }

}

</script>
