<template>

  <div class="shop">

  <h2 class="app-ui-overlay__page-title">{{$t('app.categories.add_new_category')}}</h2>

  <div>
  <div v-if="pageloading" class="app-ui-overlay__centered-column">
    <LoadingAnimation/>
  </div>

  <draggable v-model="categories" v-bind="dragOptions" group="categories" @end="resortCategories" @remove="resortCategories"  @add="resortCategories">

   <Category
         v-for="(category,index) in categories"
         v-if="!pageloading && shop_id == category.objectShopId"
         :index="index"
         :key="category.objectOrder"
         :category_id_prop="category.objectId"
         :category_name_prop="category.objectName"
         :category_status_prop="category.objectStatus"
         :category_shop_id_prop="category.objectShopId"
     />

</draggable>



  <newCategory
    @listCategories="listCategories"
    :shop_id="shop_id"
  />
</div>
  </div>

</template>

<script>

import {
  API
} from "aws-amplify";

import Category from '~/components/Categories/Category.vue'
import newCategory from '~/components/Categories/newCategory.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import draggable from 'vuedraggable'

export default {

  components: {
    Category,
    newCategory,
    LoadingAnimation,
    draggable
  },

  data() {
    return {
      pageloading:false,
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
  newCats() {
      return JSON.stringify(this.categories, null, 2);
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
      this.pageloading = true
      this.mixpanelTrack('Page View: Categories Page');
      await this.listCategories();
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }
  },
  methods : {

    async resortCategories ({ relatedContext, draggedContext }) {

      this.mixpanelTrack('Reorder Categories: Categories Page');

      let new_cats = JSON.parse(this.newCats)
      let new_order = []
      for (var x in new_cats) {
        new_order.push(
          {
            objectId :new_cats[x].objectId,
            order:x
          }
        )
      }
      await API.put("metamat", "/categories/reorder/", {
        body: {
          newOrder: new_order
        }
      });

      this.$store.dispatch('setCategories', {
        is_set: true,
        data: new_cats
      })

    }
  }
}
</script>
