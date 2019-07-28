<template>

  <b-container class="task-edit">

    <a v-if="canEdit"  href="#" class="edit" @click.prevent="showEditTaskModal">
      <img src="~assets/images/icon-edit-gray.png" />
    </a>

    <div v-if="innerModal" class="inner-modal modal-body">
      <a href = "#" @click.prevent="closeModal">
      <icon class="close" name="close" scale="1.2"></icon>
    </a>

    <h5 class="modal-title">{{$t('app.tasks.edit_task')}}: {{this.title}}</h5>


  <b-form @submit.prevent="editTaskSubmit">

  <b-form-group :label="$t('app.tasks.task_title')">

   <b-form-input type="text" :placeholder="$t('app.tasks.task_title')" v-model="task_title">
    </b-form-input>
 </b-form-group>

 <b-form-group :label="$t('app.tasks.task_description_label')" label-for="task_description">
   <b-form-textarea id="task_description"
      :placeholder="$t('app.tasks.task_description_placeholder')"
      :rows="3"
      :max-rows="3"
      v-model="task_desc"
      >
</b-form-textarea>
 </b-form-group>


 <b-form-group :label="$t('app.tasks.task_location')" >

   <b-form-select v-model="selectedLocation" :options="locations" class="mb-3" @input="locationChanged" />

 </b-form-group>

 <b-form-group :label="$t('app.tasks.assign_to')" v-if="showUsersInput">

   <b-form-select v-model="selectedUser" :options="users" class="mb-3"  />

 </b-form-group>


 <b-form-group :label="$t('app.tasks.repeat')">

   <b-form-select v-model="selectedRepeatType" @input="repeatTypeChanged" :options="repeatTypes" class="mb-3" />

 </b-form-group>


  <MonthlyCalendar v-if="isMonthlyCalendar" :selectedDays="selectedDatesInitial" @updateSelectedDays="updateSelectedDays" />
  <DailyCalendar v-if="isWeeklyCalendar" :selectedDays="selectedDatesInitial"   @updateSelectedDays="updateSelectedDays" />
  <YearlyCalendar v-if="isNeverCalendar" :selectedDays="selectedDatesInitial" @updateSelectedDays="updateSelectedDays"  />


 <b-form-group :label="$t('app.tasks.time')" v-if="isMonthlyCalendar || isDailyCalendar || isNeverCalendar || isWeeklyCalendar">

   <b-form-select v-model="selectedTime" :options="times" class="mb-3"/>

 </b-form-group>

 <b-form-group >

   <a href="#" class="delete-user" @click.prevent="deleteTask" >
     <img src="~assets/images/button-round-delete.png" />
   </a>


 </b-form-group>

    <b-button size="sm" variant="success" type="submit">
      {{$t('app.general.save')}} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>
  </b-form>
</div>

</b-container>
</template>


<script>

import {
  API
} from "aws-amplify";

import Icon from 'vue-awesome'
import MonthlyCalendar from '~/components/General/MonthlyCalendar.vue'
import DailyCalendar from '~/components/General/DailyCalendar.vue'
import YearlyCalendar from '~/components/General/YearlyCalendar.vue'

export default {

  components: {
    Icon,
    MonthlyCalendar,
    DailyCalendar,
    YearlyCalendar
  },

  props: {
    task_id_prop: {
      type: String,
      required:true
    },
    title: {
      type: String,
      required:false
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
     innerModal: false,
     task_id: this.task_id_prop,
     isLoading:false,
      canEdit:false,
     isNeverCalendar:false,
     isDailyCalendar:false,
     isWeeklyCalendar:false,
     isMonthlyCalendar:false,
     showUsersInput:false,
     task_title: '',
     assigner_id:'',
     task_desc:null,
     selectedDates:[],
     selectedDatesInitial:[],
     all_users:[],
     selectedLocation: null,
     locations: [],
     selectedUser: null,
     users: [],
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
       ]
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
      this.innerModal = false

    },

    async editTaskSubmit() {

      try {
        this.isLoading = true;

        await API.put("metamat", "/tasks/" + this.task_id, {
          body: {
            assignees: this.selectedUser,
            taskName: this.task_title,
            taskDesc: this.task_desc,
            taskRepeat:this.selectedRepeatType,
            taskDates:this.selectedDates,
            taskTime:this.selectedTime
          }
        });


        this.$notify.success(this.$t('task_updated').replace('%s',this.task_title), 'success')
        this.$emit('reflectTasks',true)
        this.innerModal = false

        this.isLoading = false;
        this.selectedUser = null
        this.taskName = ''
        this.selectedTaskType = null
        this.task_desc = ''
        this.selectedRepeatType=null
        this.selectedLocation =null
        this.selectedDates = []
        this.selectedTime = null
        this.isLoading = false

      } catch (e) {
        bugsnagClient.notify(e)
        this.innerModal = false
        this.isLoading = false
        this.$notify.error(this.$t('update_error'), 'success')

      }
    },
    createTask(task) {
      return API.post("metamat", "/tasks", {
        body: task
      });
    },

    closeModal() {
      this.innerModal = false
    },

    updateSelectedDays (days) {
      this.selectedDates = days
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
          this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:true})

          for (var x in this.all_users){

            await API.get("metamat", "/permissions/"+this.all_users[x].Username).then((ulocations) => {

              if (ulocations.indexOf(this.selectedLocation)!= -1 ){

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
                if (user_type != 'company'){
                  let prefix = ''
                  if (user_type == 'Owner') {prefix = this.$t('app.users.user_types.owner')}
                  if (user_type == 'Manager') {prefix = this.$t('app.users.user_types.manager')}
                  if (user_type == 'Employee') {prefix = this.$t('app.users.user_types.employee')}

                this.users.push({
                  value: this.all_users[x].Username,
                  text: prefix + ' - ' + first_name +' '+ last_name
                })
              }

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
        this.innerModal = true

         try {

           //this.$refs.editTask.show()
           this.locations = []

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
           })

           await API.get("metamat", "/users").then((users) => {
             this.all_users = users
           })

           let dates = []

           await  API.get("metamat", "/tasks/"+this.task_id).then((task) => {

               this.task_title = task.taskName
               this.task_desc = task.taskDesc
               this.selectedRepeatType = task.taskRepeat
               this.selectedTime = task.taskTime
               this.selectedLocation = task.locationId
               this.selectedUser = task.assignees
               this.selectedDatesInitial = task.taskDates

             })



         } catch (e) {
           bugsnagClient.notify(e)
           this.$notify.error(e.message, 'success')
         }

    },
  }
}

</script>
