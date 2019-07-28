<template>

  <div class="list-bar">
    <div class="list-bar__text-container">
      <h5 class="list-bar__title">{{point_name}}</h5>
    </div>
    <div class="list-bar__icon">
      <EditDeliveryPoint
      :point_id="point_id"
      :index="index"
      :point_name="point_name"
      :point_address="point_address"
      :point_floor="point_floor"
      :point_desc="point_desc"
      :point_shop_id_prop="point_shop_id_prop"
      />
    </div>
  </div>

</template>


<script>
import {
  API
} from "aws-amplify";

import EditDeliveryPoint from '~/components/DeliveryPoints/EditDeliveryPoint.vue'

export default {

  components: {
    EditDeliveryPoint
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    point_id_prop: {
      type: String,
      required: true
    },
    point_name_prop: {
      type: String,
      required: true
    },
    point_address_prop: {
      type: String,
      required: true
    },
    point_floor_prop: {
      type: String,
      required: true
    },
    point_desc_prop: {
      type: String,
      required: true
    },
    point_shop_id_prop : {
      type: String,
      required: true
    }
  },
  data () {

    return {
      point_id: this.point_id_prop,
      point_name: this.point_name_prop,
      point_address: this.point_address_prop,
      point_floor: this.point_floor_prop,
      point_desc: this.point_desc_prop,
    }
  }
}
</script>
