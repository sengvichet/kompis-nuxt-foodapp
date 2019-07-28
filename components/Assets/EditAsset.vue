<template>

<div class="list-bar__icon">
  <div class="list-bar__edit" @click="showPopup">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
  </div>

  <ModalBody v-if="showEditModal" z_index="1" :footerType="footer" :title="modal_title" :footerText="$t('app.general.save')" @clickedSave="editAssetSubmit" @close="closePopup">

    <template slot="subheading">
      <!-- <p class="moose__header-info">hepp</p> -->
    </template>
    <template slot="modal-content">

      <div class="list-bar-container">
      <input
              class="list-bar"
              type="text"
              id="new-location-name"
              v-model="asset_name"
              :placeholder="$t('app.locations.location_name')"
              name="location_name"
              v-validate="'required'"
              :data-vv-as="$t('app.locations.location_name')"
              data-vv-delay="0"
              :class="{'input': true, 'list-bar--warning': errors.has('location_name') }"
              >
      </input>
      <span v-show="errors.has('location_name')" class="list-bar--warning-span">{{ errors.first('location_name') }}</span>
    </div>

      <div class="list-bar-container">
      <input class="list-bar"
             type="text"
             id="new-location-description"
             v-model="asset_location"
             :placeholder="$t('app.locations.location')"
             name="location_location"
             v-validate="'required'"
             data-vv-delay="0"
             :data-vv-as="$t('app.locations.location')"
             :class="{'input': true, 'list-bar--warning': errors.has('location_location') }"
             >
      </input>

      <span v-show="errors.has('location_location')" class="list-bar--warning-span">{{ errors.first('location_location') }}</span>
      </div>


      <select v-if="selectedLocation!=null"  @change="userTypeChanged" v-model="reviewDeviationSelectedUserType" id="taskusertype" class="list-bar input__selector">
        <option v-for="userType in reviewDeviationUserTypes" :value="userType.value"> {{userType.text}} </option>
      </select>


      <div v-if="!isLoading && reviewDeviationSelectedUserType!=null && reviewDeviationSelectedUserType!='any-employee' && reviewDeviationSelectedUserType!='anyone' && reviewDeviationSelectedUserType!='any-manager' && reviewDeviationSelectedUserType!='any-owner'" class="input__check-list">
        <div class="input__check-list__item" v-for="(user,index) in users">
          <input :id="'review-deviation' + index" class="input__check-box" type="checkbox"  :value="user.value" v-model="reviewDeviationSelectedUsers">
          <label :for="'review-deviation' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
            <p class="input__check-label__text">{{user.text}}</p>
            <div class="input__check-label__tick--checkbox"/>
          </label>
        </div>
      </div>


      <select v-if="selectedLocation!=null"  @change="userTypeChanged" v-model="makingSelectedUserType" id="taskusertype" class="list-bar input__selector">
        <option v-for="userType in makingUserTypes" :value="userType.value"> {{userType.text}} </option>
      </select>


      <div v-if="!isLoading && makingSelectedUserType!=null && makingSelectedUserType!='any-employee' && makingSelectedUserType!='anyone' && makingSelectedUserType!='any-manager' && makingSelectedUserType!='any-owner'" class="input__check-list">
        <div class="input__check-list__item" v-for="(user,index) in users">
          <input :id="'making' + index" class="input__check-box" type="checkbox"  :value="user.value" v-model="makingSelectedUsers">
          <label :for="'making' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
            <p class="input__check-label__text">{{user.text}}</p>
            <div class="input__check-label__tick--checkbox"/>
          </label>
        </div>
      </div>


      <select v-if="selectedLocation!=null"  @change="userTypeChanged" v-model="packingSelectedUserType" id="taskusertype" class="list-bar input__selector">
        <option v-for="userType in packingUserTypes" :value="userType.value"> {{userType.text}} </option>
      </select>


      <div v-if="!isLoading && packingSelectedUserType!=null && packingSelectedUserType!='any-employee' && packingSelectedUserType!='anyone' && packingSelectedUserType!='any-manager' && packingSelectedUserType!='any-owner'" class="input__check-list">
        <div class="input__check-list__item" v-for="(user,index) in users">
          <input :id="'packing' + index" class="input__check-box" type="checkbox"  :value="user.value" v-model="packingSelectedUsers">
          <label :for="'packing' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
            <p class="input__check-label__text">{{user.text}}</p>
            <div class="input__check-label__tick--checkbox"/>
          </label>
        </div>
      </div>


      <select v-if="selectedLocation!=null"  @change="userTypeChanged" v-model="shippingSelectedUserType" id="taskusertype" class="list-bar input__selector">
        <option v-for="userType in shippingUserTypes" :value="userType.value"> {{userType.text}} </option>
      </select>


      <div v-if="!isLoading && shippingSelectedUserType!=null && shippingSelectedUserType!='any-employee' && shippingSelectedUserType!='anyone' && shippingSelectedUserType!='any-manager' && shippingSelectedUserType!='any-owner'" class="input__check-list">
        <div class="input__check-list__item" v-for="(user,index) in users">
          <input :id="'shipping' + index" class="input__check-box" type="checkbox"  :value="user.value" v-model="shippingSelectedUsers">
          <label :for="'shipping' + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
            <p class="input__check-label__text">{{user.text}}</p>
            <div class="input__check-label__tick"/>
          </label>
        </div>
      </div>



      <DeleteButton @was_clicked="deleteAssetSubmit()"
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
    index: {
      type: Number,
      required: true
    },
    asset_id: {
      type: String,
      required: true
    },
    asset_name: {
      type: String,
      required: true
    },
    asset_location: {
      type: String,
      required: true
    },
    auto_assign_tasks: {
      type:Object,
      required:false
    }
  },

  data() {
    return {
      isLoading:false,
      modal_title: this.$t('app.general.edit').replace('%s',this.asset_name),
      showEditModal: false,
      footer: 'none',
      selectedLocation:this.asset_id,
      oldName: '',
      oldDescription: '',
      reviewDeviationSelectedUserType:(this.auto_assign_tasks) ? this.auto_assign_tasks.review : null,
      reviewDeviationUserTypes:[
        {text:this.$t('app.users.user_types.select_user_review_deviation'),value:null},
        {text:this.$t('app.tasks.anyone'),value:'anyone'},
        {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
        {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
        {text:this.$t('app.tasks.any_owner'),value:'any-owner'},
        {text:this.$t('app.tasks.any_user'),value:'any-user'}
      ],
      makingSelectedUserType:(this.auto_assign_tasks) ? this.auto_assign_tasks.making : null,
      makingUserTypes:[
        {text:this.$t('app.users.user_types.select_user_make'),value:null},
        {text:this.$t('app.tasks.anyone'),value:'anyone'},
        {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
        {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
        {text:this.$t('app.tasks.any_owner'),value:'any-owner'},
        {text:this.$t('app.tasks.any_user'),value:'any-user'}
      ],
      packingSelectedUserType:(this.auto_assign_tasks) ? this.auto_assign_tasks.packing : null,
      packingUserTypes:[
        {text:this.$t('app.users.user_types.select_user_pack'),value:null},
        {text:this.$t('app.tasks.anyone'),value:'anyone'},
        {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
        {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
        {text:this.$t('app.tasks.any_owner'),value:'any-owner'},
        {text:this.$t('app.tasks.any_user'),value:'any-user'}
      ],
      shippingSelectedUserType:(this.auto_assign_tasks) ? this.auto_assign_tasks.shipping : null,
      shippingUserTypes:[
        {text:this.$t('app.users.user_types.select_user_ship'),value:null},
        {text:this.$t('app.tasks.anyone'),value:'anyone'},
        {text:this.$t('app.tasks.any_employee'),value:'any-employee'},
        {text:this.$t('app.tasks.any_manager'),value:'any-manager'},
        {text:this.$t('app.tasks.any_owner'),value:'any-owner'},
        {text:this.$t('app.tasks.any_user'),value:'any-user'}
      ],
      all_users: [],
      users:[],
      reviewDeviationSelectedUsers: [],
      makingSelectedUsers: [],
      packingSelectedUsers: [],
      shippingSelectedUsers: [],
    }
    },
    async created(){

      this.oldName = this.asset_name;
      this.oldDescription = this.asset_location;
    },

    computed: {
      compoundProperty(){
        return [this.asset_name,this.asset_location].join()
      }
    },
    watch: {
      compoundProperty: function() {
        if(this.asset_name && this.asset_location) {
        this.$validator.validate().then(valid => {
         if (!valid) {
           this.footer = 'none'
         }
         else {
           this.footer = 'save'
         }
       });
     }
     else {
       this.footer = 'none'
     }
      }
    },

  methods : {
    async deleteAssetSubmit(event) {
        // event.preventDefault();

        try {

          this.reflectAssets('del',this.index,null)
          this.closePopup();
          await this.deleteAsset()
          this.mixpanelTrack('Delete Location: Locations Page');
          this.$notify.success(this.$t('app.locations.location_deleted').replace('%s',this.asset_name), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.locations.delete_error'), 'success')

        }
    },
    async editAssetSubmit(event) {

      try {

        this.isLoading = true;

         let update_asset = await this.updateAsset({
          objectName: this.asset_name,
          objectLocation: this.asset_location,
          objectAutoAssignTasks: {
            review:(this.reviewDeviationSelectedUserType == 'any-user') ? this.reviewDeviationSelectedUsers :this.reviewDeviationSelectedUserType,
            making:(this.makingSelectedUserType == 'any-user') ? this.makingSelectedUsers:this.makingSelectedUserType,
            packing:(this.packingSelectedUserType == 'any-user') ?  this.packingSelectedUsers: this.packingSelectedUserType,
            shipping:(this.shippingSelectedUserType == 'any-user') ?  this.shippingSelectedUsers :this.shippingSelectedUserType
          }
        });


        this.mixpanelTrack('Edit Location: Locations Page');

        this.reflectAssets('put',this.index,{
           objectId: this.asset_id,
          objectName: this.asset_name,
          objectLocation: this.asset_location,
          objectAutoAssignTasks: {
            review:(this.reviewDeviationSelectedUserType == 'any-user') ? this.reviewDeviationSelectedUsers :this.reviewDeviationSelectedUserType,
            making:(this.makingSelectedUserType == 'any-user') ? this.makingSelectedUsers:this.makingSelectedUserType,
            packing:(this.packingSelectedUserType == 'any-user') ?  this.packingSelectedUsers: this.packingSelectedUserType,
            shipping:(this.shippingSelectedUserType == 'any-user') ?  this.shippingSelectedUsers :this.shippingSelectedUserType
          }
        })
        this.$notify.success(this.$t('app.locations.location_updated').replace('%s',this.asset_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.locations.update_error'), 'success')

      }

      // this.$refs.editAssetModal.hide()
      this.closePopup();
      this.isLoading = false

    },
    updateAsset(asset) {

      return API.put("metamat", "/assets/"+this.asset_id, {
        body: asset
      });
    },

    deleteAsset() {
      return API.del("metamat", "/assets/" + this.asset_id);
    },

  async  userTypeChanged() {

    this.all_users = []
    this.users  = []


    for (var x in this.$store.getters.store_users.data) {

    for (var y in this.$store.getters.store_users.data[x]) {
      this.all_users.push(this.$store.getters.store_users.data[x][y])
    }

    }

    this.isLoading = true

    if (this.selectedLocation!= null){

      //  this.users.push({value:null, text:this.$t('app.tasks.select_user')},{value:'anyone',text:this.$t('app.tasks.anyone'),disabled:false})

        for (var x in this.all_users){

          let first_name  = ''
          let last_name = ''
          let user_type = ''

          for (var y in this.all_users[x].Attributes) {

            if (this.all_users[x].Attributes[y].Name == 'custom:first_name') {
              first_name = this.all_users[x].Attributes[y].Value
            }

            if (this.all_users[x].Attributes[y].Name == 'custom:last_name') {
              last_name = this.all_users[x].Attributes[y].Value
            }

            if (this.all_users[x].Attributes[y].Name == 'custom:user_type') {
              user_type = this.all_users[x].Attributes[y].Value


              user_type = user_type.replace(/^\w/, c => c.toUpperCase())
            }

          }

          await API.get("metamat", "/permissions/"+this.all_users[x].Username).then((ulocations) => {

            if (ulocations.indexOf(this.selectedLocation)!= -1 || user_type == 'Company'){

        ///      if (user_type != 'company'){
              let prefix = ''
              if (user_type == 'Owner') {prefix = this.$t('app.users.user_types.owner')}
              if (user_type == 'Manager') {prefix = this.$t('app.users.user_types.manager')}
              if (user_type == 'Employee') {prefix = this.$t('app.users.user_types.employee')}


              this.users.push({
                value: this.all_users[x].Username,
                text: prefix + ' - ' + first_name +' '+ last_name
              })
            //}

            }

          })
        }

        if (this.users.length > 2){
          this.users[1].disabled = false
        }
        this.showUsersInput = true
    }

    else {
      this.showUsersInput = false
    }
    this.isLoading = false

  },

    async showPopup(){
      this.mixpanelTrack('Click: Locations Page - Edit Location Modal');
      this.$store.dispatch('lockBody');
      // console.log('showing modal');
      this.showEditModal = true;
      await this.listUsers()
      if (this.auto_assign_tasks) {

        if (Array.isArray(this.auto_assign_tasks.review)) {
          this.reviewDeviationSelectedUserType = 'any-user'
          this.reviewDeviationSelectedUsers = this.auto_assign_tasks.review
          this.all_users = []
          this.users = []
        await this.userTypeChanged()

        }

        if (Array.isArray(this.auto_assign_tasks.making)) {
          this.makingSelectedUserType = 'any-user'
          this.makingSelectedUsers = this.auto_assign_tasks.making
          this.all_users = []
          this.users = []
          await this.userTypeChanged()

        }

        if (Array.isArray(this.auto_assign_tasks.packing)) {
          this.packingSelectedUserType = 'any-user'
          this.packingSelectedUsers = this.auto_assign_tasks.packing
          this.all_users = []
          this.users = []
          await this.userTypeChanged()

        }

        if (Array.isArray(this.auto_assign_tasks.shipping)) {
          this.shippingSelectedUserType = 'any-user'
          this.shippingSelectedUsers = this.auto_assign_tasks.shipping
          await this.userTypeChanged()

        }

      }

    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      // console.log('closing modal');
      this.showEditModal = false;
    },
  }
}

</script>
