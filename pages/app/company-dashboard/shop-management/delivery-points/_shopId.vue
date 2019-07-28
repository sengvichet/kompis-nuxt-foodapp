<template>

  <div class="shop">

    <h2 class="app-ui-overlay__page-title">{{$t('app.delivery_points.delivery_points')}}</h2>

    <div>
      <div v-if="pageloading" class="app-ui-overlay__centered-column">
        <LoadingAnimation/>
      </div>

      <DeliveryPoint
            v-if = "!pageloading && shop_id == delivery_point.objectShopId"
            v-for="(delivery_point,index) in delivery_points"
            :index="index"
            :key="delivery_point.objectId"
            :point_id_prop="delivery_point.objectId"
            :point_name_prop="delivery_point.objectName"
            :point_address_prop="delivery_point.objectAddress"
            :point_floor_prop="delivery_point.objectFloor"
            :point_desc_prop="delivery_point.objectDesc"
            :point_shop_id_prop="delivery_point.objectShopId"
        />
      <NewDeliveryPoint
        :shop_id="shop_id"
      />
    </div>
  </div>

</template>

<script>
import DeliveryPoint from '~/components/DeliveryPoints/DeliveryPoint.vue'
import NewDeliveryPoint from '~/components/DeliveryPoints/NewDeliveryPoint.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'



export default {
  components: {
    LoadingAnimation,
    DeliveryPoint,
    NewDeliveryPoint
  },

  data() {
    return {
      pageloading:false,
      shop_id:this.$route.params.shopId
    }
  },

  async created() {

    try {
      this.pageloading = true
      this.mixpanelTrack('Page View: Delivery Points Page');
      await this.listDeliveryPoints();
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }

  }
}
</script>
