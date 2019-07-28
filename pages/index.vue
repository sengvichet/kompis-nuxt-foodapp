<template>
  <div class="landing-page__container">

    <header class="header-main">
      <div class="header-main__top-box">
        <div class="header-main__top-right-box">
          <a href="auth/login" @click="mixpanelTrack('Click: Landing Page - Login Buttin')" class="btn-text btn--login">{{$t('landing.header.login')}}</a>
          <a href="#join" @click="mixpanelTrack('Click: Landing Page - Join Top Button')" class="btn btn--transparent-small u-remove-mobile u-remove-tab-port">{{$t('landing.header.register')}}</a>
        </div>
        <div class="header-main__logo-box">
          <img src="~assets/images/kompis.svg" alt="logo">
        </div>
      </div>

        <div class="header-main__text-box">
          <div class="header-main__animation-container">
            <h1 class="
                heading-primary
                u-margin-bottom-medium
                u-text-shadow-small
              ">
              {{$t('landing.hero.title')}}
            </h1>
            <a href="#join"
               @click="mixpanelTrack('Click: Landing Page - Joing Middel Button')"
               class="
                btn
                btn--white-large
                u-margin-bottom-small
                ">
              {{$t('landing.hero.join')}}
            </a>
            <h4 class="sub-tag-line">{{$t('landing.hero.sub_title')}}</h4>
          </div>
        </div>

    </header>

    <section class="section-benefits">
         <div class="_flex-row">
            <div v-for="(card, index) in 3" class="_flex-col">
              <div class="_card">
              <div class="_card-icon">
                <img :src="featureCardImages[index]" :alt="featureCardAlt[index]">
              </div>
              <br>
              <div class="_card-text">
                <h3 class="_card-heading">{{$t(`landing.features.feature${index+1}_title`)}}</h3>
                <p>
                  {{$t(`landing.features.feature${index+1}_text1`)}}
                  <br>
                  <br>
                  {{$t(`landing.features.feature${index+1}_text2`)}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join" class="section-join">
        <div class="join__text-box">


          <SubscribeStep1
            v-if="show_step_one"
            @setCompany="setCompany"
            @setCompanyPartial="setCompanyPartial"
            @enabelStepTwo="enabelStepTwo"
          />

          <SubscribeStep2
            v-if="show_step_two"
            :company_partial="company_partial"
            @enabelStepThree="enabelStepThree"
          />

          <SubscribeStep3
            id="thankyou"
            v-if="show_step_three"
          />

        </div>
      </section>


      <section class="section-pricing">
        <div class="_flex-row">
          <div v-for="(card, index) in 3" class="_flex-col">
            <div class="_card">
              <div class="_card-body">
                <div class="_card-icon">
                    <img :src="priceCardImages[index]" :alt="priceCardAlt[index]">
                </div>
                  <h3 class="_card-heading">
                    {{$t(`landing.pricing.pricing${index + 1}_title`)}}
                  </h3>
                  <p class="_card-text">
                    {{$t(`landing.pricing.pricing${index + 1}_text1`)}}
                  <br>
                  <br>
                    {{$t(`landing.pricing.pricing${index + 1}_text2`)}}
                  <br>
                  <br>
                    {{$t(`landing.pricing.pricing${index + 1}_text3`)}}
                </p>
              </div>
              <div class="price-box">
                <h3 class="annual-price">
                  {{$t(`landing.pricing.pricing${index + 1}_annual_amount`)}}
                </h3>
                <p class="monthly-price">
                  {{$t(`landing.pricing.pricing${index + 1}_monthly_amount`)}}
                </p>
                <p class="fineprint">
                  {{$t(`landing.pricing.mva_text`)}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom-box">
          <div class="
              bottom-box__button-container
              u-margin-top-medium
              u-margin-bottom-huge
            ">
            <a @click="mixpanelTrack('Click: Landing Page - Bottom Button')" href="#join" class="btn btn--white-large">{{$t('landing.hero.join')}}</a>
          </div>
        </div>
      </section>
    </div>
</template>


<script>

import Header from '~/components/Landing/Header.vue'
import Content from '~/components/Landing/Content.vue'
import SubscribeStep1 from '~/components/Landing/SubscribeStep1.vue'
import SubscribeStep2 from '~/components/Landing/SubscribeStep2.vue'
import SubscribeStep3 from '~/components/Landing/SubscribeStep3.vue'
import Footer from '~/components/Landing/Footer.vue'
import Chatlio from '~/components/Landing/Chatlio.vue'  // no need to use in template markup
import mixpanel from 'mixpanel-browser';


export default {
  layout:'landing',
  components: { Header,
                Footer,
                Content,
                SubscribeStep1,
                SubscribeStep2,
                SubscribeStep3,
  },
  data() {
    return {
      company:{},
      company_partial:{},
      show_step_two: false,
      show_step_three: false,
      show_step_one: true,
      featureCardImages: [
        require("~/assets/images/clipboard.svg"),
        require("~/assets/images/chat.svg"),
        require("~/assets/images/devices.svg")
      ],
      featureCardAlt: [
        'clipboard',
        'chat',
        'devices'
      ],
      priceCardImages: [
        require("~/assets/images/singleuser.svg"),
        require("~/assets/images/multiuser.svg"),
        require("~/assets/images/advanced.svg")
      ],
      priceCardAlt: [
        'singleuser',
        'multiuser',
        'advanced'
      ],
    }
  },

  created () {

    this.mixpanelTrack('Page View: Landing Page');

  },

  methods: {

    setCompany (company) {
    this.company = company
  },
    setCompanyPartial(company_partial){
      this.company_partial = company_partial
    },
  enabelStepTwo () {
    this.show_step_one = false
    this.show_step_two = true
  },
  enabelStepThree () {
    this.show_step_one = false
    this.show_step_two = false
    this.show_step_three = true
    window.location = '#join';
  }

  }

}
</script>
