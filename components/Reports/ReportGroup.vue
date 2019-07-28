<template>
  <div>
    <div v-for="(report,index) in reports_list" class="list-bar" :class="{ 'list-bar__task--overdue': report.deviation }">
      <div class="list-bar__link">
        <div v-if="report.deviation" class="list-bar__warning-flag">
          <p class="list-bar__warning-flag__content">!</p>

        </div>
        <div v-if="report.deviation" class="list-bar__warning-flag--spacer">
          <!-- this is just here to move the text over. need to refactor list-bar css to not have padding on outer div, and then use WarningFlag component.  -->
        </div>

        <!-- <WarningFlag show="report.deviation"/> -->
        <div class="list-bar__text-container">
          <h5 class="list-bar__title" :class="{ 'list-bar__title--warning': report.deviation }">{{report.title}} <span> in {{report.sub_title}}</span></h5>
          <p class="list-bar__sub-heading">{{report.user}} <span class="list-bar__info"> {{report.date}}</span></p>
          <!-- {{ report.deviation }} -->
          <!-- <p v-if="report.type == 'clean' || report.type == 'others'"> {{ report.reports[4] }} </p> -->
        </div>

        <RegularReportModal
          v-if="
          report.type == 'clean' ||
          report.type == 'others' ||
          report.type == 'manufacturer' ||
          report.type == 'ship' ||
          report.type == 'package' ||
          report.type == 'cooldown' ||
          report.type == 'delivery' ||
          report.type == 'keepwarming'
          "
          :ref="'x'+index"
          :reports="report.reports"
          :location_name="report.sub_title"
          :report_date="report.date"
          :users="users"
          :type="report.type"
        />

        <LogTempReportModal
          v-if="report.type == 'logtemp'"
          :ref="'x'+index"
          :reports="report.reports"
          :location_name="report.sub_title"
          :report_date="report.date"
          :users="users"
          :type="report.type"
        />
      </div>
    </div>
  </div>
</template>
<script>

import array_sort from "array-sort"
import unique from '@arr/unique';
import RegularReportModal from '~/components/Reports/RegularReportModal.vue'
import LogTempReportModal from '~/components/Reports/LogTempReportModal.vue'


import {
  API
} from "aws-amplify"

export default {

  components: {
    RegularReportModal,
    LogTempReportModal

  },

  props: {
    reports_prop:{
      type:Array,
      required:true
    },
    objects:{
      type:Array,
      required:false
    },
    users:{
      type:Array,
      required:false
    }
  },

  data() {
    return {
      reports_list:[],
      reports: [],
      location_name: "",
      report_date: "",
      //users: [],
      type: [],
    }
  },

  created() {
    console.log(this.reports_prop);
    this.buildReportList(this.reports_prop)

  },
  methods: {
    buildReportList (reports){
      if(process.env.stage === 'dev'){
        console.log(reports);
      }
      this.reports_list  = []
      for (var x in reports) {
        for (var y in reports[x]) {
          for (var z in reports[x][y]){

            let location_name = ''
            for (var k in this.objects) {
                if (this.objects[k]) {
                if (y == this.objects[k].objectId) {
                  location_name = this.objects[k].objectName
                }
              }
            }

            let user_ids = []

            for (var k in reports[x][y][z]) {
              user_ids.push(reports[x][y][z][k].logged_by)
            }

            user_ids = unique(user_ids)
            let user =  this.getUser(user_ids[0])

            if (user_ids.length > 1 ){
            user = user + this.$t('app.reports.and_x_others').replace('%s',(user_ids.length - 1 ))
            }

            let title = ''
            let hasDeviation = false;

            for (var j in reports[x][y][z]){

              if (x == 'clean') {
                title = this.$t('app.reports.cleaning')
                if(reports[x][y][z][j].deviation_log){
                  hasDeviation = true;
                }
              }
              if (x == 'manufacturer') {
                title = this.$t('app.reports.manufacturing')
              }
              if (x == 'ship') {
                title = this.$t('app.reports.shipping')
              }
              if (x == 'package') {
                title = this.$t('app.reports.packaging')
              }
              if (x == 'logtemp') {
                title = this.$t('app.reports.temperature_log')
                if(process.env.stage === 'dev'){ console.log('this is a templog', reports[x][y][z][j].logged_data); }

                if(reports[x][y][z][j].device_type === 'refrigerator'){
                  if(reports[x][y][z][j].logged_data > 4 || reports[x][y][z][j].logged_data < 0){
                    hasDeviation = true;
                    if(process.env.stage === 'dev'){ console.log('refridgerator deviation'); }
                  }
                }

                if(reports[x][y][z][j].device_type === 'freezer'){
                  if(reports[x][y][z][j].logged_data > -18){
                    hasDeviation = true;
                    if(process.env.stage === 'dev'){ console.log('freezer deviation'); }
                  }
                }
                if(reports[x][y][z][j].device_type === 'dishwasher'){
                  if(reports[x][y][z][j].logged_data < 65){
                    hasDeviation = true;
                    if(process.env.stage === 'dev'){ console.log('dishwasher deviation'); }
                  }
                }
                if(process.env.stage === 'dev'){
                  console.log(reports[x][y][z][j].device_type, reports[x][y][z][j].device_name, reports[x][y][z][j].logged_data);
                }
              }

              if (x == 'others') {
                title = this.$t('app.reports.other_things')
                if(reports[x][y][z][j].deviation_log){
                  hasDeviation = true;
                }
              }

              if (x == 'deviation') {
                title = this.$t('app.reports.deviations')
              }
              if (x == 'delivery') {
                title = this.$t('app.reports.delivery')
                if(reports[x][y][z][j].deviation_log){
                  hasDeviation = true;
                }
              }
              if (x == 'cooldown') {
                title = this.$t('app.reports.cooldown')
                if(reports[x][y][z][j].deviation_log){
                  hasDeviation = true;
                }
              }
              if (x == 'keepwarming') {
                title = this.$t('app.reports.keepwarming')
                if(reports[x][y][z][j].deviation_log){
                  hasDeviation = true;
                }
              }

            }
            this.reports_list.push({
              type:x,
              title:title,
              deviation: hasDeviation,
              user:user,
              sub_title:location_name,
              location_id:y,
              date:z,
              reports:reports[x][y][z]
            })
          }
        }
      }
      // console.log(this.reports_list);
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

    async showTheReport(index) {
      // console.log(this.$refs.x0);
      //let modal_name = 'x'+index
        this.$refs.x0.showReport();
      }
    }
  }

</script>
