<template>


  <div class="list-bar__edit">

    <div @click.prevent="showEditCustomerModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </div>

    <ModalBody v-if="showModal" z_index="3" :footerType="footer" :title="modal_title" :footerText="$t('app.general.save')" @clickedSave="editCustomerSubmit" @close="closePopup">

      <template slot="subheading">
      </template>

      <template slot="modal-content">
        <div class="list-bar list-bar__report">
          <div class="list-bar__text-container">
            <h5 class="report__title">{{ customer_business_name_prop }}</h5>
            <p class="report__info">{{$t('app.customers.id')}} {{ customer_organization_id_prop }}</p>
            <br>
            <div>
              <h6 class="report__sub-title">{{ $t('app.customers.contact_person') }}</h6>
              <p class="report__info">{{customer_owners_prop[0].first_name}} {{customer_owners_prop[0].last_name}}</p>
              <p class="report__info">{{customer_owners_prop[0].phone}}</p>
              <p class="report__info">{{customer_owners_prop[0].email}}</p>
            </div>
            <br>
            <h5 class="report__title">{{$t('app.customers.discount')}}</h5>
            <p class="report__info">{{ customer_discount_prop }}%</p>
            <br>
          </div>
        </div>

        <input
             type="number"
             min="0"
             max="100"
             class="list-bar input-text"
             v-model="customer_discount_prop"
             :placeholder="$t('app.customers.discount')">
        </input>


        <div class="list-bar input checklist-header">
          {{ $t('app.customers.delivery_points') }}
        </div>
        <div class="input__check-list">
          <div class="input__check-list__item" v-for="(delivery_point,index) in delivery_points">
            <input  :id="'edit-point' + delivery_point.id" class="input__check-box" type="checkbox" v-model="customer_delivery_points" :value="delivery_point.value">
            <label :for="'edit-point' + delivery_point.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <!-- <input :id="'new'+delivery_point.id" type="checkbox" v-model="customer_delivery_points" :value="delivery_point.value">
              <label :for="'new'+delivery_point.id">{{delivery_point.text}}</label> -->
                <p class="input__check-label__text">{{delivery_point.text}}</p>
                <div class="input__check-label__tick--checkbox"/>

            </label>
          </div>
        </div>

        <DeleteButton @was_clicked="deleteCustomerSubmit()"
              :prompt="$t('app.general.are_you_sure_cant_undo')"/>
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
import DeleteButton from '~/components/General/DeleteButton.vue'


export default {

  components: {
    Icon,
    ModalBody,
    DeleteButton
  },

  props: {
    delivery_points_prop:{
      type:Array,
      required:false
    },
    customer_owners_prop: {
      type: Array,
      required: true
    },
    customer_company_id_prop: {
      type: String,
      required: true
    },
    customer_discount_prop: {
      type:String,
      required:true
    },
    customer_business_name_prop: {
      type: String,
      required: true
    },
    customer_organization_id_prop: {
      type: String,
      required: true
    },
    shop_id: {
        type : String,
        required : true
    }
  },
  data() {
    return {
      isLoading:false,
      modal_title: this.$t('app.general.edit').replace('%s',this.customer_business_name_prop),
      customer_delivery_points:[],
      delivery_points:[],
      oldState : this.compoundProperty,
      oldDeliveryPoints: this.delivery_points_prop,
      showModal: false,
      footer: 'none'
    }
  },
  computed: {
    // add all the inputs together to make one massive value to watch
    compoundProperty(){
      return[
        this.customer_company_id_prop,
        this.customer_organization_id_prop

      ].join()
    }

  },
  watch: {

    // if any part of the compound value changes, check if all the inputs have a value, and if at least one tickbox is ticked:
    compoundProperty: function () {
      if (this.compoundProperty !== this.oldState)
        {
          this.footer = 'save';
        }
       else {
         this.footer = 'none';
       }
    },
    delivery_points: function () {
      if ( this.delivery_points !== this.oldDeliveryPoints && this.delivery_points.length !== 0) {
         this.footer = 'save';
      } else {
        this.footer = 'none';
      }
    }
  },
  methods : {
    async deleteCustomerSubmit(event) {
        // event.preventDefault();

        try {
          await this.deleteUser();
          this.listcustomers()
          // this.$refs.editCustomerModal.hide()
          this.mixpanelTrack('Delete Customer: Customers Page');
          this.$notify.success(this.$t('app.customers.customer_deleted').replace('%s',this.customer_business_name_prop), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.customers.delete_error'), 'success')

        }
    },
    async editCustomerSubmit(event) {

        // event.preventDefault();

      if (
          this.customer_delivery_points.length == 0
        )
      {
        return
      }

      try {

        this.isLoading = true;

        await API.put("metamat", "/customers/", {
          body: {
            company_id:this.customer_company_id_prop ,
            shop_id: this.shop_id,
            discount: this.customer_discount_prop
          }
        });

        await this.deletePermission()

        for(var x in this.customer_delivery_points){

          await this.createPermission({
            userId: this.customer_company_id_prop,
            locationId: this.customer_delivery_points[x]
          });
        }

        this.mixpanelTrack('Edit Customer: Customers Page');
         this.listcustomers()
        this.$notify.success(this.$t('app.customers.customer_updated').replace('%s',this.customer_business_name_prop), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.customers.update_error'), 'success')
      }
      // this.$refs.editCustomerModal.hide()
      this.isLoading = false

    },

    listcustomers() {
      this.$emit('listcustomers')
    },
    createPermission(permission) {
      return API.post("metamat", "/permissions", {
        body: permission
      });
    },

    deleteUser() {
      return API.del("metamat", "/customers/" + this.customer_company_id_prop,
      {
        body: {
          shopId:this.shop_id
        }
      });
    },

    deletePermission() {
      return API.del("metamat", "/permissions/" + this.customer_company_id_prop);
    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
    async showEditCustomerModal(){

      this.mixpanelTrack('Click: Customers Page - Edit Customer Modal');
      await API.get("metamat", "/permissions/"+this.customer_company_id_prop).then((delivery_points) => {

        for (var x in delivery_points ){
          if (delivery_points[x] != null) {
            this.customer_delivery_points.push(delivery_points[x])
            // console.log('found delivery point');
          }
        }

      })
      this.$store.dispatch('lockBody');
      this.showModal = true;

      // this.$refs.editCustomerModal.show()

      this.delivery_points = []

      for(var x in this.delivery_points_prop) {

        this.delivery_points.push({
          id: this.delivery_points_prop[x].objectId ,
          value:this.delivery_points_prop[x].objectId ,
          text: this.delivery_points_prop[x].objectName ,
        }

        )
      }
    },
  }
}

</script>
