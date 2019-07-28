import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      categories: [],
      pageloading: false
    }
  },
  methods: {

    async listCategories() {

      if (!this.$store.getters.store_categories.is_set) {

        await API.get("metamat", "/categories/null").then((categories) => {
          this.$store.dispatch('setCategories', {
            is_set: true,
            data: categories
          })
        })
      }
      this.categories = this.$store.getters.store_categories.data

      this.pageloading = false
    },

    async reflectCategories(op, index, data) {

      let categories = this.$store.getters.store_categories.data

      switch (op) {
        case 'post':
          {
            categories.push(data)
            break;
          }
        case 'put':
          {
            await categories.splice(index, 1);
            await categories.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            categories.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setCategories', {
        is_set: true,
        data: categories
      })

    }
  }
})