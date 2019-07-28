<template>

  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewDeviceModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody
      v-if="showModal"
      z_index="1"
      :footerType="footer"
      :title="$t('app.devices.add_new_device')"
      :footerText="$t('app.general.save')"
      @clickedSave="newDevice"
      @close="closePopup"
      >

      <template slot="subheading">
      </template>

      <template slot="modal-content">

        <input
              type="text"
              class="list-bar input-text"
              v-model="new_device_name"
              :placeholder="$t('app.devices.name')">
        </input>
        <!-- <label for="newdevicetype" style="background-color: white;">Test</label> -->
        <select v-model="new_device_type" id="newdevicetype" class="list-bar input__selector" value="1">
          <option :value="null" selected> {{ $t('app.devices.device_type') }} </option>
          <option v-for="device in deviceTypes" :value="device.value"> {{device.text}} </option>
        </select>
      </template>
    </ModalBody>
  </div>
</template>

<script>

import { API } from "aws-amplify";
import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'

export default {
  components: {
    Icon,
    ModalBody
  },

  data () {
    return {
      new_device_name: '',
      new_device_type: null,
      showModal: false,
      footer: 'none',
      isLoading: false,
      deviceTypes: [
        {
          value: 'refrigerator',
          text: this.$t('app.devices.refrigerator')
        },
        {
          value: 'freezer',
          text: this.$t('app.devices.freezer')
        },
        {
          value: 'dishwasher1',
          text: this.$t('app.devices.dishwasher1')
        },
        {
          value: 'dishwasher2',
          text: this.$t('app.devices.dishwasher2')
        }
      ]
    }
  },

  watch: {
    new_device_name(){
      // (this.new_device_name && this.new_device_type != null) ? this.footer = 'save' : this.footer = 'none';
      if(this.new_device_name && this.new_device_type != null && this.new_device_type != "null"){
        this.footer = 'save';
      }
      else{
        this.footer = 'none';
      }
      // console.log(this.new_device_name, this.new_device_type, this.footer);
    },
    new_device_type(){
      // (this.new_device_name && this.new_device_type != null) ? this.footer = 'save' : this.footer = 'none';
      if(this.new_device_name && this.new_device_type != null && this.new_device_type != "null"){
        this.footer = 'save';
      }
      else{
        this.footer = 'none';
      }
      // console.log(this.new_device_name, this.new_device_type, this.footer);
    }
  },

  methods: {
    async newDevice(event) {
      console.log(this.new_device_type);
      try {
        if (!this.new_device_name || !this.new_device_type )
           {
             return
           }
        this.isLoading = true;
        let new_device = await this.createDevice({
          objectName: this.new_device_name,
          objectKind: this.new_device_type,
          objectParent: this.$route.params.assetId
        });
        this.reflectDevices('post',null,new_device)
        this.mixpanelTrack('Create New Device: Devices Page');
        this.$notify.success(this.$t('app.devices.device_added').replace('%s',this.new_device_name), 'success')
      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.devices.add_error'), 'success')
      }
      // this.$refs.newDeviceModal.hide()
      this.closePopup();
      this.isLoading = false;
      this.new_device_name = '';
      this.new_device_type = null;
    },

    createDevice(device) {
      return API.post("metamat", "/devices", {
        body: device
      });
    },

    showNewDeviceModal(){
      this.mixpanelTrack('Click: Devices Page - New Device Modal');
      // this.$refs.newDeviceModal.show()
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
