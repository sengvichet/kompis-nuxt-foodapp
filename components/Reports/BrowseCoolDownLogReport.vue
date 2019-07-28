<template>

  <div v-if="!isLoading" class="exception-internal">

    <div class="report__info--deviation-link" href="#" @click.prevent="showExceptionModal">
      {{$t('app.reports.open_cooldown_report')}}
    </div>

    <ModalBody v-if="innerModal" z_index="20" footerType="none" :title="$t('app.reports.deviation_report')" footerText="Save" @close="closeModal">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}</p>
      </template>
      <template slot="modal-content">


        <div class="list-bar">

          <h5 class="list-bar__title">{{report.name}}</h5>

      </div>


      <div v-for="(ingredient,index) in report.logData.ingredients" class="list-bar"
     :class="{'list-bar': true}">
   <div v-if="true" class="list-bar__log-item">
     <img class="list-bar__log-item--image" :src="ingredient.image_url" />
   </div>
   <div v-if="true" class="list-bar__log-item--spacer">
     <!-- this is just here to move the text over. A refactor of list-bar.scss to not have padding on outer div is required to use WarningFlag component.  -->
   </div>

   <div class="list-bar__text-container"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
     <p class="list-bar__sub-heading">{{ingredient.patch_number}}</p>
   </div>


 </div>

        <div class="list-bar list-bar__report">

          <div class="list-bar__text-container">


            <h5 class="report__title">
              {{exception.name}}
            </h5>
            <p class="report__info">{{$t('app.reports.written_by')}} {{report.user}}, {{report.date}}</p>
            <br>


            <div v-if="report.logData.firstReading" class="report__info">
              <h6 class="report__sub-title">First Reading</h6>
              <p class="report__info">{{report.logData.firstReading}} &deg;</p>
              <br>
            </div>

            <div v-if="report.cooldown_log" class="report__info">
              <h6 class="report__sub-title">Second Reading</h6>
              <p class="report__info">{{report.cooldown_log[0].logged_data}} &deg;</p>
              <br>
            </div>


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
import ModalBody from '~/components/modals/ModalBody.vue'
export default {

  components: {
    Icon,
    ModalBody
  },

  props: {
    exception_id: {
      type:String,
      required:false
    },
    location_name: {
      type:String,
      required:false
    },
    deviation_review:{
      type:Object,
      required:false
    },
    report:{
      type:Object,
      required:false
    },
    users_list: {
      type:Array,
      required: false,
    },
    zIndex: {
      type: String,
      required: false,
      default: '2'
    }
  },
  data () {
    return {
      innerModal: false,
      isLoading:true,
      exception:{}
    }
  },
  created () {
    console.log(this.show_text);
    this.isLoading = false
  },
methods: {

  closeModal() {
    this.innerModal = false
  },
    async showExceptionModal(){

      this.mixpanelTrack('Click: Repors Page - Browse CoolDown Log Report Modal');


    this.innerModal = true


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

    return first_name + ' ' + last_name

  }
}

}
</script>
