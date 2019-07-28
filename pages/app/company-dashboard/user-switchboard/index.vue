<template lang="html">
  <div class="shop">
    <div class="app-ui-overlay__centered-column">
      <h2 class="app-ui-overlay__page-title">{{$t('app.header.menu.switch_user_page_title')}}</h2>

      <LoadingAnimation v-if="isLoading" />

      <div
        v-if="!isLoading"
        v-for="(user, index) in users"
        class="list-bar"
        >

        <div class="list-bar__link">
          <div class="list-bar__text-container">
            <h5 class="list-bar__title" @click="selectUser(user.email)">
              {{user.name}}
            </h5>
          </div>
          <!-- <div class=""> -->
            <a href="#" class="list-bar__icon--logout u-margin-right-default" @click.prevent="logUserOut(user.email)">{{ $t('app.header.menu.signout')}}</a>
          <!-- </div> -->
          <!-- <div> -->
            <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
          <!-- </div> -->
        </div>
      </div>

      <div
        v-if="!isLoading"
        class="list-bar">

        <nuxt-link class="list-bar__link" to="/auth/login"
        @click="this.mixpanelTrack('Click - Login Different Account: User Switchboard');"
        >
          <div class="list-bar__text-container">
            <h5 class="list-bar__title">
            {{$t('app.header.menu.switch_user_new_login')}}
            <!-- <nuxt-link class="list-bar__title" to="/auth/login">  Login to my account ?</nuxt-link> -->
            </h5>
          </div>
          <div>
           <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
          </div>
        </nuxt-link>
      </div>

    </div>
    <PinCodeModal
    ref="PinCodeModal"
    :user_email="current_user"
    @submitPinCode = "submitPinCode"
    />
  </div>
</template>

<script>

import {
  Auth,API
} from "aws-amplify";
import localStorage from 'localStorage'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import PinCodeModal from '~/components/modals/PinCodeModal.vue'


export default {

  components: {
    LoadingAnimation,
    PinCodeModal
  },
  data(){
    return{
      users: [],
      isLoading: false,
      current_user:''
    }
  },
  created () {

    this.mixpanelTrack('Page View: User Switchboard');
    this.loadSessionsList()

  },
  methods: {

    selectUser(email) {
      this.mixpanelTrack('Click User: User Switchboard',{'Clicked Email':email});
      this.current_user = email
      this.$refs.PinCodeModal.showPopup()
    },

    loadSessionsList() {

      this.users =  []
      let sessions = JSON.parse(localStorage.getItem('concurrent_sessions'))
      this.isLoading = true

      for (var x in sessions) {

        this.users.push({
          name: sessions[x].name,
          email: sessions[x].email
        })

      }

        this.isLoading = false
    },

  async logUserOut (email) {

      this.mixpanelTrack('SignOut User: User Switchboard',{'Clicked Email':email});

      let sessions = JSON.parse(localStorage.getItem('concurrent_sessions'))
      let index = -1

        for (var x in sessions) {
        if (sessions[x].email == email) {
          index = x
        }
      }
      sessions.splice(index, 1);

      localStorage.setItem('concurrent_sessions',JSON.stringify(sessions));
      this.loadSessionsList()

      let currentUser = await Auth.currentSession()

      if (currentUser.idToken.payload['email'] == email) {
          // that.$router.push('/auth/login')
          await Auth.signOut();
          await Auth.cleanCachedItems()
          await this.$store.dispatch('setUser',{isAuthenticated:false,userInfo:null})
          await this.mixpanelRest()
          this.$router.push('/auth/login')
      }

  },
    async submitPinCode(email,code){

          this.$refs.PinCodeModal.closePopup()

          this.isLoading = true

          await Auth.cleanCachedItems()
          await Auth.signOut()
          let cognitoUser = await Auth.signIn(email)

          try {
            await Auth.sendCustomChallengeAnswer(cognitoUser, code.toString());
            var currentUser = await Auth.currentSession();
            let user_lang = ''
            let lang_prefix = ''

            await API.get("metamat", "/users/me").then((me) => {

              user_lang = me.language
              if (user_lang == 'en') {lang_prefix = '/en'}

            })
            this.mixpanelTrack('Pin Code Sumbit: User Switchboard');
            this.mixpanelIdentify(email)
            this.mixpanelTrack('Login');

            this.mixpanelSetNewPeople({
              $email:email,
              'Company Name':(currentUser.idToken.payload['custom:company_name']) ? currentUser.idToken.payload['custom:company_name'] : '',
              'Post Code':(currentUser.idToken.payload['custom:post_code']) ? currentUser.idToken.payload['custom:post_code'] : '',
              'Organization ID':(currentUser.idToken.payload['custom:organization_id']) ? currentUser.idToken.payload['custom:organization_id'] : '',
              'City':(currentUser.idToken.payload['custom:city']) ? currentUser.idToken.payload['custom:city'] : '',
              $first_name:(currentUser.idToken.payload['custom:first_name']) ? currentUser.idToken.payload['custom:first_name'] : '',
              $last_name:(currentUser.idToken.payload['custom:last_name']) ? currentUser.idToken.payload['custom:last_name'] : ''
            })


          window.location = lang_prefix+'/app/company-dashboard/tasks/'
        } catch {
          bugsnagClient.notify(e)
          this.isLoading = false
          this.$notify.error('Incorrect Pin Code', 'success')
          }
    }
  }
}
</script>

<style scoped>

h5 {
  cursor: pointer;
}

</style>
