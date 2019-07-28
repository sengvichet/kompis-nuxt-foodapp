<template>

  <div class="list-bar__edit" @click="showEditShopModal">

      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />

      <ModalBody
          v-if="showModal"
          z_index="1"
          :footerType="footer"
          :title="this.$t('app.general.edit').replace('%s',this.shop_name)"
          :footerText="$t('app.general.save')"
          @clickedSave="editShopSubmit"
          @close="closePopup">

        <template slot="subheading"></template>

        <template slot="modal-content">
          <div v-if="isLoading">
            <LoadingAnimation/>
          </div>

          <div v-if="!isLoading">
            <div v-if="!image" class="round-button round-button--upload">
              <input type="file"
                     id="product-thumbnail"
                     class="input__file"
                     name="product-thumbnail"
                     accept="image/png, image/jpeg, image/tiff, image/gif"
                     @change="onFileChange" />
            </div>
            <div class="list-bar list-bar__product-image list-bar__product-image--large" :style="{'background-image': 'url(' + updated_image + ')'}">
              <div v-if="image" class="round-button round-button--edit-image">
                <input type="file"
                       id="product-thumbnail"
                       class="input__file"
                       name="product-thumbnail"
                       accept="image/png, image/jpeg, image/tiff, image/gif"
                       @change="onFileChange" />
              </div>
            </div>

            <!-- shop name input -->
            <input
                  type="text"
                  class="list-bar input-text"
                  v-model="shop_name"
                  :placeholder="$t('app.shops.shop_name')">
            </input>

            <input
                  type="text"
                  class="list-bar input-text"
                  v-model="shop_domain"
                  :placeholder="$t('app.shops.shop_domain')">
            </input>

            <div v-if="shopDomainIsValid" class="list-bar" :class="{'list-bar--warning': true}">
              <div class="list-bar__text-container"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->

                <h5 class="list-bar__title">{{$t('app.shops.create_cname')}} <b :class="{'list-bar__sub-heading--warning': true}">{{shop_domain}}</b></h5>
                <h5 class="list-bar__title">{{$t('app.shops.set_it_as')}} <b :class="{'list-bar__sub-heading--warning': true}">{{shop_url}}</b></h5>

              </div>

            </div>

            <div class="list-bar">
              <div class="list-bar__text-container">
                <h5 class="list-bar__title">{{ $t('app.shops.enable_landing_page') }}</h5>
              </div>

              <input class="list-bar__tick-box__input"
                     :id="shop_name + 'landingpage'"
                     type="checkbox" name="landingpage"
                     v-model="landingPageIsActive"
                     >

              <label class="list-bar__tick-box__label"
                     :for="shop_name + 'landingpage'"
                     title="Toggle landing page status"

                     >
                     &nbsp;
              </label>
            </div>

            <div class="list-bar">
              <div class="list-bar__text-container">
                <h5 class="list-bar__title">{{ $t('app.shops.enable_videos_page') }}</h5>
              </div>

              <input class="list-bar__tick-box__input"
                     :id="shop_name + 'videos'"
                     type="checkbox" name="landingpage"
                     v-model="videosPageIsActive"
                     >

              <label class="list-bar__tick-box__label"
                     :for="shop_name + 'videos'"
                     title="Toggle videos page status"

                     >
                     &nbsp;
              </label>
            </div>


            <div class="list-bar">
              <div class="list-bar__text-container">
                <h5 class="list-bar__title">{{ $t('app.shops.enable_machine_service') }}</h5>
              </div>

              <input class="list-bar__tick-box__input"
                     :id="shop_name + 'machine-service'"
                     type="checkbox" name="machine-service"
                     v-model="machineServiceIsActive"
                     >

              <label class="list-bar__tick-box__label"
                     :for="shop_name + 'machine-service'"
                     title="Toggle landing page status"

                     >
                     &nbsp;
              </label>
            </div>

            <input
                  type="text"
                  class="list-bar input-text"
                  v-model="machineServiceTitle"
                  :placeholder="$t('app.shops.machine_service_title')">
            </input>

            <input
                  type="text"
                  class="list-bar input-text"
                  v-model="machineServiceHeading"
                  :placeholder="$t('app.shops.machine_service_heading')">
            </input>

            <input
                  type="text"
                  class="list-bar input-text"
                  v-model="machineServiceButton"
                  :placeholder="$t('app.shops.machine_service_button')">
            </input>


            <div class="list-bar">
              <div class="list-bar__text-container">
                <h5 class="list-bar__title">{{ $t('app.shops.enable_recurring_orders') }}</h5>
              </div>

              <input class="list-bar__tick-box__input"
                     :id="shop_name + 'recurring-orders'"
                     type="checkbox" name="recurring-orders"
                     v-model="allowRecurringOrders"
                     >

              <label class="list-bar__tick-box__label"
                     :for="shop_name + 'recurring-orders'"
                     title="Toggle landing page status"

                     >
                     &nbsp;
              </label>
            </div>




            <!-- delivery frequency dropdown -->
            <select v-model="deliveryFrequency"
                    @change="changeDeliveryFrequency"
                    id="delivery-frequency"
                    class="list-bar input__selector"
                    value="1">
              <option v-for="frequency in deliveryFrequencies" :value="frequency.value"> {{frequency.text}} </option>
            </select>

            <div v-if="deliveryFrequency == 'weekly'" class="list-bar">
            <DailyCalendar @updateSelectedDays="updateSelectedDays" :selectedDays="orderDates" />
            </div>

            <!-- delivery timeframe on the delivery day with toggle -->

            <div class="list-bar">
              <div class="list-bar__text-container">
                <h5 class="list-bar__title">{{ $t('app.shops.enable_delivery_time_for_customer') }}</h5>
              </div>

              <input class="list-bar__tick-box__input"
                     :id="shop_name + 'deliveryTime'"
                     type="checkbox" name="showtime"
                     v-model="showDeliveryTime"
                     >

              <label class="list-bar__tick-box__label"
                     :for="shop_name + 'deliveryTime'"
                     title="Toggle delivery time"
                     
                     >
                     &nbsp;
              </label>
            </div>

            <div v-if="showDeliveryTime">
              <select v-model="deliveryTimeFrom"
                      id="delivery-time-of-day"
                      class="list-bar input__selector"
                      value="1">
                <option :value="null">{{ this.$t('app.shops.delivery_time_from') }}</option>
                <option v-for="time in 24" :value="time -1">{{ time - 1 < 10 ? '0' + (time - 1)  : time - 1 }}:00</option>
              </select>

              <select v-model="deliveryTimeTo"
                      id="delivery-time-of-day"
                      class="list-bar input__selector"
                      value="1">
                <option :value="null">{{ this.$t('app.shops.delivery_time_to') }}</option>
                <option v-for="time in 24" :value="time -1">{{ time - 1 < 10 ? '0' + (time - 1)  : time - 1 }}:00</option>
              </select>
            </div>

            <!-- Order deadline, in days -->
            <input  class="list-bar input-text"
                    type="number"
                    v-model="orderDeadline"
                    :placeholder="$t('app.shops.order_deadline')">
            </input>


            <!-- orderdeadline, time of day of deadline -->
            <select v-model="orderDeadlineTime"
                    id="order-deadline-time"
                    class="list-bar input__selector"
                    value="1">
              <option :value="null">{{ this.$t('app.shops.order_deadline_time') }}</option>
              <option v-for="time in 24" :value="time">{{ time - 1 }}:00</option>
            </select>


            <input  class="list-bar input-text"
                    type="number"
                    v-model="shippingCost"
                    :placeholder="$t('app.shops.shipping_cost')">
            </input>


            <DeleteButton @was_clicked="deleteShopSubmit()"
                  :prompt="$t('app.general.are_you_sure_cant_undo')"/>


          </div>
        </template>
      </ModalBody>

</div>
</template>

<script>

import {API} from "aws-amplify";
import { Storage } from "aws-amplify";
import uuid from "uuid";

import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'
import DailyCalendar from '~/components/General/DailyCalendar.vue'
import DeleteButton from '~/components/General/DeleteButton.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {

  components: {
    Icon,
    ModalBody,
    DailyCalendar,
    DeleteButton,
    LoadingAnimation
  },

  props: {
    index: {
      type: Number,
      required: true
    },
    shop_id: {
      type: String,
      required: true
    },
    shop_name: {
      type: String,
      required: true
    },
    shop_domain: {
      type: String,
      required:false
    },
    shop_logo: {
      type: String,
      required: true
    },
    delivery_frequency: {
      type: String,
      required: false
    },
    delivery_time_of_day: {
      type: String,
      required: false
    },
    delivery_time_of_day_from: {
      type: String,
      required: false
    },
    delivery_time_of_day_to: {
      type: String,
      required: false
    },
    show_delivery_time: {
      type: String,
      required: false
    },
    show_landing_page: {
      type: String,
      required: false
    },
    show_videos_page: {
      type: String,
      required: false
    },
    order_deadline: {
      type: String,
      required: false
    },
    shipping_cost: {
      type: String,
      required: false
    },
    order_deadline_time: {
      type: String,
      required: false
    },
    machine_service_is_active: {
      type: String,
      required: false
    },
    machine_service_title: {
      type: String,
      required: false
    },
    machine_service_heading: {
      type: String,
      required: false
    },
    machine_service_button: {
      type: String,
      required: false
    },
    allow_recurring_orders: {
      type: String,
      required: false
    },
    order_dates: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      isLoading: false,
      showModal: false,
      shop_url:(process.env.stage === 'dev') ? this.shop_id + '.devshops.kompis.app' : this.shop_id + '.shops.app',
      footer: 'none',
      image:(this.shop_logo) ? this.shop_logo :null,
      updated_image: (this.shop_logo) ? this.shop_logo :null,
      hasImage: false,
      shopName: (this.shop_name) ? this.shop_name : null,
      shopDomain: (this.shop_domain) ? this.shop_domain : null,
      shopDomainIsValid:false,
      modal_title: this.$t('app.general.edit').replace('%s',this.shop_name),
      deliveryFrequency: (this.delivery_frequency)?this.delivery_frequency:null,
      deliveryFrequencies: [
        {
          value: null,
          text: this.$t('app.shops.delivery_frequency')
        },
        {
          value: 'daily',
          text: this.$t('app.shops.daily_delivery')
        },
        {
          value: 'weekly',
          text: this.$t('app.shops.weekly_delivery')
        }
      ],
      showDeliveryTime: (this.show_delivery_time)? this.show_delivery_time: false,
      landingPageIsActive: (this.show_landing_page)? this.show_landing_page: false,
      videosPageIsActive: (this.show_videos_page)? this.show_videos_page: false,
      deliveryTimeFrom: (this.delivery_time_of_day_from)? this.delivery_time_of_day_from: null,
      deliveryTimeTo: (this.delivery_time_of_day_to)? this.delivery_time_of_day_to: null,
      orderDeadline: (this.order_deadline) ? this.order_deadline : null,
      shippingCost:(this.shipping_cost) ? this.shipping_cost : 65,
      orderDeadlineTime: (this.order_deadline_time) ? this.order_deadline_time : null,
      machineServiceIsActive: (this.machine_service_is_active) ? this.machine_service_is_active : false,
      machineServiceTitle: (this.machine_service_title) ? this.machine_service_title : null,
      machineServiceHeading: (this.machine_service_heading) ? this.machine_service_heading : null,
      machineServiceButton: (this.machine_service_button) ? this.machine_service_button : null,
      allowRecurringOrders: (this.allow_recurring_orders) ? this.allow_recurring_orders : false,
      orderDates: (this.order_dates) ? this.order_dates : [],
    }
  },
  created () {

    if (this.shop_domain != null) {

      if (this.CheckIsValidDomain(this.shop_domain)) {
        this.shopDomainIsValid = true
      }
      else {
        this.shopDomainIsValid = false
      }

    }

  },
  computed: {
    compoundProperty(){
      return [this.shop_name,this.shop_domain].join()
    }
  },
  watch: {
    compoundProperty: function() {

      if (this.shop_name != '') {

        this.footer = 'save'
      }
      else {
        this.footer = 'none'
      }

      if (this.shop_domain != null) {

        if (this.CheckIsValidDomain(this.shop_domain)) {
          this.shopDomainIsValid = true
        }
        else {
          this.shopDomainIsValid = false
        }

      }

    },

  },

  methods : {
    CheckIsValidDomain(domain) {
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
    return domain.match(re);
    },
    onFileChange() {
      // console.log('start fileChange', event);
      this.hasImage = true;
      var files = event.target.files || event.dataTransfer.files;
      // console.log('files: ' + files.length);
      if (!files.length){
        // console.log('no file');
        return;
      }
      // console.log('calling createImage()');
      // this.createImage(files[0]);
      this.image = files[0];
      // console.log('image filetype: ' + this.image.type);
      // console.log('end fileChange, calling upload');
      this.uploadProductImage2();
    },


    async uploadProductImage2 () {
      console.log('about to attempt upload', this.hasImage);
      let image_type = this.image.type.split('/')
      image_type = image_type [1]
      const filename = `${Date.now()}-${uuid.v1()}.${image_type}`
      const stored = await Storage.vault.put(filename, this.image, {contentType: this.image.type, level: 'public'})
      this.updated_image = process.env.cdn.URL + stored.key
      console.log('attempted upload', this.hasImage, stored.key, this.image);
      console.log('updated image', this.updated_image);
      // this.image = '';
    },

    changeDeliveryFrequency(){

      if (this.deliveryFrequency == 'daily') {
        this.orderDates = [1,2,3,4,5,6,7]
      }

      if (this.deliveryFrequency == 'weekly') {
      //  this.orderDates = []
      }

    },
    async deleteShopSubmit(event) {

        try {
          this.isLoading = true;
          await this.deleteShop()
          this.reflectShops('del',this.index,null)
          this.mixpanelTrack('Delete Shop: Shops Page');

          this.closePopup();
          this.$notify.success(this.$t('app.shops.shop_deleted').replace('%s',this.shop_name), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.isLoading = false;
          this.$notify.error(this.$t('app.shops.delete_error'), 'success')

        }
    },
    async editShopSubmit(event) {

      if (
          this.shop_name == '' &&
          this.updated_image == '' &&
          this.deliveryFrequency == null &&
          this.deliveryTimeFrom == null &&
          this.deliveryTimeTo == null &&
          this.orderDeadline == null &&
          this.shippingCost == null &&
          this.machineServiceIsActive  == null &&
          this.machineServiceTitle  == null &&
          this.machineServiceHeading  == null &&
          this.machineServiceButton  == null &&
          this.allowRecurringOrders  == null &&
          this.orderDeadlineTime  == null

        )
      {
        return
      }

      try {

        this.isLoading = true;

         await this.updateShop({
          objectName: this.shop_name,
          objectDomain: this.shop_domain,
          objectLogo:this.updated_image,
          deliveryFrequency: this.deliveryFrequency,
          deliveryTimeFrom: this.deliveryTimeFrom,
          deliveryTimeTo: this.deliveryTimeTo,
          orderDeadline: this.orderDeadline,
          shippingCost:this.shippingCost,
          orderDeadlineTime: this.orderDeadlineTime,
          showDeliveryTime:this.showDeliveryTime,
          landingPageIsActive:this.landingPageIsActive,
          videosPageIsActive:this.videosPageIsActive,
          orderDates: this.orderDates,
          machineServiceIsActive: this.machineServiceIsActive,
          machineServiceTitle: this.machineServiceTitle,
          machineServiceHeading: this.machineServiceHeading,
          machineServiceButton: this.machineServiceButton,
          allowRecurringOrders: this.allowRecurringOrders
        });

        this.mixpanelTrack('Edit Shop: Shops Page', {
          'Shop Url' : this.shop_url,
          'Delivery Frequency':this.deliveryFrequency,
          'Delivery Time From':this.deliveryTimeFrom,
          'Delivery Time To':this.deliveryTimeTo,
          'Order Deadline':this.orderDeadline,
          'Shipping Cost':this.shippingCost,
          'Order Deadline Time':this.orderDeadlineTime,
          'Landing Page Is Active':this.landingPageIsActive,
          'Videos Page Is Active':this.videosPageIsActive,
          'Order Dates':this.orderDates,
          'Machine Service Is Active':this.machineServiceIsActive,
          'Allow Recurring Orders':this.allowRecurringOrders
        });

        this.reflectShops('put',this.index,{
          objectId: this.shop_id,
          objectName: this.shop_name,
          objectDomain: this.shop_domain,
          objectLogo:this.updated_image,
          deliveryFrequency: this.deliveryFrequency,
          deliveryTimeFrom: this.deliveryTimeFrom,
          deliveryTimeTo: this.deliveryTimeTo,
          orderDeadline: this.orderDeadline,
          shippingCost:this.shippingCost,
          orderDeadlineTime: this.orderDeadlineTime,
          showDeliveryTime:this.showDeliveryTime,
          landingPageIsActive:this.landingPageIsActive,
          videosPageIsActive:this.videosPageIsActive,
          orderDates: this.orderDates,
          machineServiceIsActive: this.machineServiceIsActive,
          machineServiceTitle: this.machineServiceTitle,
          machineServiceHeading: this.machineServiceHeading,
          machineServiceButton: this.machineServiceButton,
          allowRecurringOrders: this.allowRecurringOrders
        })

        this.$notify.success(this.$t('app.shops.shop_updated').replace('%s',this.shop_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.shops.update_error'), 'success')

      }

      // this.$refs.editShopModal.hide()
      this.closePopup();
      this.isLoading = false

    },
    updateShop(shop) {

      return API.put("metamat", "/shops/"+this.shop_id, {
        body: shop
      });
    },

    listShops() {
      this.$emit('listShops')
    },

    updateSelectedDays (days) {

      this.orderDates = days

    },

    deleteShop() {
      return API.del("metamat", "/shops/" + this.shop_id);
    },
    showEditShopModal(){
      // this.$refs.editShopModal.show()
      this.mixpanelTrack('Click: Shops Page - Edit Shop Modal');
      this.$store.dispatch('lockBody');
      this.showModal = true;
      this.changeDeliveryFrequency()
      this.footer = 'save';
    },
    closePopup(){
      // console.log('clicked close');
      this.$store.dispatch('freeBody');
      this.showModal = false;
      // console.log('showModal: ' + this.showModal);
    },
  }
}

</script>
