<template>
<div>

  <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
  <div class="list-bar__click-overlay" @click.prevent="showTempTaskModal"></div>

  <ModalBody v-if="showModal"
             :z_index="2"
             :footerType="footer"
             :title="title"
             :footerText="saveButtonText"
             @clickedSave="taskLogSubmit"
             @close="closePopup">

    <template slot="modal-content">
      <div class="list-bar" v-for="(task,index) in tasks_list">

        <div class="list-bar__text-container">
        <h5 class="list-bar__title">{{task.text}}</h5>
        <p class="list-bar__info">{{task.desc}}</p>
        </div>

        <NewExceptionModal
          v-if="task.require_report && username != task.assignerId && false"
          :parentId="task.id"
          parentType="task"
          :type="task.type"
          :temperature="task.temperature"
          :title="task.text"
          :locationId="task.locationId"
          :zIndex="5"
          @reflectTasks="reflectTasks"
        />

        <div class="temp-input__spacer"/>
        <!--
        <EditTaskModal
         :task_id_prop="task.task_parent"
         :title="task.text"
         :assigner_id_prop="task.assinger_id"
         :users_prop="users"
         modalMode=true
         @reflectTasks="reflectTasks"
         />

       -->

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
import EditTaskModal from '~/components/Tasks/EditTaskModal.vue'
import ModalBody from '~/components/modals/ModalBody.vue'
import NewExceptionModal  from '~/components/General/NewExceptionModal.vue'

export default {

  components: {
    Icon,
    MinusPlusField,
    NewExceptionModal,
    ModalBody,
    EditTaskModal
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
     updateDevice: [],
     devicesToBeUpdated: [],
     numberOfDevicesToBeUpdated: 0,
     isLoading: false,
     showModal: false,
     footer: 'none',
     selectedTasks: [],
     tasks_list: [],
     reports_status:[],
     saveButtonText: '',
     username:this.$store.getters.user.userInfo.username
   }
 },
 created() {

 },

  methods : {
    async taskLogSubmit(event) {
      // event.preventDefault();
      this.isLoading = true
      let manual_log = []

      for (var x in this.devicesToBeUpdated){

        let task_name = ''
        let device_name = ''
        let type = ''
        let hide_all = false
        let deviation_data = {}

        for (var y in this.tasks){

          if (this.tasks[y].taskScheduleId == this.devicesToBeUpdated[x].task_id ){

            task_name = this.tasks[y].taskName
            device_name = this.tasks[y].deviceName
            type = this.tasks[y].taskType
            manual_log.push({
              device_id: this.tasks[y].deviceId,
              logged_value:this.devicesToBeUpdated[x].temp
            })


            deviation_data.deviation_required = false

            if (this.tasks[y].deviceType === 'refrigerator' && (this.devicesToBeUpdated[x].temp > 4 || this.devicesToBeUpdated[x].temp < 0)){
              deviation_data.deviation_required = true
            }
            if (this.tasks[y].deviceType === 'freezer' && this.devicesToBeUpdated[x].temp > -18 ){
              deviation_data.deviation_required = true
            }
            if (this.tasks[y].deviceType === 'dishwasher1' && this.devicesToBeUpdated[x].temp < 55 ){
              deviation_data.deviation_required = true
            }
            if (this.tasks[y].deviceType === 'dishwasher2' && this.devicesToBeUpdated[x].temp < 75 ){
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
              deviation_data.taskName = this.tasks[y].deviceName + ' [ ' +this.devicesToBeUpdated[x].temp+' ]'
              deviation_data.taskType = 'deviation_log'
              deviation_data.taskDesc = null
              deviation_data.taskRepeat = 'never'
              deviation_data.locationId = this.tasks[y].locationId
              deviation_data.taskDates = [yyyy+'-'+mm+'-'+dd]
              deviation_data.taskTime = null
              deviation_data.taskDeviationFor=this.tasks[y].taskScheduleId

            }

          }
        }
        if (this.tasks.length == this.devicesToBeUpdated.length) {
          hide_all = true
        }


      this.$emit('logSubmit',
      this.devicesToBeUpdated[x].task_id,
      this.devicesToBeUpdated[x].temp,this.index,
      task_name + '[ '+device_name+' ]',
      type,
      hide_all,
      deviation_data
      )

      }

      await this.manualLog(manual_log)

      this.isLoading = false
      // this.$refs.logTempTaskModal.hide()
      this.closePopup();

    },
    reflectTasks() {
      this.$emit('reflectTasks')
    },
    manualLog(devices) {
      return API.post("metamat", "/devices/manuallog", {
        body: {
          devices:devices
        }
      });
    },
    showTempTaskModal(){
      this.$store.dispatch('lockBody');
      this.showModal = true;
      this.updateDevice = [];
      this.devicesToBeUpdated = [];
      this.tasks_list = [];
      this.footer = 'none';
      for (var x in this.tasks) {

        let def_temp;
        let max;
        let min;
        if(this.tasks[x].deviceType == 'freezer'){
          def_temp = -18;
          max = -18;
          min = -20000; // science fiction low, because there is no too cold for a freezer.
        } else if (this.tasks[x].deviceType == 'refrigerator'){
          def_temp = 4;
          min = 0; // frozen goods in refrigerators is no good.
          max = 4;
        } else if (this.tasks[x].deviceType == 'dishwasher1'){
          def_temp = 55;
          min = 55;
          max = 20000; //science fiction high, because there is no too hot for a dishwasher.
        }
       else if (this.tasks[x].deviceType == 'dishwasher2'){
        def_temp = 75;
        min = 75;
        max = 20000; //science fiction high, because there is no too hot for a dishwasher.
      }
        this.tasks_list.push({
         update: false,
         require_report: false,
         text: this.tasks[x].deviceName,
         value: this.tasks[x].taskScheduleId,
         desc: this.tasks[x].taskDesc,
         device_type: this.tasks[x].deviceType,
         task_parent:this.tasks[x].taskId,
         assinger_id:this.tasks[x].assignerId,
         default_temp: parseFloat(def_temp).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         max_temp: max, //parseFloat(max).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         min_temp: min, //parseFloat(min).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         type: this.tasks[x].taskType,
         locationId: this.tasks[x].locationId,
         temperature: parseFloat(def_temp).toFixed(1),//(this.tasks[x].deviceType == 'freezer') ? parseFloat(-18).toFixed(1) : parseFloat(4).toFixed(1),
         id: this.tasks[x].taskScheduleId,
         due_date: this.tasks[x].tasksScheduleByTime,
         user: (this.tasks[x].assignees != 'anyone') ? this.getUser(this.tasks[x].assignees) : this.$t('app.tasks.anyone')
        })
      }

      for (let i = 0; i < this.tasks_list.length; i++){
        this.updateDevice.push(false);
        // console.log(this.tasks[i].deviceName, this.tasks_list[i].update);
      }
      // this.$refs.logTempTaskModal.show()
    },
    updateValue(task_id, new_temp, update,click_source=null) {

      for (var x in this.tasks_list ){
        if (this.tasks_list[x].id == task_id){
          this.tasks_list[x].temperature = new_temp
          this.tasks_list[x].require_report = false
          this.tasks_list[x].update = update;
          if (this.tasks_list[x].device_type === 'refrigerator' && (new_temp > 4 || new_temp < 0)){
            this.tasks_list[x].require_report = true
          }
          if (this.tasks_list[x].device_type === 'freezer' && new_temp > -18 ){
            this.tasks_list[x].require_report = true
          }
          if (this.tasks_list[x].device_type === 'dishwasher1' && new_temp < 55 ){
            this.tasks_list[x].require_report = true
          }
          if (this.tasks_list[x].device_type === 'dishwasher2' && new_temp < 75 ){
            this.tasks_list[x].require_report = true
          }
          // console.log(this.tasks_list[x]);
        }
      }


      if (this.devicesToBeUpdated.length == 0 ){
          this.devicesToBeUpdated.push({task_id: task_id, temp:new_temp})
      }
      else {
        let found = -1
        for (var x in this.devicesToBeUpdated ){
          if (this.devicesToBeUpdated[x].task_id == task_id ){
            found = x
          }
        }

        if (found > -1 ){
          this.devicesToBeUpdated[found] = {task_id: task_id, temp:new_temp}

          if (click_source == 'checkbox') {
            this.devicesToBeUpdated.splice(found, 1);
          }
        }

        else {
          this.devicesToBeUpdated.push({task_id: task_id, temp:new_temp})

          // console.log('nested else');
        }
        // console.log('outer else');

      }

      // console.log(this.devicesToBeUpdated.length);

      this.devicesToBeUpdated.length > 0 ? this.footer = 'save' : this.footer = 'none';
      this.numberOfDevicesToBeUpdated = this.devicesToBeUpdated.length;

      this.devicesToBeUpdated.length > 1 ?
        this.saveButtonText = this.$t('app.tasks.save_x_devices').replace('%s',this.numberOfDevicesToBeUpdated)
        : this.saveButtonText = this.$t('app.tasks.save_x_device').replace('%s',this.numberOfDevicesToBeUpdated);


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

    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }

}

</script>
