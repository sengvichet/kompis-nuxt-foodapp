<template>
  <div class="list-bar draggable">
    <div class="list-bar__text-container">
      <h5 class="list-bar__title"> {{category_name}} </h5>
    </div>
    <div class="list-bar__icon">
      <EditCategory
      :index="index" 
      :category_id="category_id"
      :category_name="category_name"
      :category_status="category_status"
      :category_shop_id_prop="category_shop_id_prop"
      />
    </div>
  </div>


</template>


<script>
import {
  API
} from "aws-amplify";

import EditCategory from '~/components/Categories/EditCategory.vue'

export default {

  components: {
    EditCategory
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    category_id_prop: {
      type: String,
      required: true
    },
    category_name_prop: {
      type: String,
      required: true
    },
    category_status_prop: {
      type: String,
      required: false
    },
    category_shop_id_prop : {
      type: String,
      required: true
    }
  },
  data () {

    return {
      category_id: this.category_id_prop,
      category_name: this.category_name_prop,
      category_status: this.category_status_prop
    }
  }
}
</script>
