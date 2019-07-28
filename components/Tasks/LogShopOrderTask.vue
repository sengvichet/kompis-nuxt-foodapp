<template>

  <div v-if="!isLoading" class="exception-internal">


    <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    <div class="list-bar__click-overlay" @click.prevent="showExceptionModal"></div>

    <ModalBody v-if="innerModal"
    z_index="20"
    :footerType="footerType"
    @clickedSave="sumbitTasks"
    :title="modal_title"
    footerText="Save"
    @close="closeModal">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}</p>
      </template>
      <template slot="modal-content">
        <div  v-for="(task,index) in tasks_list" style="margin-bottom:5rem;">
        <div class="list-bar list-bar__task">

          <div class="list-bar__text-container">
            <h5 class="list-bar__title" >{{task.task_title}}</h5>
            <p class="list-bar__sub-heading"> {{task.task_user}}, {{$t('app.tasks.due')}} {{task.task_time}} </p>
          </div>


          <div class="list-bar__icon">
            <input class="list-bar__tick-box__input"
                   :id="'shop_order'+task.task_schedule_id"
                   type="checkbox" name="shoporders"
                   v-model="selectedTasks"
                   :value="task.task_schedule_id"
                   >

            <label class="list-bar__tick-box__label"
                   :for="'shop_order'+task.task_schedule_id"
                   title="Mark as complete"

                   >
                   &nbsp;
            </label>
          </div>
        </div>

        <div class="list-bar list-bar__summary">


          <p class="order-summary" v-if="!task.task_order.on_behalf_of_user">

            <span class="order-summary order-summary__customer-name">{{task.task_order.user}}</span>
            {{$t('app.orders.of')}}
            <span class="order-summary order-summary__company-name">{{task.task_order.company_name}}</span>
          </p>

          <p class="order-summary" v-if="task.task_order.on_behalf_of_user">
            <span class="order-summary order-summary__customer-name">{{task.task_order.user}}</span>
            for
            <span class="order-summary order-summary__customer-name">{{task.task_order.on_behalf_of_user}}</span>
            {{$t('app.orders.of')}}
            <span class="order-summary order-summary__company-name">{{task.task_order.company_name}}</span>
          </p>


          <p class="order-summary">{{$t('app.orders.to_be_delivered')}}
            <span class="order-summary order-summary__delivery-point-name">{{task.task_order.delivery_point}}, </span>
            <span class="order-summary order-summary__delivery-point-address">{{task.task_order.delivery_point_address}}</span>
            {{$t('app.orders.on')}}
            <span>{{task.task_order.delivery_date}}</span>
            <span v-if="task.task_order.delivery_time"> @ {{task.task_order.delivery_time}}</span>
          </p>

          <div
          v-for="(item,index) in task.task_order.items"
          class="order-summary order-summary__products">
              <span class="order-summary order-summary__product__num">{{item.quantity}} x {{item.name}}</span>
              <span class="order-summary order-summary__product__price">{{item.price*item.quantity}} kr</span>
          </div>

          <div class="order-summary order-summary__products">
            <span class="order-summary order-summary__product__num">Freight</span>
            <span class="order-summary order-summary__product__price">{{task.task_order.freight}} kr</span>
          </div>

          <div class="order-summary order-summary__products">
            <p class="order-summary">Total</p>
            <p class="order-summary order-summary__price">{{task.task_order.total}} kr</p>
          </div>

          <br>

          <p class="order-summary order-summary__comment-title">Comments</p>
          <p class="order-summary order-summary__comment-details">{{task.task_order.comment}}</p>



        </div>
      </div>
      </template>
    </ModalBody>

</div>
</template>

<script>
import {
  API
} from "aws-amplify";
import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'
export default {

  components: {
    Icon,
    ModalBody
  },
  props: {
    tasks_prop: {
      type:Array,
      required: false,
    },
    index: {
      type:String,
      required: false,
    },
    location_name: {
      type: String,
      required: false
    },
    task_type: {
      type:String,
      required:true
    },
    zIndex: {
      type: String,
      required: false,
      default: '2'
    }
  },
  data () {
    return {
      innerModal: false,
      isLoading:true,
      exception:{},
      tasks_list:[],
      users:[],
      modal_title:'',
      selectedTasks:[],
      footerType:'none'
    }
  },
  created () {
    ;
    this.isLoading = false

  },
  computed: {
    compoundProperty(){
      return this.selectedTasks.length
    }
  },
  watch: {
    compoundProperty: function() {

      if (this.selectedTasks.length > 0) {

        this.footerType = 'save'
      }
      else {
        this.footerType = 'none'
      }
    },

  },
methods: {

  sumbitTasks () {

    let hide = false

    if (this.selectedTasks.length == this.tasks_list.length){
      hide = true
    }

    for (var x in this.selectedTasks) {
      this.$emit('logSubmit',this.selectedTasks[x],null,this.index,'',this.task_type,null)
    }

    this.closeModal()

  },

  closeModal() {
    this.innerModal = false
  },
    async showExceptionModal(){
      console.log(this.task_type);
      this.tasks_list = []
      let total_products  = 0
      this.innerModal = true
      for (var x in this.tasks_prop) {

        let task_prefix  = ''

        if (this.tasks_prop[x].taskType == 'manufacturer') {
          task_prefix = this.$t('app.tasks.prefix_manufacturer')
          this.modal_title = this.$t('app.tasks.prefix_manufacturer')
        }

        if (this.tasks_prop[x].taskType == 'package') {
          task_prefix = this.$t('app.tasks.prefix_package')
          this.modal_title = this.$t('app.tasks.prefix_package')
        }

        if (this.tasks_prop[x].taskType == 'ship') {
          task_prefix = this.$t('app.tasks.prefix_ship')
          this.modal_title = this.$t('app.tasks.prefix_ship')
        }

        let task_name = parseInt(this.tasks_prop[x].taskName) + ' ' + this.$t('app.tasks.products')
        let task_user = ''
        total_products+=parseInt(this.tasks_prop[x].taskName)

        if (
          this.tasks_prop[x].assignees == 'anyone' ||
          this.tasks_prop[x].assignees == 'any-employee' ||
          this.tasks_prop[x].assignees == 'any-owner' ||
          this.tasks_prop[x].assignees == 'any-manager'
        ) {

          if (this.tasks_prop[x].assignees == 'anyone') {task_user = this.$t('app.tasks.anyone')}
          if (this.tasks_prop[x].assignees == 'any-employee') {task_user = this.$t('app.tasks.any_employee')}
          if (this.tasks_prop[x].assignees == 'any-owner') {task_user = this.$t('app.tasks.any_owner')}
          if (this.tasks_prop[x].assignees == 'any-manager') {task_user = this.$t('app.tasks.any_manager')}

        }
        else if (Array.isArray(this.tasks_prop[x].assignees)) {
        task_user = this.getUser(this.tasks_prop[x].assignees[0]) + this.$t('app.tasks.or_others')
        }
        else {
        task_user = this.getUser(this.tasks_prop[x].assignees)
      }

        let task_order = {}


        await API.post("metamat", "/cart/owner/order/"+this.tasks_prop[x].shopId,{
          body:{
            orderId: this.tasks_prop[x].cartId
          }
        }).then((order) => {

          let first_name = ''
          let last_name = ''

          for (var y in order.user.UserAttributes) {

            if (order.user.UserAttributes[y].Name == 'custom:first_name'){
              first_name = order.user.UserAttributes[y].Value
            }
            if (order.user.UserAttributes[y].Name == 'custom:last_name'){
              last_name = order.user.UserAttributes[y].Value
            }
          }

          let user = first_name + ' ' + last_name

          let on_behalf_of_user = ''

          if (order.on_behalf_of != null) {
            for (var y in order.on_behalf_of.UserAttributes) {

              if (order.on_behalf_of.UserAttributes[y].Name == 'custom:first_name'){
                first_name = order.on_behalf_of.UserAttributes[y].Value
              }
              if (order.on_behalf_of.UserAttributes[y].Name == 'custom:last_name'){
                last_name = order.on_behalf_of.UserAttributes[y].Value
              }
            }

            on_behalf_of_user = first_name + ' ' + last_name
          }


          let delivery_date = this.formatTimeStampDate(order.delivery_date)

          task_order = {
          delivery_time:order.delivery_time,
          delivery_point:(order.delivery_point.objectName) ? order.delivery_point.objectName : '',
          delivery_point_address:order.delivery_point.objectAddress,
          company_name:order.user_company.objectName,
          comment:order.comment,
          freight:order.freight,
          total:order.total,
          items:order.items,
          cart_id:order.cartId,
          shop_id:order.shopId,
          days_of_the_month:[],
          schedule_dates: order.schedule_dates,
          schedule_type: order.schedule_type,
          user:user,
          on_behalf_of_user:on_behalf_of_user,
          delivery_date:delivery_date,
          delivery_time: order.delivery_time
        }

        })

        this.tasks_list.push({
          task_title: task_prefix + ' ' + task_name,
          task_id : this.tasks_prop[x].taskId,
          task_schedule_id: this.tasks_prop[x].taskScheduleId,
          cart_id:this.tasks_prop[x].cartId,
          task_time:this.tasks_prop[x].tasksScheduleByTime,
          task_user:task_user,
          task_order:task_order
        })

      }
      this.modal_title = this.modal_title + ' ' + total_products + ' ' + this.$t('app.tasks.products')



  },
  getUser (user_id) {

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
