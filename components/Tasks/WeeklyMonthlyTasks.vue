<template>
  <div>
    <p class="app-ui-overlay__section-title center">{{section_title}}</p>
    <!-- <transition-group name="task-list" mode="out-in"> -->
      <div v-for="(task,index) in tasks_list" :key="task.id + 'weeklyMonthly' + index" class="list-bar list-bar__task" :class="{ 'list-bar__task--overdue': task.is_overdue }">

        <div v-if="task.is_overdue" class="list-bar__warning-flag">
          <p class="list-bar__warning-flag__content">!</p>
        </div>
        <div v-if="task.is_overdue" class="list-bar__warning-flag--spacer">
          <!-- this is just here to move the text over. need to refactor list-bar css to not have padding on outer div, and then use WarningFlag component.  -->
        </div>

        <!-- <WarningFlag show="task.is_overdue"/> -->

        <div class="list-bar__text-container">
          <h5 class="list-bar__title" :class="{ 'list-bar__title--warning': task.is_overdue }">{{task.title}} {{task.sub_title}} </h5>
          <p class="list-bar__sub-heading" :class="{ 'list-bar__sub-heading--warning': task.is_overdue }"> {{task.user}}, {{$t('app.tasks.due')}} {{task.due_date}} </p>
        </div>
        <!--
        <NewExceptionModal
          v-if="

          ( task.tasks[0].assignees.includes(username) ||
          task.tasks[0].assignees === 'anyone' ||
          task.tasks[0].assignees === 'any-employee' ||
          task.tasks[0].assignees === 'any-manager' ||
          task.tasks[0].assignees === 'any-owner'

          )  &&
          task.num == 1 &&
          !task.is_deviation_review &&
          !task.is_cooldown_log &&
          !task.is_warmkeeping_log &&
          !task.is_templog
          "
          :zIndex="z"
          is_deviation_log_task="no"
          :parentId="task.id"
          :type="task.type"
          parentType="task"
          :title="task.sub_title"
          :locationId="task.locationId"
          @reflectTasks="reflectTasks"
        />

        <EditTaskModal
          v-if="(task.num == 1 || task.is_templog) && username == task.tasks[0].assignerId && !task.is_deviation_log && !task.is_deviation_review"
          :task_id_prop="task.taskId"
          :assigner_id_prop="task.assigner_id"
         :users_prop="users"
          @reflectTasks="reflectTasks"
        />

      -->
        <NewExceptionModal
          v-if="
          username == task.tasks[0].assignerId &&
          task.is_deviation_log
          "
          :zIndex="z"
          is_deviation_log_task="yes"
          :parentId="task.id"
          :type="task.type"
          :taskDeviationFor="task.taskDeviationFor"
          parentType="task"
          :title="task.sub_title"
          :locationId="task.locationId"
          @reflectTasks="reflectTasks"
        />



        <LogRegularTaskGroup
          v-if="!task.is_templog && !task.is_manufacturer && !task.is_ship && !task.is_package"
          :title_prop="task.title + ' '+ task.sub_title"
          :tasks_prop="task.tasks"
          :users_prop="users"
          @logSubmit="logSubmit"
          @reflectTasks="reflectTasks"
          :index="index"
        />

        <LogTempTaskGroup
          v-if="
          task.is_templog &&

          ( task.tasks[0].assignees.includes(username) ||
          task.tasks[0].assignees === 'anyone' ||
          task.tasks[0].assignees === 'any-employee' ||
          task.tasks[0].assignees === 'any-manager' ||
          task.tasks[0].assignees === 'any-owner'

          )
          "
          :title_prop="task.sub_title"
          :tasks_prop="task.tasks"
          :users_prop="users"
          @logSubmit="logSubmit"
          @reflectTasks="reflectTasks"
          :index="index"
        />

        <LogShopOrderTask
        v-if="task.is_manufacturer || task.is_package || task.is_ship"
        :tasks_prop="task.tasks"
        :task_type="task.type"
        :location_name="task.location_name"
        :index="index"
        @logSubmit="logSubmit"
        />

        <!--

        <div class="list-bar__icon" v-if="

        ( task.tasks[0].assignees.includes(username) ||
        task.tasks[0].assignees === 'anyone' ||
        task.tasks[0].assignees === 'any-employee' ||
        task.tasks[0].assignees === 'any-manager' ||
        task.tasks[0].assignees === 'any-owner'

        ) &&
         task.num == 1 &&
        !task.is_templog &&
        !task.is_deviation_log &&
        !task.is_deviation_review &&
        !task.is_manufacturer &&
        !task.is_package &&
        !task.is_ship
        ">
          <input class="list-bar__tick-box__input"
                 :id="'week'+task.id"
                 type="checkbox" name="overdue"

                 >

          <label class="list-bar__tick-box__label"
                 :for="'week'+task.id"
                 title="Mark as complete"
                 @click="logSubmit(task.id,null,index,task.title + ' ' + task.sub_title,task.type,true)"
                 >

          </label>
        </div>
      -->
      </div>
    <!-- </transition-group> -->
  </div>

</template>
<script>

import array_sort from "array-sort"
import LogRegularTaskGroup from '~/components/Tasks/LogRegularTaskGroup.vue'
import LogTempTaskGroup from '~/components/Tasks/LogTempTaskGroup.vue'
import EditTaskModal from '~/components/Tasks/EditTaskModal.vue'
import LogPackageOrderGroup from '~/components/Tasks/LogPackageOrderGroup.vue'
import LogShipOrderGroup from '~/components/Tasks/LogShipOrderGroup.vue'
import LogManufacturerOrderGroup from '~/components/Tasks/LogManufacturerOrderGroup.vue'
import NewExceptionModal  from '~/components/General/NewExceptionModal.vue'
import LogShopOrderTask from '~/components/Tasks/LogShopOrderTask.vue'


export default {

  components: {

    LogRegularTaskGroup,
    LogTempTaskGroup,
    EditTaskModal,
    NewExceptionModal,
    LogPackageOrderGroup,
    LogShipOrderGroup,
    LogManufacturerOrderGroup,
    LogShopOrderTask
  },

  props: {
    section_title:{
      type:String,
      required:false
    },
    tasks_prop:{
      type:Object,
      required:false
    },

    objects_prop:{
      type:Array,
      required:false
    },
    users_prop:{
      type:Array,
      required:false
    },
    orders_prop:{
      type:Array,
      required:false
    },
    is_completable: {
      type:Boolean,
      required:false
    }

  },

  data() {
      return {

        tasks_list:[],
        tasks: this.tasks_prop,
        objects: this.objects_prop,
        users:this.users_prop,
        orders: this.orders_prop,
        username:this.$store.getters.user.userInfo.username
      }
    },

  watch: {
  tasks_prop: {
      handler: function () {
        console.log('Watch Today');
        this.tasks = []
        this.tasks_list = []
        this.tasks = this.tasks_prop
        this.buildTasksList();
      }
  }
},

     created() {
       this.tasks= this.tasks_prop
       this.buildTasksList();

     },

  methods : {
    buildTasksList(){
      for (var x in this.tasks) {

        for (var y in this.tasks[x]) {

          let location_name = ''
          for (var k in this.objects) {
            if(this.objects[k]!=null){
              if (y == this.objects[k].objectId) {
                location_name = this.objects[k].objectName
              }
            }
          }

          let list = []

          for (var z in this.tasks[x][y]){

            let location_name = ''
            for (var k in this.objects) {
                if (this.objects[k] != null){
                if (y == this.objects[k].objectId) {
                  location_name = this.objects[k].objectName
                }
              }
            }


          let inner_task = {}
          inner_task.tasks = []

          inner_task.tasks = this.tasks[x][y][z]

        for (var k in inner_task.tasks) {

            if (inner_task.tasks[k].taskType == 'package' || inner_task.tasks[k].taskType == 'ship' ) {

              for (var l in this.orders ) {
                if (inner_task.tasks[k].cartId == this.orders[l].cartId ) {

                    inner_task.tasks[k].order = this.orders[l]
                }
              }

            }

        }

        /*
           if (x == 'clean') {
             inner_task.title = this.$t('app.tasks.prefix_clean')
             inner_task.num = this.tasks[x][y][z].length
           }

           if (x == 'logtemp') {
             inner_task.title = this.$t('app.tasks.prefix_logtemp')
             inner_task.num = this.tasks[x][y][z].length
           }

          if (x == 'others') {
            inner_task.title =this.$t('app.tasks.prefix_others')
            inner_task.num = this.tasks[x][y][z].length
          }

          */



          if (x == 'manufacturer') {
            inner_task.title = this.$t('app.tasks.prefix_manufacturer')
            inner_task.num = this.tasks[x][y][z].length
          }
          if (x == 'package') {
            inner_task.title = this.$t('app.tasks.prefix_package')
            inner_task.num = this.tasks[x][y][z].length
          }
          if (x == 'ship') {
            inner_task.title = this.$t('app.tasks.prefix_ship')
            inner_task.num = this.tasks[x][y][z].length
          }



            if (
              this.tasks[x][y][z][0].assignees == 'anyone' ||
              this.tasks[x][y][z][0].assignees == 'any-employee' ||
              this.tasks[x][y][z][0].assignees == 'any-owner' ||
              this.tasks[x][y][z][0].assignees == 'any-manager'
            ) {

              if (this.tasks[x][y][z][0].assignees == 'anyone') {inner_task.user = this.$t('app.tasks.anyone')}
              if (this.tasks[x][y][z][0].assignees == 'any-employee') {inner_task.user = this.$t('app.tasks.any_employee')}
              if (this.tasks[x][y][z][0].assignees == 'any-owner') {inner_task.user = this.$t('app.tasks.any_owner')}
              if (this.tasks[x][y][z][0].assignees == 'any-manager') {inner_task.user = this.$t('app.tasks.any_manager')}

            }

            else if (Array.isArray(this.tasks[x][y][z][0].assignees) && this.tasks[x][y][z][0].assignees.length>1) {
            inner_task.user = this.getUser(this.tasks[x][y][z][0].assignees[0]) + this.$t('app.tasks.or_others')
            }

            else {
            inner_task.user = this.getUser(this.tasks[x][y][z][0].assignees)
            }

            if (this.tasks[x][y][z].length ==1 && this.tasks[x][y][z].length <= 1){

              if (x == 'manufacturer' || x == 'package' || x == 'ship') {
                inner_task.sub_title = parseInt(this.tasks[x][y][z][0].taskName) + this.$t('app.tasks.products')
              }
              else {
              inner_task.sub_title = this.tasks[x][y][z][0].taskName
              }

            }

            else {

              if (x == 'clean') {inner_task.sub_title =  this.tasks[x][y][z].length + this.$t('app.tasks.things')}

              if (x == 'manufacturer') {inner_task.sub_title =  this.tasks[x][y][z].length + this.$t('app.tasks.products')}

              let quantity = 0

              if (x == 'manufacturer') {

                for (var n in this.tasks[x][y][z]) {

                  quantity+= this.tasks[x][y][z][n].quantity

                }

                inner_task.sub_title =  quantity + this.$t('app.tasks.products')

              }

              if (x == 'package') {inner_task.sub_title =  this.tasks[x][y][z].length + this.$t('app.tasks.orders')}
              if (x == 'ship') {inner_task.sub_title =  this.tasks[x][y][z].length + this.$t('app.tasks.orders')}
              if (x == 'manufacturer') {inner_task.sub_title =  this.tasks[x][y][z].length + this.$t('app.tasks.orders')}
              if (x == 'logtemp') {inner_task.sub_title = this.$t('app.tasks.for_x_devices').replace('%s',this.tasks[x][y][z].length)}
              if (x == 'others') {inner_task.sub_title = this.tasks[x][y][z].length + this.$t('app.tasks.things')}

            }

            inner_task.id = this.tasks[x][y][z][0].taskScheduleId
            inner_task.type = this.tasks[x][y][z][0].taskType
            inner_task.locationId = this.tasks[x][y][z][0].locationId
            inner_task.taskId = this.tasks[x][y][z][0].taskId
            inner_task.is_templog = (this.tasks[x][y][z][0].taskType == 'logtemp') ? true : false
            inner_task.is_package = (this.tasks[x][y][z][0].taskType == 'package') ? true : false
            inner_task.is_manufacturer = (this.tasks[x][y][z][0].taskType == 'manufacturer') ? true : false
            inner_task.is_ship = (this.tasks[x][y][z][0].taskType == 'ship') ? true : false
            inner_task.due_date = this.tasks[x][y][z][0].tasksScheduleByTime
            inner_task.assigner_id = this.tasks[x][y][z][0].assignerId
            inner_task.due_timestamp = this.tasks[x][y][z][0].tasksScheduleTime
            inner_task.location_name = location_name
            inner_task.taskDeviationFor = (this.tasks[x][y][z][0].taskDeviationFor) ? this.tasks[x][y][z][0].taskDeviationFor : null


            inner_task.sub_title += this.$t('app.tasks.in') + location_name

            if ((this.tasks[x][y][z][0].taskType == 'logtemp')) {
              inner_task.sub_title = inner_task.sub_title + ' ' + this.$t('app.tasks.to_log')
            }


            this.tasks_list.push(inner_task)
}

        }

      }


        this.tasks_list = array_sort(this.tasks_list,'due_timestamp')

    },

    reflectTasks (sleep) {
      this.$emit('reflectTasks',sleep)
    },
    logSubmit (task_schedule_id,temperature,index,task_name,type,hide,deviation_data) {

      if (index > -1 && hide){
      this.tasks_list.splice(index, 1)
    }
      this.$emit('logSubmit',task_schedule_id,temperature,index,task_name,type,deviation_data)
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
