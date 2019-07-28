<template>

  <div class="exception">

    <a href="#" @click.prevent="showExceptionModal">
      <icon name="file-o" scale="1"></icon>
    </a>

    <div v-if="innerModal" class="inner-modal modal-body">
      <a class="close" href = "#" @click.prevent="closeModal">
      <icon class="close" name="close" scale="1.2"></icon>
    </a>

    <h5 class="modal-title">{{$t('create_deviation_report')}} {{this.title}}</h5>

      <div>
    <b-form @submit="newExceptionSubmit">

      <b-form-group :label="$t('app.exceptions.deviation_description_label')" label-for="deviation_description">
        <b-form-textarea id="deviation_description"
           v-model="deviation_description"
           :placeholder="$t('app.exceptions.deviation_description_placeholder')"
           :rows="6"
           :max-rows="6">
  </b-form-textarea>
      </b-form-group>

      <b-form-group :label="$t('app.exceptions.corrective_measures_label')" label-for="corrective_measures">
        <b-form-textarea id="corrective_measures"
           v-model="corrective_measures"
           :placeholder="$t('app.exceptions.corrective_measures_placeholder')"
           :rows="6"
           :max-rows="6">
  </b-form-textarea>
      </b-form-group>


      <b-form-group :label="$t('app.exceptions.how_solved_label')" label-for="how_solved">
        <b-form-textarea id="how_solved"
           v-model="how_solved"
           :placeholder="$t('app.exceptions.how_solved_placeholder')"
           :rows="6"
           :max-rows="6">
  </b-form-textarea>
      </b-form-group>


      <b-button size="sm" variant="success" type="submit">
        {{ $t('app.general.save') }} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>


    </b-form>
  </div>

</div>

</div>
</template>

<script>
import {
  API
} from "aws-amplify";
import Icon from 'vue-awesome'

export default {

  components: {
    Icon
  },

  props: {
    parentId: {
      type: String,
      required:true
    },
    type: {
      type: String,
      required:false
    },
    temperature: {
      // type: Number,
      required:false
    },
    parentType: {
      type: String,
      required:true
    },
    locationId: {
      type: String,
      required:true
    },
  title: {
    type: String,
    required:false
  }
  },
  data () {
    return {
      innerModal: false,
      isLoading:false,
      deviation_description:'',
      corrective_measures :'',
      how_solved:'',
      modalTitle: this.$t('create_deviation_report')+ ' ' + this.title
    }
  },

methods: {

  closeModal() {
    this.innerModal = false
  },

  async newExceptionSubmit(event) {

    event.preventDefault();

    try {

      this.isLoading = true;

      let exception_data = await this.createException({
        parent_id: this.parentId,
        parent_type: this.parentType,
        location_id: this.locationId,
        deviation_description: this.deviation_description,
        corrective_measures: this.corrective_measures,
        how_solved:this.how_solved,
        name: this.title
      })



      await API.post("metamat", "/tasks/close", {
        body: {
          taskScheduleId:this.parentId,
          temperature: (this.temperature) ?  this.temperature :  '',
          status: (this.temperature) ?  'completed':  'closed',
          type:this.type,
          exception_id: exception_data.exception_id
        }
      })

      this.$notify.success(this.$t('exception_added'), 'success')

    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(this.$t('add_error'), 'success')
    }

    this.isLoading = false;
    this.innerModal = false
    this.deviation_description = ''
    this.corrective_measures = ''
    this.how_solved = ''


  },
  createException(exception) {
    return API.post("metamat", "/exceptions", {
      body: exception
    })

  },

  showExceptionModal(){
    this.innerModal = true
  }
}

}
</script>
