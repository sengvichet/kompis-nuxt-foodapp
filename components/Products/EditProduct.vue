<template>

  <div>

    <a href="#" class="edit" @click.prevent="showEditProductModal">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="'save'"
               :title="modal_title"
               :footerText="$t('app.general.save')"
               @clickedSave="editProductSubmit"
               @close="closePopup">
      <!-- v-model="file" @input="uploadProductImage" -->

      <template slot="modal-content">
        <div v-if="!image" class="round-button round-button--upload">
          <input type="file"
                 id="product-thumbnail"
                 class="input__file"
                 name="product-thumbnail"
                 accept="image/png, image/jpeg, image/tiff, image/gif"
                 @change="onFileChange" />
        </div>
        <div class="list-bar list-bar__product-image list-bar__product-image--large" :style="{'background-image': 'url(' + updated_image + ')'}">
          <div v-if="image" class="round-button round-button--edit-image">
            <input type="file"
                   id="product-thumbnail"
                   class="input__file"
                   name="product-thumbnail"
                   accept="image/png, image/jpeg, image/tiff, image/gif"
                   @change="onFileChange" />
          </div>
        </div>

        <input class="list-bar input-text"
               type="text"
               v-model="product_name"
               :placeholder="$t('app.products.name')"/>
        </input>

        <input class="list-bar input-text"
               type="number"
               v-model="product_price"
               :placeholder="$t('app.products.price')"/>
        </input>

        <input class="list-bar input-text"
               type="number"
               v-model="product_minimum_order_quantity"
               :placeholder="$t('app.products.minimum_order_quantity')"/>
        </input>


         <div class="list-bar input checklist-header">
           {{ $t('app.products.category') }}
         </div>
         <div class="input__check-list">
           <div class="input__check-list__item" v-for="(category,index) in categories">
             <input :id="'edit-point-edit' + category.id" class="input__radio-button" type="radio" v-model="product_category" :value="category.value">
             <label :for="'edit-point-edit' + category.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
               <p class="input__check-label__text">{{category.text}}</p>
               <div class="input__check-label__tick--radio"/>
             </label>
           </div>
         </div>


        <textarea id="product_desc"
           class="list-bar input__text"
           v-model="product_desc"
           :placeholder="$t('app.products.desc')"
           :rows="6"
           :max-rows="6">
        </textarea>

        <div class="list-bar input checklist-header">
          {{ $t('app.products.location') }}
        </div>
        <div class="input__check-list">
          <div class="input__check-list__item" v-for="(location,index) in locations">
            <input :id="'edit-location' + location.id" class="input__radio-button" type="radio" v-model="product_location" :value="location.value">
            <label :for="'edit-location' + location.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text">{{location.text}}</p>
              <div class="input__check-label__tick--radio"/>
            </label>
          </div>
        </div>


        <DeleteButton @was_clicked="deleteProductSubmit()"
              :prompt="$t('app.general.are_you_sure_cant_undo')"/>

     </template>


    </ModalBody>


</div>
</template>


<script>

import {API} from "aws-amplify";
import { Storage } from "aws-amplify";
import uuid from "uuid";

import Icon from 'vue-awesome'
import DeleteButton from '~/components/General/DeleteButton.vue'
import ModalBody from '~/components/modals/ModalBody.vue'

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
    product_id: {
      type: String,
      required: true
    },
    product_name: {
      type: String,
      required: true
    },
    product_price: {
      type: String,
      required: true
    },
    product_minimum_order_quantity: {
      type:String,
      required:true
    },
    product_desc: {
      type: String,
      required: true
    },
    product_category: {
      type: String,
      required: true
    },
    product_location: {
      type: String,
      required: true
    },
    product_image: {
      type: String,
      required: true
    },
    categories_prop:{
      type:Array
    },
    locations_prop:{
      type:Array
    },
    product_shop_id_prop: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading:false,
      modal_title: this.$t('app.general.edit').replace('%s',this.product_name),
      categories: [],
      locations: [],
      new_product_category:this.product_category,
      file:null,
      image: this.product_image,
      updated_image: this.product_image,
      hasImage: false,
      footer: 'none',
      showModal: false
    }
  },
  methods : {
    onFileChange() {
      // console.log('start fileChange', event);
      this.hasImage = true;
      var files = event.target.files || event.dataTransfer.files;
      // console.log('files: ' + files.length);
      if (!files.length){
        // console.log('no file');
        return;
      }
      // console.log('calling createImage()');
      // this.createImage(files[0]);
      this.image = files[0];
      // console.log('image filetype: ' + this.image.type);
      // console.log('end fileChange, calling upload');
      this.uploadProductImage2();
    },

    async uploadProductImage () {

      const filename = `${Date.now()}-${uuid.v1()}`
      const stored = await Storage.vault.put(filename, this.file, {contentType: this.file.type,level: 'public',})
      this.new_product_image = process.env.cdn.URL + stored.key
      this.hasImage = true;
    },

    async uploadProductImage2 () {
      console.log('about to attempt upload', this.hasImage);
      const filename = `${Date.now()}-${uuid.v1()}.${this.image.type}`
      const stored = await Storage.vault.put(filename, this.image, {contentType: this.image.type, level: 'public'})
      this.updated_image = process.env.cdn.URL + stored.key
      console.log('attempted upload', this.hasImage, stored.key, this.image);
      console.log('updated image', this.updated_image);
      // this.image = '';
    },

    async deleteProductSubmit(event) {
        // event.preventDefault();

        try {

          await this.deleteProduct()
          this.reflectProducts('del',this.index,null)
          this.closePopup()

          this.mixpanelTrack('Delete Product: Products Page');
          this.$notify.success(this.$t('app.products.product_deleted').replace('%s',this.product_name), 'success')
        }
        catch (e) {
          bugsnagClient.notify(e)
          this.$notify.error(this.$t('app.products.delete_error'), 'success')

        }
    },
    async editProductSubmit(event) {

        // event.preventDefault();

      if (
          !this.product_name ||
          !this.product_price ||
          !this.product_minimum_order_quantity ||
          !this.product_desc ||
          !this.product_category ||
          !this.product_location
          //!this.product_image
        )
      {
        return
      }

      try {

        this.isLoading = true;

         await this.updateProduct({
           objectName: this.product_name,
           objectPrice: this.product_price,
           objectMinimumOrderQuantity:this.product_minimum_order_quantity,
           objectDesc: this.product_desc,
           objectImage: this.updated_image,
           objectCategory: this.product_category,
           objectLocation: this.product_location
        });

        this.mixpanelTrack('Edit Product: Products Page');

        this.reflectProducts('put',this.index,{
          objectName: this.product_name,
          objectPrice: this.product_price,
          objectMinimumOrderQuantity:this.product_minimum_order_quantity,
          objectDesc: this.product_desc,
          objectImage: this.updated_image,
          objectCategory: this.product_category,
          objectLocation: this.product_location,
          objectShopId:this.product_shop_id_prop
       })

        this.$notify.success(this.$t('app.products.product_updated').replace('%s',this.product_name), 'success')

      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.products.update_error'), 'success')

      }

      this.closePopup()
      this.isLoading = false

    },
    updateProduct(point) {

      return API.put("metamat", "/products/"+this.product_id, {
        body: point
      });
    },

    deleteProduct() {
      return API.del("metamat", "/products/" + this.product_id);
    },
    showEditProductModal(){

      // this.$refs.editProductModal.show()

      this.mixpanelTrack('Click: Products Page - Edit Product Modal');
      this.showModal = true;
      this.$store.dispatch('lockBody');

      this.categories = []

      for(var x in this.categories_prop) {
        if (this.categories_prop[x].objectShopId == this.product_shop_id_prop ){
        this.categories.push({
          id: this.categories_prop[x].objectId ,
          value:this.categories_prop[x].objectId ,
          text: this.categories_prop[x].objectName ,
        }
        )
      }
      }

      this.locations = []

      for(var x in this.locations_prop) {

        this.locations.push({
          id: this.locations_prop[x].objectId ,
          value:this.locations_prop[x].objectId ,
          text: this.locations_prop[x].objectName ,
        }

        )
      }

    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
