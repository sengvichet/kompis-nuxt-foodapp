<template>
  <div class="list-bar">
      <div class="list-bar__text-container">
        <h5 class="list-bar__title"> {{device_name}} </h5>
      </div>
    <div class="list-bar__icon">
      <EditDevice
      :index="index"
      :device_id="device_id"
      :device_name="device_name"
      :device_type="device_type"
      :device_parent="device_parent"
      />
    </div>
  </div>

</template>


<script>
import {
  API
} from "aws-amplify";

import EditDevice from '~/components/Devices/EditDevice.vue'

export default {

  components: {
    EditDevice
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    device_id_prop: {
      type: String,
      required: true
    },
    device_name_prop: {
      type: String,
      required: true
    },
    device_type_prop: {
      type: String,
      required: true
    },
    device_parent_prop: {
      type: String,
      required: true
    }
  },
  data () {

    return {
      device_id: this.device_id_prop,
      device_name: this.device_name_prop,
      device_type: this.device_type_prop,
      device_parent: this.device_parent_prop,
    }
  }
}
</script>
