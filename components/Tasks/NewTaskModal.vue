<template>


  <div>


    <ModalBody v-if="showModal"
               z_index="2"
               :footerType="footer"
               :title="$t('app.tasks.create_new_task')"
               :footerText="$t('app.general.save')"
               @clickedSave="newTaskSubmit"
               @close="closePopup">

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="task_title"
              :placeholder="$t('app.tasks.task_title')">
        </input>

        <select v-model="selectedTaskType" id="newtasktype" class="list-bar input__selector" value="1">
          <!-- <option :value="null" selected> {{ $t('app.tasks.task_type') }} </option> -->
          <option v-for="type in taskTypes" :value="type.value"> {{type.text}} </option>
        </select>

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

        <select v-if="showUsersInput" v-model="selectedUser" id="taskuser" class="list-bar input__selector" value="1">
          <option v-for="user in users" :value="user.value"> {{user.text}} </option>
        </select>

        <select v-model="selectedRepeatType"  @change="repeatTypeChanged" id="taskrepeat" class="list-bar input__selector" value="1">
          <option v-for="repeatType in repeatTypes" :value="repeatType.value"> {{repeatType.text}} </option>
        </select>

        <div v-if="isMonthlyCalendar || isNeverCalendar || isWeeklyCalendar" class="list-bar">
          <MonthlyCalendar v-if="isMonthlyCalendar" @updateSelectedDays="updateSelectedDays" />
          <DailyCalendar v-if="isWeeklyCalendar"  @updateSelectedDays="updateSelectedDays" />
          <YearlyCalendar v-if="isNeverCalendar" @updateSelectedDays="updateSelectedDays"  />
        </div>

        <select v-if="isMonthlyCalendar || isDailyCalendar || isNeverCalendar || isWeeklyCalendar" v-model="selectedTime" id="tasktime" class="list-bar input__selector" value="1">
          <option v-for="time in times" :value="time.value"> {{time.text}} </option>
        </select>


     </template>
  </ModalBody>


  <!-- <b-modal ref="newTask" hide-footer centered no-close-on-backdrop no-close-on-esc	no-enforce-focus	:title="$t('app.tasks.create_new_task')">

  <b-form @submit="newTaskSubmit">

  <b-form-group :label="$t('app.tasks.task_title')">

   <b-form-input type="text" :placeholder="$t('app.tasks.task_title')" v-model="task_title">
    </b-form-input>
 </b-form-group>

 <b-form-group :label="$t('app.tasks.task_type')">

   <b-form-select v-model="selectedTaskType" :options="taskTypes" class="mb-3" />

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


  <MonthlyCalendar v-if="isMonthlyCalendar" @updateSelectedDays="updateSelectedDays" />
  <DailyCalendar v-if="isWeeklyCalendar"  @updateSelectedDays="updateSelectedDays" />
  <YearlyCalendar v-if="isNeverCalendar" @updateSelectedDays="updateSelectedDays"  />


 <b-form-group :label="$t('app.tasks.time')" v-if="isMonthlyCalendar || isDailyCalendar || isNeverCalendar || isWeeklyCalendar">

   <b-form-select v-model="selectedTime" :options="times" class="mb-3"/>

 </b-form-group>

    <b-button size="sm" variant="success" type="submit">
      {{$t('app.general.save')}} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>

  </b-form>
</b-modal> -->

</div>
</template>


<script>

import {
  API
} from "aws-amplify";

import Icon from 'vue-awesome'
import MonthlyCalendar from '~/components/General/MonthlyCalendar.vue'
import DailyCalendar from '~/components/General/DailyCalendar.vue'
import YearlyCalendar from '~/components/General/YearlyCalendar.vue'
import ModalBody from '~/components/modals/ModalBody.vue'

export default {

  components: {
    Icon,
    MonthlyCalendar,
    DailyCalendar,
    YearlyCalendar,
    ModalBody
  },
  data () {
   return {
     isLoading: false,
     showModal: true,
     footer: 'none',
     isNeverCalendar: false,
     isDailyCalendar: false,
     isWeeklyCalendar: false,
     isMonthlyCalendar: false,
     showUsersInput: false,
     selectedTaskType: null,
     task_title: '',
     task_desc: null,
     selectedDates: [],
     all_users: [],
     taskTypes: [
       { value: null, text: this.$t('app.tasks.task_types.select') },
       { value: 'clean', text: this.$t('app.tasks.task_types.clean')},
       { value: 'logtemp', text: this.$t('app.tasks.task_types.logtemp')},
       { value: 'others', text: this.$t('app.tasks.task_types.others') }
     ],
     selectedLocation: null,
     locations: [],
     selectedUser: 'anyone',
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
       { value: null, text: 'Select Time' },
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


  computed: {
    compoundProperty(){
      return [
        this.selectedUser,
        this.task_title,
        this.selectedTaskType,
        //this.task_desc,
        this.selectedRepeatType,
        this.selectedLocation,
        //this.selectedDates.length,
        this.selectedTime
      ].join()
    }
  },

  watch: {
    compoundProperty: function() {
      if (this.selectedUser &&
          this.task_title &&
          this.selectedTaskType &&
          //this.task_desc &&
          this.selectedRepeatType &&
          this.selectedLocation &&
          //this.selectedDates.length == 0 &&
          this.selectedTime
         ){
          this.footer = 'save'
        } else {
          this.footer = 'none'
        }
       // console.log('compoundProperty changed: ' + this.compoundProperty);
    }
  },

  created() {

  },

  methods : {

    async newTaskSubmit(event) {

      // event.preventDefault();

      if (

        !this.selectedUser ||
        !this.task_title ||
        !this.selectedTaskType ||
        //!this.task_desc ||
        !this.selectedRepeatType ||
        !this.selectedLocation ||
        //this.selectedDates.length == 0 ||
        !this.selectedTime

      )
      {
        return
      }
      try {

        this.isLoading = true;

        await this.createTask({
          assignees: this.selectedUser,
          taskName: this.task_title,
          taskType: this.selectedTaskType,
          taskDesc: this.task_desc,
          taskRepeat:this.selectedRepeatType,
          locationId:this.selectedLocation,
          taskDates:this.selectedDates,
          taskTime:this.selectedTime
        });

        this.$notify.success(this.$t('app.tasks.task_added'), 'success')

        this.$emit('reflectTasks',true)

        // this.$refs.newTask.hide()
        this.closePopup();

        this.showUsersInput = false;
        this.isLoading = false;
        this.selectedUser = null;
        this.task_title = '';
        this.selectedTaskType = null;
        this.task_desc = '';
        this.selectedRepeatType= null;
        this.selectedLocation = null;
        this.selectedDates = [];
        this.selectedTime = null;
        this.locations = [];




      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.tasks.add_error'), 'success')

      }


    },
    createTask(task) {
      return API.post("metamat", "/tasks", {
        body: task
      });
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
          this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:false})

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

          ///      if (user_type != 'company'){
                let prefix = ''
                if (user_type == 'Owner') {prefix = this.$t('app.users.user_types.owner')}
                if (user_type == 'Manager') {prefix = this.$t('app.users.user_types.manager')}
                if (user_type == 'Employee') {prefix = this.$t('app.users.user_types.employee')}


                this.users.push({
                  value: this.all_users[x].Username,
                  text: prefix + ' - ' + first_name +' '+ last_name
                })
              //}

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
    async showNewTaskModal(){

      // this.$refs.newTask.show()
      this.showModal = true;
      this.$store.dispatch('lockBody');
       try {
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

      } catch (e) {
        bugsnagClient.notify(e)
         this.closePopup();
         this.$notify.error(e.message, 'success')
      }
    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
