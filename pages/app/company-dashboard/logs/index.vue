<template>

  <div class="shop">
    <h2 class="app-ui-overlay__page-title">{{$t('app.logs.header')}}</h2>

    <div v-if="isLoading" class="app-ui-overlay__centered-column">
      <LoadingAnimation/>
    </div>

    <div class="app-ui-overlay__new-object u-margin-bottom-big">
      <a href="#" class="round-button" @click="showPopup">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </a>
    </div>

    <div v-for="(log,index) in logs"
         class="list-bar"
         :class="{'list-bar--warning': checkStatus(log)}">

      <div class="list-bar__link">
        <!-- <WarningFlag :show="checkStatus(log)"/> -->
        <div v-if="checkStatus(log)" class="list-bar__warning-flag">
          <p class="list-bar__warning-flag__content">!</p>
        </div>
        <div v-if="checkStatus(log)" class="list-bar__warning-flag--spacer">
          <!-- this is just here to move the text over. need to refactor list-bar css to not have padding on outer div, and then use WarningFlag component.  -->
        </div>
        <div class="list-bar__text-container">

          <h5 class="list-bar__title"
              :class="{'list-bar__title--warning': checkStatus(log)}">
            {{createLogTitle(log)}}
          </h5>
          <p class="list-bar__info">{{formatTimeStampDate(log.createdAt)}}</p>
        </div>
        <ViewLogModal :log="log"/>
      </div>
    </div>

    <ModalBody v-if="showModal"
               z_index="3"
               :footerType="footer"
               :title="logTitle"
               :footerText="footerText"
               @clickedNext="nextStep"
               @clickedSave="newItem(newLogs)"
               @clickedWarning="newItem(newLogs)"
               @close="closePopup">

      <template slot="modal-content">
        <div v-if="success && inProgress">
          <div v-if="step === 1">
            <div class="list-bar list-bar--tall">
              <h2 class="list-bar__title--large">{{$t('app.logs.defaults.select_type')}}</h2>
            </div>
            <select v-model="currentLog"
                    id="itemtype"
                    @change="changeLogType"
                    class="list-bar input__selector"
                    value="1">
              <option v-for="type in logTypes" :value="type.value"> {{type.text}} </option>
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

          <div v-if="currentLog === 'delivery'">
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
##      ##    ###    ########  ##     ## ##    ## ######## ######## ########  #### ##    ##  ######
##  ##  ##   ## ##   ##     ## ###   ### ##   ##  ##       ##       ##     ##  ##  ###   ## ##    ##
##  ##  ##  ##   ##  ##     ## #### #### ##  ##   ##       ##       ##     ##  ##  ####  ## ##
##  ##  ## ##     ## ########  ## ### ## #####    ######   ######   ########   ##  ## ## ## ##   ####
##  ##  ## ######### ##   ##   ##     ## ##  ##   ##       ##       ##         ##  ##  #### ##    ##
##  ##  ## ##     ## ##    ##  ##     ## ##   ##  ##       ##       ##         ##  ##   ### ##    ##
 ###  ###  ##     ## ##     ## ##     ## ##    ## ######## ######## ##        #### ##    ##  ######   -->

          <div v-if="currentLog === 'warmkeeping'">
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
                         v-model="newLogs.warmkeeping.ingredients[index].path_number"
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
                <div class="round-button" href="#" @click="addIngredient">
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
import {
  API,
  Storage
} from "aws-amplify";

import LoadingAnimation from '~/components/general/LoadingAnimation.vue'
import WarningFlag from '~/components/general/WarningFlag.vue'
import YesOrNo from '~/components/general/YesOrNo.vue'
import MinusPlusField from '~/components/general/MinusPlusField.vue'
import ModalBody from '~/components/modals/ModalBody.vue'
import NewDeliveryModal from '~/components/processes/NewDeliveryModal.vue'
import ViewLogModal from '~/components/processes/ViewLogModal.vue'

export default {

  data() {
    return {
      showModal: false,
      isLoading: false,
      footer: 'none',
      footerText: this.$t('app.general.next'),
      step: 1,
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
      newLogs:{
        delivery: {
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
  components: {
    LoadingAnimation,
    'new-delivery-modal': NewDeliveryModal,
    ViewLogModal,
    ModalBody,
    WarningFlag,
    YesOrNo,
    MinusPlusField
  },
  async created() {
    this.isLoading = true;
    // try {
      // await this.listLogById()
      //await this.logTempSecondReading()
      //await this.logTempFirstReading()
      // await this.createDeliveryLog();
      //await this.createTemperatureLog();
      // async this.listDeliveryLogs().then(() => {
      //   async this.listCoolLogs()
      // });
      // await this.listDeliveryLogs();
      // await this.listCoolLogs();
      // await this.listWarmLogs();
      this.compileLogs().then(() => {
        this.isLoading = false;
      }).catch((e) =>{
        bugsnagClient.notify(e)
        this.$notify.error(e.message, 'success')
        this.isLoading = false;
      });
      // await this.sortLogsByDate();


    // } catch (e) {
    //   this.$notify.error(e.message, 'success')
    //   this.isLoading = false;
    // }
  },
  methods : {
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

    closePopup(){
      this.showModal = false;
      this.footer = 'next';
      this.footerText = this.$t('app.general.next');
      this.step = 1;
      this.success = true;
      this.$store.dispatch('freeBody');
      if(process.env.stage === 'dev'){
        console.log('dev, logs: close modal');
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

    changeLogType(){
      this.currentLog === null ? this.footer = 'none' : this.footer = 'next';
      if (this.currentLog === 'delivery') {
        this.logTitle = this.$t('app.logs.defaults.new_log') + this.$t('app.logs.delivery.name');
      }
      if (this.currentLog === 'cooldown') {
        this.logTitle = this.$t('app.logs.defaults.new_log') + this.$t('app.logs.cooldown.name');
      }
      if (this.currentLog === 'warmkeeping') {
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

    updateTemp(irrelevant_val, temp, irrelevant_val2){ //irrelevant values are relevant to templogs, not deliveries
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

    addIngredient(){
      this.footer = 'none';
      this.newLogs.cooldown.ingredients.push({
        path_number: '',
        image_url : ''
      });
    },

    newItem(log){
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
        bugsnagClient.notify(e)
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

    listLogById () {
    API.get("metamat", "/logs/log/0fc09970-ece0-11e8-9b37-21febdf7ad08").then((log) => {
        if (process.env.stage === 'dev'){
           console.log(log);
        }
      })
    },

    async compileLogs() {
      await this.listDeliveryLogs();
      await this.listCoolLogs();
      await this.listWarmLogs();
    },

    async listDeliveryLogs () {
     API.get("metamat", "/logs/delivery").then((logs) => {
       for(let log of logs){
          this.logs.push(log);
       }
       this.sortLogsByDate();
       if (process.env.stage === 'dev'){
         console.log('dev: logs list:', logs);
       }
      })
    },
    async listCoolLogs () {
     API.get("metamat", "/logs/cool").then((logs) => {
       for(let log of logs){
          this.logs.push(log);
       }
       this.sortLogsByDate();
       if (process.env.stage === 'dev'){
         console.log('dev: cool logs list:', logs);
       }
      })
    },
    async listWarmLogs () {
     API.get("metamat", "/logs/heat").then((logs) => {
       for(let log of logs){
          this.logs.push(log);
       }
       this.sortLogsByDate();
       if (process.env.stage === 'dev'){
         console.log('dev: warm logs list:', logs);
       }
      })
    },
    async sortLogsByDate(){
      console.log('dev: logs list sort');
      this.logs.sort(function(a,b){return b.createdAt - a.createdAt});
      if (process.env.stage === 'dev'){
        console.log('dev: logs list sort');
      }
    }
  }
}
</script>
