<template>

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
  <div v-if="currentTab == 'production' && !isLoading">
    <div class="app-ui-overlay__centered-column">
      <div class="list-bar--inline-items u-margin-bottom-big">
        <Datepicker class="list-bar input__selector--narrow" @input="listProductionOrders" name="filter_date_from"  :value="productionFromDate" v-model="productionFromDate">{{ productionFromDate }}</Datepicker>
        <img class="u-margin-right-default u-margin-left-default"
             src="~assets/images/icons/Icon_Right_Arrow_White_Large.svg"
             alt="to">
        <Datepicker class="list-bar input__selector--narrow--right" @input="listProductionOrders" name="filter_date_to"  :value="productionToDate" v-model="productionToDate">{{ productionToDate }}</Datepicker>
      </div>
      <!-- {{fromDate}} -->

      <AddFilterModal
        v-if="!isLoading"
        :filter_types="filterTypes"
        :filter_data="{customers, productsList,orderStatus}"
        @add_filter="addFilter($event, productionFilters)"/>

      <div class="u-margin-bottom-big"/>

      <p v-if="productionFilters.length>0" class="app-ui-overlay__section-title">{{ $t('app.orders.filters') }}</p>

      <div v-if="productionFilters.length>0" class="filter-container u-margin-bottom-default" >
        <FilterBar v-for="(filter, index) in productionFilters"
                   index="index"
                   @remove="removeFilter(productionFilters, index)"
                   :type="filter.type.text"
                   :value="filter.value.text"/>
      </div>
    </div>

    <div v-if="isLoading" class="app-ui-overlay__centered-column">
      <LoadingAnimation/>
    </div>

    <div v-if="!isLoading" class="app-ui-overlay__centered-column">
      <!-- <div class="u-margin-bottom-big"/> -->

      <Order
        v-if ="!isLoading"
        v-for="(order,index) in production"
        :order="order"

        @listOrders="listProductionOrders"
       />

       <p class="app-ui-overlay__section-title">{{ $t('app.orders.to_be_produced') }}</p>

       <a class="round-button round-button--print"
          :href="productionPrintLink"
          target="_blank">&nbsp;</a>

    </div>
  </div>
  <div v-if="currentTab == 'invoicing' && !isLoading">
    <div class="app-ui-overlay__centered-column">

    <div class="list-bar--inline-items u-margin-bottom-big">
      <Datepicker class="list-bar input__selector--narrow" name="filter_date_from" @input="listInvoicingOrders"  :value="invoicingFromDate" v-model="invoicingFromDate">{{ invoicingFromDate }}</Datepicker>
      <img class="u-margin-right-default u-margin-left-default"
           src="~assets/images/icons/Icon_Right_Arrow_White_Large.svg"
           alt="to">
      <Datepicker class="list-bar input__selector--narrow--right" name="filter_date_to" @input="listInvoicingOrders"  :value="invoicingToDate" v-model="invoicingToDate">{{ invoicingToDate }}</Datepicker>
    </div>

      <AddFilterModal
        v-if="!isLoading"
        :filter_types="filterTypes"
        :filter_data="{customers, productsList,orderStatus}"
        @add_filter="addFilter($event, invoicingFilters)"/>

      <div class="u-margin-bottom-big"/>

      <p v-if="invoicingFilters.length>0" class="app-ui-overlay__section-title">{{ $t('app.orders.filters') }}</p>

      <div v-if="invoicingFilters.length>0" class="filter-container u-margin-bottom-default">
        <FilterBar v-for="(filter, index) in invoicingFilters"
                   index="index"
                   @remove="removeFilter(invoicingFilters, index)"
                   :type="filter.type.text"
                   :value="filter.value.text"/>
      </div>
    </div>

    <div v-if="isLoading" class="app-ui-overlay__centered-column">
      <LoadingAnimation/>
    </div>

    <div v-if="!isLoading" class="app-ui-overlay__centered-column">

      <Order
        v-if ="!isLoading"
        v-for="(order,index) in invoicing"
        :order="order"

        @listOrders="listInvoicingOrders"
       />

      <p class="app-ui-overlay__section-title">{{ $t('app.orders.to_be_invoiced') }}</p>

      <a class="round-button round-button--print"
         :href="invoicingPrintLink"
         target="_blank">&nbsp;</a>

    </div>
  </div>
  <div v-if="currentTab == 'recurring' && !isLoading">
    <div class="app-ui-overlay__centered-column">

      <AddFilterModal
        v-if="!isLoading"
        :filter_types="filterTypes"
        :filter_data="{customers, productsList,orderStatus}"
        @add_filter="addFilter($event, recurringFilters)"/>

      <div class="u-margin-bottom-big"/>

      <p v-if="recurringFilters.length>0" class="app-ui-overlay__section-title">{{ $t('app.orders.filters') }}</p>

      <div v-if="recurringFilters.length>0" class="filter-container u-margin-bottom-default">
        <FilterBar v-for="(filter, index) in recurringFilters"
                   index="index"
                   @remove="removeFilter(recurringFilters, index)"
                   :type="filter.type.text"
                   :value="filter.value.text"/>
      </div>
    </div>

    <div v-if="isLoading" class="app-ui-overlay__centered-column">
      <LoadingAnimation/>
    </div>

    <div v-if="!isLoading" class="app-ui-overlay__centered-column">

      <Order
        v-if ="!isLoading"
        v-for="(order,index) in recurring"
        :order="order"

        @listOrders="listRecurringOrders"
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
import OrdersFilter from '~/components/Orders/OrdersFilter.vue'
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import FilterBar from '~/components/General/FilterBar.vue'
import AddFilterModal from '~/components/Filters/AddFilterModal.vue'
import Datepicker from 'vuejs-datepicker';
import Tabs from 'vue-tabs-with-active-line';


export default {

  components: {
    Order,
    OrdersFilter,
    LoadingAnimation,
    FilterBar,
    AddFilterModal,
    Datepicker,
    Tabs
  },
  data() {
    return {
      tabs:[{
        title: this.$t('app.orders.production'),
        value: 'production',
      }, {
        title: this.$t('app.orders.invoicing'),
        value: 'invoicing',
      },
      {
        title: this.$t('app.orders.recurring'),
        value: 'recurring',
      }
      ],
      currentTab: 'production',
      isLoading:false,
      shop_id:this.$route.params.shopId,

      production:[],
      invoicing:[],
      recurring:[],
      productionDisabledDates:{},
      invoicingDisabledDates:{},
      productionFromDate:null,
      productionToDate: null,
      invoicingFromDate:null,
      invoicingToDate: null,
      filterTypes: [
        {value: 'customers', text: this.$t('app.customers.customer')},
        {value: 'productsList', text: this.$t('app.products.product')},
        {value: 'orderStatus', text: this.$t('app.orders.order_status')}
      ],
      customers: [],
      productsList: [],
      orderStatus:[
        {value: 'canceled', text: this.$t('app.orders.canceled')},
        {value: 'pending', text: this.$t('app.orders.pending')},
        {value: 'completed', text: this.$t('app.orders.completed')}
      ],
      productionFilters: [{"type":{"value":"orderStatus","text":"Order Status"},"value":{"value":"pending","text":"Pending"}}],
      invoicingFilters: [{"type":{"value":"orderStatus","text":"Order Status"},"value":{"value":"pending","text":"Completed"}}],
      recurringFilters:[{"type":{"value":"orderStatus","text":"Order Status"},"value":{"value":"pending","text":"Pending"}}],
      productionPrintLink:'',
      invoicingPrintLink:'',
    }
  },

  watch: {
    productionFilters: function (val) {

      this.listProductionOrders()
      this.generateProductionPrintLink()
    },
    invoicingFilters: function (val) {

      this.listInvoicingOrders()
      this.generateInvoicingPrintLink()
    },
    recurringFilters: function (val) {
      this.listRecurringOrders()
    }
  },

  async created() {

    this.mixpanelTrack('Page View: Orders Page');

    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    this.productionFromDate = today
    this.productionToDate = tomorrow

    this.invoicingFromDate = yesterday
    this.invoicingToDate = yesterday

    this.productionDisabledDates = {to: new Date(today.getFullYear(),today.getMonth(), today.getDate())}
    this.invoicingDisabledDates = {from: new Date(tomorrow.getFullYear(),tomorrow.getMonth(), tomorrow.getDate())}

      try {

        this.isLoading = true

        await this.listProductionOrders()
        await this.listProducts();

        for (var x in this.products ) {
          if (this.products[x].objectShopId == this.shop_id) {
            this.productsList.push({
              value:this.products[x].objectId,
              text:this.products[x].objectName
            })
          }
        }

        await this.listcustomers();


        this.isLoading = false

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(e.message, 'success')
      }
    },

  methods : {


    async handleClick(newTab) {

      this.mixpanelTrack('Tab Click: Orders Page - ' + newTab);

      if (newTab == 'production') {
        this.listProductionOrders()
      }
      if (newTab == 'invoicing') {
        this.listInvoicingOrders()
      }
      if (newTab == 'recurring') {
        this.listRecurringOrders()
      }

      this.$nextTick(() => {
      this.currentTab = newTab;
      });
    },


    listcustomers () {
      this.pageloading = true
      // console.log('dev');
      this.customers = []

      API.get("metamat", "/customers/"+this.shop_id).then((customers_list) => {

        for (var x in customers_list) {
          this.customers.push({
            value:customers_list[x].objectId,
            text:customers_list[x].objectName
          })
        }
      });
    },

    async listProductionOrders(mode) {

      this.isLoading =  true
      this.production = []

      this.generateProductionPrintLink()

      await API.post("metamat", "/cart/owner/orders/"+this.shop_id,{
        body:{
          mode:'production',
          filters: {
            from: new Date(this.productionFromDate).setHours(0,0,0),
            to: new Date(this.productionToDate).setHours(23,59,59),
            filters:this.productionFilters
          }
        }
      }).then((orders) => {
        if(process.env.stage === 'dev'){
          console.log(`dev: got back: orders`, orders);
        }
        this.production = []

        for(var x in orders ){
            this.production.push(orders[x])
        }
      })
      this.isLoading =  false
    },

    async listInvoicingOrders(mode) {

      this.isLoading =  true
      this.invoicing=[]

      this.generateInvoicingPrintLink()
      await API.post("metamat", "/cart/owner/orders/"+this.shop_id,{
        body:{
          mode:'invoicing',
          filters: {
            from: new Date(this.invoicingFromDate).setHours(0,0,0),
            to: new Date(this.invoicingToDate).setHours(23,59,59),
            filters:this.invoicingFilters
          }
        }
      }).then((orders) => {


        for(var x in orders ){
        this.invoicing.push(orders[x])
        }
      })
      this.isLoading =  false
    },


    async listRecurringOrders(mode) {

      this.isLoading =  true
      this.recurring=[]


      await API.post("metamat", "/cart/owner/orders/"+this.shop_id,{
        body:{
          mode:'recurring',
          filters: {
            filters:this.recurringFilters
          }
        }
      }).then((orders) => {


        for(var x in orders ){
        this.recurring.push(orders[x])
        }
      })
      this.isLoading =  false
    },

    generateProductionPrintLink () {

    let link  = '/app/company-dashboard/shop-management/orders/print/'

    let customers = []
    let products = []

        for (var x in this.productionFilters) {
          if (this.productionFilters[x].type.value == 'customers') {
            customers.push(this.productionFilters[x].value.value)
          }
          if (this.productionFilters[x].type.value == 'productsList') {
            products.push(this.productionFilters[x].value.value)
          }
        }

        let inputs = {
          shop_id: this.shop_id,
          from: new Date(this.productionFromDate).getTime(),
          to: new Date(this.productionToDate).getTime(),
          customers:customers,
          products:products
        }

        link+=JSON.stringify(inputs)
        this.productionPrintLink =  link

    },

    generateInvoicingPrintLink () {

    let link  = '/app/company-dashboard/shop-management/orders/print-invoice/'

    let customers = []
    let products = []

        for (var x in this.invoicingFilters) {
          if (this.invoicingFilters[x].type.value == 'customers') {
            customers.push(this.invoicingFilters[x].value.value)
          }
          if (this.invoicingFilters[x].type.value == 'productsList') {
            products.push(this.invoicingFilters[x].value.value)
          }
        }

        let inputs = {
          shop_id: this.shop_id,
          from: new Date(this.invoicingFromDate).getTime(),
          to: new Date(this.invoicingToDate).getTime(),
          customers:customers,
          products:products
        }

        link+=JSON.stringify(inputs)
        console.log(link);
        this.invoicingPrintLink =  link

    },

    async dateSelected (selected_date){
      this.isLoading = true

      //await this.listOrders()

      for (var x in this.history) {
        
        let order_date = this.formatTimeStampDate(this.history[x].delivery_date)

        if (order_date != selected_date ){
           this.history.splice(x, 1)
        }
      }
      this.isLoading = false
    },

    addFilter(filter, filterArray){


      this.mixpanelTrack('Filter Add: Orders Page - ' + filter.type.text);

      filterArray.push(
        {
          type: filter.type,
          value: filter.value
        }
      );

      if(process.env.stage === 'dev'){
        console.log(filter);
      }
    },
    removeFilter(filterArray, index){
      filterArray.splice(index, 1);

      if(process.env.stage === 'dev'){
        console.log(`removed filter ${index + 1}`);
      }
    },
  }
}

</script>
