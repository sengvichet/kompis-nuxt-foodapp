<template>
  <div class="list-bar__edit">

      <a href="#" class="edit" @click.prevent="showEditDeviceModal">
        <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
      </a>

      <ModalBody
        v-if="showModal"
        z_index="1"
        :footerType="footer"
        :title="modal_title"
        :footerText="$t('app.general.save')"
        @clickedSave="editDeviceSubmit"
        @close="closePopup"
        >

        <template slot="subheading">
        </template>

        <template slot="modal-content">

          <input
                type="text"
                class="list-bar input-text"
                v-model="device_name"
                :placeholder="$t('app.devices.name')">
          </input>
          <!-- <label for="newdevicetype" style="background-color: white;">Test</label> -->
          <select v-model="device_type" id="newdevicetype" class="list-bar input__selector" value="1">
            <option :value="null" selected> {{ $t('app.devices.device_type') }} </option>
            <option v-for="device in deviceTypes" :value="device.value"> {{device.text}} </option>
          </select>



          <DeleteButton @was_clicked="deleteDeviceSubmit()"
                :prompt="$t('app.general.are_you_sure_cant_undo')"/>


        </template>
      </ModalBody>

</div>
</template>


<script>

import { API } from "aws-amplify";
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
    device_id: {
      type: String,
      required: true
    },
    device_name: {
      type: String,
      required: true
    },
    device_type: {
      type: String,
      required: true
    },
    device_parent: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      isLoading:false,
      showModal: false,
      footer: 'none',
      modal_title: this.$t('app.general.edit').replace('%s',this.device_name),
      deviceTypes: [
        { value: 'refrigerator', text: this.$t('app.devices.refrigerator') },
        { value: 'freezer', text: this.$t('app.devices.freezer')},
        { value: 'dishwasher1', text: this.$t('app.devices.dishwasher1')},
        { value: 'dishwasher2', text: this.$t('app.devices.dishwasher2')}
      ]
    }
  },

  watch: {
    device_name(){
      // (this.device_name && this.device_type != null) ? this.footer = 'save' : this.footer = 'none';
      if(this.device_name && this.device_type != null && this.device_type != "null"){
        this.footer = 'save';
      }
      else{
        this.footer = 'none';
      }
      // console.log(this.device_name, this.device_type, this.footer);
    },
    device_type(){
      // (this.device_name && this.device_type != null) ? this.footer = 'save' : this.footer = 'none';
      if(this.device_name && this.device_type != null && this.device_type != "null"){
        this.footer = 'save';
      }
      else{
        this.footer = 'none';
      }
      // console.log(this.device_name, this.device_type, this.footer);
    }
  },

  methods : {
    async deleteDeviceSubmit(event) {


        try {

          this.reflectDevices('del',this.index,null)
          await this.deleteDevice()
          // this.$refs.editDeviceModal.hide()
          this.mixpanelTrack('Delete Device: Devices Page');
          this.closePopup();
          this.$notify.success(this.$t('app.devices.device_deleted').replace('%s',this.device_name), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.devices.delete_error'), 'success')

        }
    },
    async editDeviceSubmit(event) {

        // event.preventDefault();

      if (
          !this.device_name ||
          !this.device_type
        ){
        return
      }

      try {

        this.isLoading = true;

         await this.updateDevice({
          objectName: this.device_name,
          objectKind: this.device_type
        });

        this.mixpanelTrack('Edit Device: Devices Page');

        this.reflectDevices('put',this.index,{
          objectId: this.device_id,
          objectName: this.device_name,
          objectKind: this.device_type,
          objectParent:this.device_parent
       })

        this.$notify.success(this.$t('app.devices.device_updated').replace('%s',this.device_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.devices.update_error'), 'success')
      }

      // this.$refs.editDeviceModal.hide()
      this.closePopup();
      this.isLoading = false

    },
    updateDevice(device) {

      return API.put("metamat", "/devices/"+this.device_id, {
        body: device
      });
    },

    deleteDevice() {

      return API.del("metamat", "/devices/" + this.device_id);
    },
    showEditDeviceModal(){
      this.mixpanelTrack('Click: Devices Page - Edit Device Modal');
      // this.$refs.editDeviceModal.show()
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
