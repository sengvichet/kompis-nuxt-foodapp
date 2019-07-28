<template>
<b-container>

  <b-row align-v="center" align-h="center">

    <b-col lg="5" md="6" sm="10" class="align-self-center">


    </b-col>
  </b-row>
</b-container>
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
      confirmationCode: this.$route.params.code,
      email: this.$route.params.email,
      isLoading:false

    }
  },

  async created() {

    await Auth.signOut();
    this.mixpanelTrack('Page View: Confirm Email Page');

    if (this.confirmationCode.length > 0){
    try {

      this.isLoading = true
      await Auth.confirmSignUp(this.email, this.confirmationCode);
      this.mixpanelTrack('Confirm Email');
      this.$notify.success(this.$t('auth.confirm.verified'), 'success')

      this.$router.push('/auth/login')


    } catch (e) {
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
      this.isLoading = false


    }
  }

  else {

    this.$notify.error(this.$t('auth.confirm.error'), 'success')
  }
  }
}
</script>

<style scoped>
.row {
  margin-top: 10%;
}
</style>
