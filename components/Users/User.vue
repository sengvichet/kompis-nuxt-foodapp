<template>

  <div class="list-bar">
    <!-- <div class="list-bar__link list-bar__link--short"> -->
      <div class="list-bar__text-container">
        <!-- <h5 class="list-bar__title">{{total}} kr</h5>
        <p class="list-bar__info">{{user}} <span> {{ship_date}}</span></p> -->
        <h5 class="list-bar__title">{{user_first_name}} {{user_last_name}} <span>({{user_status}})</span></h5>
        <p class="list-bar__info">{{user_user_type}} <span>{{$t('app.users.since')}} {{user_created_at}}</span></p>
      </div>
    <!-- </div> -->
    <div class="list-bar__icon">
      <EditUser
      :index="index"
      :accessType="accessType"
      :user_id="user_id"
      :user_first_name="user_first_name"
      :user_last_name="user_last_name"
      :user_phone="user_phone"
      :user_status="user_status"
      :user_created_at="user_created_at"
      :user_user_type="user_user_type"
      :user_email="user_email"
      :locations_prop="locations_prop"
      />
    </div>



  </div>

</template>

<script>
import {
  API
} from "aws-amplify";

import EditUser from '~/components/Users/EditUser.vue'

export default {

  components: {
    EditUser
  },

  data() {
    return {

      user_first_name:'',
      user_last_name:'',
      user_phone:'',
      user_status:'',
      user_created_at:'',
      user_user_type:'',
      user_email:''

    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    created_at: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: true
    },
    attributes: {
      type: Array,
      required: true
    },
    accessType: {
      type: String
    },
    locations_prop: {
      type:Array
    },
  },

  created() {

    for (var x in this.attributes){

      switch (this.attributes[x].Name) {
        case 'custom:first_name':{
        this.user_first_name = this.attributes[x].Value
        break;
      }
        case 'custom:last_name':{
        this.user_last_name = this.attributes[x].Value
        break;
      }
      case 'custom:user_phone':{
      this.user_phone = this.attributes[x].Value
      break;
    }
      case 'email':{
      this.user_email = this.attributes[x].Value
      break;
    }
        case 'custom:user_type':{
        this.user_user_type = this.attributes[x].Value.replace(/^\w/, c => c.toUpperCase())
      }
      }

    }

    if (this.status == 'CONFIRMED' ){
      this.user_status = this.$t('app.users.confirmed')
    }
    else {
      this.user_status = this.$t('app.users.not_confirmed')
    }

    this.user_created_at = this.formatTimeStampDate(this.created_at)

  }
}
</script>
