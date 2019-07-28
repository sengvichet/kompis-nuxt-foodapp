<template>

  <div class="shop nav-center" >

    <div>
  <tabs
  v-if="!isLoading && tabs.length>0"
  :tabs="tabs"
  :currentTab="currentTab"
  :wrapper-class="'default-tabs'"
  :tab-class="'default-tabs__item'"
  :tab-active-class="'default-tabs__item_active'"
  :line-class="'default-tabs__active-line'"
  @onClick="handleClick"
  />

  <div v-if="isLoading" class="app-ui-overlay__centered-column">
    <LoadingAnimation/>
  </div>

  <div v-if="!isLoading" class="content">


  <div
  v-if = "!isLoading && shop_id == category.objectShopId && currentTab == category.objectName"
  v-for="(category,index) in categories"
  >
  <draggable v-model="products" v-bind="dragOptions" :group="'products'+category.objectId" @end="resortProducts" @remove="resortProducts"  @add="resortProducts">

      <Product
            v-if = "category.objectId == product.objectCategory && !isLoading && shop_id == product.objectShopId"
            v-for="(product,index) in products"
            :key="product.objectOrder"
            :index="index"
            :product_id_prop="product.objectId"
            :product_name_prop="product.objectName"
            :product_desc_prop="product.objectDesc"
            :product_price_prop="product.objectPrice"
            :product_minimum_order_quantity_prop="product.objectMinimumOrderQuantity"
            :product_image_prop="product.objectImage"
            :product_category_prop="product.objectCategory"
            :product_location_prop="product.objectLocation"
            :categories_prop="categories"
            :locations_prop="assets"
            :product_shop_id_prop="product.objectShopId"
        />

   </draggable>
  </div>


  </div>
  </div>

    <NewProduct
    v-if = "categories"
    :categories_prop="categories"
    :locations_prop="assets"
    :shop_id="shop_id"
     />

  </div>

</template>

<script>
import {
  API
} from "aws-amplify";

import Product from '~/components/Products/Product.vue'
import NewProduct from '~/components/Products/NewProduct.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import draggable from 'vuedraggable'
import Tabs from 'vue-tabs-with-active-line';


export default {
  components: {
    Product,
    NewProduct,
    LoadingAnimation,
    draggable,
    Tabs
  },

  data() {
    return {
      tabs:[],
      currentTab:'',
      isLoading:false,
      shop_id:this.$route.params.shopId,
      isDragging: false,
      delayedDragging: false,
      editable: true,
    }
  },

    computed: {
    dragOptions() {
      return {
        animation: 1,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    newProducts() {
        return JSON.stringify(this.products, null, 2);
      },
    },

    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.delayedDragging = false;
        });
      }
    },

  async created() {
    try {
      this.isLoading = true
      this.mixpanelTrack('Page View: Products Page');
      await this.listCategories();
      await this.listProducts();
      await this.listAssets();


      for (var x in this.categories) {
        if (this.shop_id == this.categories[x].objectShopId) {
          this.tabs.push({
            title: this.categories[x].objectName,
            value: this.categories[x].objectName,
          })
        }
      }

      if (this.tabs.length > 0){
      this.currentTab = this.tabs[0].title
      }
      this.isLoading = false


    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }
  },
  methods : {

    async handleClick(newTab) {

      this.isLoading = true
      await this.listProducts();
      this.$nextTick(() => {
      this.currentTab = newTab;
      });
      this.isLoading = false;

    },

    async resortProducts ({ relatedContext, draggedContext }) {

      this.mixpanelTrack('Reorder Products: Products Page');

      let new_products = JSON.parse(this.newProducts)
      let new_order = []
      for (var x in new_products) {
        new_order.push(
          {
            objectId :new_products[x].objectId,
            order:x
          }
        )
      }
      await API.put("metamat", "/products/reorder/", {
        body: {
          newOrder: new_order
        }
      });

      this.$store.dispatch('setProducts', {
        is_set: true,
        data: new_products
      })

    }
  }
}
</script>
