<template>

  <div v-if="!isLoading" class="exception-internal">

    <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    <div class="list-bar__click-overlay" @click.prevent="showExceptionModal"></div>
    
    <ModalBody
    v-if="innerModal"
    z_index="20"
    :footerType="footerType"
    :title="$t('app.reports.deviation_report')"
    footerText="Save"
    @clickedSave="submitTasks"
    @close="closeModal">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}</p>
      </template>
      <template slot="modal-content">

        <div v-if="is_deviation_author == 'no' || true" class="list-bar list-bar__task">

          <div class="list-bar__text-container">
            <h5 class="list-bar__title" >{{task_title}} {{task_sub_title}}</h5>
          </div>
        </div>


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
          </div>

        </div>

        <textarea  v-if="is_deviation_author == 'no' || true"
           class="list-bar input__text"
           v-model="deviation_comment"
           :placeholder="$t('app.exceptions.review_comment')"
           :rows="6"
           :max-rows="6">
        </textarea>
      </template>
    </ModalBody>

    <div v-if="false" class="inner-modal modal-body">
      <a class="close" href = "#" @click.prevent="closeModal">
      <icon class="close" name="close" scale="1.2"></icon>
    </a>

    <h5 class="modal-title">{{exception.name}}</h5>
    <div class="deviation-detail">
    <p class="edit-user-name">{{location_name}}, {{exception.user}}</p>
    <p class="edit-user-since">{{exception.date}}</p>
  </div>

      <div class="deviation-summary">

        <div>
          <h6>{{$t('app.reports.what_happened')}}</h6>
          <p>{{exception.deviation_description}}</p>
        </div>

        <div>
          <h6>{{$t('app.reports.why_happened')}}</h6>
          <p>{{exception.corrective_measures}}</p>
        </div>

        <div>
          <h6>{{$t('app.reports.how_fixed')}}</h6>
          <p>{{exception.how_solved}}</p>
        </div>

      </div>
</div>

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
    task_title: {
      type:String,
      required:false
    },
    task_sub_title: {
      type:String,
      required:false
    },
    task_id: {
      type:String,
      required:false
    },
    index: {
      type:String,
      required:false
    },
    is_deviation_author:{
      type:String,
      required:false
    },
    location_name: {
      type:String,
      required:false
    },
    users: {
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
      exception:{},
      deviation_comment:null,
      footerType:'none',
      selectedTasks:[]
    }
  },
  computed: {
    compoundProperty(){
      return [this.deviation_comment].join()
    }
  },
  watch: {
    compoundProperty: function() {

      if (this.deviation_comment != null) {

        this.footerType = 'save'
      }
      else {
        this.footerType = 'none'
      }
    },

  },
  created () {
    ;
    this.isLoading = false
  },
methods: {

  logSubmit (task_schedule_id,temperature,index,task_name,type,hide,deviation_data,log_data) {

    this.$emit('logSubmit',task_schedule_id,temperature,index,task_name,type,hide,deviation_data,log_data)
    this.closeModal()
  },

  submitTasks() {
    this.logSubmit(this.task_id,null,this.index,this.task_title + ' ' + this.task_sub_title,'deviation_review',true,null,this.deviation_comment)

  },
  closeModal() {
    this.innerModal = false
  },
    async showExceptionModal(){
      await API.get("metamat", "/exceptions/" + this.exception_id).then((exception) => {
        this.exception = exception


        this.exception.date = this.formatTimeStampTime(exception.createdAt)

        this.exception.user = this.getUser(exception.user_id)

     })
    this.innerModal = true


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
