<template>

  <div class="list-bar list-bar__product draggable">
    <div class="list-bar__product-image" :style="{'background-image': 'url(' + this.product_image_prop + ')' }"></div>
    <div class="list-bar__product-text">
      <div class="list-bar__product-heading-and-edit">
        <h5 class="list-bar__product-title">{{product_name}}</h5>
        <EditProduct
        :index="index"
        :product_id="product_id"
        :product_name="product_name"
        :product_desc="product_desc"
        :product_price="product_price"
        :product_minimum_order_quantity="product_minimum_order_quantity"
        :product_image="product_image"
        :product_category="product_category"
        :product_location="product_location"
        :product_shop_id_prop="product_shop_id_prop"
        :categories_prop="categories_prop"
        :locations_prop="locations_prop"
        />
      </div>
      <p class="list-bar__product-description">{{product_desc}}</p>
    </div>
  </div>

</template>


<script>
import {
  API
} from "aws-amplify";

import EditProduct from '~/components/Products/EditProduct.vue'

export default {

  components: {
    EditProduct
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    product_id_prop: {
      type: String,
      required: true
    },
    product_name_prop: {
      type: String,
      required: true
    },
    product_desc_prop: {
      type: String,
      required: true
    },
    product_price_prop: {
      type: String,
      required: true
    },
    product_minimum_order_quantity_prop: {
      type:String,
      required:true
    },
    product_image_prop: {
      type: String,
      required: true
    },
    product_category_prop: {
      type: String,
      required: true
    },
    product_location_prop: {
      type: String,
      required: true
    },
    categories_prop: {
      type:Array
    },
    locations_prop: {
      type:Array
    },
    product_shop_id_prop : {
      type: String,
      required: true
    }
  },
  data () {

    return {
      product_id: this.product_id_prop,
      product_name: this.product_name_prop,
      product_price: this.product_price_prop,
      product_minimum_order_quantity:this.product_minimum_order_quantity_prop,
      product_desc: this.product_desc_prop,
      product_image: this.product_image_prop,
      product_category: this.product_category_prop,
      product_location: this.product_location_prop

    }
  }
}
</script>
