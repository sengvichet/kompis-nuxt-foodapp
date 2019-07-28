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

          <AddFilterModal
            v-if="!isLoading"
            :filter_types="filterTypes"
            :filter_data="{taskTypes,Locations,CompletedByList,Deviations}"
            @add_filter="addFilter($event, todayFilters)"/>

            <div class="u-margin-bottom-big">

            <p v-if="todayFilters.length>0" class="app-ui-overlay__section-title">{{ $t('app.orders.filters') }}</p>

            <div v-if="todayFilters.length>0" class="filter-container u-margin-bottom-default" >
              <FilterBar v-for="(filter, index) in todayFilters"
                         index="index"
                         @remove="removeFilter(todayFilters, index)"
                         :type="filter.type.text"
                         :value="filter.value.text"/>
            </div>
          </div>

          <div>
            <div v-if="isLoading" class="app-ui-overlay__centered-column">
              <LoadingAnimation/>
            </div>
            <p class="center" v-if="!this.today_reports && !isLoading">{{$t('app.reports.no_reports_today')}}</p>
            <ReportGroup
            v-if="!isLoading && this.today_reports"
            :reports_prop="today_reports"
            :objects="objects"
            :users = "usersList"
             />
        </div>
  </div>
  <div v-if="currentTab == 'week' && !isLoading">

          <AddFilterModal
            v-if="!isLoading"
            :filter_types="filterTypes"
            :filter_data="{taskTypes,Locations,CompletedByList,Deviations}"
            @add_filter="addFilter($event, weekFilters)"/>

            <div class="u-margin-bottom-big">

            <p v-if="weekFilters.length>0" class="app-ui-overlay__section-title">{{ $t('app.orders.filters') }}</p>

            <div v-if="weekFilters.length>0" class="filter-container u-margin-bottom-default" >
              <FilterBar v-for="(filter, index) in weekFilters"
                         index="index"
                         @remove="removeFilter(weekFilters, index)"
                         :type="filter.type.text"
                         :value="filter.value.text"/>
            </div>
          </div>

          <div>
            <div v-if="isLoading" class="app-ui-overlay__centered-column">
              <LoadingAnimation/>
            </div>
            <p class="center" v-if="!this.week_reports && !isLoading">{{$t('app.reports.no_reports_this_week')}}</p>
            <!-- <p v-if="this.week_reports.length < 1">No reports this week</p> -->

            <ReportGroup
            v-if="!isLoading && this.week_reports"
            :reports_prop="week_reports"
            :objects="objects"
            :users = "usersList"
             />

        </div>
  </div>
  <div v-if="currentTab == 'all' && !isLoading">
    <div class="app-ui-overlay__centered-column">
    <div class="list-bar--inline-items u-margin-bottom-big">
      <Datepicker class="list-bar input__selector--narrow" @input="listReports('all')" name="filter_date_from"  :value="reportsFromDate" v-model="reportsFromDate">{{ reportsFromDate }}</Datepicker>
      <img class="u-margin-right-default u-margin-left-default"
           src="~assets/images/icons/Icon_Right_Arrow_White_Large.svg"
           alt="to">
      <Datepicker class="list-bar input__selector--narrow--right" @input="listReports('all')" name="filter_date_to"  :value="reportsToDate" v-model="reportsToDate">{{ reportsToDate }}</Datepicker>
    </div>

    </div>


          <AddFilterModal
            v-if="!isLoading"
            :filter_types="filterTypes"
            :filter_data="{taskTypes,Locations,CompletedByList,Deviations}"
            @add_filter="addFilter($event, allDaysFilters)"/>

            <div class="u-margin-bottom-big">

            <p v-if="allDaysFilters.length>0" class="app-ui-overlay__section-title">{{ $t('app.orders.filters') }}</p>

            <div v-if="allDaysFilters.length>0" class="filter-container u-margin-bottom-default" >
              <FilterBar v-for="(filter, index) in allDaysFilters"
                         index="index"
                         @remove="removeFilter(allDaysFilters, index)"
                         :type="filter.type.text"
                         :value="filter.value.text"/>
            </div>
          </div>


    <div>
      <div class="u-margin-bottom-big">
        <!-- just to give the calendar button some space -->
      </div>

      <div v-if="isLoading" class="app-ui-overlay__centered-column">
        <LoadingAnimation/>
      </div>
      <p class="center" v-if="!this.all_reports && !isLoading">{{$t('app.reports.no_reports_yet')}}</p>
      <ReportGroup
      ref="AllReports"
      v-if="!isLoading && this.all_reports"
      :reports_prop="all_reports"
      :objects="objects"
      :users = "usersList"
      />
  </div>

  </div>
  </div>
  </div>

</div>

</template>


<script>

import { API } from "aws-amplify";
import find from "array-find"
import ReportGroup from '~/components/Reports/ReportGroup.vue'
import ReportsFilter from '~/components/Reports/ReportsFilter.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import FilterBar from '~/components/General/FilterBar.vue'
import AddFilterModal from '~/components/Filters/AddFilterModal.vue'
import Datepicker from 'vuejs-datepicker';
import Tabs from 'vue-tabs-with-active-line';



export default {

  components: {
    ReportGroup,
    ReportsFilter,
    LoadingAnimation,
    AddFilterModal,
    FilterBar,
    Datepicker,
    Tabs
  },
  data() {
    return {
      tabs:[{
        title: this.$t('app.reports.todays_reports'),
        value: 'today',
      }, {
        title: this.$t('app.reports.this_weeK_reports'),
        value: 'week',
      },
      {
        title: this.$t('app.reports.all_reports'),
        value: 'all',
      }
      ],
      currentTab: 'today',
      isLoading:true,
      today_reports: {},
      week_reports: {},
      all_reports: [],
      temp_all_reports: {},
      reportsFromDate:null,
      reportsToDate: null,
      objects: [],
      usersList: [],
      filterTypes: [
        {value: 'taskTypes', text: this.$t('app.reports.filters.task_types')},
        {value: 'Locations', text: this.$t('app.reports.filters.locations')},
        {value: 'CompletedByList', text: this.$t('app.reports.filters.users')},
        {value: 'Deviations', text: this.$t('app.reports.filters.deviations')},
      ],
      taskTypes: [
        { value: null, text: this.$t('app.tasks.task_types.select') },
        { value: 'clean', text: this.$t('app.tasks.task_types.clean') },
        { value: 'logtemp', text: this.$t('app.tasks.task_types.logtemp') },
        { value: 'others', text: this.$t('app.tasks.task_types.others') },
        { value: 'delivery', text: this.$t('app.logs.delivery.name') },
        { value: 'cooldown', text: this.$t('app.logs.cooldown.name') },
        { value: 'warmkeeping', text: this.$t('app.logs.warmkeeping.name') },
        { value: 'manufacturer', text: this.$t('app.tasks.prefix_manufacturer') },
        { value: 'package', text: this.$t('app.tasks.prefix_package') },
        { value: 'ship', text: this.$t('app.tasks.prefix_ship') }
      ],
      Locations:[],
      CompletedByList:[],
      Deviations: [
        { value: 'yes', text:'Yes'},
        { value: 'no', text:'No'},
      ],
      todayFilters: [],
      weekFilters: [],
      allDaysFilters: [],
    }
  },
  watch: {
    todayFilters: function (val) {
      this.listReports('today')
    },
    weekFilters: function (val) {
      this.listReports('week')
    },
    allDaysFilters: function (val) {
      this.listReports('all')
    }

  },

  async created() {

    this.mixpanelTrack('Page View: Reports Page');

      try {

        this.isLoading = true

        let date = new Date(), y = date.getFullYear(), m = date.getMonth();
         this.reportsFromDate = new Date(y, m, 1).getTime();
         this.reportsToDate = new Date(y, m + 1, 0).getTime();


        await API.get("metamat", "/users").then((users) => {
          this.usersList = users
        })

        //this.isLoading = false
        await this.listAssets();

        for (var x in this.assets) {
          this.Locations.push({
            text:this.assets[x].objectName,
            value:this.assets[x].objectId
          })
        }

      //  await this.listUsers();

        for (var x in this.usersList) {

            let value  = this.usersList[x].Username
            let text  = ''
            let first_name = ''
            let last_name  = ''
            for (var z in this.usersList[x].Attributes) {


              if (this.usersList[x].Attributes[z].Name == 'custom:first_name') {
                first_name = this.usersList[x].Attributes[z].Value
              }
              if (this.usersList[x].Attributes[z].Name == 'custom:last_name') {
                last_name = this.usersList[x].Attributes[z].Value
              }

              text = first_name + ' ' + last_name

            }
            this.CompletedByList.push({text:text,value:value})
        }

        await this.listReports('today');

        this.isLoading = false

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(e.message, 'success')
      }
    },


  methods : {

    async handleClick(newTab) {

      this.mixpanelTrack('Tab Click: Reports Page - '+newTab);
      this.isLoading = true
      await this.listReports(newTab);
      this.$nextTick(() => {
      this.currentTab = newTab;
      });
      this.isLoading = false;
    },

    async listReports(mode) {

      this.isLoading = true

      let filters = {}

      if (mode == 'today') {
        filters = this.todayFilters
      }
      if (mode == 'week') {
        filters = this.weekFilters
      }
      if (mode == 'all') {
        filters = this.allDaysFilters
      }

      await API.post("metamat", "/reports",{
        body:{
          mode:mode,
          filters: {
            from: new Date(this.reportsFromDate).setHours(0,0,0),
            to: new Date(this.reportsToDate).setHours(23,59,59),
            filters:filters
          }
        }
      }).then((reports) => {

        this.objects = reports.objects
        this.today_reports = reports.today_week_reports.today
        this.week_reports = reports.today_week_reports.week
        this.all_reports = reports.all_reports
        this.isLoading = false

      })

    },


    async dateSelected (date){

      await this.listReports()

      for (var x in this.all_reports) {
        for (var y in this.all_reports[x]){
          for(var z in this.all_reports[x][y])

          if (z != date ){

              delete this.all_reports[x][y][z]

          }

        }
      }

      this.$refs.AllReports.buildReportList(this.all_reports)


    },
    addFilter(filter, filterArray){

      this.mixpanelTrack('Filter Add: Reports Page - ' + filter.type.text);

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
  }

}

</script>
