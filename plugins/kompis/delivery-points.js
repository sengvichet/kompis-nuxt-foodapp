import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      delivery_points: [],
      pageloading: false
    }
  },
  methods: {

    async listDeliveryPoints() {

      if (!this.$store.getters.store_delivery_points.is_set) {

        await API.get("metamat", "/delivery-points/null").then((delivery_points) => {
          this.$store.dispatch('setDeliveryPoints', {
            is_set: true,
            data: delivery_points
          })
        })
      }
      this.delivery_points = this.$store.getters.store_delivery_points.data

      this.pageloading = false
    },

    async reflectDeliveryPoints(op, index, data) {

      let delivery_points = this.$store.getters.store_delivery_points.data

      switch (op) {
        case 'post':
          {
            delivery_points.push(data)
            break;
          }
        case 'put':
          {
            await delivery_points.splice(index, 1);
            await delivery_points.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            delivery_points.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setDeliveryPoints', {
        is_set: true,
        data: delivery_points
      })

    }
  }
})