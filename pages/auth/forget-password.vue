<template>
  <div>
    <form v-if="!isLoading" class="app-ui-overlay__centered-column" @submit="onSubmit">
      <h2 class="app-ui-overlay__page-title">{{ $t('auth.forget_password_text') }}</h2>
      <br>
      <label class="input__label" for="email">{{ $t('auth.email') }}</label>
      <input id="email" class="list-bar input-text" type="email" name="" v-model="email" :placeholder="$t('auth.email')">
      <br>
      <button class="list-bar button-square" type="submit" name="button">{{ $t('auth.reset_password') }}</button>
      <br>

    </form>
    <LoadingAnimation v-if="isLoading"/>
  </div>

</template>

<script>
import {
  Auth
} from "aws-amplify"
import Icon from 'vue-awesome'


export default {

  components: {
    Icon
  },

  data() {
    return {
      email: '',
      isLoading: false
    }
  },
  async created () {

    await Auth.signOut();
    this.mixpanelTrack('Page View: Forget Password Page');

  },
  methods: {

    async onSubmit(event) {

      event.preventDefault();

      try {
        this.isLoading = true
        await Auth.forgotPassword(this.email)
        this.$notify.success(this.$t('auth.forget_password.error'), 'success')
        this.mixpanelTrack('Forget Password');
        this.isLoading = false
        this.$router.push('/auth/complete-forget-password')
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
