<template>
  <div>
    <a class="list-bar__click-overlay"
       href="#"
       @click="showPopup"
    />

    <div class="list-bar__arrow">
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <ModalBody v-if="showModal" z_index="1" footerType="none" :title="modal_title" footerText="Save" @clickedSave="test" @close="closePopup">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}, <span class="moose__header-info__date">{{report_date}}</span></p>
      </template>
      <template slot="modal-content">

        <div v-for="(report,index) in reports_list" class="list-bar list-bar__report" :class="{ 'list-bar--warning': report.has_exception }">
          <div class="list-bar__text-container">
            <p class="report__title" :class="{ 'report__title--deviation': report.has_exception }">
              {{report.name}}
            </p>
            <!-- {{report}} -->
            <p class="report__info">{{report.user}}, {{$t('app.reports.logged_at')}} {{report.date}}</p>
            <!-- <p v-if="!report.has_exception" class="report__info">{{report.user}}, {{$t('app.reports.logged_at')}} {{report.date}}</p> -->
            <!-- <p>{{ report }}</p> -->
            <BrowseExceptionReport v-if = "report.deviation_log"
            :exception_id="report.deviation_log.exception_id"
            :deviation_review="report.deviation_review"
            :location_name="location_name"
            :users_list="users"
             />

            <!-- v-if="report.exception_id" add new exception modal here based on whether it has one already -->

          </div>
          <div class="list-bar__temperature">
            <p :class="{'list-bar__temperature--deviation': report.has_exception}">{{report.temp}} &deg;</p>
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
import BrowseExceptionReport from '~/components/Reports/BrowseExceptionReport.vue'
import ModalBody from '~/components/modals/ModalBody.vue'

export default {
  components: {
    BrowseExceptionReport,
    ModalBody
  },
  props : {
  users: {
    type:Array
  },
  reports : {
    type: Array
  },
  location_name : {
    type: String
  },
  report_date : {
    type: String
  },
  type : {
    type: String
  }
  },
  data () {
    return {
       reports_list:[],
       modal_title:this.$t('app.reports.temperature_log_report'),
       showModal: false
    }
  },

  created() {
    // console.log(this.reports);
    for (var x in this.reports ) {
      let hasDeviation = false;

        if(this.reports[x].device_type === 'refrigerator' &&
           (this.reports[x].logged_data > 4 || this.reports[x].logged_data < 0)){
          hasDeviation = true;
        }
        else if(this.reports[x].device_type === 'freezer' &&
           this.reports[x].logged_data > -18){
          hasDeviation = true;
        }
        else if(this.reports[x].device_type === 'dishwasher' &&
           this.reports[x].logged_data < 65){
          hasDeviation = true;
        }


      this.reports_list.push({
        name: this.reports[x].device_name,
        // type: this.reports[x].device_type,
        user: this.getUser(this.reports[x].logged_by),
        exception_id: (this.reports[x].exception_id) ? this.reports[x].exception_id : '',
        deviation_log: this.reports[x].deviation_log,
        deviation_review: this.reports[x].deviation_review,
        has_exception: hasDeviation,
        date: this.formatTimeStampTime(this.reports[x].logged_at),
        temp: this.reports[x].logged_data
      })
    }

  },

  methods : {

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

    async showPopup(){
      this.mixpanelTrack('Click: Repors Page - Temp Report Summary Modal');
      this.showModal = true;
      this.$store.dispatch('lockBody');
      if(process.env.stage === 'dev'){
        for (let x of this.reports_list){
        console.log('dev: ' + x.type);
        }
      }
    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },

    async test(event){
      console.log('clicked save: ' + event);
      this.closePopup();
    },

    showReport(){
      this.$refs.regularReport.show()
    }
  }
}

</script>
