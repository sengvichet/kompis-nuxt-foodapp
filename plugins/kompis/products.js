import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      products: [],
      pageloading: false
    }
  },
  methods: {

    async listProducts() {

      if (!this.$store.getters.store_products.is_set) {

        await API.get("metamat", "/products/null").then((products) => {
          this.$store.dispatch('setProducts', {
            is_set: true,
            data: products
          })
        })
      }
      this.products = this.$store.getters.store_products.data

      this.pageloading = false
    },

    async reflectProducts(op, index, data) {

      let products = this.$store.getters.store_products.data

      switch (op) {
        case 'post':
          {
            products.push(data)
            break;
          }
        case 'put':
          {
            await products.splice(index, 1);
            await products.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            products.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setProducts', {
        is_set: true,
        data: products
      })

    }
  }
})