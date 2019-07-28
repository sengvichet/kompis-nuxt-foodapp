import Vue from 'vue'
import {
  API
} from "aws-amplify";
Vue.mixin({

  data() {
    return {
      videos: [],
      pageloading: false
    }
  },
  methods: {

    async listVideos() {

      if (!this.$store.getters.store_videos.is_set) {

        await API.get("metamat", "/videos/null").then((videos) => {
          this.$store.dispatch('setVideos', {
            is_set: true,
            data: videos
          })
        })
      }
      this.videos = this.$store.getters.store_videos.data

      this.pageloading = false
    },

    async reflectVideos(op, index, data) {

      let videos = this.$store.getters.store_videos.data

      switch (op) {
        case 'post':
          {
            videos.push(data)
            break;
          }
        case 'put':
          {
            await videos.splice(index, 1);
            await videos.splice(index, 0, data);
            break;
          }
        case 'del':
          {
            videos.splice(index, 1);
            break;
          }
      }

      this.$store.dispatch('setVideos', {
        is_set: true,
        data: videos
      })

    }
  }
})