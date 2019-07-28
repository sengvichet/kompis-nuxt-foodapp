<template>

  <div>

    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewDeliveryPointModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody  v-if="showModal"
                z_index="1"
                :footerType="footer"
                :title="$t('app.categories.add_new_category')"
                :footerText="$t('app.general.save')"
                @clickedSave="newDeliveryPoint"
                @close="closePopup"
              >

      <template slot="subheading">
      </template>

      <template slot="modal-content">

        <input
              type="text"
              class="list-bar input-text"
              v-model="new_point_name"
              :placeholder="$t('app.delivery_points.name')">
        </input>

        <input
              type="text"
              class="list-bar input-text"
              v-model="new_point_address"
              :placeholder="$t('app.delivery_points.address')">
        </input>

        <input
              type="text"
              class="list-bar input-text"
              v-model="new_point_floor"
              :placeholder="$t('app.delivery_points.floor')">
        </input>

        <input
              type="text"
              class="list-bar input-text"
              v-model="new_point_desc"
              :placeholder="$t('app.delivery_points.desc')">
        </input>

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
       new_point_name:'',
       new_point_floor:'',
       new_point_address:'',
       new_point_desc:'',
       isLoading: false,
       showModal: false,
       footer: 'none'
     }
   },
   computed: {
     compoundProperty(){
       return [
          this.new_point_name,
          this.new_point_address,
          this.new_point_floor,
          this.new_point_desc
       ].join()
     }
   },
  watch: {
    compoundProperty(){
      this.new_point_name &&
      this.new_point_address &&
      this.new_point_floor &&
      this.new_point_desc ? this.footer = 'save' : this.footer = 'none';
    }
  },

  methods : {

    async newDeliveryPoint(event) {

      // event.preventDefault();

      try {

        if (
           !this.new_point_name ||
           !this.new_point_address ||
           !this.new_point_floor ||
           !this.new_point_desc
           )
           {
             return
           }

        this.isLoading = true;

        let new_delivery_point = await this.createDeliveryPoint({
          objectName: this.new_point_name,
          objectAddress: this.new_point_address,
          objectFloor: this.new_point_floor,
          objectDesc: this.new_point_desc,
          objectShopId:this.shop_id
        });

        this.reflectDeliveryPoints('post',null,new_delivery_point)
        this.mixpanelTrack('New Delivery Point: Delivery Points Page');
        this.$notify.success(this.$t('app.delivery_points.point_added').replace('%s',this.new_point_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.delivery_points.add_error'), 'success')

      }

      // this.$refs.newDeliveryPointModal.hide()
      this.showModal = false;

      this.isLoading = false;
      this.new_point_name = ''
      this.new_point_address = ''
      this.new_point_floor =  ''
      this.new_point_desc =  ''


    },
    createDeliveryPoint(delivery_point) {
      return API.post("metamat", "/delivery-points", {
        body: delivery_point
      });
    },

    showNewDeliveryPointModal(){

      this.mixpanelTrack('Click: Delivery Points Page - New Delivery Point Modal');
      // this.$refs.newDeliveryPointModal.show()
      this.$store.dispatch('lockBody');
      this.showModal = true;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    }
  }
}

</script>
