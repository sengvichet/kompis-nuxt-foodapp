<template>

  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewUserModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t('app.users.add_new_user')"
               :footerText="$t('app.general.save')"
               @clickedSave="newUserSubmit"
               @close="closePopup">

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="new_user_first_name"
              :placeholder="$t('app.users.first_name')">
        </input>

        <input class="list-bar input-text"
               type="text"
               v-model="new_user_last_name"
               :placeholder="$t('app.users.last_name')">
        </input>

        <input  class="list-bar input-text"
                type="number"
                v-model="new_user_phone"
                :placeholder="$t('app.users.phone')">
        </input>

        <input  class="list-bar input-text"
                type="email"
                v-model="new_user_email"
                :placeholder="$t('app.users.user_email')">
        </input>



         <div v-if="accessType != 'customer'" class="list-bar input checklist-header">
           {{ $t('app.users.user_type') }}
         </div>

         <div v-if="accessType != 'customer'" class="input__check-list">
           <div class="input__check-list__item" v-for="(userType, index) in userTypes">
             <input :id="'edit-user' + index" class="input__radio-button" type="radio" v-model="new_user_type" :value="userType.value">
             <label :for="'edit-user' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
               <p class="input__check-label__text">{{ userType.text }}</p>
               <div class="input__check-label__tick--radio"/>
             </label>
           </div>
         </div>

        <div v-if="accessType != 'customer'" class="list-bar input checklist-header">
          {{ $t('app.users.user_locations') }}
        </div>
        <div v-if="accessType != 'customer'" class="input__check-list">
          <div class="input__check-list__item" v-for="(location,index) in locations">
            <input :id="'edit-point' + location.id" class="input__check-box" type="checkbox" v-model="new_user_locations" :value="location.value">
            <label :for="'edit-point' + location.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text">{{location.text}}</p>
              <div class="input__check-label__tick--checkbox"/>
            </label>
          </div>
        </div>
     </template>
  </ModalBody>

</div>
</template>

<script>

import {
  API
} from "aws-amplify";

// import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'

export default {

  components: {
    // Icon,
    ModalBody
  },
  props:{
    accessType:{
      type:String
    },
    locations_prop: {
      type: Array,
      required:true
    },
  },
  data () {
   return {
     new_user_first_name:'',
     new_user_last_name:'',
     new_user_phone:'',
     new_user_email: '',
     new_user_type: null,
     new_user_locations:[],
     new_user_created_as:'',
     isLoading:false,
     userTypes: [],
     locations: [],
     footer: 'none',
     showModal: false
   }
 },

 computed: {
   compoundProperty(){
     return [
       this.new_user_first_name,
       this.new_user_last_name,
       this.new_user_phone,
       this.new_user_email,
       this.new_user_type,
       this.new_user_locations
     ].join()
   }
 },

 watch: {
   compoundProperty: function() {
     if ((
          this.new_user_first_name &&
          this.new_user_last_name &&
          this.new_user_phone &&
          this.new_user_email &&
          this.new_user_type  &&
          this.new_user_locations != null
          )
          ||
          (
          this.accessType === 'customer' &&
          this.new_user_first_name &&
          this.new_user_last_name &&
          this.new_user_phone &&
          this.new_user_email
          )
        ){
         this.footer = 'save'
       } else {
         this.footer = 'none'
       }
      if(process.env.stage === 'dev'){
        console.log('compoundProperty changed: ' + this.compoundProperty);
      }
   }
 },

  methods : {

    async newUserSubmit(event) {

      try {

        if (
           !this.new_user_first_name ||
           !this.new_user_last_name ||
           !this.new_user_phone ||
           !this.new_user_email ||
           !this.new_user_type
           )
           {
             return
           }

        this.isLoading = true;

        let new_user = await this.createUser({
          first_name: this.new_user_first_name,
          last_name: this.new_user_last_name,
          phone: this.new_user_phone,
          email: this.new_user_email,
          user_type: this.new_user_type,
          created_as:this.new_user_created_as
        });

        this.mixpanelTrack('Create New User: Users Page',{'User Type': this.new_user_type,});

        this.reflectUsers('post',null,new_user.User,this.new_user_type)

        let new_user_id = new_user.User.Username

        for(var x in this.new_user_locations){
          await this.createPermission({
            userId: new_user_id,
            locationId: this.new_user_locations[x]
          });
        }

        this.$notify.success(this.$t('app.users.user_added').replace('%s',this.new_user_email), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.users.add_error'), 'success')

      }

      this.isLoading = false;
      this.new_user_first_name = ''
      this.new_user_last_name = ''
      this.new_user_phone = ''
      this.new_user_email =  ''
      this.new_user_type =  ''
      this.new_user_locations = null


    },
    createUser(user) {
      return API.post("metamat", "/users", {
        body: user
      });
    },

    createPermission(permission) {
      return API.post("metamat", "/permissions", {
        body: permission
      });
    },

    async showNewUserModal(){

          this.mixpanelTrack('Click: Users Page - New User Modal');

          this.locations = []

         if(this.accessType == 'customer') {
           this.new_user_created_as = 'customer_employee'
           this.new_user_type = 'employee'
           this.userTypes = [
             // { value: null, text:  this.$t('app.users.user_types.select') },
             { value: 'employee', text: this.$t('app.users.user_types.employee') ,disabled: (!(this.$store.getters.user.userInfo.user_type == 'company') && !(this.$store.getters.user.userInfo.user_type == 'owner') && !(this.$store.getters.user.userInfo.user_type == 'manager')) }
           ]

         }
         else {
           this.new_user_created_as = 'company_employee'
            this.userTypes = [
              // { value: null, text:  this.$t('app.users.user_types.select') },
              { value: 'owner', text: this.$t('app.users.user_types.owner'),disabled: (!(this.$store.getters.user.userInfo.user_type == 'owner'))},
              { value: 'manager', text: this.$t('app.users.user_types.manager'),disabled: (!(this.$store.getters.user.userInfo.user_type == 'owner')) },
              { value: 'employee', text: this.$t('app.users.user_types.employee') ,disabled: (!(this.$store.getters.user.userInfo.user_type == 'owner') && !(this.$store.getters.user.userInfo.user_type == 'manager')) }
            ]
         }

         try {

             let user_type  =  this.$store.getters.user.userInfo.user_type
             let permissions = this.$store.getters.user.permissions
             let assets = this.locations_prop

             for (var x in assets) {

               this.locations.push({
                 text: assets[x].objectName + ' (' + assets[x].objectLocation + ')',
                 value: assets[x].objectId,
                 id: assets[x].objectId,
                 disabled: false
               })
             }

             if (user_type != 'company') {

               for (var x in this.locations){
                 if (permissions.indexOf(this.locations[x].id) == -1 ){
                   this.locations[x].disabled = true
                 }
               }

             }

         } catch (e) {
           bugsnagClient.notify(e)
           this.$notify.error(e.message, 'success')
         }
      this.showModal = true;
      this.$store.dispatch('lockBody');
    },

    async closePopup(){
      this.mixpanelTrack('Click: Users Page - Close New User Modal');
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
