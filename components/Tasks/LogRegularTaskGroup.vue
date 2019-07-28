<template>
<div>

  <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
  <div class="list-bar__click-overlay" @click.prevent="showRegularTaskModal"></div>

  <ModalBody v-if="showModal"
             :z_index="2"
             :footerType="footer"
             :title="title"
             :footerText="$t('app.general.save')"
             @clickedSave="taskLogSubmit"
             @close="closePopup">

    <template slot="modal-content">


      <div class="list-bar" v-for="(task,index) in tasks_list">
        <div class="list-bar__text-container">
        <h5 class="list-bar__title">{{task.text}}</h5>
        <p class="list-bar__info">{{task.desc}}</p>
        </div>

        <div class="list-bar__spacer"/>

        <NewExceptionModal
          v-if="
          (task.assignees.includes(username) ||
          task.assignees === 'anyone' ||
          task.assignees === 'any-employee' ||
          task.assignees === 'any-manager' ||
          task.assignees === 'any-owner'
          )
          "
          :zIndex="100000"
          :parentId="task.id"
          parentType="task"
          :type="task.type"
          :title="task.text"
          :locationId="task.locationId"
          @reflectTasks="reflectTasks"
        />
        <!--
        <EditTaskModal
         :task_id_prop="task.taskId"
         :title="task.text"
         :assigner_id_prop="task.assignerId"
         :users_prop="users"
         modalMode=true
         @reflectTasks="reflectTasks"
         />
       -->

        <div class="list-bar__icon"
        v-if="
        (task.assignees.includes(username) ||
        task.assignees === 'anyone' ||
        task.assignees === 'any-employee' ||
        task.assignees === 'any-manager' ||
        task.assignees === 'any-owner'
        )
        ">
          <input class="list-bar__tick-box__input"
                 :id="'tick'+task.id"
                 type="checkbox" name="overdue"
                 v-model="selectedTasks"
                 :value="task.value"
                 >

          <label class="list-bar__tick-box__label"
                 :for="'tick'+task.id"
                 title="Mark for update"
                 >
                 &nbsp;
          </label>
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
import EditTaskModal from '~/components/Tasks/EditTaskModal.vue'
import NewExceptionModal  from '~/components/General/NewExceptionModal.vue'
import ModalBody from '~/components/modals/ModalBody.vue'

export default {

  components: {
    Icon,
    ModalBody,
    EditTaskModal,
    NewExceptionModal
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
     showModal: false,
     isLoading: false,
     footer: 'none',
     tasks_list: [],
     selectedTasks: [],
     totalTasks: 0,
     username:this.$store.getters.user.userInfo.username
   }
 },

 watch: {
   selectedTasks(){

    this.selectedTasks.length > 0 ? this.footer = 'save' : this.footer = 'none';

   }
 },

  methods : {
    taskLogSubmit(event) {

      // event.preventDefault();
      this.isLoading = true

      for (var x in this.selectedTasks){

        let task_name = ''
        let type = ''
        let hide_all = false

        for (var y in this.tasks){
          if (this.tasks[y].taskScheduleId == this.selectedTasks[x] ){
            task_name = this.tasks[y].taskName
            type = this.tasks[y].taskType

          }
        }
        if (this.tasks.length == this.selectedTasks.length) {hide_all = true}
        this.$emit('logSubmit',this.selectedTasks[x],null,this.index,task_name,type,hide_all)
      }

      this.isLoading = false
      // this.$refs.logRegularTaskModal.hide()
      this.closePopup();
    },

    hideModal(){
      // this.$refs.logRegularTaskModal.hide()
      this.closePopup();
    },

    showRegularTaskModal(){
      this.showModal = true;
      this.$store.dispatch('lockBody');
      // this.$refs.logRegularTaskModal.show();
      // console.log('hello');
      for (var x in this.tasks) {

        this.tasks_list.push({
          text: this.tasks[x].taskName,
          desc: this.tasks[x].taskDesc,
          type: this.tasks[x].taskType,
          value: this.tasks[x].taskScheduleId,
          locationId: this.tasks[x].locationId,
          assignerId: this.tasks[x].assignerId,
          assignees:this.tasks[x].assignees,
          id: this.tasks[x].taskScheduleId,
          taskId: this.tasks[x].taskId,
          due_date: this.tasks[x].tasksScheduleByTime,
          user: (this.tasks[x].assignees != 'anyone') ? this.getUser(this.tasks[x].assignees) : this.$t('app.tasks.anyone')
        })
      }
    },

    async closePopup(){
      this.tasks_list = [];
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },

    closeTask(exception_id) {

    },

    reflectTasks(sleep){
      this.$emit('reflectTasks',sleep)
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
