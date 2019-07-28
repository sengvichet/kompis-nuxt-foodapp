<template>
  <div class="list-bar">

    <div class="list-bar__text-container">
      <h5 class="list-bar__title">{{shop_name}}</h5>
    </div>

    <nuxt-link class="list-bar__click-overlay" :to="buildShopUrl()"/>

    <EditShop
    :index="index"
    :shop_id="shop_id"
    :shop_name="shop_name"
    :shop_domain="shop_domain"
    :shop_logo="shop_logo"
    :delivery_frequency="delivery_frequency"
    :delivery_time_of_day_from="delivery_time_of_day_from"
    :delivery_time_of_day_to="delivery_time_of_day_to"
    :order_deadline="order_deadline"
    :shipping_cost="shipping_cost"
    :order_deadline_time="order_deadline_time"
    :show_delivery_time="show_delivery_time"
    :show_landing_page="show_landing_page"
    :show_videos_page="show_videos_page"
    :machine_service_is_active="machine_service_is_active"
    :machine_service_title="machine_service_title"
    :machine_service_heading="machine_service_heading"
    :machine_service_button="machine_service_button"
    :allow_recurring_orders="allow_recurring_orders"
    :order_dates="order_dates"
    />

    <a href="#" class="list-bar__icon">
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </a>
  </div>
</template>


<script>
import {
  API
} from "aws-amplify";

import EditShop from '~/components/Shops/EditShop.vue'

export default {

  components: {
    EditShop
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    shop_id_prop: {
      type: String,
      required: true
    },
    shop_name_prop: {
      type: String,
      required: true
    },
    shop_domain_prop: {
      type: String,
      required: false
    },
    shop_logo_prop: {
      type: String,
      required: true
    },
    shop_name_prop: {
      type: String,
      required: false
    },
    delivery_frequency_prop: {
      type: String,
      required: false
    },
    delivery_time_of_day_from_prop: {
      type: String,
      required: false
    },
    delivery_time_of_day_to_prop: {
      type: String,
      required: false
    },
    show_delivery_time_prop: {
      type: String,
      required: false
    },
    show_landing_page_prop: {
      type: String,
      required: false
    },
    show_videos_page_prop: {
      type: String,
      required: false
    },
    order_deadline_prop: {
      type: String,
      required: false
    },
    shipping_cost_prop: {
      type: String,
      required: false
    },
    order_deadline_time_prop: {
      type: String,
      required: false
    },
    machine_service_is_active_prop: {
      type: String,
      required: false
    },
    machine_service_title_prop: {
      type: String,
      required: false
    },
    machine_service_heading_prop: {
      type: String,
      required: false
    },
    machine_service_button_prop: {
      type: String,
      required: false
    },
    allow_recurring_orders_prop: {
      type: String,
      required: false
    },
    order_dates_prop: {
      type: Array,
      required: false
    }
  },
  data () {

    return {
      shop_id: this.shop_id_prop,
      shop_name: this.shop_name_prop,
      shop_domain: this.shop_domain_prop,
      shop_logo: this.shop_logo_prop,
      delivery_frequency:(this.delivery_frequency_prop)? this.delivery_frequency_prop:null,
      delivery_time_of_day_from:(this.delivery_time_of_day_from_prop) ? this.delivery_time_of_day_from_prop :null,
      delivery_time_of_day_to:(this.delivery_time_of_day_to_prop) ? this.delivery_time_of_day_to_prop :null,
      show_delivery_time:(this.show_delivery_time_prop) ? this.show_delivery_time_prop : null,
      show_landing_page:(this.show_landing_page_prop) ? this.show_landing_page_prop : null,
      show_videos_page:(this.show_videos_page_prop) ? this.show_videos_page_prop : null,
      order_deadline:(this.order_deadline_prop) ? this.order_deadline_prop : null,
      shipping_cost:(this.shipping_cost_prop) ? this.shipping_cost_prop : 65,
      order_deadline_time: (this.order_deadline_time_prop) ? this.order_deadline_time_prop : null ,
      machine_service_is_active: (this.machine_service_is_active_prop) ? this.machine_service_is_active_prop : null ,
      machine_service_title: (this.machine_service_title_prop) ? this.machine_service_title_prop : null ,
      machine_service_heading: (this.machine_service_heading_prop) ? this.machine_service_heading_prop : null ,
      machine_service_button: (this.machine_service_button_prop) ? this.machine_service_button_prop : null ,
      allow_recurring_orders: (this.allow_recurring_orders_prop) ? this.allow_recurring_orders_prop : null ,
      order_dates: (this.order_dates_prop) ? this.order_dates_prop : []
    }
  },
  methods : {
    buildShopUrl() {
      let lang_prefix = ''
      let current_lang = this.$store.getters.user_lang.current_lang

      if (current_lang == 'en') {
        lang_prefix = '/en'
      }
      return lang_prefix+'/app/company-dashboard/menu/shop-management/'+this.shop_id
    }
  }

}
</script>
