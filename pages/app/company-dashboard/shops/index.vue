<template>

  <div class="shop">

    <h2 class="app-ui-overlay__page-title">{{$t('app.shops.shops')}}</h2>
    <div>
      <div v-if="pageloading" class="app-ui-overlay__centered-column">
        <LoadingAnimation/>
      </div>
      <Shop
            v-if = "!pageloading"
            v-for="(shop,index) in shops"
            :index="index"
            :key="shop.objectId"
            :shop_id_prop="shop.objectId"
            :shop_name_prop="shop.objectName"
            :shop_domain_prop="shop.objectDomain"
            :shop_logo_prop="shop.objectLogo"
            :delivery_frequency_prop="shop.deliveryFrequency"
            :delivery_time_of_day_from_prop="shop.deliveryTimeFrom"
            :delivery_time_of_day_to_prop="shop.deliveryTimeTo"
            :show_delivery_time_prop="shop.showDeliveryTime"
            :show_landing_page_prop="shop.landingPageIsActive"
            :show_videos_page_prop="shop.videosPageIsActive"
            :order_deadline_prop="shop.orderDeadline"
            :shipping_cost_prop="shop.shippingCost"
            :order_deadline_time_prop="shop.orderDeadlineTime"
            :machine_service_is_active_prop="shop.machineServiceIsActive"
            :machine_service_title_prop="shop.machineServiceTitle"
            :machine_service_heading_prop="shop.machineServiceHeading"
            :machine_service_button_prop="shop.machineServiceButton"
            :allow_recurring_orders_prop="shop.allowRecurringOrders"
            :order_dates_prop="shop.orderDates"
        />
      <NewShop/>
    </div>
  </div>

</template>

<script>
import Shop from '~/components/Shops/Shop.vue'
import NewShop from '~/components/Shops/NewShop.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {

  components: {
    Shop,
    NewShop,
    LoadingAnimation
  },

  data() {
    return {
      pageloading:false
    }
  },

  async created() {

    try {
      this.pageloading = true
      this.mixpanelTrack('Page View: Shops Page');
      await this.listShops();
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }
  }
}
</script>
