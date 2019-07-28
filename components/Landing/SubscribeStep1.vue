<template>
  <div class="section-join__text-box">
    <h2  class="calltoaction u-margin-bottom-medium">{{$t('landing.register_form.step1.title')}}</h2>
    <form @submit="gotoStepTwo">
      <div class="input-container">
        <autocomplete
        url="http://data.brreg.no"
        anchor="navn"
        label="navn"
        class="company-name-input company-name-input--with-button"
        :onShouldGetData="fetchCompaines"
        :placeholder="$t('landing.register_form.step1.input')"
        :min="3"
        id="company"
        :onSelect="selectCompany"
        :onInput="setCompanyName"
        :required="true"
        >
        </autocomplete>

        <icon style="position:absolute; right: 0px; top: 0px;" name="refresh" v-if="isLoading" scale="0.75" spin></icon>
        <a class="btn-submit" @click.prevent="gotoStepTwo" href="#">{{$t('landing.register_form.step1.try_now')}}</a>
      </div>
    </form>

    <!-- <section class="section-join">
      <div class="section-join__text-box">
        <h2 id="blimed" class="calltoaction u-margin-bottom-medium">Ønsker du en enklere hverdag?</h2>
          <div class="input-container">
            <input class="company-name-input" type="text" name="company name" placeholder="Skriv inn ditt firmanavn her...">
            <a href="#blimed" class="btn-submit">prøver lykken!</a>
          </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import Autocomplete from 'vue2-autocomplete-js'
import Icon from 'vue-awesome'
export default {
  layout:'landing',
  components: { Autocomplete, Icon },
  data() {
    return {
      company:{},
      company_partial_data:{},
      company_name:'',
      isLoading:false
    }
  },

  methods: {

    fetchCompaines (term) {
      this.isLoading = true
      return new Promise((resolve, reject) => {
      let ajax = new XMLHttpRequest();
      ajax.open('GET', `https://data.brreg.no/enhetsregisteret/enhet.json?$filter=startswith(navn,%27${term}%27)`, true);
      ajax.addEventListener('loadend', (e) => {
        const { responseText } = e.target
        let response = JSON.parse(responseText);
        this.isLoading = false
        resolve(response.data.slice(0,4))
      });
      ajax.send();
    })

  },
  selectCompany(company) {
    this.company = company
    this.company_name = company.navn
    this.company_partial_data = {
      company_name:this.navn,
      post_code: company.forretningsadresse.postnummer,
      city: company.forretningsadresse.poststed,
      address: company.forretningsadresse.adresse,
      organization_id: company.organisasjonsnummer
    }
    this.$emit('setCompany',company)
    this.$emit('setCompanyPartial',this.company_partial_data)
    this.mixpanelTrack('Search: Landing Page - Company Search',{'Company Name':company.navn});
  },
  setCompanyName(company_name){
    this.company_name =  company_name
  },
  gotoStepTwo(e) {
    e.preventDefault()
    this.company_partial_data.company_name = this.company_name
    this.$emit('setCompany',company)
    this.$emit('setCompanyPartial',this.company_partial_data)
    this.$emit('enabelStepTwo')
    this.mixpanelTrack('Click: Landing Page - Go To Step 2 Button');
  }

  }

}
</script>
