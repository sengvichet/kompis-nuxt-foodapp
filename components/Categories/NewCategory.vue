<template>

  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewCategoryModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>
    <ModalBody
      v-if="showModal"
      z_index="1"
      ref="coolModal"
      :footerType="footer"
      :title="$t('app.categories.add_new_category')"
      :footerText="$t('app.general.save')"
      @clickedSave="newCategory"
      @close="closePopup"
      >

      <template slot="subheading">
      </template>

      <template slot="modal-content">
        <div class="list-bar-container">
        <input
              type="text"
              class="list-bar input-text"
              v-model="new_category_name"
              :placeholder="$t('app.categories.name')"
              name="category_name"
              v-validate="'required'"
              :data-vv-as="$t('app.categories.name')"
              data-vv-delay="500"
              :class="{'input': true, 'list-bar--warning': errors.has('category_name') }"
              >
        </input>
        <span v-show="errors.has('category_name')" class="list-bar--warning-span">{{ errors.first('category_name') }}</span>
      </div>

      </template>
    </ModalBody>

</div>
</template>


<script>

import {
  API
} from "aws-amplify";

import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'


export default {

  components: {
    Icon,
    ModalBody
  },
  props:{
    shop_id: {
      type: String,
      required:true
    }
  },
  data () {
   return {
     new_category_name:'',
     isLoading: false,
     showModal: false,
     footer: 'none'
   }
 },
 computed: {
   compoundProperty(){
     return [this.new_category_name].join()
   }
 },
 watch: {
   compoundProperty: function() {
     if(this.new_category_name) {
     this.$validator.validate().then(valid => {
      if (!valid) {
        this.footer = 'none'
      }
      else {
        this.footer = 'save'
      }
    });
    }
    else {
      this.footer = 'none'
    }
   }
 },
  methods : {

    async newCategory(event) {

      // event.preventDefault();

      try {

        if (!this.new_category_name )
           {
             return
           }

        this.isLoading = true;

        let new_category = await this.createCategory({
          objectName: this.new_category_name,
          objectShopId:this.shop_id

        });

        this.mixpanelTrack('New Categoty: Categories Page');

        this.reflectCategories('post',null,new_category)


        this.$notify.success(this.$t('app.categories.point_added').replace('%s',this.new_category_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.categories.add_error'), 'success')

      }
      this.showModal = false;
      this.isLoading = false;
      this.new_category_name = ''

    },
    createCategory(category) {
      return API.post("metamat", "/categories", {
        body: category
      });
    },
    showNewCategoryModal(){
      this.mixpanelTrack('Click: Categories Page - New Category Modal');
      this.$store.dispatch('lockBody');
      this.showModal = true;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
