<template>

<div class="">

  <div>
    <form v-if="!isLoading" class="app-ui-overlay__centered-column" @submit="onSubmit">
      <h2 class="app-ui-overlay__page-title">{{ $t('auth.reset_password') }}</h2>
      <br>
      <label class="input__label" for="email">{{ $t('auth.email') }}</label>
      <input id="email" class="list-bar input-text" type="email" name="" v-model="email" :placeholder="$t('auth.email')">

      <label class="input__label" for="code">{{ $t('auth.code') }}</label>
      <input id="code" class="list-bar input-text" type="text" name="" v-model="code" :placeholder="$t('auth.code')">

      <label class="input__label" for="password">{{ $t('auth.password') }}</label>
      <input id="password" class="list-bar input-text" type="password" name="" v-model="password" :placeholder="$t('auth.password')">
      <br>

      <button class="list-bar button-square" type="submit" name="button">{{ $t('auth.save_new_password') }}</button>

    </form>
    <LoadingAnimation v-if="isLoading"/>
  </div>

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
      code:'',
      password:'',
      isLoading: false
    }
  },
  async created () {

    await Auth.signOut();
    this.mixpanelTrack('Page View: Rest Password Page');

  },

  methods: {

    async onSubmit(event) {

      event.preventDefault();

      try {
        this.isLoading = true
        await Auth.forgotPasswordSubmit(this.email,this.code,this.password)
        this.$notify.success(this.$t('auth.complete_forget_password.success'), 'success')
        this.mixpanelTrack('Complete Forget Password');
        this.isLoading = false
        this.$router.push('/auth/login')
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
