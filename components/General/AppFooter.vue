<template lang="html">
  <div class="app-footer" v-if="isAuthenticated">
    <a class="app-footer__menu-icon app-footer__menu-icon--back"
    @click="mixpanelTrack('Click: Footer - Back Button');"
    href="javascript:history.go(-1)">
      <img src="~assets/images/icons/icon_left_back_arrow.svg"/>
    </a>
    <!-- <nuxt-link class="app-footer__menu-icon" :to="localePath({ name: menu_url})" >
      <img src="~assets/images/icons/icon_menu_dark_teal.svg"/>
    </nuxt-link> -->
    <MenuModal/>
    <UserSettingsModal />
  </div>


</template>

<script>
import UserSettingsModal from '~/components/General/UserSettingsModal.vue'
import MenuModal from '~/components/modals/MenuModal.vue'

export default {
  data() {
    return {
      status: false,
      home_url:'',
      menu_url:'',
      switch_user_url: '',
      isAuthenticated:this.$store.getters.user.isAuthenticated,
      currentUser: {
        // get user details and put them here to b
      }
    }
  },
  created () {
    // get currently logged in user here, and store in currentUser object
    this.refresh()
  },
  components: {
    UserSettingsModal,
    MenuModal
  },

  computed:{
  checkUserLoginChange() { return this.$route.path},
  checkUserIsAuthenticated() { return this.$store.getters.user.isAuthenticated},
  },
  watch: {
  checkUserLoginChange(newValue) {
  this.refresh()
},
   checkUserIsAuthenticated(newValue) {
    this.isAuthenticated = this.$store.getters.user.isAuthenticated
  }
},

  methods : {
    refresh () {

      this.home_url = '/'
      this.menu_url = '/auth/login'
      if (this.$route.path.includes('/company-dashboard')) {

        this.home_url = '/app/company-dashboard/'
        this.menu_url = 'app-company-dashboard-menu'
      }

      if (this.$route.path.includes('/customer-dashboard')) {

        this.home_url = '/app/customer-dashboard/'
        this.menu_url = 'app-customer-dashboard-menu'
      }
    }
  }
}
</script>

<style lang="css">
</style>
