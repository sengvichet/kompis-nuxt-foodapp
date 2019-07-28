<template lang="html">
  <div >

    <transition  appear name="modal-background">

      <div v-if="showContent"
          class="menu-moose__background">

        <transition v-if="company_access && company_menu_is_active" appear name="modal-content">
          <div v-if="showContent"
               class="menu-moose
                      menu-moose__content
                      u-padding-bottom-60">

            <div class="list-bar">
              <h5 class="list-bar__title">{{$t('app.menu.company.tasks')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Tasks'); goToPage('/app/company-dashboard/tasks')"/>
            </div>


            <div class="list-bar" v-if="shop_allowed">
              <h5 class="list-bar__title">{{$t('app.menu.company.shop_managment')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Shops'); goToPage('/app/company-dashboard/shops')"/>
            </div>

            <div class="list-bar" v-if="customer_access">
              <h5 class="list-bar__title">{{$t('app.menu.company.log_as_customer')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Switch Company to Customer'); switchCompanyToCustomer()"/>
            </div>

            <div class="list-bar">
              <h5 class="list-bar__title">{{$t('app.menu.company.reports')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Reports'); goToPage('/app/company-dashboard/reports')"/>
            </div>

            <div class="list-bar" v-if="user_level!='employee'">
              <h5 class="list-bar__title">{{$t('app.menu.company.user_managment')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Users'); goToPage('/app/company-dashboard/users')"/>
            </div>

            <div class="list-bar">
              <h5 class="list-bar__title">{{$t('app.menu.company.location_managment')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Locations'); goToPage('/app/company-dashboard/locations')"/>
            </div>


            <div class="list-bar">
              <h5 class="list-bar__title">{{$t('app.header.menu.switch_user')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Company Menu - Switch User'); goToPage('/app/company-dashboard/user-switchboard')"/>
            </div>

          </div>
        </transition>


        <transition v-if="customer_access && customer_menu_is_active" appear name="modal-content">
          <div v-if="showContent"
               class="menu-moose
                      menu-moose__content
                      u-padding-bottom-60">

            <div v-for="(shop,index) in shops" class="list-bar">
              <h5 class="list-bar__title">{{$t('app.menu.customer.go')}}: {{shop.shop_name}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click=" mixpanelTrack('Click: Customer Menu - Go to Shop'); goToPage('https://'+shop.shop_id+'.'+shop_base+'.kompis.app',true)"/>
            </div>


            <div class="list-bar" v-if="have_active_shops">
              <h5 class="list-bar__title">{{$t('app.menu.customer.orders')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Customer Menu - Reports'); goToPage('/app/customer-dashboard')"/>
            </div>


            <div class="list-bar" v-if="user_level!='employee'">
              <h5 class="list-bar__title">{{$t('app.menu.customer.employees')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Customer Menu - Users'); goToPage('/app/customer-dashboard/users')"/>
            </div>

            <div class="list-bar" v-if="company_access">
              <h5 class="list-bar__title">{{$t('app.menu.customer.log_as_company')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Customer Menu - Switch Customer to Company'); switchCustomerToCompany()"/>
            </div>


            <div class="list-bar" >
              <h5 class="list-bar__title">{{$t('app.menu.customer.signout')}}</h5>
              <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
              <div class="list-bar__click-overlay"
              @click="mixpanelTrack('Click: Customer Menu - Signout'); goToPage('/auth/sign-out')"/>
            </div>

          </div>
        </transition>


      </div>
    </transition>


    <div class="app-footer__menu-icon">
      <!-- <img src="~assets/images/icons/icon_menu_dark_teal.svg"/> -->
      <div @click="toggleMenuModal()" class="app-footer__menu-icon__burger"
          :class="{'app-footer__menu-icon__burger--active': showContent}">

          <div class="app-footer__menu-icon__burger--top"
              :class="{'app-footer__menu-icon__burger--top--active': showContent}">
            &nbsp;
          </div>
          <div class="app-footer__menu-icon__burger--bottom"
              :class="{'app-footer__menu-icon__burger--bottom--active': showContent}">
            &nbsp;
          </div>

      </div>

      <!-- <input class="app-footer__menu-icon__burger__checkbox" type="checkbox" name="menu" :value="showMenu"> -->
    </div>

  </div>
</template>

<script>
export default {

    data(){
      return {
        showContent: false,
        showMenu: false,
        have_active_shops: false,
        organization_name: '',
        shop_base: (process.env.stage == 'prod') ? 'shops' : 'devshops',
        user_level: '',
        user_name: '',
        shop_allowed: false,
        company_access:false,
        customer_access:false,
        company_menu_is_active:false,
        customer_menu_is_active:false,
        shops:[]
      }
    },
    created(){
      this.checkAccess()
      this.organization_name = (this.$store.getters.user.userInfo.company_name)?this.$store.getters.user.userInfo.company_name:''
      this.shop_allowed = (this.$store.getters.user.userInfo.shop_allowed) ? this.$store.getters.user.userInfo.shop_allowed : false
      this.company_access = (this.$store.getters.user.userInfo.company_access) ? this.$store.getters.user.userInfo.company_access : false
      this.customer_access = (this.$store.getters.user.userInfo.customer_access) ? this.$store.getters.user.userInfo.customer_access : false
      this.user_level = this.$store.getters.user.userInfo.user_type
      this.user_name = `${this.$store.getters.user.userInfo.first_name} ${this.$store.getters.user.userInfo.last_name}`
      let permissions = this.$store.getters.user.access_roles

      this.company_menu_is_active = this.company_access
      this.customer_menu_is_active = this.customer_access

      if (this.company_access && this.customer_access ) {
        this.company_menu_is_active = true
        this.customer_menu_is_active = false
      }


      for(var x in permissions) {
        if (permissions[x].roleType == 'shop_access_role') {
          this.have_active_shops = true
        }
      }
    },
    methods: {
      switchCompanyToCustomer () {
        this.company_menu_is_active = false
        this.customer_menu_is_active = true
      },
      switchCustomerToCompany () {
        this.company_menu_is_active = true
        this.customer_menu_is_active = false
      },
      toggleMenuModal(){


        if(this.showMenu){
          this.mixpanelTrack('Click: Footer - Close Menu')
          this.showContent = false;
          // wait for animations to finish before closing
          setTimeout(() => {
            this.$store.dispatch('freeBody');
             this.showMenu = false;
           }, 200);
        }
        if(!this.showMenu){
          this.mixpanelTrack('Click: Footer - Open Menu')
          this.$store.dispatch('lockBody');
          this.showContent = true;
          this.showMenu = true;
        }
      },
      goToPage(page,is_external=false){

        if (is_external) {

          window.open(page, '_blank');

        }
        else {
          let user_lang = this.$store.getters.user.userInfo.language

          let lang_prefix = ''
          if (user_lang != 'no' && user_lang != null) {
            lang_prefix = '/'+user_lang
          }
          this.$router.push(lang_prefix+page);
        }

        this.toggleMenuModal();
      },
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

<style lang="css">
</style>
