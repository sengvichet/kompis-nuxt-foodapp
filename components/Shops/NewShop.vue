<template>

  <div>

    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewShopModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody
      v-if="showModal"
      z_index="1"
      ref="coolModal"
      :footerType="footer"
      :title="$t('app.shops.add_new_shop')"
      :footerText="$t('app.general.save')"
      @clickedSave="newShop"
      @close="closePopup"
      >

      <template slot="subheading">
      </template>

      <template slot="modal-content">

        <input
              type="text"
              class="list-bar input-text"
              v-model="new_shop_name"
              :placeholder="$t('app.shops.shop_name')">
        </input>

      </template>
    </ModalBody>
  <!-- <b-modal ref="newShopModal" hide-footer centered no-close-on-backdrop no-close-on-esc	no-enforce-focus	:title="$t('app.shops.add_new_shop')">

    <b-form @submit="newShop">

  <b-form-group :label="$t('app.shops.shop_name')">

   <b-form-input
            type="text"
            v-model="new_shop_name"
            :placeholder="$t('app.shops.shop_name')">
    </b-form-input>
 </b-form-group>

    <b-button size="sm" variant="success" type="submit">
      {{$t('app.general.save')}} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>

  </b-form>
</b-modal> -->

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
  data () {
   return {
     new_shop_name:'',
     showModal: false,
     isLoading: false,
     footer: 'none'
   }
 },
 watch: {
   new_shop_name(){
     this.new_shop_name ? this.footer = 'save' : this.footer = 'none';
   }
 },
  methods : {

    async newShop(event) {

      try {

        if (!this.new_shop_name  )
           {
             return
           }

        this.isLoading = true;

        let new_shop = await this.createShop({
          objectName: this.new_shop_name

        });

        this.mixpanelTrack('New Shop: Shops Page');

        this.reflectShops('post',null,new_shop)

        this.$notify.success(this.$t('app.shops.shop_added').replace('%s',this.new_shop_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.shops.add_error'), 'success')

      }

      this.closePopup();

      this.isLoading = false;
      this.new_shop_name = ''

    },
    createShop(asset) {
      return API.post("metamat", "/shops", {
        body: asset
      });
    },

    listShops() {
      this.$emit('listShops')
    },
    showNewShopModal(){
      this.mixpanelTrack('Click: Shops Page - New Shop Modal');
      this.showModal = true;
      this.$store.dispatch('lockBody');
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}
</script>
