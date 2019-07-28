<template>
<div>

  <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
  <div class="list-bar__click-overlay" @click.prevent="showTempTaskModal"></div>

  <ModalBody v-if="showModal"
             :z_index="2"
             :footerType="footer"
             :title="title"
             :footerText="saveButtonText"
             @clickedNext="nextStep()"
             @clickedSave="taskLogSubmit"
             @close="closePopup">

    <template slot="modal-content">
      <div v-if="step === 1" class="list-bar" v-for="(task,index) in tasks_list">
        <!-- {{updateLog.push(false)}} -->
        <h5 class="list-bar__title">{{task.text}}</h5>

        <div class="temp-input__spacer"/>

        <MinusPlusField
          :value="task.default_temp"
          :id="task.id"
          :max="task.max_temp"
          :min="task.min_temp"
          @updateValue="updateValue"
        />

        <div class="list-bar__icon" v-if=" username != task.assignerId">
          <input class="list-bar__tick-box__input"
                 :id="'tick'+task.id"
                 type="checkbox" name="overdue"
                 v-model="task.update"
                 >

          <label class="list-bar__tick-box__label"
                 :for="'tick'+task.id"
                 title="Mark for update"
                 @click="updateValue(task.id, task.temperature, task.update,'checkbox')"
                 >
                 &nbsp;
          </label>
        </div>
      </div>

      <div v-if="step === 2" class="">
        <div class="list-bar list-bar--tall">
          <h2 class="list-bar__title--large">{{$t('app.logs.defaults.keepwarming_query')}}</h2>
        </div>
        <YesOrNo @yes="yes" @no="no"/>
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
import MinusPlusField from '~/components/General/MinusPlusField.vue'
import NewExceptionNonModal  from '~/components/General/NewExceptionNonModal.vue'
import ModalBody from '~/components/modals/ModalBody.vue'
import NewExceptionModal  from '~/components/General/NewExceptionModal.vue'
import YesOrNo from '~/components/general/YesOrNo.vue'

export default {

  components: {
    Icon,
    MinusPlusField,
    NewExceptionModal,
    ModalBody,
    YesOrNo
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
     updateLog: [],
     logsToBeUpdated: [],
     numberOfLogsToBeUpdated: 0,
     isLoading: false,
     showModal: false,
     step: 1,
     footer: 'none',
     footerText: this.$t('app.general.save'),
     selectedTasks: [],
     tasks_list: [],
     reports_status:[],
     saveButtonText: '',
     username:this.$store.getters.user.userInfo.username
   }
 },

 methods : {
   nextStep () {
     this.step ++
   },
  async yes () {
   await this.taskLogSubmit(true)
   },
   async no () {
     await this.taskLogSubmit(false)
   },
    showTempTaskModal(){
      this.$store.dispatch('lockBody');
      this.showModal = true;
      this.updateLog = [];
      this.logsToBeUpdated = [];
      this.tasks_list = [];
      this.footer = 'none';
      for (var x in this.tasks) {

        let def_temp = 60
        let max = 1000
        let min = -1000

        this.tasks_list.push({
         update: false,
         require_report: false,
         text: this.$t('app.tasks.task_types.warmkeeping_log') + this.tasks[x].taskName ,
         value: this.tasks[x].taskScheduleId,

         default_temp: parseFloat(def_temp).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         max_temp: max, //parseFloat(max).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         min_temp: min, //parseFloat(min).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),

         locationId: this.tasks[x].locationId,
         temperature: parseFloat(def_temp).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         id: this.tasks[x].taskScheduleId,
         taskId:this.tasks[x].taskId,
         due_date: this.tasks[x].tasksScheduleByTime
        })
      }

      for (let i = 0; i < this.tasks_list.length; i++){
        this.updateLog.push(false);
      }
    },

    reflectTasks() {
      this.$emit('reflectTasks')
    },

    async taskLogSubmit(continue_warming) {

      this.isLoading = true

      for (var x in this.logsToBeUpdated){

        let task_name = ''

        let hide_all = false
        let deviation_data = {}

        for (var y in this.tasks){
          if (this.tasks[y].taskScheduleId == this.logsToBeUpdated[x].task_id ){

            task_name = this.tasks[y].taskName

            deviation_data.deviation_required = false

            if ((this.logsToBeUpdated[x].temp < 60 )){
              deviation_data.deviation_required = true
            }

            if (deviation_data.deviation_required) {

              var today = new Date();
              var dd = today.getDate();
              var mm = today.getMonth()+1;
              var yyyy = today.getFullYear();


              if(dd<10) {
                  dd = '0'+dd
              }

              if(mm<10) {
                  mm = '0'+mm
              }

              deviation_data.assignees = [this.$store.getters.user.userInfo.username]
              deviation_data.taskName = this.$t('app.tasks.task_types.warmkeeping_log') + this.tasks[y].taskName + ' [ ' +this.logsToBeUpdated[x].temp+' ]'
              deviation_data.taskType = 'deviation_log'
              deviation_data.taskDesc = null
              deviation_data.taskRepeat = 'never'
              deviation_data.locationId = this.tasks[y].locationId
              deviation_data.taskDates = [yyyy+'-'+mm+'-'+dd]
              deviation_data.taskTime = null
              deviation_data.taskDeviationFor=this.tasks[y].taskScheduleId
            }

            if (continue_warming) {
              await API.post("metamat", "/tasks/schedule/", {
                body: {
                  taskId:this.tasks[y].taskId,
                  taskType: 'warmkeeping_log',
                  assignees: [this.$store.getters.user.userInfo.username],
                  locationId:this.tasks[y].locationId,
                  taskName: this.tasks[y].taskName,
                  in_x_hours:2,
                }
              });
            }

          }
        }
        if (this.tasks.length == this.logsToBeUpdated.length) {
          hide_all = true
        }

      this.$emit('logSubmit',
      this.logsToBeUpdated[x].task_id,
      this.logsToBeUpdated[x].temp,
      this.index,
      task_name ,
      'warmkeeping_log',
      hide_all,
      deviation_data
      )
      }

      this.isLoading = false
      // this.$refs.logTempTaskModal.hide()
      this.closePopup();

    },

    updateValue(task_id, new_temp, update,click_source=null) {

      let require_report =  false

      for (var x in this.tasks_list ){
        if (this.tasks_list[x].id == task_id){
          this.tasks_list[x].temperature = new_temp
          this.tasks_list[x].update = update;

          if ((new_temp < 60)){
            this.tasks_list[x].require_report = true
            require_report = true
          }
        }
      }

      if (this.logsToBeUpdated.length == 0 ){
          this.logsToBeUpdated.push({task_id: task_id, temp:new_temp})
      }
      else {
        let found = -1
        for (var x in this.logsToBeUpdated ){
          if (this.logsToBeUpdated[x].task_id == task_id ){
            found = x
          }
        }
        if (found > -1 ){
          this.logsToBeUpdated[found] = {task_id: task_id, temp:new_temp}

          if (click_source == 'checkbox') {
            this.logsToBeUpdated.splice(found, 1);
          }
        }

        else {
          this.logsToBeUpdated.push({task_id: task_id, temp:new_temp})

        }

      }

      if (require_report && this.logsToBeUpdated.length > 0) {
        this.footer = 'save'
      }
      else if (!require_report && this.logsToBeUpdated.length > 0) {
        this.footer = 'next'
      }
      else {
        this.footer = 'none'
      }

      this.numberOfLogsToBeUpdated = this.logsToBeUpdated.length;

      this.logsToBeUpdated.length > 1 ?
        this.saveButtonText = this.$t('app.tasks.save_x_logs').replace('%s',this.numberOfLogsToBeUpdated)
        : this.saveButtonText = this.$t('app.tasks.save_x_log').replace('%s',this.numberOfLogsToBeUpdated);


    },


    async closePopup(){
      this.step = 1
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }

}

</script>
