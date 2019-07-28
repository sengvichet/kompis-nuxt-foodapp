<template>
  <div>
    <a href="#" class="edit" @click="showEditPageHeaderModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.customer_landing_page.contact_us_text`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateContactUs()"
               @close="closePopup">

      <template slot="modal-content">
        <input class="list-bar input-text"
               type="text"
               v-model="heading"
               :placeholder="$t(`app.customer_landing_page.contact_us_heading`)"/>
        </input>

        <input class="list-bar input-text"
               type="text"
               v-model="email"
               :placeholder="$t(`app.customer_landing_page.contact_us_email`)"/>
        </input>

        <input class="list-bar input-text"
               type="text"
               v-model="phone"
               :placeholder="$t(`app.customer_landing_page.contact_us_phone`)"/>
        </input>

        <textarea class="list-bar input__text"
                  v-model="address"
                  :placeholder="$t(`app.customer_landing_page.contact_us_address`)"
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
    phone_prop: {
      type: String,
      required:true
    },
    email_prop: {
      type: String,
      required:true
    },
    address_prop: {
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
     address: null,
     email:null,
     phone:null

   }
 },



 created(){
   this.modal_title = 'bobo'
   this.heading = this.heading_prop;
   this.address = (this.address_prop) ? this.address_prop.replace(/<br\s*[\/]?>/gi, "\n") : null
   this.email = this.email_prop;
   this.phone = this.phone_prop;
  },

  methods : {
    updateContactUs () {
      this.$emit('updateLandingContactUs',{
        heading: this.heading,
        address: this.address,
        email: this.email,
        phone: this.phone,
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
