<template lang="html">
  <div class="shop">
    <h2 class="app-ui-overlay__page-title">{{$t('app.menu.company.landing_page_settings')}}</h2>

    <p class="app-ui-overlay__section-title
            u-text-align-center"> {{$t(`app.customer_landing_page.cta_button_text`)}} <p/>

    <div class="list-bar">
      <h5 class="list-bar__title">{{this.cta_button_top_text}}</h5>
      <EditCTAButtonTextModal v-if ="!isLoading"
      name="cta_button_top"
      :text_prop="this.cta_button_top_text"
      :is_active_prop="this.cta_button_top_is_active"
      @updateLandingPageCTAButtonSettings="updateCTAtop($event)"
      />
    </div>

    <div class="list-bar">
      <h5 class="list-bar__title">{{this.cta_button_bottom_text}}</h5>
      <EditCTAButtonTextModal v-if ="!isLoading"
      name="cta_button_bottom"
      :text_prop="this.cta_button_bottom_text"
      :is_active_prop="this.cta_button_bottom_is_active"
      @updateLandingPageCTAButtonSettings="updateCTAbottom($event)"
      />
    </div>

    <p class="app-ui-overlay__section-title
            u-text-align-center"> {{$t(`app.customer_landing_page.page_header_1`)}} <p/>

    <div class="list-bar">
      <h5 class="list-bar__title">{{this.heading}}</h5>
      <EditPageHeaderModal
      v-if ="!isLoading"
      :heading_prop="heading"
      @updateLandingPageHeader="updateHeader($event)"
      />
    </div>

    <p class="app-ui-overlay__section-title
            u-text-align-center"> {{$t(`app.customer_landing_page.weekdays`)}} <p/>

            <div class="list-bar">
              <h5 class="list-bar__title">{{$t(`app.customer_landing_page.weekdays`)}}</h5>
              <EditDaysSettingsModal
              v-if ="!isLoading"
              :is_active_prop="days_is_active"
              @updateDaysSettings="updateDaysSettings($event)"
              />
            </div>


    <div v-for="(day, index) in days"class="list-bar">
      <div class="list-bar__product-text">
        <div class="list-bar__product-heading-and-edit">
          <h5 class="list-bar__product-title">{{$t(`app.general.days_of_the_week.${day.name}`)}}</h5>
          <EditWeekDayModal
          v-if ="!isLoading"
          :name_prop="day.name"
                            :isOpen_prop="day.isOpen"
                            :heading_prop="day.heading"
                            :description_prop="day.description"
                            :allergens_prop="day.allergens"
                            @updateLandingPageWeeklySettings="updateLandingPageWeeklySettings"
                            />
        </div>
        <div v-if="day.isOpen">
          <p class="list-bar__sub-heading">{{day.heading}}</p>
          <p class="list-bar__info">{{day.description}}</p>
          <br>
          <p class="list-bar__sub-heading">{{$t(`app.customer_landing_page.allergens_noun`)}}</p>

          <p v-for="allergen in day.allergens" v-if="allergen.value"class="list-bar__info">{{$t(`app.customer_landing_page.allergens.${allergen.name}`)}}</p>
        </div>
        <p v-if="!day.isOpen" class="list-bar__sub-heading">Closed</p>
      </div>
    </div>

    <p class="app-ui-overlay__section-title
            u-text-align-center">{{$t(`app.customer_landing_page.text_for_every_day`)}}<p/>

    <div class="list-bar">
      <div class="list-bar__product-text">
        <div class="list-bar__product-heading-and-edit">
          <h5 class="list-bar__product-title">{{extra_day.heading}}</h5>
          <EditExtraDayModal
            v-if ="!isLoading"
            :heading_prop="extra_day.heading"
                            :description_prop="extra_day.description"
                            @updateLandingPageExtraDaySettings="updateLandingPageExtraDaySettings($event)"
                            />
        </div>
        <p v-html="extra_day.description" class="list-bar__sub-heading"></p>
      </div>
    </div>

    <p class="app-ui-overlay__section-title
            u-text-align-center"> {{$t(`app.customer_landing_page.about_us_text`)}} <p/>

    <div class="list-bar">
      <div class="list-bar__product-text">
        <div class="list-bar__product-heading-and-edit"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
          <h5 class="list-bar__product-title">{{about_us_heading}}</h5>
          <EditPageAboutUsModal
                               v-if ="!isLoading"
                               :heading_prop="this.about_us_heading"
                               :text_prop="this.about_us_text"
                               @updateLandingAboutUs="updateAboutUs($event)"/>
        </div>
        <p v-html="about_us_text" class="list-bar__sub-heading"></p>
      </div>
    </div>

    <p class="app-ui-overlay__section-title
            u-text-align-center"> {{$t(`app.customer_landing_page.contact_us_text`)}} <p/>

    <div class="list-bar">
      <div class="list-bar__product-text">
        <div class="list-bar__product-heading-and-edit"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
          <h5 class="list-bar__title">{{contact_us_heading}}</h5>
          <EditPageContactUsModal
                               v-if ="!isLoading"
                               :heading_prop="this.contact_us_heading"
                               :address_prop="this.contact_us_address"
                               :email_prop="this.contact_us_email"
                               :phone_prop="this.contact_us_phone"
                               @updateLandingContactUs="updateContactUs($event)"/>
        </div>
        <p class="list-bar__sub-heading">{{contact_us_email}}</p>
        <p class="list-bar__sub-heading">{{contact_us_phone}}</p>
        <p v-html="contact_us_address" class="list-bar__sub-heading"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    API
  } from "aws-amplify";

  import EditCTAButtonTextModal from '~/components/CustomerLandingPage/EditCTAButtonTextModal.vue'
  import EditWeekDayModal from '~/components/CustomerLandingPage/EditWeekDayModal.vue'
  import EditExtraDayModal from '~/components/CustomerLandingPage/EditExtraDayModal.vue'
  import EditPageHeaderModal from '~/components/CustomerLandingPage/EditPageHeaderModal.vue'
  import EditPageAboutUsModal from '~/components/CustomerLandingPage/EditPageAboutUsModal.vue'
  import EditPageContactUsModal from '~/components/CustomerLandingPage/EditPageContactUsModal.vue'
  import EditDaysSettingsModal from '~/components/CustomerLandingPage/EditDaysSettingsModal.vue'


  export default {
    components: {
      EditWeekDayModal,
      EditExtraDayModal,
      EditCTAButtonTextModal,
      EditPageHeaderModal,
      EditPageAboutUsModal,
      EditPageContactUsModal,
      EditDaysSettingsModal
    },
    data(){
      return {
        index:null,
        isLoading:true,
        shop_id : this.$route.params.shopId,
        shop:{},
        days: [],
        extra_day: {
          heading: this.$t(`app.customer_landing_page.every_day`),
          description: 'description'
        },
        cta_button_top_text: 'Butt',
        cta_button_bottom_text: 'Butt',
        cta_button_top_is_active: false,
        cta_button_bottom_is_active: false,
        days_is_active:false,
        heading: null,
        about_us_heading: null,
        about_us_text: null,
        contact_us_heading:null,
        contact_us_address: null,
        contact_us_email: null,
        contact_us_phone: null
      }
    },
    async created () {

      this.mixpanelTrack('Page View: Shop Landing Page Settings');
      this.isLoading = true
      await this.listShops()

      for (var x in this.shops) {

        if (this.shop_id == this.shops[x].objectId) {
          this.shop = this.shops[x]
          this.index = x
        }
      }

      if (this.shop.objectLandingPageSettings) {
        this.days = (this.shop.objectLandingPageSettings.days) ? this.shop.objectLandingPageSettings.days : []
        this.heading = (this.shop.objectLandingPageSettings.heading)?this.shop.objectLandingPageSettings.heading:null
        this.about_us_heading = (this.shop.objectLandingPageSettings.about_us_heading)?this.shop.objectLandingPageSettings.about_us_heading:null
        this.about_us_text = (this.shop.objectLandingPageSettings.about_us_text)?this.shop.objectLandingPageSettings.about_us_text:null
        this.contact_us_heading = (this.shop.objectLandingPageSettings.contact_us_heading)?this.shop.objectLandingPageSettings.contact_us_heading:null
        this.contact_us_address = (this.shop.objectLandingPageSettings.contact_us_address)?this.shop.objectLandingPageSettings.contact_us_address:null
        this.contact_us_email = (this.shop.objectLandingPageSettings.contact_us_email)?this.shop.objectLandingPageSettings.contact_us_email:null
        this.contact_us_phone = (this.shop.objectLandingPageSettings.contact_us_phone)?this.shop.objectLandingPageSettings.contact_us_phone:null

        this.extra_day = {
          heading:(this.shop.objectLandingPageSettings.extra_day)?this.shop.objectLandingPageSettings.extra_day.heading:null ,
          description: (this.shop.objectLandingPageSettings.extra_day)?this.shop.objectLandingPageSettings.extra_day.description:null
        }
        this.cta_button_top_text = (this.shop.objectLandingPageSettings.cta_button_top_text)?this.shop.objectLandingPageSettings.cta_button_top_text:null
        this.cta_button_top_is_active = (this.shop.objectLandingPageSettings.cta_button_top_is_active)?this.shop.objectLandingPageSettings.cta_button_top_is_active:false
        this.cta_button_bottom_text = (this.shop.objectLandingPageSettings.cta_button_bottom_text)?this.shop.objectLandingPageSettings.cta_button_bottom_text:null
        this.cta_button_bottom_is_active = (this.shop.objectLandingPageSettings.cta_button_bottom_is_active)?this.shop.objectLandingPageSettings.cta_button_bottom_is_active:false
        this.days_is_active = (this.shop.objectLandingPageSettings.days_is_active)?this.shop.objectLandingPageSettings.days_is_active:false
      }

      else {

        let days_indexes = ['mon','tue','wed','thu','fri','sat','sun']

        for (var x in days_indexes) {
          this.days.push({
            name: days_indexes[x],
            isOpen: true,
            heading: null,
            description: null,
            allergens: [
              {name: 'soy', value: false},
              {name: 'gluten', value: false},
              {name: 'milk', value: false},
              {name: 'peanuts', value: false},
              {name: 'eggs', value: false},
              {name: 'fish', value: false},
              {name: 'nuts', value: false},
              {name: 'shellfish', value: false},
              {name: 'celery', value: false},
              {name: 'mustard', value: false},
              {name: 'sesamy_seeds', value: false},
              {name: 'sulfites', value: false},
              {name: 'invertebrates', value: false},
            ]
          })
        }
      }
      this.isLoading = false
    },
    methods: {

      async saveLandingPageSettings() {

        await API.put("metamat", "/shops/landing-page-settings/"+this.shop_id, {
          body: {
            objectLandingPageSettings: {
              days:this.days,
              heading: this.heading,
              about_us_heading:this.about_us_heading,
              about_us_text:(this.about_us_text) ? this.about_us_text.replace(/(?:\r\n|\r|\n)/g, '<br />') : null,
              contact_us_heading:this.contact_us_heading,
              contact_us_address:(this.contact_us_address)?this.contact_us_address.replace(/(?:\r\n|\r|\n)/g, '<br />'):null,
              contact_us_phone:this.contact_us_phone,
              contact_us_email:this.contact_us_email,
              extra_day: this.extra_day,
              cta_button_top_text:this.cta_button_top_text,
              cta_button_top_is_active:this.cta_button_top_is_active,
              cta_button_bottom_text:this.cta_button_bottom_text,
              cta_button_bottom_is_active:this.cta_button_bottom_is_active,
              days_is_active:this.days_is_active,

            }
          }
        });

        this.reflectShops('put',this.index,{
          objectId: this.shop.objectId,
          objectName: this.shop.objectName,
          deliveryFrequency: this.shop.deliveryFrequency,
          deliveryTimeFrom: this.shop.deliveryTimeFrom,
          deliveryTimeTo: this.shop.deliveryTimeTo,
          orderDeadline: this.shop.orderDeadline,
          orderDeadlineTime: this.shop.orderDeadlineTime,
          showDeliveryTime:this.shop.showDeliveryTime,
          landingPageIsActive:this.shop.landingPageIsActive,
          videosPageIsActive:this.shop.videosPageIsActive,
          orderDates: this.shop.orderDates,
          objectLandingPageSettings:{
            days:this.days,
            heading: this.heading,
            about_us_heading:this.about_us_heading,
            about_us_text:(this.about_us_text)? this.about_us_text.replace(/(?:\r\n|\r|\n)/g, '<br />') : null,
            contact_us_heading:this.contact_us_heading,
            contact_us_address:(this.contact_us_address)?this.contact_us_address.replace(/(?:\r\n|\r|\n)/g, '<br />'):null,
            contact_us_phone:this.contact_us_phone,
            contact_us_email:this.contact_us_email,
            extra_day: this.extra_day,
            cta_button_top_text:this.cta_button_top_text,
            cta_button_top_is_active:this.cta_button_top_is_active,
            cta_button_bottom_text:this.cta_button_bottom_text,
            cta_button_bottom_is_active:this.cta_button_bottom_is_active,
            days_is_active:this.days_is_active,
          }
        })
      },
      async updateLandingPageWeeklySettings(day_settings){

        if (day_settings){
          for (var x in this.days) {
            if (this.days[x].name == day_settings['name']) {

              this.$set(this.days, x, day_settings)

            }
          }
        }

        await this.saveLandingPageSettings()


      },
      async updateCTAtop(event){

        this.cta_button_top_text = event.text
        this.cta_button_top_is_active = event.is_active
        await this.saveLandingPageSettings()

      },

      async updateCTAbottom(event){

        this.cta_button_bottom_text = event.text
        this.cta_button_bottom_is_active = event.is_active
        await this.saveLandingPageSettings()

      },

      async updateHeader(event){

        this.heading = event.heading;
        await this.saveLandingPageSettings()

      },

      async updateDaysSettings(event){

        this.days_is_active = event.is_active;
        await this.saveLandingPageSettings()

      },

      async updateAboutUs(event){

        this.about_us_heading = event.heading;
        this.about_us_text = event.text;
        await this.saveLandingPageSettings()
      },

      async updateContactUs(event){
        this.contact_us_heading = event.heading;
        this.contact_us_address = event.address;
        this.contact_us_phone = event.phone;
        this.contact_us_email = event.email;
        await this.saveLandingPageSettings()
      },

      async updateLandingPageExtraDaySettings(event){

        this.extra_day.heading = event.heading;
        this.extra_day.description = (event.description)?event.description.replace(/(?:\r\n|\r|\n)/g, '<br />'):null;
        await this.saveLandingPageSettings()
      }
    }
  }
</script>

<style lang="css">
</style>
