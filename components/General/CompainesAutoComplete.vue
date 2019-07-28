<template>

<div>
  <input
        type="text"
        class="list-bar input-text"
        v-model="company_name"
        @input.lazy="fetchCompaines"
        :placeholder="$t('app.customers.name')">
  </input>

  <div  class="input__check-list">
    <div
     class="input__check-list__item" v-for="(company, index) in compaines">
      <input
      @click="setCompany(company)"
       :id="'edit-user' + index" class="input__radio-button" type="radio">
      <label
      @click="setCompany(company)"
       :for="'edit-user' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
        <p class="input__check-label__text">{{ company.company_name }}</p>
        <div class="input__check-label__tick--radio"/>
      </label>
    </div>
  </div>

</div>

</template>

<script>

export default {

  data () {
   return {
     company_name:null,
     selected_company:null,
     compaines:[]

   }
 },
 methods : {

   setCompany(company) {
     this.company_name = company.company_name
     this.selected_company = company
     this.compaines = []
     this.$emit('setCompanyDetails',company)
   },
   fetchCompaines () {

     if (this.company_name.length > 2){

     return new Promise((resolve, reject) => {
     let ajax = new XMLHttpRequest();

     ajax.open('GET', `https://data.brreg.no/enhetsregisteret/enhet.json?$filter=startswith(navn,%27${this.company_name}%27)`, true);
     ajax.addEventListener('loadend', (e) => {
       const { responseText } = e.target
       let response = JSON.parse(responseText);

       if (response.data.length>0) {

         let response_data = response.data.slice(0,4)
         this.compaines = []

         for (var x in response_data) {

          this.compaines.push({
            company_name: response_data[x].navn,
            post_code: response_data[x].forretningsadresse.postnummer,
            city: response_data[x].forretningsadresse.poststed,
            address: response_data[x].forretningsadresse.adresse,
            organization_id: response_data[x].organisasjonsnummer
          })

         }

       }

       resolve(response.data.slice(0,4))
     });
     ajax.send();
   })
}
 }
 }
}

</script>
