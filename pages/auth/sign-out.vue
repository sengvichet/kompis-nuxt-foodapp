<template>

</template>
<script>
import {
  Auth
} from "aws-amplify";

export default {
  layout: 'auth',
  async created() {

    try {
      await Auth.signOut();
      await Auth.cleanCachedItems()
      await this.$store.dispatch('setUser',{isAuthenticated:false,userInfo:null})
      await this.mixpanelTrack('Page View: Signout Page');
      await this.mixpanelTrack('Signout');
      await this.mixpanelRest()
      this.$router.push('/auth/login')

    } catch (e) {
      bugsnagClient.notify(e)
    }

  }
}
</script>
