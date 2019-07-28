<template>

  <div v-if="!isLoading" class="exception-internal">

    <div class="report__info--deviation-link" href="#" @click.prevent="showExceptionModal">
      {{$t('app.reports.open_delivery_report')}}
    </div>

    <ModalBody v-if="innerModal" z_index="20" footerType="none" title="Order Details" footerText="Save" @close="closeModal">

      <template slot="subheading">
        <p class="moose__header-info">{{location_name}}</p>
      </template>
      <template slot="modal-content">


<div class="list-bar list-bar__summary">
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
                    {{$t('app.orders.on')}}
                    <span v-if="delivery_time"> @ {{delivery_time}}</span>
                  </p>

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
                    <p class="order-summary">Total</p>
                    <p class="order-summary order-summary__price">{{total}} kr</p>
                  </div>

                  <br>

                  <p class="order-summary order-summary__comment-title">Comments</p>
                  <p class="order-summary order-summary__comment-details">{{comment}}</p>



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
export default {

  components: {
    Icon,
    ModalBody
  },

  props: {
    exception_id: {
      type:String,
      required:false
    },
    location_name: {
      type:String,
      required:false
    },
    deviation_review:{
      type:Object,
      required:false
    },
    report:{
      type:Object,
      required:false
    },
    users_list: {
      type:Array,
      required: false,
    },
    zIndex: {
      type: String,
      required: false,
      default: '2'
    }
  },
  data () {
    return {
      innerModal: false,
      isLoading:true,
      exception:{},
      user:null,
      on_behalf_of_user:null,
      order_date:'',
      ship_date:'',
      can_delete:false,
      showModal: false,
      delivery_time:null,
      delivery_point:null,
      delivery_point_address:null,
      company_name:null,
      comment:null,
      freight:null,
      total:null,
      items:[]
    }
  },
  created () {
    console.log(this.show_text);
    this.isLoading = false
  },
methods: {

  closeModal() {
    this.innerModal = false
  },
    async showExceptionModal(){

      this.mixpanelTrack('Click: Repors Page - Browse Orders Report Modal');


      await API.get("metamat", "/cart/"+this.report.cartId).then((cart) => {

        console.log(cart);

        this.items = cart.cart.items

        this.delivery_time=cart.cart.delivery_time
        this.delivery_date=cart.cart.delivery_date
        this.delivery_point=cart.cart.delivery_point_name
        this.delivery_point_address=cart.cart.delivery_point_address
        this.comment = cart.cart.comment
        this.freight = cart.cart.freight
        this.total = cart.cart.total
        this.company_name = cart.cart.user_company.objectName




        let first_name = ''
        let last_name = ''

        for (var y in cart.cart.user.UserAttributes) {

          if (cart.cart.user.UserAttributes[y].Name == 'custom:first_name'){
            first_name = cart.cart.user.UserAttributes[y].Value
          }
          if (cart.cart.user.UserAttributes[y].Name == 'custom:last_name'){
            last_name = cart.cart.user.UserAttributes[y].Value
          }
        }

        this.user = first_name + ' ' + last_name



        if (cart.cart.on_behalf_of != null) {
          for (var y in cart.cart.on_behalf_of.UserAttributes) {

            if (cart.cart.on_behalf_of.UserAttributes[y].Name == 'custom:first_name'){
              first_name = cart.cart.on_behalf_of.UserAttributes[y].Value
            }
            if (cart.cart.on_behalf_of.UserAttributes[y].Name == 'custom:last_name'){
              last_name = cart.cart.on_behalf_of.UserAttributes[y].Value
            }
          }

          this.on_behalf_of_user = first_name + ' ' + last_name
        }

        this.delivery_date = this.formatTimeStampDate(cart.cart.delivery_date)



      })

    this.innerModal = true


  },
  getUser (user_id) {

    let first_name = ''
    let last_name = ''

    for (var x in this.users_list)  {

      if (this.users_list[x].Username == user_id) {

        for (var y in this.users_list[x].Attributes) {

          if (this.users_list[x].Attributes[y].Name == 'custom:first_name'){
            first_name = this.users_list[x].Attributes[y].Value
          }
          if (this.users_list[x].Attributes[y].Name == 'custom:last_name'){
            last_name = this.users_list[x].Attributes[y].Value
          }

        }

      }
    }

    return first_name + ' ' + last_name

  }
}

}
</script>
