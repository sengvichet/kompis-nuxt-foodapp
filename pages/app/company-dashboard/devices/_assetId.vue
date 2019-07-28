<template>

  <div class="shop">

  <h2 class="app-ui-overlay__page-title">{{$t('app.devices.devices')}}</h2>

  <div>
  <div v-if="pageloading" class="app-ui-overlay__centered-column">
    <LoadingAnimation/>
  </div>
  <Device
        v-if = "!pageloading && location_id == device.objectParent"
        v-for="(device,index) in devices"
        :index="index"
        :key="device.objectId"
        :device_id_prop="device.objectId"
        :device_name_prop="device.objectName"
        :device_type_prop="device.objectKind"
        :device_parent_prop="device.objectParent"
    />

  <NewDevice/>
</div>
  </div>

</template>

<script>

import Device from '~/components/Devices/Device.vue'
import NewDevice from '~/components/Devices/NewDevice.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {

  components: {
    Device,
    NewDevice,
    LoadingAnimation
  },

  data() {
    return {
      pageloading:false,
      location_id:this.$route.params.assetId
    }
  },
  async created() {

    try {
      this.mixpanelTrack('Page View: Devices Page');
      this.pageloading = true
      await this.listDevices();
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }

  }
}
</script>
