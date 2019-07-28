<template>
  <div class="shop">

    <h2 class="app-ui-overlay__page-title">{{$t('app.menu.company.shop_managment')}}</h2>

    <div>
      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.customer.go')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <a class="list-bar__click-overlay" target="_blank" :href="shop_url"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.orders')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/orders/'+shop_id"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.delivery_points')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/delivery-points/'+shop_id"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.customers')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/customers/'+shop_id"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.products')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/products/'+shop_id"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.categories')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/categories/'+shop_id"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.videos')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/videos/'+shop_id"/>
      </div>

      <div class="list-bar">
        <h5 class="list-bar__title">{{$t('app.menu.company.landing_page_settings')}}</h5>
        <img class="list-bar__arrow"  src="~assets/images/icons/Icon_Right_Arrow.svg"/>
        <nuxt-link class="list-bar__click-overlay" :to="lang_prefix+'/app/company-dashboard/shop-management/landing-page-settings/'+shop_id"/>
      </div>
    </div>
  </div>
</template>


<script>
export default {

  data () {
    return {
      shop_url:'',
      shop_id : this.$route.params.shopId,
      lang_prefix:''
    }
  },
  created () {

    let current_lang = this.$store.getters.user_lang.current_lang
    if (current_lang == 'en') {
      this.lang_prefix = '/en'
    }
    this.shop_url = (process.env.stage == 'prod') ? 'https://'+this.shop_id+'.shops.kompis.app' : 'https://'+this.shop_id+'.devshops.kompis.app'

  }
}
</script>
