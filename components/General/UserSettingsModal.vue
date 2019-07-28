<template lang="html">
  <div class="app-footer__menu-icon" >
    <div @click.prevent="showPopup">
      <img src="~assets/images/icons/Icon-Settings-Dark-Teal.svg"/>
    </div>
    <ModalBody v-if="showModal"
               z_index="3"
               :footerType="footer"
               :title="modal_title"
               :footerText="$t('app.general.save')"
               @clickedSave="saveUserSettings"
               @close="closePopup">

      <template slot="modal-content">
        <LoadingAnimation v-if="isLoading"/>
        <div v-if="!isLoading">
          <input class="list-bar input-text"
                 type="number"
                 v-model="placeholderUser.phone"
                 :placeholder="$t('app.users.phone')"/>
          </input>

          <select v-model="placeholderUser.language"
                  class="list-bar input__selector"
                  :value="placeholderUser.language">
            <option v-for="language in languages" :value="language.value"> {{language.text}} </option>
          </select>

          <input class="list-bar input-text"
                 type="text"
                 v-model="placeholderUser.first_name"
                 :placeholder="$t('app.users.first_name')"/>
          </input>

          <input class="list-bar input-text"
                 type="text"
                 v-model="placeholderUser.last_name"
                 :placeholder="$t('app.users.last_name')"/>
          </input>

          <input class="list-bar input-text"
                 type="number" pattern="[0-9]*"
                 v-model="placeholderUser.pin_code"
                 :placeholder="$t('app.users.pin_code')"/>
          </input>
        </div>
      </template>
    </ModalBody>
  </div>
</template>

<script>

import {
    API,
    Auth
  } from "aws-amplify";

import ModalBody from '~/components/modals/ModalBody.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {
  data(){
    return {

      showModal: false,
      footer: 'save',
      isLoading: false,
      languages: [
        {text: 'Choose Language', value: null},
        {text: 'Norsk', value: 'no'},
        {text: 'English', value: 'en'}
      ],
      placeholderUser: { //placeHolder user, to be replaced with user prop
        username:'',
        first_name: '',
        last_name:'',
        phone: '',
        pin_code: '',
        language: null,
      }
    }
  },
  computed: {
    modal_title(){
      return this.$t('app.general.user_settings') + ', ' + this.placeholderUser.first_name;
    }
  },
  props: [
    'user'
  ],
  components: {
    ModalBody,
    LoadingAnimation
  },
  async created () {

  },
  methods: {

    async showPopup(){

      this.mixpanelTrack('Click: Footer - User Settings Modal')

      this.isLoading = true;
      this.$store.dispatch('lockBody');
      this.showModal = true;

      await API.get("metamat", "/users/me").then((me) => {
        this.placeholderUser.username = me.username
        this.placeholderUser.first_name = me.first_name
        this.placeholderUser.last_name = me.last_name
        this.placeholderUser.phone = (me.phone) ? me.phone : ''
        this.placeholderUser.pin_code = (me.pin_code) ? me.pin_code : ''
        this.placeholderUser.language = (me.language) ? me.language : null
        this.isLoading = false;

        this.$store.dispatch('setUserLang', {
          current_lang: (me.language) ? me.language : null
        })
      })

    },
    closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
    changeLanguage(){

    },
    updateUser(user) {

      return API.put("metamat", "/users/"+this.placeholderUser.username, {
        body: user
      });
    },

    async saveUserSettings(){
      if (!this.placeholderUser.first_name ||
          !this.placeholderUser.last_name  ||
          !this.placeholderUser.phone  ||
          !this.placeholderUser.pin_code  ||
          !this.placeholderUser.language) {

        this.$notify.error(this.$t('app.users.update_error'), 'success')

          return
      }

      try {
        await this.updateUser({
            first_name: this.placeholderUser.first_name,
            last_name: this.placeholderUser.last_name,
            phone: this.placeholderUser.phone,
            language: this.placeholderUser.language,
            pin_code: this.placeholderUser.pin_code
        });

        this.mixpanelTrack('Save User Settings: User Settings Page')

        let user_lang = ''

        await API.get("metamat", "/users/me").then((me) => {
            user_lang = me.language
        })

        this.$store.dispatch('setUserLang', {
          current_lang: user_lang
        })

        this.$notify.success(this.$t('app.users.user_updated').replace('%s',this.placeholderUser.language +' - '+this.placeholderUser.first_name+' '+this.placeholderUser.last_name), 'success')
        this.$router.push(this.switchLocalePath(user_lang))
        this.closePopup()

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.users.update_error'), 'success')
      }
    }
  }
}
</script>

<style lang="css">
</style>
