<template>

  <div>

    <b-tabs class="nav-center">


    <b-tab class="app-ui-overlay__page-title" :title="$t('app.orders.confirmed')" >
    <div class="app-ui-overlay__centered-column">
      <a class="round-button round-button--print" :href="'/app/company-dashboard/shop-management/orders/print/'+shop_id" target="_blank">&nbsp;</a>
    </div>
      <div>
        <div v-if="isLoading" class="app-ui-overlay__centered-column">
          <LoadingAnimation/>
        </div>
        <Order
          v-if ="!isLoading"
          v-for="(order,index) in confirmed"
          :order="order"
          canEdit="yes"
          @listOrders="listOrders"
         />
    </div>

    </b-tab>

    <b-tab class="app-ui-overlay__page-title" :title="$t('app.orders.future')" >
      <div>
        <div v-if="isLoading" class="app-ui-overlay__centered-column">
          <LoadingAnimation/>
        </div>
        <Order
          v-if ="!isLoading"
          v-for="(order,index) in outstanding"
          :order="order"
          canEdit="yes"
          @listOrders="listOrders"
         />
    </div>

    </b-tab>


    <b-tab class="app-ui-overlay__page-title" :title="$t('app.orders.history')">
      <div>
        <OrdersFilter
        @dateSelected="dateSelected"
        @listOrders="listOrders"
        />
        <div class="u-margin-bottom-big"/>

        <div v-if="isLoading" class="app-ui-overlay__centered-column">
          <LoadingAnimation/>
        </div>
        <Order
          v-if="!isLoading"
          v-for="(order,index) in histroy"
          :order="order"
          canEdit="yes"
          @listOrders="listOrders"
         />

    </div>

    </b-tab>


    </b-tabs>

</div>

</template>


<script>

import { API } from "aws-amplify";

import Order from '~/components/Orders/Order.vue'
import OrdersFilter from '~/components/Orders/OrdersFilter.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'


export default {

  components: {
    Order,
    OrdersFilter,
    LoadingAnimation
  },
  data() {
    return {
      isLoading:false,
      shop_id:this.$route.params.shopId,
      outstanding:[],
      histroy:[],
      confirmed:[]
    }
  },

    async created() {

      try {

        this.isLoading = true

        await this.listOrders();

        this.isLoading = false

      } catch (e) {
        this.$notify.error(e.message, 'success')
      }

    },

  methods : {

    async listOrders() {

      this.histroy = []
      this.outstanding = []
      await API.get("metamat", "/cart/owner/orders/"+this.shop_id).then((orders) => {

        let today = new Date();
        let today16 = new Date();
        today16.setHours(16, 0, 0, 0);
        let today16_time_stamp = today16.getTime()

        let tomorrow16 = new Date();
        tomorrow16.setDate(today.getDate()+1);
        tomorrow16.setHours(16, 0, 0, 0);
        let tomorrow16_time_stamp = tomorrow16.getTime()


        for(var x in orders ){

          if (orders[x].delivery_date <= tomorrow16_time_stamp && orders[x].delivery_date > today16_time_stamp) {
            this.confirmed.push(orders[x])
          }

          else if (orders[x].delivery_date > tomorrow16_time_stamp) {
            this.outstanding.push(orders[x])
          }
          else {
            this.histroy.push(orders[x])
          }

        }

      })

    },

   async dateSelected (selected_date){


     this.isLoading = true

     await this.listOrders()

     for (var x in this.histroy) {

       let date =  new Date(this.histroy[x].delivery_date)
       let order_date = (date.getDate())+'-'+(date.getMonth()+1)+'-'+(date.getFullYear())

       if (order_date != selected_date ){

           this.histroy.splice(x, 1)

       }
   }

   this.isLoading = false
  }

}
}

</script>
