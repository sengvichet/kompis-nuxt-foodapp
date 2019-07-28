<template>
  <div class="list-bar">
    <div class="list-bar__text-container">
      <h5 class="list-bar__title">{{asset_name}}</h5>
    </div>
    <nuxt-link class="list-bar__link
                      list-bar__click-overlay"
               :to="buildAssetUrl()"/>

    <EditAsset
    :index="index"
    :asset_id="asset_id"
    :asset_name="asset_name"
    :asset_location="asset_location"
    :auto_assign_tasks="auto_assign_tasks"
    />

    <a href="#" class="list-bar__icon">
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </a>
  </div>
</template>


<script>
import {
  API
} from "aws-amplify";

import EditAsset from '~/components/Assets/EditAsset.vue'

export default {

  components: {
    EditAsset
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    asset_id_prop: {
      type: String,
      required: true
    },
    auto_assign_tasks_prop: {
      type:Object,
      required:false
    },
    asset_name_prop: {
      type: String,
      required: true
    },
    asset_location_prop: {
      type: String,
      required: true
    }
  },
  data () {

    return {
      asset_id: this.asset_id_prop,
      asset_name: this.asset_name_prop,
      asset_location: this.asset_location_prop,
      auto_assign_tasks:this.auto_assign_tasks_prop
    }
  },
  methods : {

    buildAssetUrl() {

      let lang_prefix = ''
      let current_lang = this.$store.getters.user_lang.current_lang
      if (current_lang == 'en') {
        lang_prefix = '/en'
      }

      return lang_prefix+'/app/company-dashboard/devices/'+this.asset_id
    }
  }

}
</script>
