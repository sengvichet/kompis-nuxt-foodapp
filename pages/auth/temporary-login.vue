<template>

  <div>
    <form v-if="!isLoading" class="app-ui-overlay__centered-column" @submit="onSubmit">
      <h2 class="app-ui-overlay__page-title">{{ $t('auth.login') }}</h2>
      <br>
      <label class="input__label" for="email">{{ $t('auth.email') }}</label>
      <input id="email" class="list-bar input-text" type="email" name="" v-model="email" :placeholder="$t('auth.email')">

      <label class="input__label" for="temporary_password">{{ $t('auth.temporary_password') }}</label>
      <input id="temporary_password" class="list-bar input-text" type="password" name="" v-model="temporary_password" :placeholder="$t('auth.temporary_password')">

      <label class="input__label" for="new_password">{{ $t('auth.password') }}</label>
      <input id="new_password" class="list-bar input-text" type="password" name="" v-model="new_password" :placeholder="$t('auth.password')">
      <br>
      <button class="list-bar button-square" type="submit" name="button">{{ $t('auth.login') }}</button>
      <br>
      <nuxt-link class="navigation-link" :to="localePath('auth-forget-password')">{{$t('auth.forget_password_text')}}</nuxt-link>
      <a class="navigation-link" href = "/#subscribe">{{$t('auth.register_account_text')}}</a>
    </form>
    <LoadingAnimation v-if="isLoading"/>
  </div>

</template>

<script>
import {
  Auth
} from "aws-amplify"
// import Icon from 'vue-awesome'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {

  components: {
    // Icon,
    LoadingAnimation
  },

  data() {
    return {
      email: '',
      temporary_password: '',
      new_password:'',
      isLoading: false
    }
  },
  async created () {

    await Auth.signOut();
    this.mixpanelTrack('Page View: Temporary Login Page');
  },

  methods: {

    async onSubmit(event) {

      event.preventDefault();

      try {
        this.isLoading = true
        let user = await Auth.signIn(this.email, this.temporary_password)
        await Auth.completeNewPassword(user,this.new_password,user.challengeParam.requiredAttributes)
        this.mixpanelTrack('Temporary Login');
        //await Auth.verifyCurrentUserAttribute('email')

        //this.$router.push('/auth/login/')
        window.location = '/app/company-dashboard/tasks/'


      } catch (e) {
        bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
      this.isLoading = false
      }

    }

  }
}
</script>

<style scoped>
.row {
  margin-top: 10%;
}

</style>
