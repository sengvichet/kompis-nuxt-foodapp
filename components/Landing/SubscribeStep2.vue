<template>
<div id="subscribe" class="cta-2">

        <div class="app-ui-overlay__centered-column">
          <h2 class="calltoaction u-margin-bottom-medium">{{$t('landing.register_form.step2.title')}}</h2>



              <input type="text" class="company-name-input" :placeholder="$t('landing.register_form.step2.company_name')" required v-model="company_name" />

              <input type="text" class="company-name-input" :placeholder="$t('landing.register_form.step2.organization_id')" required v-model="organization_id" />

              <input type="text" class="company-name-input" :placeholder="$t('landing.register_form.step2.post_code')" required v-model="post_code" />

              <input type="text" class="company-name-input" :placeholder="$t('landing.register_form.step2.city')" required v-model="city" />

              <input type="email" class="company-name-input" v-model="email" required :placeholder="$t('landing.register_form.step2.email')" />

              <input type="text" class="company-name-input" :placeholder="$t('landing.register_form.step2.first_name')" required v-model="first_name" />

              <input type="text" class="company-name-input" :placeholder="$t('landing.register_form.step2.last_name')" required v-model="last_name" />

              <input type="password" class="company-name-input" v-model="password" required :placeholder="$t('landing.register_form.step2.password')" />

              <input type="password" class="company-name-input" v-model="passwordConfirm" required :placeholder="$t('landing.register_form.step2.confirm_password')" />


              <button class="button-square u-margin-top-medium" @click="onSubmit">{{$t('landing.register_form.step2.register')}} <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon> </button>

            <div id="response"></div>

        </div>

</div>
</template>

<script>
import {
  Auth
} from "aws-amplify"
import Icon from 'vue-awesome'
export default {
  layout: 'landing',
  components: {
    Icon
  },
  props: {
    company_partial: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      company_name: this.company_partial.company_name,
      post_code: this.company_partial.post_code,
      organization_id: this.company_partial.organization_id,
      address: this.company_partial.address,
      city: this.company_partial.city,
      email: '',
      password: '',
      passwordConfirm: '',
      first_name: '',
      last_name: '',
      isLoading: false,
      isError:false,
      error_message:''
    }
  },

  methods: {

    async onSubmit(event) {


    event.preventDefault();

      if (this.email.length > 0 &&
        this.password.length > 0 &&
        this.password === this.passwordConfirm &&
        this.company_name.length > 0 &&
        this.post_code.length > 0 &&
        this.organization_id != null &&
        this.first_name.length > 0 &&
        this.last_name.length > 0 &&
        this.city.length > 0

      ) {

        try {

          this.isLoading = true
          this.isError = false
          await Auth.signOut()
          await Auth.signUp({
            username: this.email,
            password: this.password,
            attributes: {
            'custom:user_type': 'owner',
            'custom:company_name': this.company_name,
            'custom:post_code': this.post_code,
            'address':(this.address)? this.address : '',
            'custom:organization_id': (this.organization_id).toString(),
            'custom:city': this.city,
            'custom:first_name': this.first_name,
            'custom:last_name': this.last_name,
            'custom:language' : 'no'

          }
          })

          this.mixpanelIdentify(this.email.toString())


          this.mixpanelTrack('Click: Landing Page - Go To Step 3 Button');

         this.mixpanelTrack('Company Registration: Landing Page',
         {
          'Page': 'Landing Page',
          'Email':this.email,
          'Company Name':this.company_name,
          'Post Code':this.post_code,
          'Address':(this.address)? this.address : '',
          'Organization ID':(this.organization_id).toString(),
          'City':this.city,
          'First Name':this.first_name,
          'Last Name':this.last_name
        }
        );

        this.mixpanelSetNewPeople({
          $email:this.email.toString(),
          'Company Name':this.company_name,
          'Post Code':this.post_code,
          'Address':(this.address)? this.address : '',
          'Organization ID':(this.organization_id).toString(),
          'City':this.city,
          $first_name:this.first_name.toString(),
          $last_name:this.last_name.toString(),
          $created: new Date()
        })
          this.$emit('enabelStepThree')

        } catch (e) {
          bugsnagClient.notify(e)
          if (e.message == 'An account with the given email already exists.'){

              this.error_message = this.$t('error_already_exists')

          }
          else {

              this.error_message = e.message
          }

          this.isError = true
          this.isLoading = false
        }
      } else {

        this.error_message = this.$t('landing.register_form.step2.error_check_inputs')
        this.isError = true

      }

    }
  }
}
</script>
