<template>


  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewTaskModal()">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal"
               z_index="2"
               :footerType="footer"
               :title="$t('app.tasks.create_new_task')"
               :footerText="footerText"
               @clickedSave="newEntry()"
               @clickedNext="nextStep()"
               @clickedWarning="newItem(newLogs)"
               @close="closePopup()">

      <template slot="modal-content">



        <select v-if="step === 1" v-model="selectedTaskType" @change="changeTaskType" id="newtasktype" class="list-bar input__selector" value="1">
          <!-- <option :value="null" selected> {{ $t('app.tasks.task_type') }} </option> -->
          <option v-for="type in taskTypes" :value="type.value"> {{type.text}} </option>
        </select>

        <div class="" v-if="selectedTaskType === 'clean' || selectedTaskType === 'logtemp' || selectedTaskType === 'others'">
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

          <select v-model="selectedLocation" @change="locationChanged"  class="list-bar input__selector">
            <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
          </select>

          <select v-if="selectedLocation!=null"  @change="userTypeChanged" v-model="selectedUserType" id="taskusertype" class="list-bar input__selector">
            <option v-for="userType in userTypes" :value="userType.value"> {{userType.text}} </option>
          </select>

          <div v-if="!isLoading && selectedUserType!=null && selectedUserType!='any-employee' && selectedUserType!='any-manager' && selectedUserType!='any-owner' && selectedUserType!='anyone'"  class="list-bar input checklist-header">
            {{ $t('app.tasks.task_assinged_to') }}
          </div>
          <div v-if="!isLoading && selectedUserType!=null && selectedUserType!='any-employee' && selectedUserType!='anyone' && selectedUserType!='any-manager' && selectedUserType!='any-owner'" class="input__check-list">
            <div class="input__check-list__item" v-for="(user,index) in users">
              <input :id="'edit-point' + index" class="input__check-box" type="checkbox"  :value="user.value" v-model="selectedUsers">
              <label :for="'edit-point' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
                <p class="input__check-label__text">{{user.text}}</p>
                <div class="input__check-label__tick--checkbox"/>
              </label>
            </div>
          </div>


          <select v-model="selectedRepeatType"  @change="repeatTypeChanged" id="taskrepeat" class="list-bar input__selector" value="1">
            <option v-for="repeatType in repeatTypes" :value="repeatType.value"> {{repeatType.text}} </option>
          </select>

          <div v-if="isMonthlyCalendar || isNeverCalendar || isWeeklyCalendar" class="list-bar">
            <MonthlyCalendar v-if="isMonthlyCalendar" @updateSelectedDays="updateSelectedDays" />
            <DailyCalendar v-if="isWeeklyCalendar" :selectedDays="[1,2,3,4,5]"  @updateSelectedDays="updateSelectedDays" />
            <YearlyCalendar v-if="isNeverCalendar" @updateSelectedDays="updateSelectedDays"  />
          </div>

          <select v-if="isMonthlyCalendar || isDailyCalendar || isNeverCalendar || isWeeklyCalendar" v-model="selectedTime" id="tasktime" class="list-bar input__selector" value="1">
            <option v-for="time in times" :value="time.value"> {{time.text}} </option>
          </select>
        </div>

        <div v-if="selectedTaskType === 'delivery' || selectedTaskType === 'cooldown' || selectedTaskType === 'warmkeeping'">

          <!-- <div v-if="success && inProgress">
            <div v-if="step === 1">
              <div class="list-bar list-bar--tall">
                <h2 class="list-bar__title--large">{{$t('app.logs.defaults.select_type')}}</h2>
              </div>
              <select v-model="selectedTaskType"
                      id="itemtype"
                      @change="changeLogType"
                      class="list-bar input__selector"
                      value="1">
                <option v-for="type in logTypes" :value="type.value"> {{type.text}} </option>
              </select>
            </div> -->
            <!--
  ########  ######## ##       #### ##     ## ######## ########  ##    ##
  ##     ## ##       ##        ##  ##     ## ##       ##     ##  ##  ##
  ##     ## ##       ##        ##  ##     ## ##       ##     ##   ####
  ##     ## ######   ##        ##  ##     ## ######   ########     ##
  ##     ## ##       ##        ##   ##   ##  ##       ##   ##      ##
  ##     ## ##       ##        ##    ## ##   ##       ##    ##     ##
  ########  ######## ######## ####    ###    ######## ##     ##    ##    -->

            <div v-if="selectedTaskType === 'delivery'">

              <select v-model="selectedLocation"  class="list-bar input__selector">
                <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
              </select>


              <div v-if="step === 2" class="">


                <input class="list-bar input-text"
                       type="text"
                       v-model="newLogs.delivery.senderName"
                       @input.lazy="inputChange"
                       :placeholder="this.$t('app.logs.delivery.senderNameDefault')"/>
                </input>

                <div class="list-bar--inline-items">
                  <input class="list-bar input-text"
                         type="text"
                         v-model="newLogs.delivery.ingredients[0].patch_number"
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
                     :style="{'background-image': 'url(' + newLogs.delivery.ingredients[0].image_url + ')'}"

                     >

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

              <div v-if="step === 3 && success" class="">
                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">{{$t('app.logs.defaults.condition_query')}}</h2>
                </div>
                <YesOrNo @yes="nextStep" @no="fail()"/>
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

              <div v-if="step === 5 && (newLogs.delivery.typeOfGoods == 'refrigerated' || newLogs.delivery.typeOfGoods == 'frozen')" class="">
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
            <!--
   ######   #######   #######  ##       ########   #######  ##      ## ##    ##
  ##    ## ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ###   ##
  ##       ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ####  ##
  ##       ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ## ## ##
  ##       ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ##  ####
  ##    ## ##     ## ##     ## ##       ##     ## ##     ## ##  ##  ## ##   ###
   ######   #######   #######  ######## ########   #######   ###  ###  ##    ## -->

            <div v-if="selectedTaskType === 'cooldown'">

              <select v-model="selectedLocation"  class="list-bar input__selector">
                <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
              </select>

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
                           v-model="newLogs.cooldown.ingredients[index].patch_number"
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
                  <div class="round-button" href="#" @click="addIngredient()">
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
  ##      ##    ###    ########  ##     ## ##    ## ######## ######## ########  #### ##    ##  ######
  ##  ##  ##   ## ##   ##     ## ###   ### ##   ##  ##       ##       ##     ##  ##  ###   ## ##    ##
  ##  ##  ##  ##   ##  ##     ## #### #### ##  ##   ##       ##       ##     ##  ##  ####  ## ##
  ##  ##  ## ##     ## ########  ## ### ## #####    ######   ######   ########   ##  ## ## ## ##   ####
  ##  ##  ## ######### ##   ##   ##     ## ##  ##   ##       ##       ##         ##  ##  #### ##    ##
  ##  ##  ## ##     ## ##    ##  ##     ## ##   ##  ##       ##       ##         ##  ##   ### ##    ##
   ###  ###  ##     ## ##     ## ##     ## ##    ## ######## ######## ##        #### ##    ##  ######   -->

            <div v-if="selectedTaskType === 'warmkeeping'">


              <select v-model="selectedLocation"  class="list-bar input__selector">
                <option v-for="location in locations" :value="location.value"> {{location.text}} </option>
              </select>


              <div v-if="step === 2" class="">

                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">{{$t('app.logs.warmkeeping.messages.name_items')}}</h2>
                </div>
                <input class="list-bar input-text"
                       type="text"
                       v-model="newLogs.warmkeeping.itemName"
                       @input.lazy="inputChange"
                       :placeholder="$t('app.logs.warmkeeping.item_name')"/>
                </input>

                <div v-for="(ingredient, index) in newLogs.warmkeeping.ingredients" >
                  <div class="list-bar--inline-items">
                    <div v-if="newLogs.warmkeeping.ingredients.length > 1"
                            @click="newLogs.warmkeeping.ingredients.splice(index, 1)"
                            class="inline-button inline-button--delete u-margin-right-default">&nbsp;
                    </div>

                    <input class="list-bar input-text"
                           type="text"
                           v-model="newLogs.warmkeeping.ingredients[index].patch_number"
                           @input.lazy="inputChange"
                           :placeholder="$t('app.logs.warmkeeping.batchNo')"/>
                    </input>

                    <div v-if="!newLogs.warmkeeping.ingredients[index].image_url"
                         class="inline-button inline-button--upload u-margin-left-default">
                      <input type="file"
                             id="product-thumbnail"
                             class="input__file"
                             name="product-thumbnail"
                             accept="image/png, image/jpeg, image/tiff, image/gif"
                             @change="onWarmkeepingFileChange(index)" />
                    </div>
                  </div>

                  <div v-if="newLogs.warmkeeping.ingredients[index].image_url"
                       class="list-bar list-bar__product-image list-bar__product-image--large"
                       :style="{'background-image': 'url(' + newLogs.warmkeeping.ingredients[index].image_url + ')'}">

                    <div class="round-button round-button--edit-image">
                      <input type="file"
                             id="product-thumbnail"
                             class="input__file"
                             name="product-thumbnail"
                             accept="image/png, image/jpeg, image/tiff, image/gif"
                             @change="onWarmkeepingFileChange(index)"/>
                    </div>
                  </div>
                </div>
                <div class="app-ui-overlay__new-object">
                  <div class="round-button" href="#" @click="addIngredient()">
                    <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
                  </div>
                </div>
              </div>
              <div v-if="step === 3" class="">
                <div class="list-bar list-bar--tall">
                  <h2 class="list-bar__title--large">{{$t('app.logs.warmkeeping.messages.measure_temp')}}</h2>
                </div>
                <div class="list-bar u-flex-justify-center">
                  <MinusPlusField :max="2000"
                                  :min="65"
                                  :value="85"
                                  @updateValue="updateTemp"/>
                </div>
              </div>
            </div>
          </div>

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




     </template>
  </ModalBody>
</div>
</template>


<script>

import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import uuid from "uuid";
import MonthlyCalendar from '~/components/General/MonthlyCalendar.vue'
import DailyCalendar from '~/components/General/DailyCalendar.vue'
import YearlyCalendar from '~/components/General/YearlyCalendar.vue'
import ModalBody from '~/components/modals/ModalBody.vue'
import YesOrNo from '~/components/general/YesOrNo.vue'
import MinusPlusField from '~/components/general/MinusPlusField.vue'

export default {

  components: {
    MonthlyCalendar,
    DailyCalendar,
    YearlyCalendar,
    ModalBody,
    YesOrNo,
    MinusPlusField
  },

  props: {
    users_prop:{
      type:Array,
      required:false
    },
    assets_prop:{
      type:Array,
      required:false
    }
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
      showUsersInput: true,
      selectedTaskType: null,
      task_title: '',
      task_desc: null,
      selectedDates: [],
      all_users: [],
      taskTypes: [
        { value: null, text: this.$t('app.tasks.task_types.select') },
        { value: 'clean', text: this.$t('app.tasks.task_types.clean') },
        { value: 'logtemp', text: this.$t('app.tasks.task_types.logtemp') },
        { value: 'others', text: this.$t('app.tasks.task_types.others') },
        { value: 'delivery', text: this.$t('app.logs.delivery.name') },
        { value: 'cooldown', text: this.$t('app.logs.cooldown.name') },
        { value: 'warmkeeping', text: this.$t('app.logs.warmkeeping.name') },
      ],
      logTypes: [
        {value: null, text: this.$t('app.logs.defaults.type')},
        {value:'delivery', text: this.$t('app.logs.delivery.name')},
        {value:'cooldown', text: this.$t('app.logs.cooldown.name')},
        {value:'warmkeeping', text: this.$t('app.logs.warmkeeping.name')},
      ],

      selectedLocation: null,
      locations: [],
      selectedUsers: [],
      users: [],
      selectedUserType:null,
      userTypes:[
        {text:this.$t('app.users.user_types.select'),value:null},
        {text:this.$t('app.tasks.anyone'),value:'anyone'},
        {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
        {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
        {text:this.$t('app.tasks.any_owner'),value:'any-owner'},
        {text:this.$t('app.tasks.any_user'),value:'any-user'}
      ],
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
      step: 1,
      success: true,
      inProgress: true,
      logTitle: this.$t('app.logs.defaults.name'),
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
      newLogs:{
        delivery: {
          senderName: null,
          typeOfGoods: null,
          maxTemp: 4,
          minTemp: -18,
          ingredients:
          [
            {
              patch_number: null,
              image_url : null, //https://placekitten.com/300/200
              picture: null,
              file:null
            }
          ],
          firstReading: 4,
          logStatus: 'good',
          logType: 'delivery'
        },
        cooldown: {
          itemName: null,
          ingredients:
          [
            {
              patch_number: null,
              image_url : null,
              file: null
            }
            ],
          logType: 'cool',
          firstReading: 85
        },
        warmkeeping: {
        itemName:null,
        ingredients:
        [
          {
            patch_number: null,
            image_url : null,
            file: null
          }
        ],
        logType: 'heat',
        firstReading: 85,
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
  //
  watch: {
    compoundProperty: function() {
      if(this.selectedTaskType === 'clean' ||
         this.selectedTaskType === 'others' ||
         this.selectedTaskType === 'logtemp'){
           if (
               this.task_title &&
               //this.task_desc &&
               this.selectedRepeatType &&
               this.selectedLocation &&
               //this.selectedDates.length == 0 &&
               this.selectedTime
              ){
               this.footerText = this.$t('app.general.save');
               this.footer = 'save'
             } else {
               this.footer = 'none'
             }
         }
       // console.log('compoundProperty changed: ' + this.compoundProperty);
    },

  },

  created() {

  },

  methods : {


    newEntry(){

      this.mixpanelTrack('Create New Task: Tasks Page',
      {'Task Type': this.selectedTaskType,
       'Task Repeat':(this.selectedRepeatType) ? this.selectedRepeatType : null,
       'User Type':(this.selectedUserType) ? this.selectedUserType :  null
     }
    );

      if(this.selectedTaskType === 'clean' ||
         this.selectedTaskType === 'logtemp' ||
         this.selectedTaskType === 'others'){
        this.newTaskSubmit();
      }
      if(this.selectedTaskType === 'delivery' ||
         this.selectedTaskType === 'cooldown' ||
         this.selectedTaskType === 'warmkeeping'){
        this.newItem(this.newLogs);
      }


      this.inProgress = true;
    },

    async newTaskSubmit(event) {

      if (
          !this.selectedUserType ||

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

        let new_tasks = await this.createTask({
          assignees: (this.selectedUserType == 'any-user') ? this.selectedUsers : this.selectedUserType,
          taskName: this.task_title,
          taskType: this.selectedTaskType,
          taskDesc: this.task_desc,
          taskRepeat:this.selectedRepeatType,
          locationId:this.selectedLocation,
          taskDates:this.selectedDates,
          taskTime:this.selectedTime,
          tzo:this.getTimezoneOffset()
        });

        this.$emit('reflectTasks',true)

        this.$notify.success(this.$t('app.tasks.task_added'), 'success')

        // this.$refs.newTask.hide()
        this.closePopup();

        this.showUsersInput = false;
        this.isLoading = false;
        this.selectedUsers = [];
        this.selectedUserType = null
        this.task_title = '';
        this.selectedTaskType = null;
        this.task_desc = '';
        this.selectedRepeatType= null;
        this.selectedLocation = null;
        this.selectedDates = [];
        this.selectedTime = null;
        this.locations = [];
        this.step = 1;

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.tasks.add_error'), 'success')

      }
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
      this.isLoading = true

      if (this.selectedLocation!= null){

        //  this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:false})

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
      this.isLoading = false

    },

  async  userTypeChanged() {

      await this.locationChanged()
    },

    async showNewTaskModal(){

      this.mixpanelTrack('Click: Tasks Page - New Task Modal');
      // this.$refs.newTask.show()
      this.showModal = true;
      this.users = []
      this.selectedLocation = null
      this.$store.dispatch('lockBody');
      this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:false})
         try {

             this.locations = []
             let assets = this.assets_prop

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
           console.log(this.users_prop);
          this.all_users = this.users_prop


         } catch (e) {
           bugsnagClient.notify(e)
           this.closePopup();
           this.$notify.error(e.message, 'success')
         }

    },

    async closePopup(){

      this.footer = 'none';
      this.footerText = this.$t('app.general.next');
      this.step = 1;
      this.success = true;
      this.selectedTaskType = null,
      this.$store.dispatch('freeBody');
      if(process.env.stage === 'dev'){
        console.log('dev, logs: close modal');
      }
      this.$store.dispatch('freeBody');
      this.showModal = false;
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

    showPopup(){
      this.showModal = true;
      this.inProgress = true;
      this.$store.dispatch('lockBody');
      if(process.env.stage === 'dev'){
        console.log('dev, logs: open modal');
      }
    },

    // closePopup(){
    //   this.showModal = false;
    //   this.footer = 'next';
    //   this.footerText = this.$t('app.general.next');
    //   this.step = 1;
    //   this.success = true;
    //   this.$store.dispatch('freeBody');
    //   if(process.env.stage === 'dev'){
    //     console.log('dev, logs: close modal');
    //   }
    // },

    nextStep(){
      this.step++;
      this.footer = 'none'
      if(this.selectedTaskType === 'delivery'){
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
      if(this.selectedTaskType === 'cooldown'){
        if (this.step === 3){
          this.inProgress = false;
          this.footerText = this.$t('app.general.save');
          this.successMessage = this.$t('app.logs.cooldown.messages.successMessage1');
          this.footer = 'save';
        }
      }
      if(this.selectedTaskType === 'warmkeeping'){
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

    fail(){
      this.success = false;
      this.footer = 'warning';
      this.footerText = this.$t('app.general.save');
      if(this.selectedTaskType === 'delivery'){
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

      let image_type = this.newLogs.delivery.ingredients[0].file.type.split('/')
      image_type = image_type [1]

      const filename = `${Date.now()}-${uuid.v1()}.${image_type}`
      const stored = await Storage.vault.put(filename, this.newLogs.delivery.ingredients[0].file, {contentType: this.newLogs.delivery.ingredients[0].file.type, level: 'public'});
      this.newLogs.delivery.ingredients[0].image_url = process.env.cdn.URL + stored.key;
    },

    async uploadCoolIngredientImage() {
      for (let picture of this.newLogs.cooldown.ingredients){

        let image_type = picture.file.type.split('/')
        image_type = image_type [1]

        const filename = `${Date.now()}-${uuid.v1()}.${image_type}`
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
        let image_type = picture.file.type.split('/')
        image_type = image_type [1]

        const filename = `${Date.now()}-${uuid.v1()}.${image_type}`
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

    changeTaskType(){
      if(process.env.stage === 'dev'){
        console.log(`changed to: ${this.selectedTaskType}`);
      }

      this.selectedTaskType === null ? this.footer = 'none' : this.footer = 'next';
      if (this.selectedTaskType == null){
        this.footerText = this.$t('app.general.save');
        this.footer = 'none';
      }
      if (this.selectedTaskType === 'delivery') {
        this.footer = 'next';
        this.footerText = this.$t('app.general.next');
        this.logTitle = this.$t('app.logs.defaults.new_log') + this.$t('app.logs.delivery.name');
      }
      if (this.selectedTaskType === 'cooldown') {
        this.footer = 'next';
        this.footerText = this.$t('app.general.next');
        this.logTitle = this.$t('app.logs.defaults.new_log') + this.$t('app.logs.cooldown.name');
      }
      if (this.selectedTaskType === 'warmkeeping') {
        this.footer = 'next';
        this.footerText = this.$t('app.general.next');
        this.logTitle = this.$t('app.logs.defaults.new_log') + this.$t('app.logs.warmkeeping.name');
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

    inputChange(){
      if (process.env.stage === 'dev'){
        console.log('dev: logs: input changed',
        this.newLogs.delivery.senderName,
        this.newLogs.delivery.ingredients[0].patch_number);
      }
      if(this.selectedTaskType === 'delivery'){
        this.newLogs.delivery.senderName &&
        this.newLogs.delivery.ingredients[0].patch_number ?
        this.footer = 'next' : this.footer = 'none';
      }

      if(this.selectedTaskType === 'cooldown'){
        for (let value of this.newLogs.cooldown.ingredients){
          // console.log(value);
          if(!value.patch_number){
            this.footer = 'none';
            return
          }
        }
        this.newLogs.cooldown.itemName ? this.footer = 'next' : this.footer = 'none';
      }
      if(this.selectedTaskType === 'warmkeeping'){
        for (let value of this.newLogs.warmkeeping.ingredients){
          // console.log(value);
          if(!value.patch_number){
            this.footer = 'none';
            return
          }
        }
        this.newLogs.warmkeeping.itemName ? this.footer = 'next' : this.footer = 'none';
      }
    },

    updateTemp(irrelevant_val, temp, irrelevant_val2){ //irrelevant values are relevant to templogs, not deliveries
      if(this.selectedTaskType === 'delivery'){
        this.newLogs.delivery.firstReading = temp;
        if (process.env.stage === 'dev'){
          console.log('dev:', irrelevant_val, temp, irrelevant_val2);
        }
      }
      else if(this.selectedTaskType === 'cooldown'){
        this.newLogs.cooldown.firstReading = temp;
        if (process.env.stage === 'dev'){
          console.log('dev:', irrelevant_val, temp, irrelevant_val2);
        }
      }
      else if(this.selectedTaskType === 'warmkeeping'){
        this.newLogs.warmkeeping.firstReading = temp;
        if (process.env.stage === 'dev'){
          console.log('dev:', irrelevant_val, temp, irrelevant_val2);
        }
      }
    },

    addIngredient(){
      this.footer = 'none';
      if(this.selectedTaskType === 'cooldown'){
        this.newLogs.cooldown.ingredients.push({
          patch_number: '',
          image_url : ''
        });
      }

      if(this.selectedTaskType === 'warmkeeping'){
        this.newLogs.warmkeeping.ingredients.push({
          patch_number: '',
          image_url : ''
        });
      }

    },

    newItem(log){
      this.success = true;

      if (this.selectedTaskType === 'delivery'){
        if (process.env.stage === 'dev'){
          console.log(log.delivery);
        };
        this.createDeliveryLog(log.delivery);
        this.selectedTaskType = null;
      }
      if (this.selectedTaskType === 'cooldown'){
        if (process.env.stage === 'dev'){
          console.log(log.cooldown);
        };
        this.createCoolDownLog(log.cooldown);
        this.selectedTaskType = null;
      }
      if (this.selectedTaskType === 'warmkeeping'){
        if (process.env.stage === 'dev'){
          console.log(log.warmkeeping);
        };
        this.createWarmKeepingLog(log.warmkeeping);
        this.selectedTaskType = null;
      }
    },

    async createDeliveryLog(log) {
      let vm = this;
      if (process.env.stage === 'dev'){
        console.log('dev: body: ', {body: this.newLogs.delivery});
      };


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


              let new_log_task = await this.createTask({
                assignees: [this.$store.getters.user.userInfo.username],
                taskName: this.newLogs.delivery.senderName,
                taskType: this.selectedTaskType,
                taskDesc: null,
                taskRepeat:'never',
                locationId:this.selectedLocation,
                taskDates:[yyyy+'-'+mm+'-'+dd],
                taskTime:null
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

            let deviation_data = {}
            deviation_data.deviation_required = false

            if (this.newLogs.delivery.logStatus != 'good') {
              deviation_data.deviation_required = true
              deviation_data.assignees = [this.$store.getters.user.userInfo.username]
              deviation_data.taskName = this.newLogs.delivery.senderName
              deviation_data.taskType = 'deviation_log'
              deviation_data.taskDesc = null
              deviation_data.taskRepeat = 'never'
              deviation_data.locationId = this.selectedLocation
              deviation_data.taskDates = [yyyy+'-'+mm+'-'+dd]
              deviation_data.taskTime = null
              deviation_data.taskDeviationFor = new_log_schedule_id
            }


            this.$emit('logSubmit',new_log_schedule_id,null,null,'','delivery',deviation_data,this.newLogs.delivery)


          this.$notify.success(this.$t('app.tasks.task_logged').replace('%s',''), 'success')
          this.closePopup();
    },


    sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    },

  async  createCoolDownLog(log) {

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

              let new_log_task = await this.createTask({
                assignees: [this.$store.getters.user.userInfo.username],
                taskName: this.newLogs.cooldown.itemName,
                taskType: this.selectedTaskType,
                taskDesc: null,
                taskRepeat:'never',
                locationId:this.selectedLocation,
                taskDates:[yyyy+'-'+mm+'-'+dd],
                taskTime:null
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

            let deviation_data = {}
            deviation_data.deviation_required = false

            await API.post("metamat", "/tasks/schedule/", {
              body: {
                taskId:new_log_task_id,
                taskType: 'cooldown_log',
                assignees: [this.$store.getters.user.userInfo.username],
                locationId:this.selectedLocation,
                taskName: this.newLogs.cooldown.itemName,
                in_x_hours:2,
              }
            });

            this.$emit('logSubmit',new_log_schedule_id,null,null,'','cooldown',deviation_data,this.newLogs.cooldown)

          this.$notify.success(this.$t('app.tasks.task_logged').replace('%s',''), 'success')
          this.closePopup();

    },
    async  createWarmKeepingLog(log) {

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

                let new_log_task = await this.createTask({
                  assignees: [this.$store.getters.user.userInfo.username],
                  taskName: this.newLogs.warmkeeping.itemName,
                  taskType: this.selectedTaskType,
                  taskDesc: null,
                  taskRepeat:'never',
                  locationId:this.selectedLocation,
                  taskDates:[yyyy+'-'+mm+'-'+dd],
                  taskTime:null
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

              let deviation_data = {}
              deviation_data.deviation_required = false

              await API.post("metamat", "/tasks/schedule/", {
                body: {
                  taskId:new_log_task_id,
                  taskType: 'warmkeeping_log',
                  assignees: [this.$store.getters.user.userInfo.username],
                  locationId:this.selectedLocation,
                  taskName: this.newLogs.warmkeeping.itemName,
                  in_x_hours:2,
                }
              });

              this.$emit('logSubmit',new_log_schedule_id,null,null,'','keepwarming',deviation_data,this.newLogs.warmkeeping)

            this.$notify.success(this.$t('app.tasks.task_logged').replace('%s',''), 'success')
            this.closePopup();

      }
  }
}

</script>
