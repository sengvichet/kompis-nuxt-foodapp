import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      devices: [],
      pageloading: false
    }
  },
  methods: {

    async listDevices() {

      if (!this.$store.getters.store_devices.is_set) {

        await API.get("metamat", "/devices/null").then((devices) => {
          this.$store.dispatch('setDevices', {
            is_set: true,
            data: devices
          })
        })
      }
      this.devices = this.$store.getters.store_devices.data

      this.pageloading = false
    },

    async reflectDevices(op, index, data) {

      let devices = this.$store.getters.store_devices.data

      switch (op) {
        case 'post':
          {
            devices.push(data)
            break;
          }
        case 'put':
          {
            await devices.splice(index, 1);
            await devices.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            devices.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setDevices', {
        is_set: true,
        data: devices
      })

    }
  }
})