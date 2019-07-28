<template>
  <div>
    <a href="#" class="edit" @click="showEditCTAButtonModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.customer_landing_page.cta_button_text`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateLandingPageCTAButtonSettings"
               @close="closePopup">

      <template slot="modal-content">

        <div class="list-bar">
          <div class="list-bar__text-container">
            <h5 class="list-bar__title">{{$t(`app.customer_landing_page.cta_is_active`)}}</h5>
          </div>
          <input class="list-bar__tick-box__input"
                 :id="name+'_is_active'"
                 type="checkbox" name="isActive"
                 v-model="is_active"
                 >

          <label class="list-bar__tick-box__label"
                 :for="name+'_is_active'"
                 title="Toggle delivery time"
                 >
                 &nbsp;
          </label>
        </div>


        <input class="list-bar input-text"
               type="text"
               v-model="text"
               :placeholder="$t(`app.customer_landing_page.cta_text`)"/>
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
    name: {
      type: String,
      required: true
    },
    text_prop: {
      type: String,
      required: false,
      default: 'Title of the dish'
    },
    is_active_prop: {
      type: String,
      required: true
    },
  },
  data () {
   return {
     modal_title: 'boo',
     isLoading: false,
     footer: 'save',
     showModal: false,
     text:null,
     is_active:false
   }
 },
 created(){
   this.modal_title = 'bobo';
   this.text = this.text_prop;
   this.is_active = this.is_active_prop;
  },

  methods : {
    updateLandingPageCTAButtonSettings () {
      this.$emit('updateLandingPageCTAButtonSettings',{
        text: this.text,
        is_active: this.is_active
      })
      this.closePopup()
    },
      async showEditCTAButtonModal(){
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
