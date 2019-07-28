import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      assets: [],
      pageloading: false
    }
  },
  methods: {

    async listAssets() {

      if (!this.$store.getters.store_locations.is_set) {
        await API.get("metamat", "/assets").then((assets) => {
          this.$store.dispatch('setLocations', {
            is_set: true,
            data: assets
          })
        })
      }

      this.assets = this.$store.getters.store_locations.data
      this.pageloading = false
    },

    async reflectAssets(op, index, data) {

      let assets = this.$store.getters.store_locations.data

      switch (op) {
        case 'post':
          {
            assets.push(data)
            break;
          }
        case 'put':
          {
            await assets.splice(index, 1);
            await assets.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            assets.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setLocations', {
        is_set: true,
        data: assets
      })

    }
  }

})