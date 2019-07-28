<template>
<div>
  <div>
    <form v-if="!isLoading" class="app-ui-overlay__centered-column" @submit="onSubmit">
      <h2 class="app-ui-overlay__page-title">{{ $t('auth.login') }}</h2>
      <br>
      <label class="input__label" for="email">{{ $t('auth.email') }}</label>
      <input id="email" class="list-bar input-text" type="email" name="" v-model="email" :placeholder="$t('auth.email')">

      <label class="input__label" for="password">{{ $t('auth.password') }}</label>
      <input id="password" class="list-bar input-text" type="password" name="" v-model="password" :placeholder="$t('auth.password')">
      <br>
      <button class="list-bar button-square" type="submit" name="button">{{ $t('auth.login') }}</button>
      <br>
      <nuxt-link class="navigation-link" :to="localePath('auth-forget-password')">{{$t('auth.forget_password_text')}}</nuxt-link>
      <a class="navigation-link" href = "/#subscribe">{{$t('auth.register_account_text')}}</a>
    </form>
    <LoadingAnimation v-if="isLoading"/>
  </div>

</div>
</template>

<script>
import {
  Auth,
  API
} from "aws-amplify"

import localStorage from 'localStorage'
import LoadingAnimation from '@/components/general/LoadingAnimation.vue'



export default {

  components: {
    LoadingAnimation
  },

  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },

  created () {
    this.mixpanelTrack('Page View: Login Page');
  },
  methods: {

    async onSubmit(event) {

      event.preventDefault();

      try {

        this.isLoading = true

        await Auth.cleanCachedItems()

        let auth_result = await Auth.signIn(this.email, this.password)

        var currentUser = await Auth.currentSession()

        let concurrent_sessions = JSON.parse(localStorage.getItem("concurrent_sessions") || "[]");
        let shop_allowed = false

        if (currentUser) {

                  this.mixpanelIdentify(this.email)
                  this.mixpanelTrack('Login');


                  let access_roles = []

                  await API.get("metamat", "/permissions/access").then((permissions) => {

                    for (var x in permissions) {
                      access_roles.push(permissions[x])
                    }

                  })

                  await API.get("metamat", "/permissions/").then(async (permissions) => {


                    if (process.env.stage == 'dev') {shop_allowed =true}

                    if (
                      currentUser.idToken.payload['custom:company_id'] == '3b424f60-259f-11e9-94bb-f3a44358c2ae' ||
                      currentUser.idToken.payload['custom:company_id'] == 'bcc5da10-2582-11e9-843a-4913f6cec9db' ||
                      currentUser.idToken.payload['custom:company_id'] == '01ad88c0-2606-11e9-b370-4951501ca2a6' ||
                      currentUser.idToken.payload['custom:company_id'] == '8bf5d1b0-2582-11e9-843a-4913f6cec9db' ||
                      currentUser.idToken.payload['custom:company_id'] == '3b74b4e0-48dc-11e9-9f2f-434f7b561bd0'
                      )
                      {
                      shop_allowed = true
                      }

                  })

          await API.get("metamat", "/permissions/access").then( async (permissions) => {

            if(permissions.length > 0 ){


              let company_access = false
              let customer_access = false

              for (var x in permissions ){

                if (permissions[x].roleType == 'access_role') {
                  company_access = true
                }

                if (permissions[x].roleType == 'shop_access_role') {
                  customer_access = true
                }

              }
              let first_name = (currentUser.idToken.payload['custom:first_name']) ? currentUser.idToken.payload['custom:first_name'] : ''
              let last_name = (currentUser.idToken.payload['custom:last_name']) ? currentUser.idToken.payload['custom:last_name'] : ''

              bugsnagClient.user = {
              id: (currentUser.idToken.payload['sub']) ? currentUser.idToken.payload['sub'] : '',
              name: first_name + ' ' + last_name,
              email: this.email.toString()
            } 

              this.mixpanelSetNewPeople({
                $email:this.email.toString(),
                'Company Name':(currentUser.idToken.payload['custom:company_name']) ? currentUser.idToken.payload['custom:company_name'] : '',
                'Post Code':(currentUser.idToken.payload['custom:post_code']) ? currentUser.idToken.payload['custom:post_code'] : '',
                'Organization ID':(currentUser.idToken.payload['custom:organization_id']) ? currentUser.idToken.payload['custom:organization_id'] : '',
                'City':(currentUser.idToken.payload['custom:city']) ? currentUser.idToken.payload['custom:city'] : '',
                $first_name:first_name,
                $last_name:last_name
              })


              await this.$store.dispatch('setUser', {
                isAuthenticated: true,
                userInfo: {
                  city: (currentUser.idToken.payload['custom:city']) ? currentUser.idToken.payload['custom:city'] : '',
                  company_id: (currentUser.idToken.payload['custom:company_id']) ? currentUser.idToken.payload['custom:company_id'] : '',
                  company_name: (currentUser.idToken.payload['custom:company_name']) ? currentUser.idToken.payload['custom:company_name'] : '',
                  first_name: (currentUser.idToken.payload['custom:first_name']) ? currentUser.idToken.payload['custom:first_name'] : '',
                  last_name: (currentUser.idToken.payload['custom:last_name']) ? currentUser.idToken.payload['custom:last_name'] : '',
                  organization_id: (currentUser.idToken.payload['custom:organization_id']) ? currentUser.idToken.payload['custom:organization_id'] : '',
                  post_code: (currentUser.idToken.payload['custom:post_code']) ? currentUser.idToken.payload['custom:post_code'] : '',
                  user_type: (currentUser.idToken.payload['custom:user_type']) ? currentUser.idToken.payload['custom:user_type'] : '',
                  email: (currentUser.idToken.payload['email']) ? currentUser.idToken.payload['email'] : '',
                  exp: (currentUser.idToken.payload['exp']) ? currentUser.idToken.payload['exp'] : '',
                  username: (currentUser.idToken.payload['sub']) ? currentUser.idToken.payload['sub'] : '',
                  language: (currentUser.idToken.payload['custom:language']) ? currentUser.idToken.payload['custom:language'] : null,
                  user_phone: (currentUser.idToken.payload['custom:user_phone']) ? currentUser.idToken.payload['custom:user_phone'] : '',
                  shop_allowed: shop_allowed,
                  company_access:company_access,
                  customer_access:customer_access

                },
                permissions: permissions,
                access_roles: access_roles
              })


              let index = -1
                 for (var x in concurrent_sessions) {
                   if (concurrent_sessions[x].email == this.email) {
                     index = x
                   }
               }

               if (index == -1 ){

               concurrent_sessions.push({
                 name: currentUser.idToken.payload['custom:first_name'] + ' ' + currentUser.idToken.payload['custom:last_name'],
                 email: this.email
               })
               localStorage.setItem('concurrent_sessions', JSON.stringify(concurrent_sessions));
             }

              let user_lang = ''
              let lang_prefix = ''

              await  API.get("metamat", "/users/me").then(async(me) => {

                if (me.language) {
                  user_lang = me.language
                } else {
                  user_lang = 'no'
                }

                if (user_lang == 'en') {lang_prefix = '/en'}

              })

              this.$store.dispatch('setUserLang', {
               current_lang: user_lang
             })

              if (company_access) {

                //this.$router.push(lang_prefix+'/app/company-dashboard/tasks/')
                // this.isLoading = false
              window.location.href = lang_prefix+'/app/company-dashboard/tasks/'

              }
              else if (!company_access && customer_access) {
              // this.$router.push(lang_prefix+'/app/customer-dashboard/')
                // this.isLoading = false
              window.location.href = lang_prefix+'/app/customer-dashboard/';
              }

              else {
                this.isLoading = false
                await Auth.signOut();
                this.$notify.error('You are not allwed to access this application', 'success')
              }



            }

            else {
              this.isLoading = false
              await Auth.signOut();
              this.$notify.error('You are not allwed to access this application', 'success')

            }

          })

        }

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
