<template>

  <div>

    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showPopup">   <!--showNewCategoryModal-->
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal" z_index="1" :footerType="footer" :title="$t('app.customers.add_new_customer')" :footerText="$t('app.general.save')" @clickedSave="newCustomer" @close="closePopup">

      <template slot="subheading">
      </template>

      <template slot="modal-content">

        <div class="list-bar-container">
        <input
          class="list-bar"
          type="text"
          v-debounce:500ms="checkEmailAddress"
          v-model="new_customer_email"
          :placeholder="$t('app.customers.email')"
          name="customer_email"
          v-validate="'required|email'"
          :data-vv-as="$t('app.customers.email')"
          data-vv-delay="500"
          :class="{'input': true, 'list-bar--warning': errors.has('customer_email') }"
          >
        </input>
        <span v-show="errors.has('customer_email')" class="list-bar--warning-span">{{ errors.first('customer_email') }}</span>
      </div>

      <CompainesAutoComplete
      v-if="customerChecked"
      @setCompanyDetails="setCompanyDetails"
      />

        <input
             v-if="customerChecked"
             type="text"
             class="list-bar input-text"
             v-model="new_customer_id"
             :placeholder="$t('app.customers.id')">
        </input>

        <input
            v-if="customerChecked"
            type="text"
            class="list-bar input-text"
            v-model="new_customer_first_name"
            :placeholder="$t('app.customers.first_name')">
        </input>

        <input
            v-if="customerChecked"
            type="text"
            class="list-bar input-text"
            v-model="new_customer_last_name"
            :placeholder="$t('app.customers.last_name')">
        </input>

        <input
            v-if="customerChecked"
            type="text"
            class="list-bar input-text"
            v-model="new_customer_phone"
            :placeholder="$t('app.customers.phone')">
        </input>

        <input
             v-if="customerChecked"
             type="number"
             min="0"
             max="100"
             class="list-bar input-text"
             v-model="new_customer_discount"
             :placeholder="$t('app.customers.discount')">
        </input>

        <div v-if="customerChecked" class="list-bar input checklist-header">
          {{ $t('app.customers.delivery_points') }}
        </div>

        <div class="input__check-list">
          <div v-if="customerChecked" class="input__check-list__item" v-for="(delivery_point,index) in delivery_points">
            <input  :id="'add-new' + delivery_point.id" class="input__check-box" type="checkbox" v-model="new_customer_delivery_points" :value="delivery_point.value">
            <label :for="'add-new' + delivery_point.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">

                <p class="input__check-label__text">{{delivery_point.text}}</p>
                <div class="input__check-label__tick--checkbox"/>

            </label>
          </div>
        </div>
      </template>
    </ModalBody>


  </div>
</template>


<script>

import {
  API
} from "aws-amplify";

import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'
import CompainesAutoComplete from '~/components/General/CompainesAutoComplete.vue'



export default {

  components: {
    Icon,
    ModalBody,
    CompainesAutoComplete
  },
  props:{
    delivery_points_props: {
      type: Array,
      required:true
    },
    shop_id: {
        type : String,
        required : true
    }
  },
  data () {
   return {
     new_customer_name:'',
     new_customer_email:'',
     new_customer_id:'',
     new_customer_first_name:'',
     new_customer_last_name:'',
     new_customer_phone:'',
     new_customer_discount:null,
     new_customer_delivery_points:[],
     delivery_points:[],
     isLoading: false,
     customerChecked:false,
     showModal: false,
     footer: 'none',
     userTypes:{ value: 'employee', text: this.$t('app.users.user_types.employee') ,disabled: (!(this.$store.getters.user.userInfo.user_type == 'company') && !(this.$store.getters.user.userInfo.user_type == 'owner') && !(this.$store.getters.user.userInfo.user_type == 'manager')) }

   }
 },
 computed: {
   // add all the inputs together to make one massive value to watch
   compoundProperty(){
     return[
       this.new_customer_name,
       this.new_customer_email,
       this.new_customer_id,
       this.new_customer_discount,
       this.new_customer_first_name,
       this.new_customer_last_name,
       this.new_customer_phone,
       this.new_customer_delivery_points,
       this.delivery_points
     ].join()
   }
 },
 watch: {

   // if any part of the compound value changes, check if all the inputs have a value, and if at least one tickbox is ticked:
   compoundProperty: function () {

     if (this.new_customer_name &&
         this.new_customer_id &&
         this.new_customer_email &&
         this.new_customer_first_name &&
         this.new_customer_last_name &&
         this.new_customer_phone &&
         this.new_customer_discount &&
         this.new_customer_delivery_points.length !== 0
       ) { this.footer = 'save'}
      else {
        this.footer = 'none'
      }
   }
 },
 methods : {

   setCompanyDetails (company){
        this.new_customer_name = company.company_name
        this.new_customer_id = company.organization_id
   },

    async checkEmailAddress (email) {



      this.$validator.validate().then(async valid => {
       if (!valid) {
         //this.footer = 'none'
       }
       else {
         this.customerChecked = false


           let company = await API.post("metamat", "/customers/check", {
             body: {
               email: email
             }
           });

           this.new_customer_name = (company.business_name) ? company.business_name : ''
           this.new_customer_id = (company.company_organization_id) ? company.company_organization_id : ''
           this.new_customer_first_name = (company.first_name) ? company.first_name : ''
           this.new_customer_last_name = (company.last_name) ? company.last_name : ''
           this.new_customer_phone = (company.phone) ? company.phone : ''
           this.new_customer_email = email
           this.customerChecked = true
       }
     });




    },

    async newCustomer(event) {

      // event.preventDefault();

      try {

        if (!this.new_customer_name ||
            !this.new_customer_id ||
            !this.new_customer_email ||
            !this.new_customer_first_name ||
            !this.new_customer_last_name ||
            !this.new_customer_phone ||
            !this.new_customer_discount ||
            this.new_customer_delivery_points.length == 0
           )
           {
             return
           }

        this.isLoading = true;

        let new_customer = await this.createCustomer({
          email: this.new_customer_email,
          company_name: this.new_customer_name,
          first_name: this.new_customer_first_name,
          last_name: this.new_customer_last_name,
          phone: this.new_customer_phone,
          organization_id: this.new_customer_id,
          shop_id:this.shop_id,
          discount:this.new_customer_discount

        });

        this.mixpanelTrack('Create New Customer: Customers Page');
        await this.listcustomers()

        for(var x in this.new_customer_delivery_points){

          await this.createPermission({
            userId: new_customer,
            locationId: this.new_customer_delivery_points[x]
          });
        }

        this.$notify.success(this.$t('app.customers.customer_added').replace('%s',this.new_customer_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.customers.add_error'), 'success')

      }

      // this.$refs.newCustomerModal.hide()
      this.showModal = false;
      this.isLoading = false;
      this.new_customer_name = ''
      this.new_customer_id = ''
      this.new_customer_email = ''
      this.new_customer_first_name = ''
      this.new_customer_last_name = ''
      this.new_customer_phone = ''
      this.new_customer_discount = 0
      this.new_customer_delivery_points = []

    },
    createCustomer(customer) {
      return API.post("metamat", "/customers", {
        body: customer
      });
    },
    createPermission(permission) {
      return API.post("metamat", "/permissions", {
        body: permission
      });
    },

    showPopup(){
      this.showModal = true;
      this.$store.dispatch('lockBody');
      this.delivery_points = []

      this.mixpanelTrack('Click: Customers Page - New Customer Modal');

      for(var x in this.delivery_points_props) {

        this.delivery_points.push({
          id: this.delivery_points_props[x].objectId ,
          value:this.delivery_points_props[x].objectId ,
          text: this.delivery_points_props[x].objectName ,
        })
      }
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },

    listcustomers() {
      this.$emit('listcustomers')
    },
    showNewCategoryModal(){
      this.$refs.newCustomerModal.show()

      this.delivery_points = []

      for(var x in this.delivery_points_props) {

        this.delivery_points.push({
          id: this.delivery_points_props[x].objectId ,
          value:this.delivery_points_props[x].objectId ,
          text: this.delivery_points_props[x].objectName ,
        })
      }
    }
  }
}

</script>
