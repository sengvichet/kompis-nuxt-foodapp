import {
  Auth,
  API
} from "aws-amplify";

import localStorage from 'localStorage'

export default async function(context) {

  //console.log(localStorage.getItem("sessions"));
  //localStorage.clear("sessions")
  //console.log();
  //console.log(context.app.i18n.defaultLocale);




  console.log();

  if (!context.store.getters.user.isAuthenticated) {
    try {

      var currentUser = await Auth.currentSession()
      let shop_allowed = false

      if (currentUser) {

        let access_roles = []
        let permissions_access = []


        await API.get("metamat", "/permissions/access").then((permissions) => {
          permissions = permissions
          for (var x in permissions) {
            access_roles.push(permissions[x])
          }

        })


        await API.get("metamat", "/permissions/").then(async (permissions) => {

          permissions_access = permissions

          if (context.env.stage == 'dev') {
            shop_allowed = true
          }

          if (
            currentUser.idToken.payload['custom:company_id'] == '3b424f60-259f-11e9-94bb-f3a44358c2ae' ||
            currentUser.idToken.payload['custom:company_id'] == 'bcc5da10-2582-11e9-843a-4913f6cec9db' ||
            currentUser.idToken.payload['custom:company_id'] == '01ad88c0-2606-11e9-b370-4951501ca2a6' ||
            currentUser.idToken.payload['custom:company_id'] == '8bf5d1b0-2582-11e9-843a-4913f6cec9db' ||
            currentUser.idToken.payload['custom:company_id'] == '3b74b4e0-48dc-11e9-9f2f-434f7b561bd0'

          ) {
            shop_allowed = true
          }

        })

        // redirect to the correct language

        let company_access = false
        let customer_access = false

        for (var x in access_roles) {

          if (access_roles[x].roleType == 'access_role') {
            company_access = true
          }

          if (access_roles[x].roleType == 'shop_access_role') {
            customer_access = true
          }

        }

        let user_lang = ''
        let lang_prefix = ''

        await API.get("metamat", "/users/me").then(async (me) => {
          if (me.language) {
            user_lang = me.language
          } else {
            user_lang = 'no'
          }

          await context.store.dispatch('setUserLang', {
            current_lang: user_lang
          })
          if (user_lang == 'en') {
            lang_prefix = '/en'
          }

        })


        let first_name = (currentUser.idToken.payload['custom:first_name']) ? currentUser.idToken.payload['custom:first_name'] : ''
        let last_name = (currentUser.idToken.payload['custom:last_name']) ? currentUser.idToken.payload['custom:last_name'] : ''

        bugsnagClient.user = {
          id: (currentUser.idToken.payload['sub']) ? currentUser.idToken.payload['sub'] : '',
          name: first_name + ' ' + last_name,
          email: (currentUser.idToken.payload['email']) ? currentUser.idToken.payload['email'] : ''
        }


        await context.store.dispatch('setUser', {
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
            language: user_lang,
            user_phone: (currentUser.idToken.payload['custom:user_phone']) ? currentUser.idToken.payload['custom:user_phone'] : '',
            shop_allowed: shop_allowed,
            company_access: company_access,
            customer_access: customer_access

          },
          permissions: permissions_access,
          access_roles: access_roles
        })



        if (!company_access && context.route.path.includes('/company-dashboard/')) {

          window.location.href = lang_prefix + '/app/customer-dashboard/';
          //  context.app.$router.push(lang_prefix + '/app/customer-dashboard/')

        }

        if (!customer_access && context.route.path.includes('/customer-dashboard/')) {

          window.location.href = lang_prefix + '/app/company-dashboard/';
          //  context.app.$router.push(lang_prefix + '/app/company-dashboard/')

        }


        if (company_access && currentUser.idToken.payload['custom:user_type'] == 'employee' &&
          (
            context.route.path.includes('company-dashboard/locations') ||
            context.route.path.includes('company-dashboard/devices') ||
            context.route.path.includes('company-dashboard/users') ||
            context.route.path.includes('company-dashboard/shop-management') ||
            context.route.path.includes('customer-dashboard/users')
          )
        ) {

          window.location.href = lang_prefix + '/app/company-dashboard/menu';
          //context.app.$router.push(lang_prefix + '/app/company-dashboard/menu')

        }



        if (
          //context.route.path == '/auth/login' ||
          //context.route.path == '/auth/temporary-login' ||
          context.route.path == '/auth/register' ||
          context.route.path == '/auth/forget-password' ||
          context.route.path == '/auth/complete-forget-password' ||
          context.route.path.includes('/auth/confirm')
        ) {
          //context.redirect('/app/company-dashboard/')
          //window.location.href = '/app/company-dashboard/';
          context.app.$router.push(lang_prefix + '/app/company-dashboard/')

        }

      } else {

        //  window.location.href = '/auth/login';
        //context.app.$router.push('/auth/login')

      }
    } catch (e) {
      bugsnagClient.notify(e)
      if (e == 'No current user') {

        if (
          context.route.path.includes('auth/login') ||
          context.route.path.includes('auth/confirm') ||
          context.route.path.includes('auth/temporary-login') ||
          context.route.path.includes('auth/forget-password') ||
          context.route.path.includes('auth/complete-forget-password') ||
          context.route.path.includes('auth/confirm')
        ) {

        } else {

          context.redirect('/auth/login')
          //window.location.href = '/auth/login';

        }

      }
    }
  }
}