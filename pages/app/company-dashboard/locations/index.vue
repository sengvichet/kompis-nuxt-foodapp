<template>

  <div>

    <!-- <h2><span>{{$t('app.locations.locations')}}</span></h2> -->
    <h2 class="app-ui-overlay__page-title
               u-margin-bottom-big
               u-flex-justify-center
               u-text-align-center">{{$t('app.locations.locations')}}</h2>
    <div>
      <div v-if="pageloading" class="app-ui-overlay__centered-column">
        <LoadingAnimation/>
      </div>
      <Asset
            v-if = "!pageloading"
            v-for="(asset,index) in assets"
            :index="index"
            :key="asset.objectId"
            :asset_id_prop="asset.objectId"
            :asset_name_prop="asset.objectName"
            :asset_location_prop="asset.objectLocation"
            :auto_assign_tasks_prop="asset.objectAutoAssignTasks"

        />
      <NewAsset/>
    </div>
  </div>

</template>

<script>
import Asset from '~/components/Assets/Asset.vue'
import NewAsset from '~/components/Assets/newAsset.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {

  components: {
    Asset,
    NewAsset,
    LoadingAnimation
  },

  data() {
    return {
      pageloading:false
    }
  },

  async created() {

    try {

      this.mixpanelTrack('Page View: Locations Page');

      this.pageloading = true
      await this.listAssets();
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }
  }
}
</script>
