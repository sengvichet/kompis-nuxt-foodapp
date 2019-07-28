<template>

  <div>

    <div>
  <tabs
  :tabs="tabs"
  :currentTab="currentTab"
  :wrapper-class="'default-tabs'"
  :tab-class="'default-tabs__item'"
  :tab-active-class="'default-tabs__item_active'"
  :line-class="'default-tabs__active-line'"
  @onClick="handleClick"
  />

  <div v-if="isLoading" class="app-ui-overlay__centered-column">
    <LoadingAnimation/>
  </div>

  <div v-if="!isLoading" class="content">
  <div v-if="currentTab == 'today' && !isLoading">
    <div>
      <div  v-if="isLoading" class="ui">
        <LoadingAnimation/>
      </div>
      <TodayTasks
        ref="MyTodayTasks"
        v-if="!isLoading && tasks.my_today_tasks"
        :section_title = "$t('app.tasks.your_tasks')"
        :tasks_prop = "tasks.my_today_tasks"
        :objects_prop = "today_objects"
        :users_prop = "users_list"
        @reflectTasks="reflectTasks"
        @logSubmit="logSubmit"
      />

      <TodayTasks
        ref="MyTodayUnassignedTasks"
        v-if="!isLoading && tasks.unassined_today_tasks"
        :section_title="$t('app.tasks.unassigned_tasks')"
        :tasks_prop="tasks.unassined_today_tasks"
        :objects_prop="today_objects"
        :users_prop = "users_list"
        @reflectTasks="reflectTasks"
        @logSubmit="logSubmit"
      />

      <TodayTasks
        ref="MyTodayAssignedTasks"
        v-if="!isLoading && tasks.assigned_today_tasks"
        :section_title="$t('app.tasks.assigned_to_others')"
        :tasks_prop="tasks.assigned_today_tasks"
        :objects_prop="today_objects"
        :users_prop = "users_list"
        @logSubmit="logSubmit"
        @reflectTasks="reflectTasks"
      />

      <!-- <DeleteButton></DeleteButton> -->
    </div>
  </div>
  <div v-if="currentTab == 'this_week' && !isLoading">
    <div>
      <div  v-if="isLoading" class="ui">
        <LoadingAnimation/>
      </div>
      <WeeklyMonthlyTasks
        v-if="!isLoading && tasks.my_week_tasks"
        :section_title = "$t('app.tasks.your_tasks')"
        :tasks_prop = "tasks.my_week_tasks"
        :objects_prop = "week_objects"
        :users_prop = "users_list"
        @reflectTasks="reflectTasks"
        @logSubmit="logSubmit"
      />
      <WeeklyMonthlyTasks
        v-if="!isLoading && tasks.unassined_week_tasks"
        :section_title="$t('app.tasks.unassigned_tasks')"
        :tasks_prop="tasks.unassined_week_tasks"
        :objects_prop="week_objects"
        :users_prop = "users_list"
        @reflectTasks="reflectTasks"
        @logSubmit="logSubmit"
      />

      <WeeklyMonthlyTasks
        v-if="!isLoading && tasks.assigned_week_tasks"
        :section_title="$t('app.tasks.assigned_to_others')"
        :tasks_prop="tasks.assigned_week_tasks"
        :objects_prop="week_objects"
        @logSubmit="logSubmit"
        @reflectTasks="reflectTasks"
        :users_prop = "users_list"
      />
    </div>
  </div>
  <div v-if="currentTab == 'all_taks' && !isLoading">
    <div>
      <div v-if="isLoading" class="ui">
        <LoadingAnimation/>
      </div>
      <WeeklyMonthlyTasks
        v-if="!isLoading && tasks.my_all_tasks"
        :section_title = "$t('app.tasks.your_tasks')"
        :tasks_prop = "tasks.my_all_tasks"
        :objects_prop = "all_objects"
        :users_prop = "users_list"
        @reflectTasks="reflectTasks"
        @logSubmit="logSubmit"
      />

      <WeeklyMonthlyTasks
        v-if="!isLoading && tasks.unassined_all_tasks"
        :section_title="$t('app.tasks.unassigned_tasks')"
        :tasks_prop="tasks.unassined_all_tasks"
        :objects_prop="all_objects"
        :users_prop = "users_list"
        @reflectTasks="reflectTasks"
        @logSubmit="logSubmit"
      />

      <WeeklyMonthlyTasks
        v-if="!isLoading && tasks.assigned_all_tasks"
        :section_title="$t('app.tasks.assigned_to_others')"
        :tasks_prop="tasks.assigned_all_tasks"
        :objects_prop="all_objects"
        @logSubmit="logSubmit"
        @reflectTasks="reflectTasks"
        :users_prop = "users_list"
       />
    </div>

  </div>

  <div v-if="currentTab == 'tasks_management' && !isLoading">
    <div>
      <div v-if="isLoading" class="ui">
        <LoadingAnimation/>
      </div>

      <AddFilterModal
        v-if="!isLoading"
        :filter_types="filterTypes"
        :filter_data="{filterTypes, taskTypes,statusTypes,repeatTypes,createdBy,assignedTo,locations}"
        @add_filter="addFilter($event, tasksFilters)"/>

        <div class="u-margin-bottom-big"/>

        <div v-if="tasksFilters.length>0" class="filter-container u-margin-bottom-default" >
          <FilterBar v-for="(filter, index) in tasksFilters"
                     index="index"
                     @remove="removeFilter(tasksFilters, index)"
                     :type="filter.type.text"
                     :value="filter.value.text"/>
        </div>

      <MainTask
      v-if="!isLoading"
      v-for="(task,index) in main_tasks"
      :task_details="task"
      @reflectTasks="reflectTasks"
      :users_prop = "users_list"
       />

      </div>

  </div>

  </div>
  </div>


    <NewTask
      @reflectTasks="reflectTasks"
      :users_prop = "users_list"
      :assets_prop = "assets"
      @logSubmit="logSubmit"
    />
  </div>
</template>


<script>

import { API } from "aws-amplify";

import TodayTasks from '~/components/Tasks/TodayTasks.vue'
import MainTask from '~/components/Tasks/MainTask.vue'
import WeeklyMonthlyTasks from '~/components/Tasks/WeeklyMonthlyTasks.vue'
import NewTask from '~/components/Tasks/NewTask.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import DeleteButton from '~/components/General/DeleteButton.vue'
import Tabs from 'vue-tabs-with-active-line';
import FilterBar from '~/components/General/FilterBar.vue'
import AddFilterModal from '~/components/Filters/AddFilterModal.vue'

export default {

  components: {
    TodayTasks,
    WeeklyMonthlyTasks,
    NewTask,
    LoadingAnimation,
    DeleteButton,
    Tabs,
    MainTask,
    FilterBar,
    AddFilterModal

  },
  data() {
    return {
    newModal: Object,
    today_last_updated:0,
    week_last_updated:0,
    all_last_updated:0,
     today_objects:[],
     week_objects:[],
     all_objects:[],
     users_list:[],
     main_tasks:[],
     shop_id:'',
     current_tab:'',
     isLoading:false,
     tasks:{},
     tabs:[{
       title: this.$t('app.tasks.today'),
       value: 'today',
     }, {
       title: this.$t('app.tasks.this_week'),
       value: 'this_week',
     },
     /*
     {
       title: this.$t('app.tasks.all_taks'),
       value: 'all_taks',
     },
     */
     {
       title: this.$t('app.tasks.tasks_management'),
       value: 'tasks_management',
     }
     ],
     currentTab: 'today',
     filterTypes: [
       {value: 'taskTypes', text: this.$t('app.tasks.filters.task_type')},
       {value: 'repeatTypes', text: this.$t('app.tasks.filters.task_repeat')},
       {value: 'statusTypes', text: this.$t('app.tasks.filters.task_status')},
       {value: 'createdBy', text: this.$t('app.tasks.filters.created_by')},
       {value: 'assignedTo', text: this.$t('app.tasks.filters.assigned_to')},
       {value: 'locations', text: this.$t('app.tasks.filters.location')}
     ],
     taskTypes: [
       { value: 'clean', text: this.$t('app.tasks.task_types.clean') },
       { value: 'logtemp', text: this.$t('app.tasks.task_types.logtemp') },
       { value: 'others', text: this.$t('app.tasks.task_types.others') },
       ],
       statusTypes: [
         { value: 'open', text: this.$t('app.tasks.filters.task_open') },
         { value: 'closed', text: this.$t('app.tasks.filters.task_closed') },
         { value: 'completed', text: this.$t('app.tasks.filters.task_completed') },
         ],
     repeatTypes:[
     { value: 'never', text: this.$t('app.tasks.repeat_type.never')},
     { value: 'daily', text: this.$t('app.tasks.repeat_type.daily')},
     { value: 'weekly', text: this.$t('app.tasks.repeat_type.weekly') },
     { value: 'monthly', text: this.$t('app.tasks.repeat_type.monthly') }],
     createdBy:[],
     assignedTo:[],
     locations:[],
     tasksFilters:[]
    }
  },
  watch: {
    tasksFilters: function (val) {

      this.listTasksManagement()
    }
  },
    async created() {

      this.mixpanelTrack('Page View: Tasks Page');
      this.handleClick('today')


    },

  methods : {

    async handleClick(newTab) {

      this.mixpanelTrack('Tab Click: Tasks Page - ' + newTab);

      if (newTab == 'today') {
        this.listTodayTasks()
      }
      if (newTab == 'this_week') {
        this.listWeekTasks()
      }
      if (newTab == 'all_taks') {
        this.listAllTasks()
      }

      if (newTab == 'tasks_management') {
        this.listTasksManagement()
      }

      this.$nextTick(() => {
      this.currentTab = newTab;
      });
    },

    async reflectTasks (sleep=false) {

      if (sleep) {
      this.sleep(500)
      }

      this.tasks.my_today_tasks_set = false
      this.tasks.my_week_tasks_set = false
      this.tasks.my_all_tasks_set = false

      if (this.current_tab == 'today') {
        this.listTodayTasks(false)
      }
      if (this.current_tab == 'week') {
        this.listWeekTasks(false)
      }
      if (this.current_tab == 'all') {
        this.listAllTasks(false)
      }
      if (this.current_tab == 'tasks_management') {
        this.listTasksManagement()
      }
    },

    async logSubmit(task_schedule_id,temperature,index,task_name,type,deviation_data,log_data=null) {

     try {
         await API.post("metamat", "/tasks/log", {
           body: {
             taskScheduleId:task_schedule_id,
             temperature: temperature,
             type:type,
             log_data:log_data
           }
         })

         this.mixpanelTrack('Log Task: Tasks Page' ,{'Task Type':type});

      if(deviation_data){
        if (deviation_data.deviation_required){
        await API.post("metamat", "/tasks", {
            body: {
              assignees:deviation_data.assignees ,
              taskName:deviation_data.taskName ,
              taskType:deviation_data.taskType ,
              taskDesc:deviation_data.taskDesc ,
              taskRepeat:deviation_data.taskRepeat,
              locationId:deviation_data.locationId ,
              taskDates:deviation_data.taskDates ,
              taskTime:deviation_data.taskTime,
              taskDeviationFor:deviation_data.taskDeviationFor
            }
          });
      }
    }

    this.reflectTasks(false)
    this.$notify.success(this.$t('app.tasks.task_logged').replace('%s',task_name), 'success')

   } catch (e) {
     bugsnagClient.notify(e)
     this.$notify.error(this.$t('app.tasks.logg_error'), 'success')
   }

 },
    async listTodayTasks(loading=true) {

        this.current_tab = 'today'

        if (!this.tasks.my_today_tasks_set || !this.tasks.assigned_today_tasks_set || !this.tasks.unassined_today_tasks_set || true){
        this.users_list = []

          await this.listAssets();
          await this.listUsers();

        for (var x in this.$store.getters.store_users.data) {

        for (var y in this.$store.getters.store_users.data[x]) {
          this.users_list.push(this.$store.getters.store_users.data[x][y])
        }

        }

          if (loading) {this.isLoading = true;}

          await API.get("metamat", "/tasks/list/schedules/today").then(async (tasks) => {

          this.today_last_updated = new Date().getTime()

          await this.$set(this.tasks,'my_today_tasks',[])
          await this.$set(this.tasks,'assigned_today_tasks',[])
          await this.$set(this.tasks,'unassined_today_tasks',[])

          this.today_objects = tasks.objects
          this.$set(this.tasks,'my_today_tasks',tasks.my_tasks.today)
          this.$set(this.tasks,'my_today_tasks_set',true)
          this.$set(this.tasks,'assigned_today_tasks',tasks.assinged_to_others_tasks.today)
          this.$set(this.tasks,'assigned_today_tasks_set',true)
          this.$set(this.tasks,'unassined_today_tasks',tasks.unassined_tasks.today)
          this.$set(this.tasks,'unassined_today_tasks_set',true)

      })

    }

      this.isLoading = false;

},
async listWeekTasks(loading=true) {

    this.current_tab = 'week'

    if (!this.tasks.my_week_tasks_set || !this.tasks.assigned_week_tasks_set || !this.tasks.unassined_week_tasks_set || true){
    if (loading) {this.isLoading = true;}


    await API.get("metamat", "/tasks/list/schedules/week").then(async(tasks) => {

      await this.$set(this.tasks,'my_week_tasks',[])
      await this.$set(this.tasks,'assigned_week_tasks',[])
      await this.$set(this.tasks,'unassined_week_tasks',[])

      this.week_objects = tasks.objects

      this.$set(this.tasks,'my_week_tasks',tasks.my_tasks.week)
      this.$set(this.tasks,'my_week_tasks_set',true)
      this.$set(this.tasks,'assigned_week_tasks',tasks.assinged_to_others_tasks.week)
      this.$set(this.tasks,'assigned_week_tasks_set',true)
      this.$set(this.tasks,'unassined_week_tasks',tasks.unassined_tasks.week)
      this.$set(this.tasks,'unassined_week_tasks_set',true)

      //await this.listTodayTasks();


  })
}

      this.isLoading = false;



},
async listAllTasks(loading=true) {

    this.current_tab = 'all'

    if (!this.tasks.my_all_tasks_set || !this.tasks.assigned_all_tasks_set || !this.tasks.unassined_all_tasks_set || true){

    if (loading) {this.isLoading = true;}


    await API.get("metamat", "/tasks/list/schedules/all").then(async (tasks) => {

      await this.$set(this.tasks,'my_all_tasks',[])
      await this.$set(this.tasks,'assigned_all_tasks',[])
      await this.$set(this.tasks,'unassined_all_tasks',[])

      this.all_objects = tasks.objects

      this.$set(this.tasks,'my_all_tasks',tasks.my_tasks.all)
      this.$set(this.tasks,'assigned_all_tasks',tasks.assinged_to_others_tasks.all)
      this.$set(this.tasks,'unassined_all_tasks',tasks.unassined_tasks.all)
      this.$set(this.tasks,'my_all_tasks_set',true)
      this.$set(this.tasks,'assigned_all_tasks_set',true)
      this.$set(this.tasks,'unassined_all_tasks_set',true)

  })
}
      this.isLoading = false;
},

async listTasksManagement() {

    this.isLoading = true;
    this.current_tab = 'tasks_management'

    console.log(this.users_list);

    await API.post("metamat", "/tasks/list",{
      body:{
        filters: this.tasksFilters
      }
    }).then((tasks) => {

      this.createdBy = []
      this.locations = []
      this.assignedTo = []

      this.assignedTo = [
      {text:this.$t('app.tasks.anyone'),value:'anyone'},
      {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
      {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
      {text:this.$t('app.tasks.any_owner'),value:'any-owner'}
      ]

      for (var x in this.users_list) {
        this.createdBy.push({
          text:this.getUser(this.users_list[x].Username),
          value:this.users_list[x].Username
        })
        this.assignedTo.push({
          text:this.getUser(this.users_list[x].Username),
          value:this.users_list[x].Username
        })

      }

      for (var y in this.assets) {
        this.locations.push({
          text:this.assets[y].objectName,
          value:this.assets[y].objectId
        })
      }


      this.main_tasks = []

      for (var x in tasks ){

        let location_id  = tasks[x].locationId
        let location_name = ''

          for (var y in this.assets) {
            if (this.assets[y].objectId == location_id) {
              location_name = this.assets[y].objectName
            }
          }

        let assignees = ''

        if (Array.isArray(tasks[x].assignees)) {

          assignees = this.getUser(tasks[x].assignees[0]) + this.$t('app.tasks.or_others')

        }

        else {

          if (tasks[x].assignees == 'anyone') {assignees = this.$t('app.tasks.anyone')}
          if (tasks[x].assignees == 'any-employee') {assignees = this.$t('app.tasks.any_employee')}
          if (tasks[x].assignees == 'any-owner') {assignees = this.$t('app.tasks.any_owner')}
          if (tasks[x].assignees == 'any-manager') {assignees = this.$t('app.tasks.any_manager')}

        }


        let task_repeat = tasks[x].taskRepeat
        let task_type = tasks[x].taskType

        if (task_type == 'clean') {task_type = this.$t('app.tasks.prefix_clean')}
        if (task_type == 'logtemp') {task_type = this.$t('app.tasks.prefix_logtemp')}
        if (task_type == 'others') {task_type = this.$t('app.tasks.prefix_others')}

        this.main_tasks.push({
          task_id : tasks[x].taskId,
          task_name:tasks[x].taskName,
          task_status:tasks[x].taskStatus,
          task_assigner:this.getUser(tasks[x].assignerId),
          task_assigner_id:tasks[x].assignerId,
          task_type:tasks[x].taskType,
          task_time:tasks[x].taskTime,
          assignees:assignees,
          task_repeat:this.$t('app.tasks.repeat_type.'+task_repeat),
          location_name:location_name

        })


      }

    })

    this.isLoading = false;
},

getUser (user_id) {

  let first_name = ''
  let last_name = ''

  for (var x in this.users_list)  {

    if (this.users_list[x].Username == user_id) {

      for (var y in this.users_list[x].Attributes) {

        if (this.users_list[x].Attributes[y].Name == 'custom:first_name'){
          first_name = this.users_list[x].Attributes[y].Value
        }
        if (this.users_list[x].Attributes[y].Name == 'custom:last_name'){
          last_name = this.users_list[x].Attributes[y].Value
        }

      }

    }
  }
  // console.log(this.users);
  return first_name + ' ' + last_name

},

    addFilter(filter, filterArray){


      this.mixpanelTrack('Filter Add: Tasks Page - ' + filter.type.text);

      filterArray.push(
        {
          type: filter.type,
          value: filter.value
        }
      );

      if(process.env.stage === 'dev'){
        console.log(filter);
      }
    },
    removeFilter(filterArray, index){
      filterArray.splice(index, 1);

      if(process.env.stage === 'dev'){
        console.log(`removed filter ${index + 1}`);
      }
    },
sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
  }
}

</script>
