<template>

  <div class="list-bar__edit">

    <a href="#" class="edit" @click.prevent="showEditVideoModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="modal_title"
               :footerText="$t('app.general.save')"
               @clickedSave="editVideoSubmit"
               @close="closePopup">

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="updated_video_name"
              :placeholder="$t('app.videos.name')">
        </input>

        <input class="list-bar input-text"
               type="text"
               v-model="updated_video_youtube"
               :placeholder="$t('app.videos.youtube')">
        </input>

        <textarea id="updated_video_desc"
           class="list-bar input__text"
           v-model="updated_video_desc"
           :placeholder="$t('app.videos.desc')"
           :rows="6"
           :max-rows="6">
        </textarea>


        <DeleteButton @was_clicked="deleteVideoSubmit()"
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
    video_id: {
      type: String,
      required: true
    },
    video_name: {
      type: String,
      required: true
    },
    video_youtube: {
      type: String,
      required: true
    },
    video_desc: {
      type: String,
      required: true
    },
    video_shop_id_prop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      updated_video_name: this.video_name,
      updated_video_youtube: this.video_youtube,
      updated_video_desc: this.video_desc,
      isLoading: false,
      modal_title: this.$t('app.general.edit').replace('%s',this.video_name),
      footer: 'none',
      showModal: false,
    }
  },

   computed: {
     compoundProperty(){
       return [
         this.updated_video_name,
         this.updated_video_youtube,
         this.updated_video_desc
       ].join()
     },
     oldState(){
       return [
         this.video_name,
         this.video_youtube,
         this.video_desc
       ].join()
     }
   },

   watch: {
     compoundProperty: function() {
       if ( this.oldState != this.compoundProperty){
           this.footer = 'save'
         } else {
           this.footer = 'none'
         }
        // console.log('compoundProperty changed: ' + this.compoundProperty);
     }
   },

  methods : {
    async deleteVideoSubmit(event) {
        // event.preventDefault();
        try {
          await this.deleteVideo()
          this.reflectVideos('del',this.index,null)
          // this.$refs.editVideoModal.hide()
          this.closePopup();
          this.mixpanelTrack('Delete Video: Videos Page');
          this.$notify.success(this.$t('app.videos.video_deleted').replace('%s',this.video_name), 'success')
        }
        catch(e){
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.videos.delete_error'), 'success')
        }
    },
    async editVideoSubmit(event) {
        // event.preventDefault();
      if (
          !this.updated_video_name ||
          !this.updated_video_youtube ||
          !this.updated_video_desc
        ){
         return
      }

      try {
        this.isLoading = true;
        await this.updateVideo({
          objectName: this.updated_video_name,
          objectYoutubeUrl: this.updated_video_youtube,
          objectDesc: this.updated_video_desc,
        });

        this.reflectVideos('put',this.index,{
          objectId: this.video_id,
          objectName: this.updated_video_name,
          objectYoutubeUrl: this.updated_video_youtube,
          objectDesc: this.updated_video_desc,
          objectShopId:this.video_shop_id_prop
       })

       this.mixpanelTrack('Edit Video: Videos Page');
        this.$notify.success(this.$t('app.videos.video_updated').replace('%s',this.updated_video_name), 'success')

      } catch(e){
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.videos.update_error'), 'success')
      }
      // this.$refs.editVideoModal.hide()
      this.closePopup();
      this.isLoading = false
    },
    updateVideo(video) {
      return API.put("metamat", "/videos/"+this.video_id, {
        body: video
      });
    },

    listVideos() {
      this.$emit('listVideos')
    },

    deleteVideo() {
      return API.del("metamat", "/videos/" + this.video_id);
    },
    showEditVideoModal(){
      // this.$refs.editVideoModal.show()
      this.mixpanelTrack('Click: Videos Page - Edit Video Modal');
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
