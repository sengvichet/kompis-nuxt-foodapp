<template>

  <div class="list-bar__edit">

    <a href="#" class="edit" @click.prevent="showEditDeliveryPointModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>
    <ModalBody  v-if="showModal"
                z_index="1"
                :footerType="footer"
              :title="$t('app.categories.add_new_category')"
                :footerText="$t('app.general.save')"
                @clickedSave="editDeliveryPointSubmit"
                @close="closePopup"
              >

      <template slot="subheading">
      </template>

      <template slot="modal-content">

        <input
              type="text"
              class="list-bar input-text"
              v-model="point_name"
              :placeholder="$t('app.delivery_points.name')">
        </input>

        <input
              type="text"
              class="list-bar input-text"
              v-model="point_address"
              :placeholder="$t('app.delivery_points.address')">
        </input>

        <input
              type="text"
              class="list-bar input-text"
              v-model="point_floor"
              :placeholder="$t('app.delivery_points.floor')">
        </input>

        <input
              type="text"
              class="list-bar input-text"
              v-model="point_desc"
              :placeholder="$t('app.delivery_points.desc')">
        </input>

        <DeleteButton @was_clicked="deleteDeliveryPointSubmit()"
              :prompt="$t('app.general.are_you_sure_cant_undo')"/>

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
import DeleteButton from '~/components/General/DeleteButton.vue'


export default {

  components: {
    Icon,
    ModalBody,
    DeleteButton
  },

  props: {
    index: {
      type: Number,
      required: true
    },
    point_id: {
      type: String,
      required: true
    },
    point_name: {
      type: String,
      required: true
    },
    point_address: {
      type: String,
      required: true
    },
    point_floor: {
      type: String,
      required: true
    },
    point_desc: {
      type: String,
      required: true
    },
    point_shop_id_prop: {
      type: String,
      required: true
    }
  },
  data () {
    return{
      modal_title: this.$t('app.general.edit').replace('%s',this.point_name),
      oldState : this.compoundProperty,
      footer: 'none',
      showModal: false,
      isLoading: false
    }
  },
  computed: {
    compoundProperty(){
      return[
        this.point_name,
        this.point_address,
        this.point_floor,
        this.point_desc
      ].join()
    }
  },
  watch: {
    compoundProperty: function () {
      if (this.compoundProperty !== this.oldState){
        this.point_name &&
        this.point_address &&
        this.point_floor &&
        this.point_desc ? this.footer = 'save' : this.footer = 'none';
      }
    }
  },

  methods : {
    async deleteDeliveryPointSubmit(event) {

        try {

          await this.deleteDeliveryPoint()
          this.reflectDeliveryPoints('del',this.index,null)
          this.mixpanelTrack('Delete Delivery Point: Delivery Points Page');
          //this.$refs.editDeliveryPointModal.hide()
          this.$notify.success(this.$t('app.delivery_points.point_deleted').replace('%s',this.point_name), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.delivery_points.delete_error'), 'success')

        }
    },
    async editDeliveryPointSubmit(event) {

        // event.preventDefault();

      if (
          !this.point_name ||
          !this.point_address  ||
          !this.point_floor ||
          !this.point_desc
        )
      {
        return
      }

      try {

        this.isLoading = true;

         await this.updateDeliveryPoint({
          objectName: this.point_name,
          objectAddress: this.point_address,
          objectFloor: this.point_floor,
          objectDesc: this.point_desc
        });

        this.mixpanelTrack('Edit Delivery Point: Delivery Points Page');

        this.reflectDeliveryPoints('put',this.index,{
          objectName: this.point_name,
          objectAddress: this.point_address,
          objectFloor: this.point_floor,
          objectDesc: this.point_desc,
          objectShopId:this.point_shop_id_prop
       })

        this.$notify.success(this.$t('app.delivery_points.point_updated').replace('%s',this.point_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.delivery_points.update_error'), 'success')

      }
      this.showModal = false;
      // this.$refs.editDeliveryPointModal.hide()
      this.isLoading = false

    },
    updateDeliveryPoint(point) {

      return API.put("metamat", "/delivery-points/"+this.point_id, {
        body: point
      });
    },

    deleteDeliveryPoint() {
      return API.del("metamat", "/delivery-points/" + this.point_id);
    },
    showEditDeliveryPointModal(){
      this.mixpanelTrack('Click: Delivery Points Page - Edit Delivery Point');
      // this.$refs.editDeliveryPointModal.show()
      this.$store.dispatch('lockBody');
      this.showModal = true;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
      this.isLoading = false
    }
  }
}

</script>
