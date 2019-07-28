<template>

  <div>

    <a href="#" v-if="canEdit" class="list-bar__icon" @click.prevent="showEditTaskModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="2"
               :isLoading="isLoading"
               :footerType="footer"
               :title="modal_title"
               :footerText="$t('app.general.save')"
               @clickedSave="editTaskSubmit"
               @close="closePopup">

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="task_title"
              :placeholder="$t('app.tasks.task_title')">
        </input>

        <!-- <select v-model="selectedTaskType" id="newtasktype" class="list-bar input__selector" value="1">
          <option :value="null" selected> {{ $t('app.tasks.task_type') }} </option>
          <option v-for="type in taskTypes" :value="type.value"> {{type.text}} </option>
        </select> -->

        <textarea id="new_task_desc"
           class="list-bar input__text"
           v-model="task_desc"
           :placeholder="$t('app.tasks.task_description_placeholder')"
           :rows="3"
           :max-rows="3">
        </textarea>

        <select v-model="selectedLocation" @change="locationChanged" id="tasklocation" class="list-bar input__selector" value="1">
          <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
        </select>

        <select v-if="selectedLocation!=null" @change="userTypeChanged"  v-model="selectedUserType" id="taskusertype" class="list-bar input__selector">
          <option v-for="userType in userTypes" :value="userType.value"> {{userType.text}} </option>
        </select>


        <div v-if="!isLoading && selectedUserType!=null && selectedUserType!='any-employee' && selectedUserType!='any-manager' && selectedUserType!='any-owner' && selectedUserType!='anyone'"  class="list-bar input checklist-header">
          {{ $t('app.tasks.task_assinged_to') }}
        </div>
        <div v-if="!isLoading && selectedUserType!=null && selectedUserType!='any-employee' && selectedUserType!='anyone' && selectedUserType!='any-manager' && selectedUserType!='any-owner'" class="input__check-list">
          <div class="input__check-list__item" v-for="(user,index) in users">
            <input :id="'edit-point' + index" class="input__check-box" type="checkbox"  :value="user.value" v-model="selectedUsers">
            <label :for="'edit-point' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text">{{user.text}}</p>
              <div class="input__check-label__tick--checkbox"/>
            </label>
          </div>
        </div>


        <select v-model="selectedRepeatType"  @change="repeatTypeChanged" id="taskrepeat" class="list-bar input__selector" value="1">
          <option v-for="repeatType in repeatTypes" :value="repeatType.value"> {{repeatType.text}} </option>
        </select>

        <div v-if="isMonthlyCalendar || isNeverCalendar || isWeeklyCalendar" class="list-bar">
          <MonthlyCalendar v-if="isMonthlyCalendar" :selectedDays="selectedDatesInitial" @updateSelectedDays="updateSelectedDays" />
          <DailyCalendar v-if="isWeeklyCalendar" :selectedDays="selectedDatesInitial"  @updateSelectedDays="updateSelectedDays" />
          <YearlyCalendar v-if="isNeverCalendar" :selectedDays="selectedDatesInitial" @updateSelectedDays="updateSelectedDays"  />
        </div>

        <select v-model="selectedTime" id="tasktime" class="list-bar input__selector" value="1">
          <option v-for="time in times" :value="time.value"> {{time.text}} </option>
        </select>


        <DeleteButton @was_clicked="deleteTask()"
              :prompt="$t('app.general.are_you_sure_cant_undo')"/>
     </template>
  </ModalBody>


</div>
</template>


<script>

import {
  API
} from "aws-amplify";

// import Icon from 'vue-awesome'
import MonthlyCalendar from '~/components/General/MonthlyCalendar.vue'
import DailyCalendar from '~/components/General/DailyCalendar.vue'
import YearlyCalendar from '~/components/General/YearlyCalendar.vue'
import DeleteButton from '~/components/General/DeleteButton.vue'
import ModalBody from '~/components/modals/ModalBody.vue'

export default {

  components: {
    // Icon,
    MonthlyCalendar,
    DeleteButton,
    DailyCalendar,
    YearlyCalendar,
    ModalBody
  },

  props: {
    task_id_prop: {
      type: String,
      required:true
    },
    assigner_id_prop: {
      type:String,
      required:false
    },
    users_prop: {
      typr:Array
    }
  },
  data () {
   return {
     showModal: false,
     footer: 'none',
     task_id: this.task_id_prop,
     canEdit:false,
     isLoading:false,
     isNeverCalendar:false,
     isDailyCalendar:false,
     isWeeklyCalendar:false,
     isMonthlyCalendar:false,
     showUsersInput:false,
     task_title: '',
     assigner_id:'',
     modal_title: this.$t('app.tasks.edit_task'),
     task_desc:null,
     selectedDates:[],
     selectedDatesInitial:[],
     all_users:[],
     selectedLocation: null,
     locations: [],
     selectedUser: null,
     users: [],
     selectedUserType:null,
     userTypes:[
       {text:this.$t('app.users.user_types.select'),value:null},
       {text:this.$t('app.tasks.anyone'),value:'anyone'},
       {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
       {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
       {text:this.$t('app.tasks.any_owner'),value:'any-owner'},
       {text:this.$t('app.tasks.any_user'),value:'any-user'}
     ],
     selectedUsers: [],
     selectedRepeatType: null,
      repeatTypes: [
        { value: null, text: this.$t('app.tasks.repeat_type.select') },
        { value: 'never', text: this.$t('app.tasks.repeat_type.never')},
        { value: 'daily', text: this.$t('app.tasks.repeat_type.daily')},
        { value: 'weekly', text: this.$t('app.tasks.repeat_type.weekly') },
        { value: 'monthly', text: this.$t('app.tasks.repeat_type.monthly') }
      ],
      selectedTime:null,
      times: [
         { value: null, text:this.$t('app.tasks.select_time') },
         { value: '00:00:00', text: '00:00'},
         { value: '01:00:00', text: '01:00'},
         { value: '02:00:00', text: '02:00'},
         { value: '03:00:00', text: '03:00'},
         { value: '04:00:00', text: '04:00'},
         { value: '05:00:00', text: '05:00'},
         { value: '06:00:00', text: '06:00'},
         { value: '07:00:00', text: '07:00'},
         { value: '08:00:00', text: '08:00'},
         { value: '09:00:00', text: '09:00'},
         { value: '10:00:00', text: '10:00'},
         { value: '11:00:00', text: '11:00'},
         { value: '12:00:00', text: '12:00'},
         { value: '13:00:00', text: '13:00'},
         { value: '14:00:00', text: '14:00'},
         { value: '15:00:00', text: '15:00'},
         { value: '16:00:00', text: '16:00'},
         { value: '17:00:00', text: '17:00'},
         { value: '18:00:00', text: '18:00'},
         { value: '19:00:00', text: '19:00'},
         { value: '20:00:00', text: '20:00'},
         { value: '21:00:00', text: '21:00'},
         { value: '22:00:00', text: '22:00'},
         { value: '23:00:00', text: '23:00'}
      ],
      oldState: this.compoundProperty
   }
 },


  computed: {
     compoundProperty(){
       return [
         this.selectedUserType,
         this.selectedUsers,
         this.task_title,
         this.task_desc,
         this.selectedRepeatType,
         this.selectedLocation,
         this.selectedDates,
         this.selectedTime
       ].join()
     }
   },

  watch: {
     compoundProperty: function() {
       if (this.compoundProperty !== this.oldState &&
           this.selectedUserType &&
           this.selectedUsers &&
           this.task_title &&
           this.selectedRepeatType &&
           this.selectedLocation &&
           this.selectedTime
         ){
           this.footer = 'save'
          // console.log('compoundProperty changed: ' + this.compoundProperty);
         } else {
           this.footer = 'none'
         }
        // console.log('compoundProperty changed: ' + this.compoundProperty);
     }
   },


 created () {
   this.checkIfCanEdit()
 },

  methods : {

  checkIfCanEdit() {

    if (this.$store.getters.user.userInfo.username == this.assigner_id_prop) {
      this.canEdit = true
    }
    else {

      let assigner_type = ''

      for (var x in this.users_prop){
        for (var y in this.users_prop[x].Attributes) {

          if (this.users_prop[x].Attributes[y].Name == 'custom:user_type') {
            if (this.users_prop[x].Username == this.assigner_id_prop){
            assigner_type = this.users_prop[x].Attributes[y].Value
            }
          }
        }
      }

      if (this.$store.getters.user.userInfo.user_type == 'employee' && assigner_type == 'employee') {
        this.canEdit = true
      }
      if (this.$store.getters.user.userInfo.user_type == 'manager' && (assigner_type == 'employee'||assigner_type == 'manager')) {
        this.canEdit = true
      }
      if (this.$store.getters.user.userInfo.user_type == 'owner') {
        this.canEdit = true
      }
    }
  },


  async  deleteTask() {

        this.isLoading = true

        await API.del("metamat", "/tasks/" + this.task_id);
        this.isLoading =  false
        this.$emit('reflectTasks',true)
        this.mixpanelTrack('Delete Task: Tasks Page');
        // this.$refs.editTask.hide()
        this.closePopup();
    },

    async editTaskSubmit() {

      try {

        this.isLoading = true;

        await API.put("metamat", "/tasks/" + this.task_id, {
          body: {
            assignees: (this.selectedUserType == 'any-user') ? this.selectedUsers : this.selectedUserType,
            taskName: this.task_title,
            taskDesc: this.task_desc,
            taskRepeat:this.selectedRepeatType,
            taskDates:this.selectedDates,
            taskTime:this.selectedTime,
            taskLocation:this.selectedLocation
          }
        });
        this.mixpanelTrack('Edit Task: Tasks Page');
        this.$notify.success(this.$t('task_updated').replace('%s',this.task_title), 'success')

        this.isLoading = false;
        this.$emit('reflectTasks',true)
        //this.$refs.editTask.hide()
        this.selectedUserType = null
        this.selectedUsers = []
        this.taskName = ''
        this.selectedTaskType = null
        this.task_desc = ''
        this.selectedRepeatType=null
        this.selectedLocation =null
        this.selectedDates = []
        this.selectedTime = null
        this.isLoading = false
        this.locations = [];
        this.closePopup();

      } catch (e) {
        bugsnagClient.notify(e)
        // this.$refs.editTask.hide()
        this.closePopup();
        this.isLoading = false
        this.$notify.error(this.$t('update_error'), 'success')
        if(process.env.stage === 'dev'){
          console.log(e);
        }
      }
    },

    updateSelectedDays (days) {
      this.selectedDates = days
    },

    async  userTypeChanged() {

        await this.locationChanged()
      },
    repeatTypeChanged() {
      this.selectedDates = []
      this.isMonthlyCalendar = false
      this.isDailyCalendar = false
      this.isWeeklyCalendar = false
      this.isNeverCalendar = false

      switch (this.selectedRepeatType) {
        case 'never':{
          this.isNeverCalendar = true
          break;
        }
        case 'daily':{
          this.isDailyCalendar = true
          break;
        }
        case 'weekly':{
          this.isWeeklyCalendar = true
          break;
        }
        case 'monthly':{
          this.isMonthlyCalendar = true
          break;
        }
        default:{
        }

      }
    },
    async locationChanged() {

      this.users  = []

      if (this.selectedLocation!= null){

          this.showUsersInput = false
        //  this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:true})

          for (var x in this.all_users){

            let first_name  = ''
            let last_name = ''
            let user_type = ''

            for (var y in this.all_users[x].Attributes) {

              if (this.all_users[x].Attributes[y].Name == 'custom:first_name') {
                first_name = this.all_users[x].Attributes[y].Value
              }

              if (this.all_users[x].Attributes[y].Name == 'custom:last_name') {
                last_name = this.all_users[x].Attributes[y].Value
              }

              if (this.all_users[x].Attributes[y].Name == 'custom:user_type') {
                user_type = this.all_users[x].Attributes[y].Value
                user_type = user_type.replace(/^\w/, c => c.toUpperCase())
              }

            }

            await API.get("metamat", "/permissions/"+this.all_users[x].Username).then((ulocations) => {

              if (ulocations.indexOf(this.selectedLocation)!= -1 || user_type == 'Company'){

                let prefix = ''
                if (user_type == 'Owner') {prefix = this.$t('app.users.user_types.owner')}
                if (user_type == 'Manager') {prefix = this.$t('app.users.user_types.manager')}
                if (user_type == 'Employee') {prefix = this.$t('app.users.user_types.employee')}

        //        if (user_type != 'company'){
                this.users.push({
                  value: this.all_users[x].Username,
                  text: prefix + ' - ' + first_name +' '+ last_name
                })
        //      }

              }

            })
          }

          if (this.users.length > 2){
            this.users[1].disabled = false
          }
          this.showUsersInput = true
      }

      else {
        this.showUsersInput = false
      }

    },
    async showEditTaskModal(){
        this.isLoading = true;
        this.mixpanelTrack('Click: Tasks Page - Edit Task Modal');

         try {
           // this.$refs.editTask.show()
           this.showModal = true;
           this.$store.dispatch('lockBody');
           this.locations = [];

           await API.get("metamat", "/assets/names").then((assets) => {

             let user_type  =  this.$store.getters.user.userInfo.user_type
             let permissions = this.$store.getters.user.permissions
             this.locations.push({
               text: this.$t('app.tasks.select_taks_loaction'),
               value:null,
               id:'nulllocation',
               disabled:false
             })


             for (var x in assets) {

               if (permissions.indexOf(assets[x].objectId) > -1 ){

               this.locations.push({
                 text: assets[x].objectName + ' (' + assets[x].objectLocation + ')',
                 value: assets[x].objectId,
                 id: assets[x].objectId,
                 disabled: false
               })
             }
           }
            this.oldState = this.compoundProperty;
           })


          this.all_users = this.users_prop

           let dates = []


           await API.get("metamat", "/tasks/"+this.task_id).then((task) => {

               this.task_title = task.taskName
               this.assigner_id = task.assignerId
               this.task_desc = task.taskDesc
               this.selectedRepeatType = task.taskRepeat
               this.selectedTime = task.taskTime
               this.selectedLocation = task.locationId

               if (Array.isArray(task.assignees)) {
                 this.selectedUserType = 'any-user'
                 this.selectedUsers = task.assignees
               }
               else {
                this.selectedUserType = task.assignees
               }

               this.selectedDatesInitial = task.taskDates
               this.modal_title = this.$t('app.general.edit').replace('%s',this.task_title)
               this.oldState = this.compoundProperty;

               console.log(this.selectedDatesInitial);

               this.locationChanged()
               this.repeatTypeChanged()
             })
          this.oldState = this.compoundProperty;
         } catch (e) {
           bugsnagClient.notify(e)
           this.closePopup();
           this.$notify.error(e.message, 'success')
         }
         this.isLoading = false;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
