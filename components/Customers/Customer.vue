<template>

  <div class="list-bar">
    <div class="list-bar__text-container">
      <h5 class="list-bar__title">{{customer_business_name}}</h5>
    </div>
    <div class="list-bar__icon">
      <EditCustomer
      :customer_owners_prop="customer_owners"
      :customer_company_id_prop="customer_company_id"
      :customer_business_name_prop="customer_business_name"
      :customer_organization_id_prop="customer_organization_id"
      :customer_discount_prop="discount"
      :delivery_points_prop="delivery_points"
      :shop_id="shop_id"
      @listcustomers="listcustomers"
      />
    </div>
  </div>

</template>


<script>
import {
  API
} from "aws-amplify";

import EditCustomer from '~/components/Customers/EditCustomer.vue'

export default {

  components: {
    EditCustomer
  },
  props : {
    shop_id: {
        type : String,
        required : true
    },
    delivery_points_prop: {
      type: Array,
      required:false
    },
    customer_discount_prop: {
      type:String,
      required:true
    },
    customer_owners_prop: {
      type: Array,
      required: true
    },
    customer_company_id_prop: {
      type: String,
      required: true
    },
    customer_business_name_prop: {
      type: String,
      required: true
    },
    customer_organization_id_prop: {
      type: String,
      required: true
    }
  },
  data () {

    return {
      customer_owners: this.customer_owners_prop,
      customer_company_id: this.customer_company_id_prop,
      customer_business_name: this.customer_business_name_prop,
      customer_organization_id: this.customer_organization_id_prop,
      delivery_points: this.delivery_points_prop,
      discount:this.customer_discount_prop
    }
  },
  methods : {

    listcustomers() {
      this.$emit('listcustomers')
    },
  }

}
</script>
