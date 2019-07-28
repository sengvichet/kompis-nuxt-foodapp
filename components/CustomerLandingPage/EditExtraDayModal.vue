<template>
  <div>
    <a href="#" class="edit" @click="showEditExtraDayModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.customer_landing_page.text_for_every_day`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateLandingPageExtraDaySettings"
               @close="closePopup">

      <template slot="modal-content">
        <input class="list-bar input-text"
               type="text"
               v-model="heading"
               :placeholder="$t(`app.customer_landing_page.heading`)"/>
        </input>

        <textarea id="dish_description"
           class="list-bar input__text"
           v-model="description"
           :placeholder="$t(`app.customer_landing_page.description`)"
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
      required: false,
      default: 'Title of the dish'
    },
    description_prop: {
      type: String,
      required: false,
      default: 'Dish description'
    },
  },
  data () {
   return {
     modal_title: 'boo',
     isLoading: false,
     footer: 'save',
     showModal: false,
     heading: null,
     description: null
   }
 },
 created(){
   this.modal_title = 'bobo';
   this.heading = this.heading_prop;
   this.description = (this.description_prop) ? this.description_prop.replace(/<br\s*[\/]?>/gi, "\n") : null
  },

  methods : {
    updateLandingPageExtraDaySettings () {
      this.$emit('updateLandingPageExtraDaySettings',{
        heading: this.heading,
        description: this.description
      })
      this.closePopup()
    },
      async showEditExtraDayModal(){
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
