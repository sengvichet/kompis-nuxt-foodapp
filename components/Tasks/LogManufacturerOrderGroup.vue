<template>
<b-container>

  <a href="#" class="browse" @click.prevent="showRegularTaskModal">
    <img src="~assets/images/icons/Icon_Right_Arrow.svg" class="list-bar__arrow" />
  </a>

  <b-modal ref="logRegularTaskModal" class="light" hide-footer centered no-close-on-backdrop no-close-on-esc	no-enforce-focus	:title="title">
  <b-form @submit="taskLogSubmit">

    <b-form-group>
      <div class="checkbox-group-full">
       <div v-for="(task,index) in tasks_list" class="checkbox checkbox-info checkbox-circle">

       <input :id="task.taskId+'new'+task.id" type="checkbox" v-model="selectedTasks"  :value="task.value"  :disabled="task.disabled" >
       <label :for="task.taskId+'new'+task.id">
         <h5>{{task.quantity}} x {{task.text}}</h5>
         <p>{{task.user}}, <span>{{$t('app.tasks.due')}} {{task.due_date}}</span></p>
       </label>


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
import groupArray from 'group-array'
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


  this.tasks =  groupArray(this.tasks, 'productId');

   for (var x in this.tasks) {
     let task = this.tasks[x][0].taskName.split(' x ')
     let quantity = 0

     for (var y in this.tasks[x]) {
       quantity+= this.tasks[x][y].quantity
     }

     this.tasks_list.push({
      text: task[1],
      type: this.tasks[x][0].taskType,
      value: x,
      locationId: this.tasks[x][0].locationId,
      assignerId: this.tasks[x][0].assignerId,
      id: x,
      quantity:quantity,
      disabled:false,
      taskId: this.tasks[x][0].taskId,
      due_date: this.tasks[x][0].tasksScheduleByTime,
      user: (this.tasks[x][0].assignees != 'anyone') ? this.getUser(this.tasks[x][0].assignees) : this.$t('app.tasks.anyone')
     })

   }

 },

  methods : {
    taskLogSubmit(event) {

      event.preventDefault();
      this.isLoading = true

      for (var x in this.selectedTasks){

        let task_name = ''
        let type = ''


        for (var y in this.tasks) {
        if (y == this.selectedTasks[x] ) {

          for (var s in this.tasks[y]) {

            task_name = this.tasks[y][s].taskName
            type = this.tasks[y][s].taskType

            this.$emit('logSubmit',this.tasks[y][s].taskScheduleId,null,this.index,task_name,type)
          }


        }


        }


      }

      this.isLoading = false
      this.$refs.logRegularTaskModal.hide()

    },
    hideModal(){
      this.$refs.logRegularTaskModal.hide()
    },

    showRegularTaskModal(){
      this.$refs.logRegularTaskModal.show()
    },

    closeTask(exception_id) {



    },
    reflectTasks(){
      this.$emit('reflectTasks')
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
