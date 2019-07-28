<template>
  <div class="wrapper">

    <Header />

      <div id="main" class="main main-2">

          <Content /> 

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
             v-if="show_step_three"
             />

          <Footer />

      </div>

  </div>

</template>

<script>

import Header from '~/components/Landing/Header.vue'
import Content from '~/components/Landing/Content.vue'
import SubscribeStep1 from '~/components/Landing/SubscribeStep1.vue'
import SubscribeStep2 from '~/components/Landing/SubscribeStep2.vue'
import SubscribeStep3 from '~/components/Landing/SubscribeStep3.vue'
import Footer from '~/components/Landing/Footer.vue'


export default {
  layout:'landing',
  components: { Header,Footer,Content,SubscribeStep1,SubscribeStep2,SubscribeStep3 },
  data() {
    return {
      company:{},
      company_partial:{},
      show_step_two:false,
      show_step_three:false,
      show_step_one:true
    }
  },

  methods: {
    setCompany (company) {
    this.company = company
  },
    setCompanyPartial(company_partial){
      this.company_partial =company_partial
    },
  enabelStepTwo () {
    this.show_step_one = false
    this.show_step_two = true
  },
  enabelStepThree () {
    this.show_step_one = false
    this.show_step_two = false
    this.show_step_three = true
  }



  }

}
</script>
