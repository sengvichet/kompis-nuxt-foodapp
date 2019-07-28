<template>
<div>
  <div class="app-background"></div>

  <div class="app-ui-overlay">
    <nuxt-link class="app-ui-overlay__logo" :to="localePath({ name: 'app-company-dashboard-tasks'})">
      <img class="main-logo--white" src="~assets/images/logo/kompis_logo_white.svg"/>
    </nuxt-link>

    <!-- <Header v-if="status"/>
    <HeaderNotLogged v-if = "!status"/> -->

    <div class="app-ui-overlay__content">
      <!-- <b-container> -->
        <nuxt/>
      <!-- </b-container> -->
    </div>
  </div>
  <app-footer/>
  <!-- <img src="~assets/images/icon-hamburger-green.png"/> -->

</div>
</template>

<script>
import Header from '~/components/General/Header.vue'
import HeaderNotLogged from '~/components/General/HeaderNotLogged.vue'
import AppFooter from '~/components/General/AppFooter.vue'

export default {
  middleware: "init",
  components: {
    Header,
    HeaderNotLogged,
    AppFooter
  },
  data() {
    return {
      status:false,
      home_url:'',
      menu_url:''
    }
  },

  computed:{
  checkUserLoginChange() { return this.$route.path},
  },
  watch: {
  checkUserLoginChange(newValue) {
  this.refresh()
},
status() {
  this.status =  this.$store.getters.user.isAuthenticated
}
},

  mounted () {
     this.status =  this.$store.getters.user.isAuthenticated
  },
  created () {
  this.refresh()
  },
  methods : {
    refresh () {

      this.home_url = '/'
      if (this.$route.path.includes('/company-dashboard/')) {
        this.home_url = '/app/company-dashboard/'
        this.menu_url = 'app-company-dashboard-menu'
      }

      if (this.$route.path.includes('/customer-dashboard/')) {
        this.home_url = '/app/customer-dashboard/'
        this.menu_url = 'app-customer-dashboard-menu'
      }
    }
  }
}
</script>
<style src="assets/css/new-app-styles.css"></style>
