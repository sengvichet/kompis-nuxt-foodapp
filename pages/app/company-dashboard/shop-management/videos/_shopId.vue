<template>

  <div class="shop">

  <h2 class="app-ui-overlay__page-title">{{$t('app.videos.videos')}}</h2>


  <div v-if="pageloading" class="app-ui-overlay__centered-column">
    <LoadingAnimation/>
  </div>

  <Video
        v-if = "!pageloading && shop_id == video.objectShopId"
        v-for="(video,index) in videos"
        :key="video.objectId"
        :index="index"
        :video_id_prop="video.objectId"
        :video_name_prop="video.objectName"
        :video_youtube_prop="video.objectYoutubeUrl"
        :video_desc_prop="video.objectDesc"
        :video_shop_id_prop="video.objectShopId"
    />
  <newVideo
    @listVideos="listVideos"
    :shop_id="shop_id"
  />

  </div>

</template>

<script>

import Video from '~/components/Videos/Video.vue'
import newVideo from '~/components/Videos/newVideo.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'


export default {

  components: {
    Video,
    newVideo,
    LoadingAnimation
  },

  data() {
    return {
      pageloading:false,
      shop_id:this.$route.params.shopId
    }
  },

  async created() {

    try {
      this.pageloading = true
      this.mixpanelTrack('Page View: Videos Page');
      await this.listVideos();
    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
    }

  }

}
</script>
