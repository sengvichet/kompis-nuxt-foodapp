<template>

  <div class="list-bar list-bar__product">
    <div class="list-bar__product-image" :style="{'background-image': 'url(' + this.video_image + ')' }"></div>
    <div class="list-bar__product-text">
      <div class="list-bar__product-heading-and-edit">
        <h5 class="list-bar__product-title">{{video_name}}</h5>
        <EditVideo
          :index="index"
          :video_id="video_id"
          :video_name="video_name"
          :video_youtube="video_youtube"
          :video_desc="video_desc"
          :video_shop_id_prop="video_shop_id_prop"
        />
      </div>
      <p class="list-bar__product-description">{{video_desc}}</p>
    </div>
  </div>

</template>


<script>
import {
  API
 } from "aws-amplify";

import EditVideo from '~/components/Videos/EditVideo.vue'

export default {

  components: {
    EditVideo
  },
  props : {
    index: {
      type: Number,
      required: true
    },
    video_id_prop: {
      type: String,
      required: true
    },
    video_name_prop: {
      type: String,
      required: true
    },
    video_youtube_prop: {
      type: String,
      required: true
    },
    video_desc_prop: {
      type: String,
      required: true
    },
    video_shop_id_prop : {
      type: String,
      required: true
    }
  },
  data () {
    return {
      video_id: this.video_id_prop,
      video_name: this.video_name_prop,
      video_youtube: this.video_youtube_prop,
      video_desc: this.video_desc_prop,
      video_image: ''
    }
  },
  created(){
    this.video_image = this.YouTubeGetImageURL(this.video_youtube)
  },
  methods : {
    
     YouTubeGetImageURL(url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      }
      else {
        ID = url;
      }
      return  'https://img.youtube.com/vi/'+ID+'/0.jpg';
    }
  }

}
</script>
