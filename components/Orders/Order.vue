<template>

    <div class="list-bar">
      <div class="list-bar__link list-bar__link--short">
        <div class="list-bar__text-container">
          <h5 class="list-bar__title">{{total}} kr</h5>
          <p class="list-bar__info"><span class="list-bar__info--bold">{{order_status}}</span> - {{user}} <span> {{ship_date}}</span></p>
        </div>

        <OrderSummary
        :order="order"
        @listOrders="listOrders"
        />
    </div>
  </div>

</template>
<script>

import OrderSummary from '~/components/Orders/OrderSummary.vue'

export default {

  components: {
    OrderSummary
  },
  props: {
    order:{
      type:Object,
      required:true
    }
  },

  data() {
    return {
      total:this.order.total,
      users:[],
      user:'',
      order_status:'',
      order_date:'',
      ship_date:'',
      days_of_the_month:[]
  }
},
created () {

     this.days_of_the_month[1] = this.$t('app.general.days_of_the_month.mon') ;
     this.days_of_the_month[2] = this.$t('app.general.days_of_the_month.tue') ;
     this.days_of_the_month[3] = this.$t('app.general.days_of_the_month.wed') ;
     this.days_of_the_month[4] = this.$t('app.general.days_of_the_month.thu') ;
     this.days_of_the_month[5] = this.$t('app.general.days_of_the_month.fri') ;
     this.days_of_the_month[6] = this.$t('app.general.days_of_the_month.sat') ;
     this.days_of_the_month[7] = this.$t('app.general.days_of_the_month.sun') ;

  this.users[0]= this.order.user
  this.user = this.getUser(this.users[0].Username)

  let today = new Date();
    today.setHours(0,0,0,0)

  if (this.order.delivery_date < today.getTime() && this.order.schedule_type != 'weekly' && this.order.orderStatus != 'canceled') {
    this.order.orderStatus = 'completed'
  }

  this.order_status = this.$t('app.orders.'+this.order.orderStatus)

  if (this.order.schedule_type == 'weekly'){

    this.ship_date = ''

   for (var x in this.order.schedule_dates) {

     this.ship_date += this.days_of_the_month[this.order.schedule_dates[x]]
     this.ship_date +=', '
   }

   this.ship_date  = this.ship_date.substring(0, this.ship_date.length-2);

  }
  else {

    this.ship_date = this.formatTimeStampDate (this.order.delivery_date) 

  }

},
methods : {
  listOrders () {
    this.$emit('listOrders')
  },
  getUser (user_id) {

    let first_name = ''
    let last_name = ''

    for (var x in this.users)  {

      if (this.users[x].Username == user_id) {

        for (var y in this.users[x].UserAttributes) {

          if (this.users[x].UserAttributes[y].Name == 'custom:first_name'){
            first_name = this.users[x].UserAttributes[y].Value
          }
          if (this.users[x].UserAttributes[y].Name == 'custom:last_name'){
            last_name = this.users[x].UserAttributes[y].Value
          }

        }

      }
    }
    return first_name + ' ' + last_name

  }
}

}
</script>
