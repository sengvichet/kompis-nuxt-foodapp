<template>

  <div class="list-bar__arrow">
    <a class="list-bar__click-overlay" href="#" @click.prevent="showPopup"/>

    <div>
      <img src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <ModalBody v-if="showModal" z_index="1" footerType="none" title="Order Summary" footerText="Save" @clickedSave="test" @close="closePopup">
      <template slot="heading">

      </template>

      <template slot="subheading">
        <p class="moose__header-info">{{$t('app.orders.placed_on')}} <span class="moose__header-info__date">{{order_date}}</span></p>
      </template>
      <template slot="modal-content">


        <div class="list-bar list-bar__summary">

          <div v-if="canEdit=='yes' && false" class="checkbox checkbox-info checkbox-circle">
            <input :id="'order'+cart_id" type="checkbox" v-model="selectedOrder"  :value="cart_id">
            <label :for="'order'+cart_id"></label>
          </div>


          <p class="order-summary" v-if="!on_behalf_of_user">

            <span class="order-summary order-summary__customer-name">{{user}}</span>
            {{$t('app.orders.of')}}
            <span class="order-summary order-summary__company-name">{{company_name}}</span>
          </p>

          <p class="order-summary" v-if="on_behalf_of_user">
            <span class="order-summary order-summary__customer-name">{{user}}</span>
            for
            <span class="order-summary order-summary__customer-name">{{on_behalf_of_user}}</span>
            {{$t('app.orders.of')}}
            <span class="order-summary order-summary__company-name">{{company_name}}</span>
          </p>


          <p class="order-summary">{{$t('app.orders.to_be_delivered')}}
            <span class="order-summary order-summary__delivery-point-name">{{delivery_point}}, </span>
            <span class="order-summary order-summary__delivery-point-address">{{delivery_point_address}}</span>
            {{$t('app.orders.on')}} {{delivery_date}}
            <span v-if="delivery_time"> @ {{delivery_time}}</span>
          </p>

          <br/>

          <div
          v-for="(item,index) in items"
          class="order-summary order-summary__products">
              <span class="order-summary order-summary__product__num">{{item.quantity}} x {{item.name}}</span>
              <span class="order-summary order-summary__product__price">{{item.price*item.quantity}} kr</span>
          </div>

          <div class="order-summary order-summary__products">
            <span class="order-summary order-summary__product__num">Freight</span>
            <span class="order-summary order-summary__product__price">{{freight}} kr</span>
          </div>

          <div class="order-summary order-summary__products">
            <span class="order-summary order-summary__product__num">Discount: {{discount}}%</span>
            <span class="order-summary order-summary__product__price">- {{discount_value}} kr</span>
          </div>

          <div class="order-summary order-summary__products">
            <p class="order-summary">Total</p>
            <p class="order-summary order-summary__price">{{total}} kr</p>
          </div>

          <br>

          <p class="order-summary order-summary__comment-title">Comments</p>
          <p class="order-summary order-summary__comment-details">{{comment}}</p>



        </div>

        <div >
          <DeleteButton v-if="can_delete" @was_clicked="deleteOrderSubmit()"
                :prompt="$t('app.general.are_you_sure_cant_undo')"/>

        </div>


        <b-button v-if="canEdit=='yes' && false" size="sm" variant="success" @click.prevent="shipOrder" type="submit">Mark as shipped <icon name="refresh" v-if="isLoading" scale="0.75" spin></icon></b-button>
      </template>
    </ModalBody>
  </div>
</template>

<!--

   ######   ######  ########  #### ########  ########
  ##    ## ##    ## ##     ##  ##  ##     ##    ##
  ##       ##       ##     ##  ##  ##     ##    ##
   ######  ##       ########   ##  ########     ##
        ## ##       ##   ##    ##  ##           ##
  ##    ## ##    ## ##    ##   ##  ##           ##
   ######   ######  ##     ## #### ##           ##

 -->

<script>
import {
  API
} from "aws-amplify";
import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'
import DeleteButton from '~/components/General/DeleteButton.vue'

export default {
  components: {
    Icon,
    ModalBody,
    DeleteButton
  },
  props: {
    order:{
      type:Object,
      required:true
    }
  },
  data () {
   return {
     users:[],
     isLoading:false,
     selectedOrder:'',
     user:null,
     on_behalf_of_user:null,
     order_date:'',
     ship_date:'',
     can_delete:false,
     showModal: false,
     delivery_time:this.order.delivery_time,
     delivery_point:(this.order.delivery_point.objectName) ? this.order.delivery_point.objectName : '',
     delivery_point_address:this.order.delivery_point.objectAddress,
     company_name:this.order.user_company.objectName,
     comment:this.order.comment,
     freight:this.order.freight,
     discount:(this.order.discount) ? parseFloat(this.order.discount).toFixed(2) : 0,
     discount_value:(this.order.discount_value) ? parseFloat(this.order.discount_value).toFixed(2) : 0,
     total:this.order.total,
     items:this.order.items,
     cart_id:this.order.cartId,
     shop_id:this.order.shopId,
     days_of_the_month:[],
     schedule_dates: this.order.schedule_dates,
     schedule_type: this.order.schedule_type,

   }
 },

  created() {

   this.days_of_the_month[1] = this.$t('app.general.days_of_the_month.mon') ;
   this.days_of_the_month[2] = this.$t('app.general.days_of_the_month.tue') ;
   this.days_of_the_month[3] = this.$t('app.general.days_of_the_month.wed') ;
   this.days_of_the_month[4] = this.$t('app.general.days_of_the_month.thu') ;
   this.days_of_the_month[5] = this.$t('app.general.days_of_the_month.fri') ;
   this.days_of_the_month[6] = this.$t('app.general.days_of_the_month.sat') ;
   this.days_of_the_month[7] = this.$t('app.general.days_of_the_month.sun') ;

    this.users[0]= this.order.user
    this.user = this.getUser(this.users[0].Username)

    if (this.order.on_behalf_of != null) {
      this.users[1]= this.order.on_behalf_of
      this.on_behalf_of_user = this.getUser(this.users[1].Username)
    }

    this.order_date = this.formatTimeStampTime (this.order.createdAt)


     if (this.schedule_type == 'weekly'){
     this.delivery_date = ''

     for (var x in this.schedule_dates) {
       this.delivery_date += this.days_of_the_month[this.schedule_dates[x]]
       this.delivery_date +=', '
     }

     this.delivery_date  = this.delivery_date.substring(0, this.delivery_date.length-2);

    }
    else {

    this.delivery_date = this.formatTimeStampDate(this.order.delivery_date)
    }

    if (this.order.orderStatus == 'pending') {
      this.can_delete = true
    }

 },

  methods: {

    async deleteOrderSubmit(event) {

            //  if (confirm("Are you sure? You can't undo this!")){
              try {
                  this.isLoading = true

              await API.del("metamat", "/cart/orders/ship/" + this.shop_id, {
                body: {
                  cart_id: this.cart_id
                }
              });

              this.mixpanelTrack('Delete Order: Orders Page');

              this.closePopup();

              this.$emit('listOrders')

              //this.$refs.orderSummary.hide()
              this.isLoading = false
              this.$notify.success('Order deleted', 'success')

            } catch (e) {
              bugsnagClient.notify(e)
              this.isLoading = false
              this.$notify.error('Can delete this order', 'success')
            }
          //}
    },

    async shipOrder() {

      try {
        if (this.selectedOrder!=''){

          this.isLoading = true

      await API.put("metamat", "/cart/orders/ship/" + this.shop_id, {
        body: {
          cart_id: this.cart_id
        }
      });

      this.$emit('listOrders')

      //this.$refs.orderSummary.hide()
      this.isLoading = false
      this.$notify.success('Order marked as shipped', 'success')

    }

    } catch (e) {
      bugsnagClient.notify(e)
      this.isLoading = false
      this.$notify.error('Can not make this order as shipped', 'success')
    }


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

    },
    async showPopup(){
      this.mixpanelTrack('Click: Orders Page - Order Summary Modal');
      this.showModal = true;
      this.$store.dispatch('lockBody');
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
    async test(event){
      console.log('clicked save: ' + event);
      this.closePopup();
    },
    async showOrderSummaryModal(){

      this.$refs.orderSummary.show()
  }
}
}

</script>
