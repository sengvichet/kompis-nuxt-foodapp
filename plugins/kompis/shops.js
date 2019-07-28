import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      shops: [],
      pageloading: false
    }
  },
  methods: {

    async listShops() {

      if (!this.$store.getters.store_shops.is_set) {
        await API.get("metamat", "/shops").then((shops) => {
          this.$store.dispatch('setShops', {
            is_set: true,
            data: shops
          })
        })
      }

      this.shops = this.$store.getters.store_shops.data
      this.pageloading = false
    },

    async reflectShops(op, index, data) {

      let shops = this.$store.getters.store_shops.data

      switch (op) {
        case 'post':
          {
            shops.push(data)
            break;
          }
        case 'put':
          {
            await shops.splice(index, 1);
            await shops.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            shops.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setShops', {
        is_set: true,
        data: shops
      })

    }
  }

})