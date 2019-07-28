<template>
  <div>
    <a href="#" class="edit" @click="showEditPageHeaderModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.customer_landing_page.about_us_text`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateAboutUs()"
               @close="closePopup">

      <template slot="modal-content">
        <input class="list-bar input-text"
               type="text"
               v-model="heading"
               :placeholder="$t(`app.customer_landing_page.about_us_heading`)"/>
        </input>

        <textarea class="list-bar input__text"
                  v-model="text"
                  :placeholder="$t(`app.customer_landing_page.about_us_text`)"
                  :rows="6"
                  :max-rows="6">
        </textarea>
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
    },
    text_prop: {
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
     heading: null,
     text: null
   }
 },
 created(){
   this.modal_title = 'bobo'
   this.heading = this.heading_prop;
   this.text = (this.text_prop) ? this.text_prop.replace(/<br\s*[\/]?>/gi, "\n") : null;
   // console.log(this.heading_prop, this.text_prop, this.heading, this.text);
  },

  methods : {
    updateAboutUs () {
      this.$emit('updateLandingAboutUs',{
        heading: this.heading,
        text: this.text,
      })
      this.closePopup()
    },
      async showEditPageHeaderModal(){
      //  this.heading = this.heading_prop; // had to set these here in order for them to work. don't know why.
      //  this.text = this.text_prop;
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
