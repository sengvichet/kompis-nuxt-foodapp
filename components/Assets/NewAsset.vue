<template>

  <div>

    <div class="app-ui-overlay__new-object">
       <div class="round-button" href="#" @click.prevent="showPopup"> <!-- showNewAssetModal -->
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal" z_index="1" :footerType="footer" :title="$t('app.locations.add_new_location')" :footerText="$t('app.general.save')" @clickedSave="newAsset" @close="closePopup">
      <template slot="subheading">
        <!-- <p class="moose__header-info">hepp</p> -->
      </template>

      <template slot="modal-content">
        <!-- <label class="input__label" for="new-location-name"> {{ $t('app.locations.location_name') }} </label> -->
        <div class="list-bar-container">
        <input
          class="list-bar"
          type="text"
          v-model="new_asset_name"
          :placeholder="$t('app.locations.location_name')"
          name="location_name"
          v-validate="'required'"
          :data-vv-as="$t('app.locations.location_name')"
          data-vv-delay="0"
          :class="{'input': true, 'list-bar--warning': errors.has('location_name') }"
          >
        </input>
        <span v-show="errors.has('location_name')" class="list-bar--warning-span">{{ errors.first('location_name') }}</span>
      </div>

        <div class="list-bar-container">
        <input class="list-bar"
               type="text"
               v-model="new_asset_location"
               :placeholder="$t('app.locations.location')"
               name="location_location"
               v-validate="'required'"
               data-vv-delay="0"
               :data-vv-as="$t('app.locations.location')"
               :class="{'input': true, 'list-bar--warning': errors.has('location_location') }"
               >
        </input>

        <span v-show="errors.has('location_location')" class="list-bar--warning-span">{{ errors.first('location_location') }}</span>

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
  data () {
   return {
     new_asset_name:null,
     new_asset_location:null,
     isLoading: false,
     showModal: false,
     footer: 'none'
     }
   },
   computed: {
     compoundProperty(){
       return [this.new_asset_name,this.new_asset_location].join()
     }
   },
   watch: {
     compoundProperty: function() {
       if(this.new_asset_name && this.new_asset_location) {
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

    async newAsset(event) {

      try {

        this.isLoading = true;

        let new_asset  = await this.createAsset({
          objectName: this.new_asset_name,
          objectLocation: this.new_asset_location

        });

        this.mixpanelTrack('Create New Location: Locations Page');

        this.reflectAssets('post',null,new_asset)

        this.new_asset_name = '';
        this.new_asset_location = '';
        this.$notify.success(this.$t('app.locations.location_added').replace('%s',this.new_asset_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.locations.add_error'), 'success')
      }

      // this.$refs.newAssetModal.hide()
      this.closePopup();

      this.isLoading = false;
    },
    createAsset(asset) {
      return API.post("metamat", "/assets", {
        body: asset
      });
    },
    async showPopup(){
      this.mixpanelTrack('Click: Locations Page - New Location Modal');
      this.$store.dispatch('lockBody');
      this.showModal = true;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
    async test(event){
      console.log('clicked save: ' + event);
      this.closePopup();
    },

    showNewAssetModal(){
      this.$refs.newAssetModal.show()
    },
  }
}

</script>
