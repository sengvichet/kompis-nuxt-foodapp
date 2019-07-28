<template>

  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewVideoModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t('app.videos.add_new_video')"
               :footerText="$t('app.general.save')"
               @clickedSave="newVideo"
               @close="closePopup">

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="new_video_name"
              :placeholder="$t('app.videos.name')">
        </input>

        <input class="list-bar input-text"
               type="text"
               v-model="new_video_youtube"
               :placeholder="$t('app.videos.youtube')">
        </input>

        <textarea id="new_video_desc"
           class="list-bar input__text"
           v-model="new_video_desc"
           :placeholder="$t('app.videos.desc')"
           :rows="6"
           :max-rows="6">
        </textarea>
     </template>
  </ModalBody>

  <!-- <b-modal ref="newVideoModal" hide-footer centered no-close-on-backdrop no-close-on-esc	no-enforce-focus	:title="$t('app.videos.add_new_video')">

    <b-form @submit="newVideo">

  <b-form-group :label="$t('app.videos.name')">

   <b-form-input
            type="text"
            v-model="new_video_name"
            :placeholder="$t('app.videos.name')">
    </b-form-input>
 </b-form-group>


 <b-form-group :label="$t('app.videos.youtube')">

  <b-form-input
           type="text"
           v-model="new_video_youtube"
           :placeholder="$t('app.videos.youtube')">
   </b-form-input>
</b-form-group>



<b-form-group :label="$t('app.videos.desc')">


  <b-form-textarea id="new_video_desc"
     v-model="new_video_desc"
     :placeholder="$t('app.videos.desc')"
     :rows="6"
     :max-rows="6">
</b-form-textarea>

</b-form-group>

    <b-button size="sm" variant="success" type="submit">
      {{$t('app.general.save')}} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>


  </b-form>
</b-modal> -->

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
  props: {
    shop_id: {
      type: String,
      required:true
    }
  },
  data () {
   return {
     new_video_name:'',
     new_video_youtube:'',
     new_video_desc:'',
     footer: 'none',
     isLoading: false,
     showModal: false
   }
 },
 computed: {
   // add all the inputs together to make one massive value to watch
   compoundProperty(){
     return[
       this.new_video_name,
       this.new_video_youtube,
       this.new_video_desc
     ].join()
   }

 },

 watch: {

   // if any part of the compound value changes, check if all the inputs have a value, and if at least one tickbox is ticked:
   compoundProperty: function () {

     // console.log('value changed: ' + this.compoundProperty);

     if (this.new_video_name &&
         this.new_video_youtube &&
         this.new_video_desc){

         this.footer = 'save';
         // console.log('Footer!');
       }
      else {
        // console.log('no footer yet');
        this.footer = 'none';
      }
   },
 },

  methods : {

    async newVideo(event) {

      // event.preventDefault();

      try {

        if (
          !this.new_video_name ||
          !this.new_video_youtube ||
          !this.new_video_desc
        )
           {
             return
           }

        this.isLoading = true;

      let new_video  =   await this.createVideo({
          objectName: this.new_video_name,
          objectYoutubeUrl: this.new_video_youtube,
          objectDesc: this.new_video_desc,
          objectShopId:this.shop_id
        });

        this.reflectVideos('post',null,new_video)

        this.new_video_name = ''
        this.new_video_desc = ''
        this.new_video_youtube = ''

        this.mixpanelTrack('Create Video: Videos Page');
        this.$notify.success(this.$t('app.videos.point_added').replace('%s',this.new_video_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.videos.add_error'), 'success')

      }

      // this.$refs.newVideoModal.hide()
      this.closePopup()

      this.isLoading = false;
      this.new_category_name = ''

    },
    createVideo(category) {
      return API.post("metamat", "/videos", {
        body: category
      });
    },
    showNewVideoModal(){
      // this.$refs.newUserModal.show()
      this.mixpanelTrack('Click: Videos Page - New Video Modal');
      this.showModal = true;
      this.$store.dispatch('lockBody');
    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
