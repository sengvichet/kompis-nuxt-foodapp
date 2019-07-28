<template>
  <div class="shop">
    <div>
      <div class="list-bar" v-for="(shop,index) in shops">
        <a class="list-bar__link" target="_blank" :href="'https://'+shop.shop_id+'.'+shop_base+'.kompis.app'">
          <h5 class="list-bar__title">{{$t('app.menu.customer.go')}}: {{shop.shop_name}}</h5>
          <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        </a>
      </div>

      <div class="list-bar" v-if="have_active_shops">
        <nuxt-link class="list-bar__link" :to="localePath({ name: 'app-customer-dashboard'})">
          <h5 class="list-bar__title">{{$t('app.menu.customer.orders')}}</h5>
          <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        </nuxt-link>
      </div>

      <div class="list-bar" v-if="user_level!='employee'">
        <nuxt-link class="list-bar__link" :to="localePath({ name: 'app-customer-dashboard-users'})">
          <h5 class="list-bar__title">{{$t('app.menu.customer.employees')}}</h5>
          <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        </nuxt-link>
      </div>


      <div class="list-bar" v-if="have_company_access">
        <h5 class="list-bar__title">{{$t('app.menu.customer.log_as_company')}}</h5>
        <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        <nuxt-link class="list-bar__click-overlay" :to="localePath({ name: 'app-company-dashboard-menu'})"/>
      </div>

      <div class="list-bar">
        <nuxt-link class="list-bar__link" :to="localePath({ name: 'auth-sign-out'})">
          <h5 class="list-bar__title">{{$t('app.menu.customer.signout')}}</h5>
          <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
        </nuxt-link>
      </div>


    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      shop_url:'',
      shop_base: (process.env.stage == 'prod') ? 'shops' : 'devshops',
      have_active_shops:false,
      have_company_access:false,
      user_level:'',
      shops:[]

    }
  },
  created () {
    this.checkAccess()
  },

  computed:{
  accessChanged() { return this.$store.getters.user.access_roles},
},

watch: {
  accessChanged(newValue) {
    console.log(newValue);
    this.checkAccess()
  }
},
  methods : {
    checkAccess () {

      let permissions = this.$store.getters.user.access_roles
      this.user_level = this.$store.getters.user.userInfo.user_type

      for(var x in permissions) {

        if (permissions[x].roleType == 'shop_access_role') {
          //this.shop_url = 'https://'+permissions[x].shopId+'.shops.kompis.app'
          this.shops.push({
            shop_id:permissions[x].shopId,
            shop_name:permissions[x].shop_name
          })
          this.have_active_shops = true
        }

        if (permissions[x].roleType == 'access_role') {
          this.have_company_access = true
        }

      }
    }
  }
}
</script>
