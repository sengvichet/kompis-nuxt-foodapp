<template>
  <div>
    <a href="#" class="edit" @click="showEditPageHeaderModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.customer_landing_page.weekdays`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateDaysSettings"
               @close="closePopup">

      <template slot="modal-content">
        <div class="list-bar">
          <div class="list-bar__text-container">
            <h5 class="list-bar__title">{{$t(`app.customer_landing_page.days_is_active`)}}</h5>
          </div>
          <input class="list-bar__tick-box__input"
                 id="days_is_active"
                 type="checkbox" name="isActive"
                 v-model="isActive"
                 >

          <label class="list-bar__tick-box__label"
                 for="days_is_active"
                 title="Toggle delivery time"
                 >
                 &nbsp;
          </label>
        </div>

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
    is_active_prop: {
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
     isActive: false
   }
 },
 created(){
   this.modal_title = 'bobo'
   this.isActive = this.is_active_prop;
  },

  methods : {
    updateDaysSettings () {
      this.$emit('updateDaysSettings',{
        is_active: this.isActive
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
