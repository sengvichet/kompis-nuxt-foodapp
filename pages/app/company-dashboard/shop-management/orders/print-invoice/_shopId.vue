<!--
########  ########  #### ##    ## ########     ######  ##     ## ##     ## ##     ##    ###    ########  ##    ##
##     ## ##     ##  ##  ###   ##    ##       ##    ## ##     ## ###   ### ###   ###   ## ##   ##     ##  ##  ##
##     ## ##     ##  ##  ####  ##    ##       ##       ##     ## #### #### #### ####  ##   ##  ##     ##   ####
########  ########   ##  ## ## ##    ##        ######  ##     ## ## ### ## ## ### ## ##     ## ########     ##
##        ##   ##    ##  ##  ####    ##             ## ##     ## ##     ## ##     ## ######### ##   ##      ##
##        ##    ##   ##  ##   ###    ##       ##    ## ##     ## ##     ## ##     ## ##     ## ##    ##     ##
##        ##     ## #### ##    ##    ##        ######   #######  ##     ## ##     ## ##     ## ##     ##    ##       -->


<template>

<div>
  <header class="header">
    <div>
      <h1>{{$t('app.print_invoice.title')}} {{$t('app.general.for')}} {{ companyName }}</h1>
      <h2>{{$t('app.print_invoice.period')}}: {{ this.fromDate }} - {{ this.toDate }}</h2>
    </div>
    <div>
      <h2>{{$t('app.print_invoice.report_date')}}:</h2>
      <h3>{{formatTimeStampDate(reportDate)}}</h3>
    </div>
  </header>

  <hr>

  <br>

  <div class="table"
      v-for="(order,index) in orders"
  >
    <div class="table__row table__row--border-bottom">
      <p colspan="3" class="title--ship">
        <strong>
          {{order.user.UserAttributes[9].Value}} {{order.user.UserAttributes[7].Value}}
        </strong> {{$t('app.general.at')}}
        <strong>
          {{order.user_company.objectName}}
        </strong>
        {{$t('app.orders.ordered_goods_to')}}
        <strong>
          {{order.delivery_point.objectName}}, {{order.delivery_point.objectAddress}}
        </strong>
        {{$t('app.orders.on')}}
        <strong>
          {{formatTimeStampDate(reportDate)}}
        </strong>
      </p>
    </div>
    <div class="table__row">
      <p class="subtitle item table__row--title">{{$t('app.products.product')}}</p>
      <p class="subtitle count table__cell--20">{{$t('app.orders.count')}}</p>
      <p class="subtitle price table__cell--20">{{$t('app.orders.sub_total')}}</p>
    </div>
    <div class="table__row"v-for="item in order.items">
      <p class="table__row--title">{{ item.name }}</p>
      <p class="table__cell--20">{{ item.quantity }}</p>
      <p class="table__cell--20">{{ (item.price * item.quantity).toFixed(2) }}kr</p>
    </div>
    <div class="table__row">
      <p class="table__cell--20" >{{$t('app.orders.freight')}}</p>
      <p class="table__cell--20">{{ order.freight }}kr</p>
    </div>
    <div class="table__row table__row--border-top">
      <p class="subtitle">{{$t('app.print.comment')}}</p>
    </div class="table__row">
    <div class="table__row">
      <p colspan="3">{{ order.delivery_point.objectDesc }}</p>
    </div>
  </div>


  <hr>

  <footer class="table__row">
    <p class="subtitle table__row--title">{{$t('app.orders.grand_total')}}</p>
    <p class="subtitle table__cell--20">{{this.totalCount}}</p>
    <p class="subtitle table__cell--20">{{this.grandTotal}}kr</p>
  </footer>
</div>

</template>

<script>

import { API } from "aws-amplify";
import groupArray from 'group-array'

export default {
  layout: "print",

  data() {
    return {
      today: {
        year: '',
        month: '',
        day: ''
      },
      fromDate: '',
      toDate: '',
      companyName:'',
      reportDate: 0,
      shop_id:this.$route.params.shopId,
      orders:[]
    }
  },
  computed: {
    totalCount(){
      let count = 0;

      for (let order of this.orders) {
        for (let item of order.items) {
          count += item.quantity;
        }
      }
      return count;
    },
    grandTotal(){
      let total = 0;

      for (let order of this.orders) {
        total += order.total;
      }
      total  = parseFloat(total).toFixed(2)
      return total;
    }
  },
  async created () {

    let now = new Date();
    this.reportDate = now;
    let params = JSON.parse(this.$route.params.shopId)

    this.mixpanelTrack('Page View: Invoices Invoices Page');

    this.fromDate = this.formatTimeStampDate(params.from)
    this.toDate = this.formatTimeStampDate(params.to)

    await API.post("metamat", "/cart/owner/orders/print/"+params.shop_id,
    {body:{
      mode:'invoicing',
      filters: {
        from: params.from,
        to: params.to,
        products:params.products,
        customers:params.customers
      }}
    }).then((orders) => {

      this.orders = orders
      //this.companyName = (this.orders[0].user_company) ? this.orders[0].user_company.objectName : null
      this.companyName = ''
      for (var x in orders) {

          let first_name = ''
          let last_name = ''
          let phone  = ''

         for (var y in orders[x].user.UserAttributes) {

            if (orders[x].user.UserAttributes[y].Name  == 'custom:first_name') {
              first_name = orders[x].user.UserAttributes[y].Value
            }

            if (orders[x].user.UserAttributes[y].Name == 'custom:last_name') {
              last_name = orders[x].user.UserAttributes[y].Value
            }

            if (orders[x].user.UserAttributes[y].Name == 'custom:user_phone') {
              phone = orders[x].user.UserAttributes[y].Value
            }

            orders[x].user_name = first_name + ' ' + last_name
            orders[x].phone  = phone


         }

          for (var y in orders[x].items) {
            this.products.push(orders[x].items[y])
          }
      }

      this.products = groupArray (this.products,'id')

      for (x in this.products ) {
          let name = this.products[x][0].name
          let quantity = 0
          for (y in this.products[x]) {
            quantity+=this.products[x][y].quantity
          }
          /*
          this.products_list.push({
            name:name,
            quantity:quantity
          })
          */
      }
    });

    //window.print();

  }
}
</script>


<style>
  body {
    font-family: sans-serif;
    margin: 10px;
    background: #fff;
    color: #000;
    box-sizing: border-box;
  }

  header {
    display: flex;
    margin: 5rem auto 0 auto;
    max-width: 90%;
    justify-content: space-between;
    align-items: flex-start;
  }

  footer {
    display: flex;
    margin: 0 auto;
    max-width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .table {
    display: flex;
    margin: 20px auto;
    flex-direction: column;
    align-items: flex-start;
    border: 2px solid black;
    width: 90%
  }

  .table__row {
    display: flex;
    padding: 0 15px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .table__row--border-bottom {
    border-bottom: 2px solid black;
  }
  .table__row--border-top {
    border-top: 2px solid black;
  }
  .table__cell--20 {
    line-height: 1.2;
    min-width: 20%;
    max-width: 50%;
  }

  .table__row--title {
    flex-grow: 1;
  }
  .title  {
    font-size: 25px;
    font-weight: bold;
  }

  .subtitle {
    font-size: 20px;
    font-weight: bold;
  }
  .lower-case {
    text-transform: lowercase;
  }
  th, td {
    margin: 0;
    padding: 10px;
    font-size: 16px;
    font-weight: normal;
    border: 1px solid black;
  }

@media all {
.page-break { display: none; }
}

@media print {
.page-break { display: block; page-break-before: always; }
}

</style>
