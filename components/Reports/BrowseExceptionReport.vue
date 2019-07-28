<template>

  <div v-if="!isLoading" class="exception-internal">

    <div class="report__info--deviation-link" href="#" @click.prevent="showExceptionModal">
      {{$t('app.reports.open_deviation_report')}}
    </div>

    <ModalBody v-if="innerModal" z_index="20" footerType="none" :title="$t('app.reports.deviation_report')" footerText="Save" @close="closeModal">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}</p>
      </template>
      <template slot="modal-content">
        <div class="list-bar list-bar__report">
          <div class="list-bar__text-container">
            <h5 class="report__title">
              {{exception.name}}
            </h5>
            <p class="report__info">{{$t('app.reports.written_by')}} {{exception.user}}, {{exception.date}}</p>
            <br>
            <div>
              <h6 class="report__sub-title">{{$t('app.reports.what_happened_title')}}</h6>
              <p class="report__info">{{exception.deviation_description}}</p>
            </div>
            <br>
            <div class="report__info">
              <h6 class="report__sub-title">{{$t('app.reports.why_happened_title')}}</h6>
              <p class="report__info">{{exception.corrective_measures}}</p>
            </div>
            <br>
            <div class="report__info">
              <h6 class="report__sub-title">{{$t('app.reports.how_fixed_title')}}</h6>
              <p class="report__info">{{exception.how_solved}}</p>
            </div>
            <br>
            <div class="report__info">
              <h6 class="report__sub-title">{{$t('app.reports.reviewed_by')}}</h6>
              <p v-if="exception.reviewed_by" class="report__info">{{exception.reviewed_by}}</p>
              <p v-if="!exception.reviewed_by" class="report__info">{{$t('app.reports.not_yet')}}</p>
            </div>
            <br>
            <div class="report__info">
              <h6 class="report__sub-title">{{$t('app.reports.reviewed_by_comment')}}</h6>
              <p v-if="exception.reviewed_by" class="report__info">{{exception.reviewed_by_comment}}</p>
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

      this.mixpanelTrack('Click: Repors Page - Browse Exception Report Modal');

      console.log(this.deviation_review);
      await API.get("metamat", "/exceptions/" + this.exception_id).then((exception) => {
        this.exception = exception

        this.exception.date = this.formatTimeStampTime(exception.createdAt)

        this.exception.user = this.getUser(exception.user_id)
        if (this.deviation_review) {
          console.log(this.deviation_review);
        this.exception.reviewed_by = this.getUser(this.deviation_review.taksLoggerId)
        this.exception.reviewed_by_comment = this.deviation_review.logData
      }

     })
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
