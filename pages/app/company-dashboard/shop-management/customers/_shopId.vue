<template>

  <div class="shop">
  <div>
    <h2 class="app-ui-overlay__page-title">{{$t('app.menu.company.customers')}}</h2>
    <div v-if="pageloading" class="app-ui-overlay__centered-column">
      <LoadingAnimation/>
    </div>
    <Customer
      v-if="!pageloading"
      v-for="(customer,index) in customers"
      :key="customer.user_name"
      :customer_owners_prop="customer.owners"
      :customer_company_id_prop="customer.company_id"
      :customer_business_name_prop="customer.business_name"
      :customer_discount_prop="customer.discount"
      :customer_organization_id_prop="customer.organization_id"
      :delivery_points_prop="delivery_points"
      @listcustomers="listcustomers"
      :shop_id="shop_id"
    />
    <NewCustomer
      @listcustomers="listcustomers"
      :shop_id="shop_id"
      :delivery_points_props="delivery_points"
    />
  </div>
  </div>
</div>

</template>

<script>
import {
  API
} from "aws-amplify";

import Customer from '~/components/Customers/Customer.vue'
import NewCustomer from '~/components/Customers/NewCustomer.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'

export default {

  components: {
    Customer,
    NewCustomer,
    LoadingAnimation
  },

  data() {
    return {
      customers:[],
      delivery_points:[],
      pageloading: true,
      shop_id:this.$route.params.shopId
    }
  },

  async created() {
    // console.log('dev');
    this.pageloading = true
    try {
      this.mixpanelTrack('Page View: Customers Page');
      await this.listcustomers();
      await this.listDeliveryPoints();
    }
    catch(e){
      bugsnagClient.notify(e)
      this.$notify.error(e.message, 'success')
      this.pageloading = false
    }

  },
  methods : {

    listcustomers () {
      this.pageloading = true
      // console.log('dev');
      this.customers = []

      API.get("metamat", "/customers/"+this.shop_id).then((customers_list) => {
        for (var x in customers_list) {
          let customer = {}
          customer.owners = customers_list[x].owners
          customer.company_id = customers_list[x].objectId
          customer.business_name = customers_list[x].objectName
          customer.organization_id = customers_list[x].objectOrganizationId
          customer.discount = customers_list[x].discount
          this.customers.push(customer)
          console.log(customer);
        }
        this.pageloading = false
        // console.log('dev');
      });
    },

    listDeliveryPoints () {
      // console.log('dev');
      this.delivery_points = []

      API.get("metamat", "/delivery-points/"+this.shop_id).then((delivery_points) => {
         this.delivery_points = delivery_points
         // console.log('dev');
         // this.pageloading = false
       });
    }
  }
}
</script>
