<template>

  <div>

    <img class="list-bar__arrow" src="~assets/images/icons/Icon_Close_X_Dark_Teal.svg" />
    <div class="list-bar__click-overlay" @click.prevent="showExceptionPopup"></div>

    <ModalBody v-if="showExceptionModal"
               :z_index="zIndex"
               :footerType="footer"
               :title="modalTitle"
               :footerText="$t('app.general.save')"
               @clickedSave="newExceptionSubmit"
               @close="closeExceptionPopup">

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="deviation_title"
              :placeholder="$t('app.exceptions.deviation_report_title')">
        </input>

        <textarea id="new_deviation_desc"
           class="list-bar input__text"
           v-model="deviation_description"
           :placeholder="$t('app.exceptions.deviation_description_placeholder')"
           :rows="6"
           :max-rows="6">
        </textarea>

        <textarea id="new_deviation_desc"
           class="list-bar input__text"
           v-model="corrective_measures"
           :placeholder="$t('app.exceptions.corrective_measures_placeholder')"
           :rows="6"
           :max-rows="6">
        </textarea>

        <textarea id="new_deviation_desc"
           class="list-bar input__text"
           v-model="how_solved"
           :placeholder="$t('app.exceptions.how_solved_placeholder')"
           :rows="6"
           :max-rows="6">
        </textarea>
     </template>
  </ModalBody>
    <!-- <b-modal ref="ExceptionModal" hide-footer centered no-close-on-backdrop no-close-on-esc	no-enforce-focus	:title="modalTitle">

      <div>
    <b-form @submit="newExceptionSubmit">

      <b-form-group :label="$t('app.exceptions.deviation_report_title')">

       <b-form-input
                type="text"
                v-model="name"
                :placeholder="$t('app.exceptions.deviation_report_title')">
        </b-form-input>
     </b-form-group>

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
           placeholder="$t('app.exceptions.how_solved_placeholder')"
           :rows="6"
           :max-rows="6">
  </b-form-textarea>
      </b-form-group>


      <b-button size="sm" variant="success" type="submit">
        {{ $t('app.general.save') }} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>


    </b-form>
  </div>
    </b-modal> -->

</div>
</template>

<script>
import {
  API
} from "aws-amplify";

import ModalBody from '~/components/modals/ModalBody.vue'

export default {

  components: {
    ModalBody
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
      type: String,
      required:false
    },
    parentType: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required:false
    },
    is_deviation_log_task: {
      type:String,
      required:true
    },
    locationId: {
      type: String,
      required:true
    },
    taskDeviationFor: {
      type:String,
      required:false
    },
    title: {
      type: String,
      required:false
    },
    zIndex: {
      type: Number,
      default: 3,
      required: false
    }
  },
  data () {
    return {
      isLoading: false,
      showExceptionModal: false,
      footer: 'none',
      deviation_description:'',
      corrective_measures :'',
      deviation_title: this.title,
      how_solved:'',
      modalTitle: this.$t('app.exceptions.create_deviation_report') + ': '+ this.title
    }
  },

  computed: {
     compoundProperty(){
       return [
         this.deviation_description,
         this.corrective_measures,
         this.deviation_title,
         this.how_solved
       ].join()
     }
   },

  watch: {
     compoundProperty: function() {
       if (this.deviation_description &&
           this.corrective_measures &&
           this.deviation_title &&
           this.how_solved
         ){
           this.footer = 'save'

         } else {
           this.footer = 'none'
         }
      }
   },

  methods: {
    async newExceptionSubmit(event) {
      try {

        this.isLoading = true;


        let exception_data = await this.createException({
          parent_id: this.parentId,
          location_id: this.locationId,
          parent_type: this.parentType,
          name: this.deviation_title,
          deviation_description: this.deviation_description,
          corrective_measures: this.corrective_measures,
          how_solved:this.how_solved
        });

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();


        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        if (this.is_deviation_log_task == 'no'){

        let new_log_task =   await API.post("metamat", "/tasks", {
              body: {
                assignees:[this.$store.getters.user.userInfo.username] ,
                taskName:this.deviation_title,
                taskType:'deviation_log',
                taskDesc:null,
                taskRepeat:'never',
                locationId:this.locationId,
                taskDates:[yyyy+'-'+mm+'-'+dd],
                taskTime:null,
                taskDeviationFor:this.parentId
              }
            });

            let new_log_task_id = new_log_task.taskId
            let new_log_schedule_id = null

            while (new_log_schedule_id == null) {
            await API.get("metamat", "/tasks/schedules/"+new_log_task_id).then(async (schedules) => {
              if (schedules) {
                new_log_schedule_id = schedules.taskScheduleId
              }
            })
            this.sleep(1000)
          }
                  await API.post("metamat", "/tasks/close", {
                    body: {
                      taskScheduleId:new_log_schedule_id,
                      temperature: null,
                      status:'closed',
                      type:'deviation_log',
                      exception_id: exception_data.exception_id,
                      taskDeviationFor:this.parentId
                    }
                  })

                  await API.post("metamat", "/tasks/close", {
                    body: {
                      taskScheduleId:this.parentId,
                      temperature: null,
                      status:'closed',
                      type:this.type,
                      exception_id: exception_data.exception_id
                    }
                  })


                  await API.post("metamat", "/tasks", {
                      body: {
                        assignees:'any-manager',
                        taskName: this.deviation_title,
                        taskType:'deviation_review' ,
                        taskDesc: null,
                        taskRepeat:'never',
                        locationId:this.locationId,
                        taskDates:[yyyy+'-'+mm+'-'+dd],
                        taskTime:null,
                        taskDeviationFor : this.parentId,
                        TaskexceptionId: exception_data.exception_id
                      }
                    });
        }
        else {

          await API.post("metamat", "/tasks/close", {
            body: {
              taskScheduleId:this.parentId,
              temperature: null,
              status:'closed',
              type:'deviation_log',
              exception_id: exception_data.exception_id,
              taskDeviationFor:this.taskDeviationFor
            }
          })


      await API.post("metamat", "/tasks", {
          body: {
            assignees:'any-manager',
            taskName: this.deviation_title,
            taskType:'deviation_review' ,
            taskDesc: null,
            taskRepeat:'never',
            locationId:this.locationId,
            taskDates:[yyyy+'-'+mm+'-'+dd],
            taskTime:null,
            taskDeviationFor : this.taskDeviationFor,
            TaskexceptionId: exception_data.exception_id
          }
        });
      }

        this.$notify.success(this.$t('app.exceptions.exception_added'), 'success')
        this.$emit('reflectTasks')
      } catch (e) {
        bugsnagClient.notify(e)
        this.closeExceptionPopup();
        this.$notify.error(this.$t('add_error'), 'success')
      }
      this.isLoading = false;
      // this.$refs.ExceptionModal.hide()
      this.closeExceptionPopup();
      this.deviation_description = ''
      this.corrective_measures = ''
      this.how_solved = ''
    },
    createException(exception) {
      return API.post("metamat", "/exceptions", {
        body: exception
      });
    },

    showExceptionPopup(){
      // this.$refs.ExceptionModal.show()
      this.$store.dispatch('lockBody');
      this.showExceptionModal = true;
    },

    async closeExceptionPopup(){
      this.$store.dispatch('freeBody');
      this.showExceptionModal = false;
    },

        sleep(milliseconds) {
          var start = new Date().getTime();
          for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
              break;
            }
          }
        },
  }
}
</script>
