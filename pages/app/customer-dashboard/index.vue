<template>
  <div>

    <div>
      <div>
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'default-tabs'"
      :tab-class="'default-tabs__item'"
      :tab-active-class="'default-tabs__item_active'"
      :line-class="'default-tabs__active-line'"
      @onClick="handleClick"
    />

    <div v-if="isLoading" class="app-ui-overlay__centered-column">
        <LoadingAnimation/>
      </div>


    <div v-if="!isLoading" class="content">
      <div v-if="currentTab === 'oustanding'">
        <Order
            v-if ="!isLoading"
            v-for="(order,index) in outstanding"
            :order="order"
            canEdit="no"

            @listOrders="listOrders"
           />
      </div>
      <div v-if="currentTab === 'recurring'">
        <Order
          v-if="!isLoading"
          v-for="(order,index) in recurring"
          :order="order"
          canEdit="no"
          @listOrders="listOrders"
         />
      </div>
      <div v-if="currentTab === 'history'">
        <Order
          v-if="!isLoading"
          v-for="(order,index) in histroy"
          :order="order"
          canEdit="no"
          @listOrders="listOrders"
         />
      </div>
    </div>
  </div>
 </div>

</div>

</template>


<script>

import { API } from "aws-amplify";
import Order from '~/components/Orders/Order.vue'
import Tabs from 'vue-tabs-with-active-line';

import LoadingAnimation from '~/components/General/LoadingAnimation.vue'



export default {

  components: {
    Order,
    Tabs,
    LoadingAnimation
  },
  data() {
    return {
      tabs:[{
        title: this.$t('app.orders.oustanding'),
        value: 'oustanding',
      }, {
        title: this.$t('app.orders.recurring'),
        value: 'recurring',
      },
      {
        title: this.$t('app.orders.history'),
        value: 'history',
      }
      ],
      currentTab: 'oustanding',

      isLoading:false,
      shop_id:'58340300-2eb6-11e9-96c1-f3dbad797ef9',
      canEdit:'no',
      outstanding:[],
      current_order:{},
      histroy:[],
      recurring:[]
    }
  },
  created () {
    this.mixpanelTrack('Page View: Orders History Page');
  },

    async created() {

      try {

        this.isLoading = true
        await this.listOrders();

        this.isLoading = false

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(e.message, 'success')
      }

    },

  methods : {

    async handleClick(newTab) {

      this.mixpanelTrack('Tab Click: Order History Page - '+ newTab)

      this.isLoading = true
      await this.listOrders();
      this.currentTab = newTab;
      this.isLoading = false
    },

    async listOrders() {

      this.histroy = []
      this.outstanding = []
      this.recurring = []
      await API.get("metamat", "/cart/customer/orders/").then((orders) => {

        let today = new Date();
        let today16 = new Date();
        today16.setHours(16, 0, 0, 0);
        let today16_time_stamp = today16.getTime()


        for(var x in orders ){

           if (orders[x].schedule_type == 'weekly') {
             this.recurring.push(orders[x])
           }
           else {
           if (orders[x].delivery_date >= today16_time_stamp) {
              this.outstanding.push(orders[x])
            }
            else {
              this.histroy.push(orders[x])
            }
           }

        }

      })

    },

   async dateSelected (selected_date){


     this.isLoading = true

     await this.listOrders()

     for (var x in this.histroy) {

       let date =  new Date(this.histroy[x].createdAt)
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
