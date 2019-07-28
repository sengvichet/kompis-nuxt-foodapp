<template>

  <div class="shop">

    <h2 class="app-ui-overlay__page-title">{{organization_name}}</h2>
    <p class="app-ui-overlay__section-title
              u-negative-margin-top-4rem
              u-margin-bottom-big
              u-flex-justify-center
              u-text-align-center">{{user_name}}</p>

    <div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.tasks')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-tasks'})"/>
      </div>
      <!--
      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.logs.header')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-logs'})"/>
      </div>
      -->

      <div class="list-bar" v-if="shop_allowed">
        <h5 class="list-bar__title">{{$t('app.menu.company.shop_managment')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-shops'})"/>
      </div>

      <div class="list-bar" v-if="have_active_shops">
        <h5 class="list-bar__title">{{$t('app.menu.company.log_as_customer')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-customer-dashboard-menu'})"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.reports')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-reports'})"/>
      </div>

      <div class="list-bar"v-if="user_level!='employee'">
        <h5 class="list-bar__title">{{$t('app.menu.company.user_managment')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-users'})"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.location_managment')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-locations'})"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.header.menu.switch_user')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-user-switchboard'})"/>
      </div>
    </div>
  </div>

</template>

<script>
export default {

  data () {
    return {
      have_active_shops:false,
      organization_name:'',
      user_level:'',
      user_name: '',
      shop_allowed:(this.$store.getters.user.userInfo.shop_allowed) ? this.$store.getters.user.userInfo.shop_allowed : false,

    }
  },

  created () {

    this.organization_name = (this.$store.getters.user.userInfo.company_name)?this.$store.getters.user.userInfo.company_name:''
    this.user_level = this.$store.getters.user.userInfo.user_type
    this.user_name = `${this.$store.getters.user.userInfo.first_name} ${this.$store.getters.user.userInfo.last_name}`
    let permissions = this.$store.getters.user.access_roles
    for(var x in permissions) {
      if (permissions[x].roleType == 'shop_access_role') {
        this.have_active_shops = true
      }
    }

    //this.$refs.MainHeader.refresh()

  }
}
</script>
