<template>


  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewTaskModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal"
               z_index="2"
               :footerType="footer"
               :title="$t('app.tasks.create_new_task')"
               :footerText="footerText"
               @clickedSave="newItem"
               @clickedNext="nextStep"
               @clickedWarning="newItem"
               @close="closePopup">

      <template slot="modal-content">

        <div v-if="step == 2" class="list-bar list-bar--tall">
          <h2 class="list-bar__title--large">{{$t('app.tasks.task_type')}}</h2>
        </div>

        <select v-if="step == 2" v-model="selectedTaskType" id="newtasktype" class="list-bar input__selector" value="1">
          <!-- <option :value="null" selected> {{ $t('app.tasks.task_type') }} </option> -->
          <option v-for="type in taskTypes" :value="type.value"> {{type.text}} </option>
        </select>
<!--
########    ###     ######  ##    ##  ######
   ##      ## ##   ##    ## ##   ##  ##    ##
   ##     ##   ##  ##       ##  ##   ##
   ##    ##     ##  ######  #####     ######
   ##    #########       ## ##  ##         ##
   ##    ##     ## ##    ## ##   ##  ##    ##
   ##    ##     ##  ######  ##    ##  ######  -->

        <div v-if="
            selectedTaskType === 'others' ||
            selectedTaskType === 'clean' ||
            selectedTaskType === 'logtemp'
            ">

          <input class="list-bar input-text"
                type="text"
                v-model="task_title"
                :placeholder="$t('app.tasks.task_title')">
          </input>

          <textarea id="new_task_desc"
             class="list-bar input__text"
             v-model="task_desc"
             :placeholder="$t('app.tasks.task_description_placeholder')"
             :rows="3"
             :max-rows="3">
          </textarea>

          <select v-model="selectedLocation" @change="locationChanged" id="tasklocation" class="list-bar input__selector" value="1">
            <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
          </select>

          <select v-if="showUsersInput" v-model="selectedUser" id="taskuser" class="list-bar input__selector" value="1">
            <option v-for="user in users" :value="user.value"> {{user.text}} </option>
          </select>

          <select v-model="selectedRepeatType"  @change="repeatTypeChanged" id="taskrepeat" class="list-bar input__selector" value="1">
            <option v-for="repeatType in repeatTypes" :value="repeatType.value"> {{repeatType.text}} </option>
          </select>

          <div v-if="isMonthlyCalendar || isNeverCalendar || isWeeklyCalendar" class="list-bar">
            <MonthlyCalendar v-if="isMonthlyCalendar" @updateSelectedDays="updateSelectedDays" />
            <DailyCalendar v-if="isWeeklyCalendar"  @updateSelectedDays="updateSelectedDays" />
            <YearlyCalendar v-if="isNeverCalendar" @updateSelectedDays="updateSelectedDays"  />
          </div>

          <select v-if="isMonthlyCalendar || isDailyCalendar || isNeverCalendar || isWeeklyCalendar" v-model="selectedTime" id="tasktime" class="list-bar input__selector" value="1">
            <option v-for="time in times" :value="time.value"> {{time.text}} </option>
          </select>
        </div>

<!--
########  ########   #######   ######  ########  ######   ######  ########  ######
##     ## ##     ## ##     ## ##    ## ##       ##    ## ##    ## ##       ##    ##
##     ## ##     ## ##     ## ##       ##       ##       ##       ##       ##
########  ########  ##     ## ##       ######    ######   ######  ######    ######
##        ##   ##   ##     ## ##       ##             ##       ## ##             ##
##        ##    ##  ##     ## ##    ## ##       ##    ## ##    ## ##       ##    ##
##        ##     ##  #######   ######  ########  ######   ######  ########  ######  -->

        <div v-if="
            selectedTaskType === 'cooldown' ||
            selectedTaskType === 'warmkeeping' ||
            selectedTaskType === 'delivery'
            ">
            <div v-if="success && inProgress">
              <div v-if="step === 1">
                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">{{$t('app.logs.select_location')}}</h2>
                </div>
                <select v-model="newLogs.delivery.typeOfGoods"
                        id="itemtype"
                        class="list-bar input__selector"
                        value="1"
                        @change="changeTypeOfGoods">
                  <option v-for="type in goodsTypes" :value="type.value"> {{type.text}} </option>
                </select>
              </div>
            <!--
  ########  ######## ##       #### ##     ## ######## ########  ##    ##
  ##     ## ##       ##        ##  ##     ## ##       ##     ##  ##  ##
  ##     ## ##       ##        ##  ##     ## ##       ##     ##   ####
  ##     ## ######   ##        ##  ##     ## ######   ########     ##
  ##     ## ##       ##        ##   ##   ##  ##       ##   ##      ##
  ##     ## ##       ##        ##    ## ##   ##       ##    ##     ##
  ########  ######## ######## ####    ###    ######## ##     ##    ##    -->


            <div v-if="selectedTaskType === 'delivery'">
              <div v-if="step === 2" class="">

                <select v-model="processLocation" @change="locationChanged" id="tasklocation" class="list-bar input__selector" value="1">
                  <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
                </select>

                <input class="list-bar input-text"
                       type="text"
                       v-model="newLogs.delivery.senderName"
                       @input.lazy="inputChange"
                       :placeholder="this.$t('app.logs.delivery.senderNameDefault')"/>
                </input>

                <div class="list-bar--inline-items">
                  <input class="list-bar input-text"
                         type="text"
                         v-model="newLogs.delivery.ingredients[0].path_number"
                         @input.lazy="inputChange"
                         :placeholder="$t('app.logs.delivery.batchNo')"/>
                  </input>

                  <div v-if="!newLogs.delivery.ingredients[0].image_url"
                       class="inline-button inline-button--upload u-margin-left-default">
                    <input type="file"
                           id="product-thumbnail"
                           class="input__file"
                           name="product-thumbnail"
                           accept="image/png, image/jpeg, image/tiff, image/gif"
                           @change="onDeliveryFileChange" />
                  </div>
                </div>
                <div v-if="newLogs.delivery.ingredients[0].image_url"
                     class="list-bar list-bar__product-image list-bar__product-image--large"
                     :style="{'background-image': 'url(' + newLogs.delivery.ingredients[0].image_url + ')'}">

                  <div class="round-button round-button--edit-image">
                    <input type="file"
                           id="product-thumbnail"
                           class="input__file"
                           name="product-thumbnail"
                           accept="image/png, image/jpeg, image/tiff, image/gif"
                           @change="onDeliveryFileChange" />
                  </div>
                </div>
              </div>

              <div v-if="step === 3" class="">
                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">{{$t('app.logs.defaults.condition_query')}}</h2>
                </div>
                <YesOrNo @yes="nextStep" @no="fail"/>
              </div>

              <div v-if="step === 4" class="">
                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">{{$t('app.logs.delivery.messages.typeOfGoods')}}</h2>
                </div>
                <select v-model="newLogs.delivery.typeOfGoods"
                        id="itemtype"
                        class="list-bar input__selector"
                        value="1"
                        @change="changeTypeOfGoods">
                  <option v-for="type in goodsTypes" :value="type.value"> {{type.text}} </option>
                </select>
              </div>

              <div v-if="step === 5" class="">
                <!-- measure temp, is it above or below? -->
                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">
                    {{$t('app.logs.delivery.messages.measure_temp')}}
                  </h2>
                </div>
                <div class="list-bar u-flex-justify-center">
                  <MinusPlusField :max="newLogs.delivery.maxTemp"
                                  :value="newLogs.delivery.maxTemp"
                                  @updateValue="updateTemp"/>
                </div>
              </div>
            </div>
          </div>


          <!--
 ######   #######   #######  ##       ########   #######  ##      ## ##    ##
##    ## ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ###   ##
##       ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ####  ##
##       ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ## ## ##
##       ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ##  ####
##    ## ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ##   ###
 ######   #######   #######  ######## ########   #######   ###  ###  ##    ## -->

          <div v-if="currentLog === 'cooldown'">
            <div v-if="step === 2" class="">
              <div class="list-bar list-bar--tall">
                <h2 class="list-bar__title--large">{{$t('app.logs.cooldown.messages.name_items')}}</h2>
              </div>
              <input class="list-bar input-text"
                     type="text"
                     v-model="newLogs.cooldown.itemName"
                     @input.lazy="inputChange"
                     placeholder="Item Name"/>
              </input>

              <div v-for="(ingredient, index) in newLogs.cooldown.ingredients" >
                <div class="list-bar--inline-items">
                  <div v-if="newLogs.cooldown.ingredients.length > 1"
                          @click="newLogs.cooldown.ingredients.splice(index, 1)"
                          class="inline-button inline-button--delete u-margin-right-default">&nbsp;
                  </div>

                  <input class="list-bar input-text"
                         type="text"
                         v-model="newLogs.cooldown.ingredients[index].path_number"
                         @input.lazy="inputChange"
                         :placeholder="$t('app.logs.cooldown.batchNo')"/>
                  </input>

                  <div v-if="!newLogs.cooldown.ingredients[index].image_url"
                       class="inline-button inline-button--upload u-margin-left-default">
                    <input type="file"
                           id="product-thumbnail"
                           class="input__file"
                           name="product-thumbnail"
                           accept="image/png, image/jpeg, image/tiff, image/gif"
                           @change="onCooldownFileChange(index)" />
                  </div>
                </div>

                <div v-if="newLogs.cooldown.ingredients[index].image_url"
                     class="list-bar list-bar__product-image list-bar__product-image--large"
                     :style="{'background-image': 'url(' + newLogs.cooldown.ingredients[index].image_url + ')'}">

                  <div class="round-button round-button--edit-image">
                    <input type="file"
                           id="product-thumbnail"
                           class="input__file"
                           name="product-thumbnail"
                           accept="image/png, image/jpeg, image/tiff, image/gif"
                           @change="onCooldownFileChange(index)"/>
                  </div>
                </div>
              </div>
              <div class="app-ui-overlay__new-object">
                <div class="round-button" href="#" @click="addIngredient">
                  <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
                </div>
              </div>
            </div>
            <div v-if="step === 3" class="">
              <div class="list-bar list-bar--tall">
                <h2 class="list-bar__title--large">{{$t('app.logs.cooldown.messages.measure_temp')}}</h2>
              </div>
              <div class="list-bar u-flex-justify-center">
                <MinusPlusField :max="2000"
                                :value="85"
                                @updateValue="updateTemp"/>
              </div>
            </div>
          </div>



          <!--
          ######## #### ##    ## ####  ######  ##     ##
          ##        ##  ###   ##  ##  ##    ## ##     ##
          ##        ##  ####  ##  ##  ##       ##     ##
          ######    ##  ## ## ##  ##   ######  #########
          ##        ##  ##  ####  ##        ## ##     ##
          ##        ##  ##   ###  ##  ##    ## ##     ##
          ##       #### ##    ## ####  ######  ##     ##

          ##        #######   ######
          ##       ##     ## ##    ##
          ##       ##     ## ##
          ##       ##     ## ##   ####
          ##       ##     ## ##    ##
          ##       ##     ## ##    ##
          ########  #######   ######   -->


          <div v-if="success && !inProgress" class="">
            <!-- show fail alert and file deviation button -->
            <div class="list-bar list-bar--tall">
              <img src="~/assets/images/icons/Icon_Check.svg" alt="success" class="u-margin-bottom-big icon--large">
              <h2 class="list-bar__title list-bar__title--large list-bar__title">{{successMessage}}</h2>
            </div>
          </div>

          <div v-if="!success" class="">
            <!-- show fail alert and file deviation button -->
            <div class="list-bar list-bar--tall">
              <img src="~/assets/images/icons/Icon-Warning-Red.svg" alt="warning" class="u-margin-bottom-big">
              <h2 class="list-bar__title list-bar__title--large list-bar__title--warning">{{failMessage}}</h2>
            </div>
          </div>
        </div>
      </template>
    </ModalBody>
  </div>
</template>


<script>

import {
  API,
  Storage
} from "aws-amplify";

import Icon from 'vue-awesome'
import MonthlyCalendar from '~/components/General/MonthlyCalendar.vue'
import DailyCalendar from '~/components/General/DailyCalendar.vue'
import YearlyCalendar from '~/components/General/YearlyCalendar.vue'
import ModalBody from '~/components/modals/ModalBody.vue'
import YesOrNo from '~/components/general/YesOrNo.vue'
import MinusPlusField from '~/components/general/MinusPlusField.vue'

export default {

  components: {
    Icon,
    YesOrNo,
    MonthlyCalendar,
    DailyCalendar,
    YearlyCalendar,
    ModalBody,
    MinusPlusField
  },
  data () {
   return {
     isLoading: false,
     showModal: false,
     footer: 'none',
     footerText: this.$t('app.general.save'),
     isNeverCalendar: false,
     isDailyCalendar: false,
     isWeeklyCalendar: false,
     isMonthlyCalendar: false,
     showUsersInput: false,
     selectedTaskType: null,
     task_title: '',
     task_desc: null,
     selectedDates: [],
     all_users: [],
     taskTypes: [
       { value: null, text: this.$t('app.tasks.task_types.select') },
       { value: 'clean', text: this.$t('app.tasks.task_types.clean')},
       { value: 'logtemp', text: this.$t('app.tasks.task_types.logtemp')},
       { value: 'others', text: this.$t('app.tasks.task_types.others')},
       { value: 'delivery', text: this.$t('app.logs.delivery.name')},
       // { value: 'cooldown', text: this.$t('app.logs.cooldown.name')},
       // { value: 'warmkeeping', text: this.$t('app.logs.warmkeeping.name') }
     ],
     selectedLocation: null,
     locations: [],
     selectedUser: 'anyone',
     users: [],
     selectedRepeatType: null,
      repeatTypes: [
        { value: null, text: this.$t('app.tasks.repeat_type.select') },
        { value: 'never', text: this.$t('app.tasks.repeat_type.never')},
        { value: 'daily', text: this.$t('app.tasks.repeat_type.daily')},
        { value: 'weekly', text: this.$t('app.tasks.repeat_type.weekly') },
        { value: 'monthly', text: this.$t('app.tasks.repeat_type.monthly') }
      ],
      selectedTime:null,
    times: [
       { value: null, text: 'Select Time' },
       { value: '00:00:00', text: '00:00'},
       { value: '01:00:00', text: '01:00'},
       { value: '02:00:00', text: '02:00'},
       { value: '03:00:00', text: '03:00'},
       { value: '04:00:00', text: '04:00'},
       { value: '05:00:00', text: '05:00'},
       { value: '06:00:00', text: '06:00'},
       { value: '07:00:00', text: '07:00'},
       { value: '08:00:00', text: '08:00'},
       { value: '09:00:00', text: '09:00'},
       { value: '10:00:00', text: '10:00'},
       { value: '11:00:00', text: '11:00'},
       { value: '12:00:00', text: '12:00'},
       { value: '13:00:00', text: '13:00'},
       { value: '14:00:00', text: '14:00'},
       { value: '15:00:00', text: '15:00'},
       { value: '16:00:00', text: '16:00'},
       { value: '17:00:00', text: '17:00'},
       { value: '18:00:00', text: '18:00'},
       { value: '19:00:00', text: '19:00'},
       { value: '20:00:00', text: '20:00'},
       { value: '21:00:00', text: '21:00'},
       { value: '22:00:00', text: '22:00'},
       { value: '23:00:00', text: '23:00'}
    ],
    step: 2,
    success: true,
    inProgress: true,
    logTitle: this.$t('app.logs.defaults.name'),
    logTypes: [
      {
        value: null,
        text: this.$t('app.logs.defaults.type')
      },
      {
        value:'delivery',
        text: this.$t('app.logs.delivery.name')
      },
      {
        value:'cooldown',
        text: this.$t('app.logs.cooldown.name')
      },
      {
        value:'warmkeeping',
        text: this.$t('app.logs.warmkeeping.name')
      },
    ],
    currentLog: null,
    logs: [],
    goodsTypes: [
      {
        value: null,
        text: this.$t('app.logs.delivery.goodsTypes.default'),
      },
      {
        value: 'refrigerated',
        text: this.$t('app.logs.delivery.goodsTypes.refrigerated'),
      },
      {
        value: 'frozen',
        text: this.$t('app.logs.delivery.goodsTypes.frozen'),
      },
      {
        value: 'dry',
        text: this.$t('app.logs.delivery.goodsTypes.dry')
      }
    ],
    processLocation: null,
    newLogs:{
      // location: null,
      delivery: {
        locationsId: null,
        senderName: '',
        typeOfGoods: null,
        maxTemp: 4,
        ingredients:
        [
          {
            path_number: '',
            image_url : '', //https://placekitten.com/300/200
            picture: '',
            file:''
          }
        ],
        firstReading: 4,
        logStatus: 'good',
        logType: 'delivery'
      },
      cooldown: {
        locationsId: null,
        itemName: '',
        ingredients:
        [
          {
            path_number: '',
            image_url : '',
            file: ''
          }
          ],
        logType: 'cool'
      },
      warmkeeping: {
        locationsId: null,
        itemName: '',
        ingredients:
        [
          {
            path_number: '',
            image_url : '',
            file: ''
          }
          ],
        logType: 'heat'
      },
    },
    failMessage: '',
    successMessage: ''
    }
  },


  computed: {
    compoundProperty(){
      return [
        this.selectedUser,
        this.task_title,
        this.selectedTaskType,
        //this.task_desc,
        this.selectedRepeatType,
        this.selectedLocation,
        //this.selectedDates.length,
        this.selectedTime
      ].join()
    }
  },

  watch: {
    compoundProperty: function() {
      if (this.selectedUser &&
          this.task_title &&
          this.selectedTaskType &&
          //this.task_desc &&
          this.selectedRepeatType &&
          this.selectedLocation &&
          //this.selectedDates.length == 0 &&
          this.selectedTime
         ){
          this.footer = 'save'
        } else {
          this.footer = 'none'
        }
       // console.log('compoundProperty changed: ' + this.compoundProperty);
    },
    selectedTaskType(){
      this.currentLog = this.selectedTaskType;
      // this.footerText = this.$t('app.general.next');
      if (this.selectedTaskType === 'delivery' ||
         this.selectedTaskType === 'cooldown' ||
         this.selectedTaskType === 'warmkeeping') {
           this.footerText = this.$t('app.general.next');
           this.footer = 'none'
      }
      else {
        this.footerText = this.$t('app.general.save');
      }
    },
    processLocation(){
      this.newLogs.delivery.locationsId = this.processLocation;
      this.newLogs.cooldown.locationsId = this.processLocation;
      this.newLogs.warmkeeping.locationsId = this.processLocation;
    },
  },

  created() {

  },

  methods : {
    newItem(){
      if(this.selectedTaskType === 'others' ||
         this.selectedTaskType === 'clean' ||
         this.selectedTaskType === 'logtemp'){
        this.newTaskSubmit();
      } else {
        this.newProcess(this.newLogs);
      }
    },

    async newTaskSubmit(event) {

        if (
          !this.selectedUser ||
          !this.task_title ||
          !this.selectedTaskType ||
          //!this.task_desc ||
          !this.selectedRepeatType ||
          !this.selectedLocation ||
          //this.selectedDates.length == 0 ||
          !this.selectedTime){
          return
        }
        try {
          this.isLoading = true;

          await this.createTask({
            assignees: this.selectedUser,
            taskName: this.task_title,
            taskType: this.selectedTaskType,
            taskDesc: this.task_desc,
            taskRepeat:this.selectedRepeatType,
            locationId:this.selectedLocation,
            taskDates:this.selectedDates,
            taskTime:this.selectedTime
          });

          this.$notify.success(this.$t('app.tasks.task_added'), 'success')

          this.$emit('reflectTasks',true)

          // this.$refs.newTask.hide()
          this.closePopup();

          this.showUsersInput = false;
          this.isLoading = false;
          this.selectedUser = null;
          this.task_title = '';
          this.selectedTaskType = null;
          this.task_desc = '';
          this.selectedRepeatType= null;
          this.selectedLocation = null;
          this.selectedDates = [];
          this.selectedTime = null;
          this.locations = [];

        } catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.tasks.add_error'), 'success')
        }
    },

    newProcess(log){
      if (this.currentLog === 'delivery'){
        if (process.env.stage === 'dev'){
          console.log(log.delivery);
        };
        this.createDeliveryLog(log.delivery);
        this.currentLog = null;
      }
      if (this.currentLog === 'cooldown'){
        if (process.env.stage === 'dev'){
          console.log(log.cooldown);
        };
        this.createTemperatureLog(log.cooldown);
        this.currentLog = null;
      }
      if (this.currentLog === 'warmkeeping'){
        if (process.env.stage === 'dev'){
          console.log(log.warmkeeping);
        };
        this.createTemperatureLog(log.warmkeeping);
        this.currentLog = null;
      }
    },

    createDeliveryLog(log) {
      let vm = this;
      if (process.env.stage === 'dev'){
        console.log('dev: body: ', {body: this.newLogs.delivery});
      };
      return API.post("metamat", "/logs/delivery", {
        "body": {
          senderName: this.newLogs.delivery.senderName,
          typeOfGoods: this.newLogs.delivery.typeOfGoods,
          "ingredients":
        	[
          	{
          		"path_number": this.newLogs.delivery.ingredients[0].path_number,
          		"image_url" : this.newLogs.delivery.ingredients[0].image_url
          	}
          ],
          firstReading: this.newLogs.delivery.firstReading,
          logStatus:  this.newLogs.delivery.logStatus,
          logType: this.newLogs.delivery.logType
        }
       }).then((response, vm) => {
        if (process.env.stage === 'dev'){
          console.log('dev: response: ', response);
        };
        // vm.newLogs.delivery.senderName = '';
        // vm.newLogs.delivery.typeOfGoods = null;
        // vm.newLogs.delivery.maxTemp = 4;
        // vm.newLogs.delivery.ingredients[0] = {
      //                                       		path_number: '',
      //                                       		image_url : '', //https://placekitten.com/300/200
      //                                           picture: '',
      //                                           file:''
      //                                         };
        // vm.newLogs.delivery.firstReading = 4;
        // vm.newLogs.delivery.logStatus = "good";
        // vm.newLogs.delivery.logType = "delivery";
        // vm.newLogs.delivery.failMessage = '';
        // vm.newLogs.delivery.successMessage = '';
      }).catch((error) => {
        bugsnagClient.notify(error)
        // this.$notify.success(error, 'success');
        if (process.env.stage === 'dev'){
          console.log('dev: error: ', error);
        }
      });
    },

    createTemperatureLog(log) {
      return API.post("metamat", "/logs/temp", {
        body: log
        // {
        //   itemName: "item name",
        //   ingredients:
        // 	[
        //   	{
        //   		path_number: "123",
        //   		image_url : "https://cdn.kompis.app/image.png"
        //   	}
        //   	],
        //   logType: "cool"
        // }
      }).then((response) => {
        logTempFirstReading(response);
        if (process.env.stage === 'dev'){
          console.log('dev:', response);
        }
      });
    },

    logTempFirstReading(log) {
      return API.put("metamat", `/logs/temp/firstreading/${log.logId}`, {
        body: {
          value: this.log.firstReading
        }
      });
    },

    logTempSecondReading() {
      return API.put("metamat", "/logs/temp/secondreading/0fc09970-ece0-11e8-9b37-21febdf7ad08", {
        body: {
          value: 55
        }
      });
    },

    createTask(task) {
      return API.post("metamat", "/tasks", {
        body: task
      });
    },

    updateSelectedDays (days) {
      this.selectedDates = days
    },

    repeatTypeChanged() {
      this.selectedDates = []
      this.isMonthlyCalendar = false
      this.isDailyCalendar = false
      this.isWeeklyCalendar = false
      this.isNeverCalendar = false

      switch (this.selectedRepeatType) {
        case 'never':{
          this.isNeverCalendar = true
          break;
        }
        case 'daily':{
          this.isDailyCalendar = true
          break;
        }
        case 'weekly':{
          this.isWeeklyCalendar = true
          break;
        }
        case 'monthly':{
          this.isMonthlyCalendar = true
          break;
        }
        default:{
        }

      }
    },

    async locationChanged() {

      this.users  = []

      if (this.selectedLocation!= null){

          this.showUsersInput = false
          this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:false})

          for (var x in this.all_users){

            let first_name  = ''
            let last_name = ''
            let user_type = ''

            for (var y in this.all_users[x].Attributes) {

              if (this.all_users[x].Attributes[y].Name == 'custom:first_name') {
                first_name = this.all_users[x].Attributes[y].Value
              }

              if (this.all_users[x].Attributes[y].Name == 'custom:last_name') {
                last_name = this.all_users[x].Attributes[y].Value
              }

              if (this.all_users[x].Attributes[y].Name == 'custom:user_type') {
                user_type = this.all_users[x].Attributes[y].Value


                user_type = user_type.replace(/^\w/, c => c.toUpperCase())
              }

            }

            await API.get("metamat", "/permissions/"+this.all_users[x].Username).then((ulocations) => {

              if (ulocations.indexOf(this.selectedLocation)!= -1 || user_type == 'Company'){

          ///      if (user_type != 'company'){
                let prefix = ''
                if (user_type == 'Owner') {prefix = this.$t('app.users.user_types.owner')}
                if (user_type == 'Manager') {prefix = this.$t('app.users.user_types.manager')}
                if (user_type == 'Employee') {prefix = this.$t('app.users.user_types.employee')}


                this.users.push({
                  value: this.all_users[x].Username,
                  text: prefix + ' - ' + first_name +' '+ last_name
                })
              //}
              }
            })
          }

          if (this.users.length > 2){
            this.users[1].disabled = false
          }
          this.showUsersInput = true
      }

      else {
        this.showUsersInput = false
      }

    },

    checkStatus(log){
      if(log.logType === 'delivery'){
        if((log.typeOfGoods === 'refrigerated') && (log.firstReading > 4)){
          return true;
        }
        else if((log.typeOfGoods === 'frozen') && (log.firstReading > 4)){
          return true;
        }
        else if (log.logStatus !== 'good') {
          return true;
        }
      }
      else{
        return false;
      }

    },

    createLogTitle(log){
      if(log.logType === 'delivery'){
        return `${this.$t('app.logs.delivery.name')} ${this.$t('app.logs.delivery.from')} ${log.senderName}`;
      }
      if(log.logType === 'cool'){
        // return this.$t('app.logs.cooldown.name');
        return `${this.$t('app.logs.cooldown.name')} ${this.$t('app.general.of')} ${log.itemName}`;
      }
      if(log.logType === 'heat'){
        return `${this.$t('app.logs.warmkeeping.name')} ${this.$t('app.general.of')} ${log.itemName}` ;
      }
    },

    nextStep(){
      this.step++;
      this.footer = 'none'
      if(this.currentLog === 'delivery'){
        if (this.step === 3){
          this.footer = 'none'
        }
        if (this.step === 5){
           if(this.newLogs.delivery.typeOfGoods === 'dry'){

            this.footer = 'save';
            this.footerText = this.$t('app.general.save');
            this.inProgress = false;
            this.successMessage = this.$t('app.logs.delivery.messages.successMessage1');

            if(process.env.stage === 'dev'){
              console.log('dev, logs: final step dry');
            }
          }
          else{
            this.footer = 'next';
          }
        }

        if (this.step === 6){
          if(process.env.stage === 'dev'){
            console.log('dev, logs: temp: ' + this.newLogs.delivery.firstReading, 'max temp: ' + this.newLogs.delivery.maxTemp);
          }
          if (this.newLogs.delivery.firstReading > this.newLogs.delivery.maxTemp){

            this.fail();
          }
          else{
            this.footer = 'save';
            this.footerText = this.$t('app.general.save');
            this.inProgress = false;
            this.successMessage = this.$t('app.logs.delivery.messages.successMessage1')

            if(process.env.stage === 'dev'){
              console.log('dev, logs: final step cold');
            }
          }
        }
      }
      if(this.currentLog === 'cooldown'){
        if (this.step === 3){
          this.inProgress = false;
          this.footerText = this.$t('app.general.save');
          this.successMessage = this.$t('app.logs.cooldown.messages.successMessage1');
          this.footer = 'save';
        }
      }
      if(this.currentLog === 'warmkeeping'){
        if (this.step === 3){
          this.inProgress = false;
          this.footerText = this.$t('app.general.save');
          this.successMessage = this.$t('app.logs.warmkeeping.messages.successMessage1');
          this.footer = 'save';
        }
      }
      if(process.env.stage === 'dev'){
        console.log('dev, logs: step: ' + this.step, 'dev, logs: type of goods: ' + this.newLogs.delivery.typeOfGoods);
      }
    },

    changeTypeOfGoods(){
      if(this.newLogs.delivery.typeOfGoods === null){
        this.footer = 'none';
      }
      else{
        this.footer = 'next';
        if(this.newLogs.delivery.typeOfGoods === 'refrigerated'){
          this.newLogs.delivery.maxTemp = 4;
          this.newLogs.delivery.firstReading = 4;
        } else if (this.newLogs.delivery.typeOfGoods === 'frozen') {
          this.newLogs.delivery.maxTemp = -18;
          this.newLogs.delivery.firstReading = -18;
        } else {
          this.newLogs.delivery.maxTemp = null;
          this.newLogs.delivery.firstReading = null;
        }
      }
      if (process.env.stage === 'dev'){
        console.log('dev: goods type changed to: ', this.newLogs.delivery.typeOfGoods);
      }
    },

    updateTemp(irrelevant_val, temp, irrelevant_val2){ //irrelevant values are relevant to templogs, not processes/logs
      if(this.currentLog === 'delivery'){
        this.newLogs.delivery.firstReading = temp;
        if (process.env.stage === 'dev'){
          console.log('dev:', irrelevant_val, temp, irrelevant_val2);
        }
      }
      else if(this.currentLog === 'cooldown'){
        this.newLogs.cooldown.firstReading = temp;
        if (process.env.stage === 'dev'){
          console.log('dev:', irrelevant_val, temp, irrelevant_val2);
        }
      }
      else if(this.currentLog === 'warmkeeping'){
        this.newLogs.warmkeeping.firstReading = temp;
        if (process.env.stage === 'dev'){
          console.log('dev:', irrelevant_val, temp, irrelevant_val2);
        }
      }
    },

    fail(){
      this.success = false;
      this.footer = 'warning';
      this.footerText = this.$t('app.general.save');
      if(this.currentLog === 'delivery'){
        this.failMessage = this.$t('app.logs.delivery.messages.failureWarning');
        this.newLogs.delivery.logStatus = 'bad';
      }
    },

    async onDeliveryFileChange(){
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){
        return;
      }

      this.newLogs.delivery.ingredients[0].file = files[0];
      this.uploadDeliveryImage();
    },

    async onCooldownFileChange(index){
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){
        return;
      }
      this.newLogs.cooldown.ingredients[index].file = files[0];
      this.uploadCoolIngredientImage();
    },

    async onWarmkeepingFileChange(index){
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length){
        return;
      }
      this.newLogs.warmkeeping.ingredients[index].file = files[0];
      this.uploadWarmIngredientImage();
    },

    async uploadDeliveryImage() {
      const filename = `${Date.now()}-${this.newLogs.delivery.ingredients[0].file.name}`;
      const stored = await Storage.vault.put(filename, this.newLogs.delivery.ingredients[0].file, {contentType: this.newLogs.delivery.ingredients[0].file.type, level: 'public'});
      this.newLogs.delivery.ingredients[0].image_url = process.env.cdn.URL + stored.key;
    },

    async uploadCoolIngredientImage() {
      for (let picture of this.newLogs.cooldown.ingredients){
        const filename = `${Date.now()}-${picture.file.name}`;
        const stored = await Storage.vault.put(
                        filename,
                        picture.file,
                        {
                          contentType: picture.file.type,
                          level: 'public'
                        }
                      );
        picture.image_url = process.env.cdn.URL + stored.key;
      }
    },

    async uploadWarmIngredientImage() {
      for (let picture of this.newLogs.warmkeeping.ingredients){
        const filename = `${Date.now()}-${picture.file.name}`;
        const stored = await Storage.vault.put(
                        filename,
                        picture.file,
                        {
                          contentType: picture.file.type,
                          level: 'public'
                        }
                      );
        picture.image_url = process.env.cdn.URL + stored.key;
      }
    },

    inputChange(){
      if (process.env.stage === 'dev'){
        console.log('dev: logs: input changed',
        this.newLogs.delivery.senderName,
        this.newLogs.delivery.ingredients[0].path_number);
      }
      if(this.currentLog === 'delivery'){
        this.newLogs.delivery.senderName &&
        this.newLogs.delivery.ingredients[0].path_number ?
        this.footer = 'next' : this.footer = 'none';
      }

      if(this.currentLog === 'cooldown'){
        for (let value of this.newLogs.cooldown.ingredients){
          // console.log(value);
          if(!value.path_number){
            this.footer = 'none';
            return
          }
        }
        this.newLogs.cooldown.itemName ? this.footer = 'next' : this.footer = 'none';
      }
      if(this.currentLog === 'warmkeeping'){
        for (let value of this.newLogs.warmkeeping.ingredients){
          // console.log(value);
          if(!value.path_number){
            this.footer = 'none';
            return
          }
        }
        this.newLogs.warmkeeping.itemName ? this.footer = 'next' : this.footer = 'none';
      }
    },

    async showNewTaskModal(){

      // this.$refs.newTask.show()
      this.showModal = true;
      this.success = true;
      this.inProgress = true;
      this.$store.dispatch('lockBody');
         try {
           await API.get("metamat", "/assets/names").then((assets) => {

             let user_type  =  this.$store.getters.user.userInfo.user_type
             let permissions = this.$store.getters.user.permissions
             this.locations.push({
               text: this.$t('app.tasks.select_taks_loaction'),
               value:null,
               id:'nulllocation',
               disabled:false
             })

             for (var x in assets) {

               if (permissions.indexOf(assets[x].objectId) > -1 ){

               this.locations.push({
                 text: assets[x].objectName + ' (' + assets[x].objectLocation + ')',
                 value: assets[x].objectId,
                 id: assets[x].objectId,
                 disabled: false
               })
             }
           }


           })

           await API.get("metamat", "/users").then((users) => {
             this.all_users = users
           })

         } catch (e) {
           bugsnagClient.notify(e)
           this.closePopup();
           this.$notify.error(e.message, 'success')
         }

    },

    async closePopup(){
      this.step = 2;
      this.inProgress = false;
      this.selectedTaskType = 'others'
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
