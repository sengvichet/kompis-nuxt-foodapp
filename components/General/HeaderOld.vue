<template>

  <div class="header" v-bind:class="{ danger_state: isDanger }">
  <b-container>

  <b-navbar toggleable>
<b-navbar-brand><nuxt-link to="/app"><img class="logo" src = "~assets/images/kompis_logo.png"  /></nuxt-link></b-navbar-brand>
<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

<b-collapse is-nav id="nav_collapse">

  <b-navbar-nav class="mobile-menu" v-if="isAuthenticated()">
    <b-nav-item
    v-for="(asset,index) in assets">
    <nuxt-link :to = "buildAssetLink(asset.objectId)">{{asset.objectName}}</nuxt-link>
    </b-nav-item>

        <b-dropdown-item href="#" class="main"><nuxt-link :to="localePath('app-tasks')">{{ $t('app.header.menu.tasks') }}</nuxt-link></b-dropdown-item>
        <b-dropdown-item href="#" class="main"><nuxt-link :to="localePath('app-reports')">{{ $t('app.header.menu.reports') }}</nuxt-link></b-dropdown-item>
        <b-nav-item href="#"><nuxt-link :to="localePath('/')">{{ $t('app.header.menu.edit_profile') }}</nuxt-link></b-nav-item>
        <b-nav-item href="#"><nuxt-link :to="localePath('app-users')">{{ $t('app.header.menu.manage_users') }}</nuxt-link></b-nav-item>
        <b-nav-item href="#"><nuxt-link :to="localePath('auth-sign-out')">{{ $t('app.header.menu.signout') }}</nuxt-link></b-nav-item>
  </b-navbar-nav>

  <b-navbar-nav class="ml-auto" v-if="isAuthenticated()">


    <b-nav-item-dropdown right class="desktop-menu">
      <template slot="button-content">
        <img  src="~assets/images/icon-hamburger-green.png" />
      </template>

      <b-dropdown-item class="main"><nuxt-link :to="switchLocalePath('en')">English</nuxt-link></b-dropdown-item>
      <b-dropdown-item class="main"><nuxt-link :to="switchLocalePath('no')">Norsk</nuxt-link></b-dropdown-item>

      <b-dropdown-item class="main">Your Locations</b-dropdown-item>
      <b-dropdown-item class="sub"
      v-for="(asset,index) in assets">
      <nuxt-link :to = "buildAssetLink(asset.objectId)">{{asset.objectName}}</nuxt-link>
      </b-dropdown-item>


      <b-dropdown-item href="#" class="main"><nuxt-link :to="localePath('app-tasks')">{{ $t('app.header.menu.tasks') }}</nuxt-link></b-dropdown-item>
      <b-dropdown-item href="#" class="main"><nuxt-link :to="localePath('app-reports')">{{ $t('app.header.menu.reports') }}</nuxt-link></b-dropdown-item>
      <b-dropdown-item class="main" href="#"><nuxt-link :to="localePath('/')">{{ $t('app.header.menu.edit_profile') }}</nuxt-link></b-dropdown-item>
      <b-dropdown-item class="main" href="#"><nuxt-link :to="localePath('app-users')">{{ $t('app.header.menu.manage_users') }}</nuxt-link></b-dropdown-item>

      <b-dropdown-item href="#" class="main"><nuxt-link :to="localePath('auth-sign-out')">{{ $t('app.header.menu.signout') }}</nuxt-link></b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>

</b-collapse>
</b-navbar>
</b-container>
</div>
</template>

<script>

import Icon from 'vue-awesome'
import {
  API,Auth
} from "aws-amplify";

export default {
  components: {
    Icon
  },
  data () {

    return {

      isDanger:false,
      profile_name:'',
      timer: '',
      assets:[]

    }

  },

  async created() {

    try {
    //  this.profile_name = (this.$store.getters.user.userInfo.first_name) ? this.$store.getters.user.userInfo.first_name :''  + ' ' +  (this.$store.getters.user.userInfo.last_name)?this.$store.getters.user.userInfo.last_name:''
      await this.getStatus();
    } catch (e) {

      bugsnagClient.notify(e)
    }

    this.timer = setInterval(async function(){

      try {
        await this.getStatus()

      } catch (e) {
        bugsnagClient.notify(e)
      }

    }.bind(this), 3000);

 },

  methods: {

    getStatus() {

      var assetId = (this.$route.params.assetId) ? this.$route.params.assetId : null
      var deviceId = (this.$route.params.deviceId) ? this.$route.params.deviceId : null

      if  (this.$store.getters.user.isAuthenticated && assetId && deviceId ){

      API.post("metamat", "/status/",{
        body: {
          assetId,
          deviceId
        }
      }).then((status) => {
          if (status.state == 'danger') {
            this.isDanger = true
          }
          else {
            this.isDanger = false
          }
          this.assets = status.assets
      })
    }
    },

    isAuthenticated () {
      return this.$store.getters.user.isAuthenticated
    },

    buildAssetLink(assetId) {

      return '/app/devices/' + assetId;

    }
  }

}
</script>
