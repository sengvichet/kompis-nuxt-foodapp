<template>
  <div>
    <a href="#" class="edit" @click="showEditPageHeaderModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.customer_landing_page.page_header_1`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateLandingPageHeader"
               @close="closePopup">

      <template slot="modal-content">
        <input class="list-bar input-text"
               type="text"
               v-model="heading"
               :placeholder="$t(`app.customer_landing_page.page_header_1`)"/>
        </input>
      </template>
    </ModalBody>
  </div>
</template>

<script>

import {API} from "aws-amplify";
import ModalBody from '~/components/modals/ModalBody.vue'


export default {

  components: {
    ModalBody
  },
  props: {
    heading_prop: {
      type: String,
      required:true
    }
  },
  data () {
   return {
     modal_title: 'boo',
     isLoading: false,
     footer: 'save',
     showModal: false,
     isOpen: false,
     heading: null
   }
 },
 created(){
   this.modal_title = 'bobo'
   this.heading = this.heading_prop;
  },

  methods : {
    updateLandingPageHeader () {
      this.$emit('updateLandingPageHeader',{
        heading: this.heading
      })
      this.closePopup()
    },
      async showEditPageHeaderModal(){
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
