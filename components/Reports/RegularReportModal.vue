<template>

  <div   class="list-bar__arrow">
    <!-- <a class="list-bar__click-overlay" href="#" @click="showReport"/> -->
    <a class="list-bar__click-overlay" href="#" @click="showPopup"/>

    <div>
      <img class="list-bar__arrow" :class="{ 'list-bar--deviation': this.containsDeviation }" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>


    <ModalBody v-if="showModal" footerType="none" z_index="1" :title="modal_title" footerText="Save" @clickedSave="test" @close="closePopup">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}, <span class="moose__header-info__date">{{report_date}}</span></p>
      </template>
      <template slot="modal-content">

        <div v-for="(report,index) in reports_list" class="list-bar list-bar__report" :class="{ 'list-bar--deviation': report.has_exception }">
          <div class="list-bar__text-container">
            <p class="report__title" :class="{ 'report__title--deviation': report.has_exception }">
              {{report.name}}
            </p>
            <p v-if="!report.has_exception" class="report__info">{{report.user}}, {{$t('app.reports.logged_at')}} {{report.date}}</p>


            <div v-if ="report.has_exception">
              <p class="report__info--deviation">{{$t('app.reports.was_not_completed')}}</p>
              <br>
              <BrowseExceptionReport v-if = "report.has_exception"
              :exception_id="report.deviation_log.exception_id"
              :deviation_review="report.deviation_review"
              :location_name="location_name"
              :users_list="users"
               />
            </div>

            <div v-if ="report.type == 'delivery'">
              <br>
              <BrowseDeliveryLogReport
              :report="report"
              :location_name="location_name"
              :users_list="users"
               />
            </div>

            <div v-if ="report.type == 'cooldown'">
              <br>
              <BrowseCoolDownLogReport
              :report="report"
              :location_name="location_name"
              :users_list="users"
               />
            </div>

            <div v-if ="report.type == 'keepwarming'">
              <br>
              <BrowseKeepWarmingLogReport
              :report="report"
              :location_name="location_name"
              :users_list="users"
               />
            </div>

            <div v-if ="report.type == 'manufacturer' || report.type == 'ship' || report.type == 'package'">
              <br>
              <BrowseOrdersReport
              :report="report"
              :location_name="location_name"
              :users_list="users"
               />
            </div>


          </div>
          <div class="list-bar__icon">
            <img v-if="!report.has_exception" src="~/assets/images/icons/Icon_Check.svg" alt="Check">
            <img v-if="report.has_exception" src="~/assets/images/icons/Icon_incomplete.svg" alt="Check">
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
import BrowseDeliveryLogReport from '~/components/Reports/BrowseDeliveryLogReport.vue'
import BrowseCoolDownLogReport from '~/components/Reports/BrowseCoolDownLogReport.vue'
import BrowseKeepWarmingLogReport from '~/components/Reports/BrowseKeepWarmingLogReport.vue'
import BrowseOrdersReport from '~/components/Reports/BrowseOrdersReport.vue'
import ModalBody from '~/components/modals/ModalBody.vue'


export default {

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
  components: {
    BrowseExceptionReport,
    ModalBody,
    BrowseDeliveryLogReport,
    BrowseCoolDownLogReport,
    BrowseKeepWarmingLogReport,
    BrowseOrdersReport
  },
  data () {
   return {
     reports_list:[],
     modal_title:'',
     showModal: false,
     containsDeviation: false
   }
 },

  created() {

    if (this.type == 'clean') {
      this.modal_title = this.$t('app.reports.cleaning_log')
    }
    else if  (this.type == 'manufacturer') {
      this.modal_title = this.$t('app.reports.manufacturer_log')
    }
    else if  (this.type == 'ship') {
      this.modal_title = this.$t('app.reports.ship_log')
    }
    else if  (this.type == 'package') {
      this.modal_title = this.$t('app.reports.package_log')
    }
    else if  (this.type == 'delivery') {
      this.modal_title = this.$t('app.reports.delivery')
    }
    else if  (this.type == 'cooldown') {
      this.modal_title = this.$t('app.reports.cooldown')
    }
    else if  (this.type == 'keepwarming') {
      this.modal_title = this.$t('app.reports.keepwarming')
    }
    else {
      this.modal_title = this.$t('app.reports.others_log')
    }


    for (var x in this.reports ) {

      this.reports_list.push({
        name : this.reports[x].name,
        exception_id: (this.reports[x].exception_id) ? this.reports[x].exception_id: '',
        deviation_log: this.reports[x].deviation_log,
        type: this.reports[x].task_type,
        warmkeeping_log: this.reports[x].warmkeeping_log,
        deviation_review:this.reports[x].deviation_review,
        cooldown_log: this.reports[x].cooldown_log,
        cartId: (this.reports[x].cartId) ? this.reports[x].cartId : null,
        has_exception: (this.reports[x].deviation_log) ? true : false,
        user: this.getUser(this.reports[x].logged_by),
        logData: (this.reports[x].logData) ? this.reports[x].logData : null,
        date: this.formatTimeStampTime(this.reports[x].logged_at)
      })
    }

    for (var r in this.reports_list){
      // this.containsDeviation = this.reports_list[r].has_exception ? true : false;
      console.log(this.reports_list[r].has_exception);
      if(this.reports_list[r].has_exception){
        this.containsDeviation = true;
      }
    }
    // console.log(this.containsDeviation);
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

      this.mixpanelTrack('Click: Reports Page - Report Summary Modal');

      this.showModal = true;
      this.$store.dispatch('lockBody');
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
