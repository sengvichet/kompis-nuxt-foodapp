<template>

  <div class="list-bar__edit">

    <div class="edit" @click.prevent="showEditUserModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </div>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="modal_title"
               :footerText="$t('app.general.save')"
               @clickedSave="editUserSubmit"
               @close="closePopup">

      <template slot="subheading">
        <p class="modal-info">{{user_user_type}} {{$t('app.users.since')}} {{user_created_at}}</p>
        <!-- <p class="modal-info">{{$t('app.users.since')}} {{user_created_at}}</p> -->
      </template>

      <template slot="modal-content">

        <input class="list-bar input-text"
              type="text"
              v-model="updated_user_first_name"
              :placeholder="$t('app.users.first_name')">
        </input>

        <input class="list-bar input-text"
               type="text"
               v-model="updated_user_last_name"
               :placeholder="$t('app.users.last_name')">
        </input>

        <input  class="list-bar input-text"
                type="number"
                v-model="updated_user_phone"
                :placeholder="$t('app.users.phone')">
        </input>


        <div v-if="accessType != 'customer'" class="list-bar input checklist-header">
          {{ $t('app.users.user_type') }}
        </div>
        <div v-if="accessType != 'customer'" class="input__check-list">
          <div class="input__check-list__item" v-for="(userType, index) in userTypes">
            <input  :id="'edit-user' + index" class="input__radio-button" type="radio" v-model="updated_user_type" :value="userType.value">
            <label :for="'edit-user' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text"> {{ userType.text }} </p>
              <div class="input__check-label__tick--radio"/>
            </label>
          </div>
        </div>

        <div v-if="accessType != 'customer'" class="list-bar input checklist-header">
          {{ $t('app.users.user_locations') }}
        </div>
        <div v-if="accessType != 'customer'" class="input__check-list">
          <div class="input__check-list__item" v-for="(location,index) in locations">
            <input :id="'edit-point' + location.id" class="input__check-box" type="checkbox" v-model="updated_user_locations" :value="location.value">
            <label :for="'edit-point' + location.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text">{{location.text}}</p>
              <div class="input__check-label__tick--checkbox"/>
            </label>
          </div>
        </div>


        <DeleteButton @was_clicked="deleteUserSubmit()"
              :prompt="$t('app.general.are_you_sure_cant_undo')"/>

    </template>
  </ModalBody>

</div>
</template>


<script>

import { API } from "aws-amplify";
import DeleteButton from '~/components/General/DeleteButton.vue'
import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'


export default {

  components: {
    ModalBody,
    DeleteButton,
    Icon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    accessType:{
      type:String
    },
    user_id: {
      type: String,
      required: true
    },
    user_first_name: {
      type: String,
      required: true
    },
    user_last_name: {
      type: String,
      required: true
    },
    user_phone: {
      type: String,
      required: true
    },
    user_email: {
      type: String,
      required: true
    },
    user_status: {
      type: String,
      required: true
    },
    user_created_at: {
      type: String,
      required: false
    },
    user_user_type: {
      type: String,
      required: true
    },
    locations_prop: {
      type: Array,
      required:true
    },
  },
  data () {
   return {
     updated_accessType : this.accessType,
     updated_user_id : this.user_id,
     updated_user_first_name : this.user_first_name,
     updated_user_last_name : this.user_last_name,
     updated_user_phone : this.user_phone,
     updated_user_email : this.user_email,
     updated_user_status : this.user_status,
     updated_user_created_at : this.user_created_at,
     updated_user_type : this.user_user_type,
     updated_user_locations : [],
     updated_user_locations_names : this.user_locations_names,
     modal_title: this.$t('app.general.edit').replace('%s',this.user_first_name + ' ' + this.user_last_name),
     isLoading: false,
     footer: 'save',
     showModal: false,
     userTypes: [],
     locations: [],
     oldState: this.compoundProperty
   }
 },

 computed: {
   compoundProperty(){
     return [
       this.accessType,
       this.user_id,
       this.user_first_name,
       this.user_last_name,
       this.user_phone,
       this.user_email,
       this.user_status,
       this.user_created_at,
       this.user_user_type,
       this.updated_user_locations,
       this.user_locations_names,
     ].join()
   }
 },

 watch: {
   compoundProperty(){
     if(process.env.stage === 'dev'){
       console.log('dev: compoundProperty changed');
     }
     if ( this.oldState != this.compoundProperty){
         this.footer = 'save'
       } else {
         this.footer = 'none'
       }
      // console.log('compoundProperty changed: ' + this.compoundProperty);
   }
 },
  methods : {
    async deleteUserSubmit(event) {
        // event.preventDefault();
        try {

          await this.deleteUser()
          this.mixpanelTrack('Delete User: Users Page',{'User Type': this.user_user_type,});
          this.reflectUsers('del',this.index,null,this.user_user_type)
          this.deletePermission()
          this.closePopup();
          this.$notify.success(this.$t('app.users.user_deleted').replace('%s',this.updated_user_email), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.users.delete_error'), 'success')
        }
    },

    async editUserSubmit(event) {

        // event.preventDefault();

      if (!this.updated_user_first_name ||
          !this.updated_user_last_name  ||
          !this.updated_user_phone  ||
          !this.updated_user_type
        )
      {
        return
      }

      try {
        this.mixpanelTrack('Edit User: Users Page',{'User Type': this.updated_user_type,});
        this.isLoading = true;

      let updated_user =   await this.updateUser({
          first_name: this.updated_user_first_name,
          last_name: this.updated_user_last_name,
          phone: this.updated_user_phone,
          user_type: this.updated_user_type
        });

        this.reflectUsers('put',this.index,updated_user,[this.user_user_type,this.updated_user_type])

         await this.deletePermission()

        for(var x in this.updated_user_locations){
          await this.createPermission({
            userId: this.updated_user_id,
            locationId: this.updated_user_locations[x]
          });
        }

        if (this.updated_user_id == this.$store.getters.user.userInfo.username) {

        await API.get("metamat", "/permissions/").then((permissions) => {
          this.$store.dispatch('setUserPermissions',permissions)
        })


        }

        this.$notify.success(this.$t('app.users.user_updated').replace('%s',this.updated_user_email), 'success')
      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.users.update_error'), 'success')
      }
      // this.$refs.editUserModal.hide()
      this.closePopup();
      this.isLoading = false
    },

    updateUser(user) {

      return API.put("metamat", "/users/"+this.updated_user_id, {
        body: user
      });
    },

    createPermission(permission) {
      return API.post("metamat", "/permissions", {
        body: permission
      });
    },

    deletePermission() {
      return API.del("metamat", "/permissions/" + this.updated_user_id);
    },

    deleteUser() {
      return API.del("metamat", "/users/" + this.updated_user_id);
    },

    async showEditUserModal(){

      this.mixpanelTrack('Click: Users Page - Edit User Modal');

      if (this.accessType == 'customer'){
        this.userTypes = [
          // { value: null, text: this.$t('app.users.user_types.select') },
          { value: 'employee',
            text: this.$t('app.users.user_types.employee'),
            disabled: (!(this.$store.getters.user.userInfo.user_type == 'company') &&
                       !(this.$store.getters.user.userInfo.user_type == 'owner')   &&
                       !(this.$store.getters.user.userInfo.user_type == 'manager'))
          }
        ]
      }

      else {
        this.userTypes = [
          // { value: null, text: this.$t('app.users.user_types.select') },
          {
            value: 'owner',
            text: this.$t('app.users.user_types.owner'),
            disabled: (!(this.$store.getters.user.userInfo.user_type == 'owner'))
          },

          {
            value: 'manager',
            text: this.$t('app.users.user_types.manager'),
            disabled: (!(this.$store.getters.user.userInfo.user_type == 'owner'))
          },

          {
            value: 'employee',
            text: this.$t('app.users.user_types.employee') ,
            disabled: (!(this.$store.getters.user.userInfo.user_type == 'owner') &&
                       !(this.$store.getters.user.userInfo.user_type == 'manager'))
          }
        ]
      }

      this.updated_user_type =  this.updated_user_type.toLowerCase()

      try {

        let user_type  =  this.$store.getters.user.userInfo.user_type
        let permissions = this.$store.getters.user.permissions
        let assets = this.locations_prop
        this.locations = []

        for (var x in assets) {

          this.locations.push({
            text: assets[x].objectName + ' (' + assets[x].objectLocation + ')',
            value: assets[x].objectId,
            id: assets[x].objectId,
            disabled: false
          })
        }

        if (user_type != 'company' && permissions) {

          for (var x in this.locations){
            if (permissions.indexOf(this.locations[x].id) == -1 ){
              this.locations[x].disabled = true
            }
          }

        }

        for (var x in this.locations ){
           for (var y in this.updated_user_locations ){
             if (this.locations[x].id == this.updated_user_locations[y]){
               this.updated_user_locations_names += (this.locations[x].text) + ', '
             }
           }
         }


        await API.get("metamat", "/permissions/"+this.user_id).then((ulocations) => {
          this.updated_user_locations = ulocations
        })


      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(e.message, 'success')
      }

      this.showModal = true;
      this.$store.dispatch('lockBody');
    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
