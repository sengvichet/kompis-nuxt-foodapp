<template>


  <div>
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewProductModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t('app.products.add_new_product')"
             :footerText="$t('app.general.save')"
               @clickedSave="newProduct"
               @close="closePopup">

      <template slot="modal-content">
        <div v-if="!hasImage" class="round-button round-button--upload">
          <input type="file"
                 id="product-thumbnail"
                  class="input__file"
                 name="product-thumbnail"
                 accept="image/png, image/jpeg, image/tiff, image/gif"
                 @change="onFileChange" />
        </div>

        <div v-if="hasImage" class="list-bar list-bar__product-image list-bar__product-image--large" :style="{'background-image': 'url(' + new_product_image + ')'}">
          <div class="round-button round-button--edit-image">
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
               v-model="new_product_name"
               :placeholder="$t('app.products.name')"/>
        </input>

        <input class="list-bar input-text"
               type="number"
               v-model="new_product_price"
               :placeholder="$t('app.products.price')"/>
        </input>

        <input class="list-bar input-text"
               type="number"
               v-model="new_product_minimum_order_quantity"
               :placeholder="$t('app.products.minimum_order_quantity')"/>
        </input>

         <div class="list-bar input checklist-header">
           {{ $t('app.products.category') }}
         </div>
         <div class="input__check-list">
           <div class="input__check-list__item" v-for="(category,index) in categories">
             <input :id="'edit-point' + category.id" class="input__radio-button" type="radio" v-model="new_product_category" :value="category.value">
             <label :for="'edit-point' + category.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
               <p class="input__check-label__text">{{category.text}}</p>
               <div class="input__check-label__tick--radio"/>
             </label>
           </div>
         </div>

        <textarea id="new_product_desc"
           class="list-bar input__text"
           v-model="new_product_desc"
           :placeholder="$t('app.products.desc')"
           :rows="6"
           :max-rows="6">
        </textarea>

        <div class="list-bar input checklist-header">
          {{ $t('app.products.location') }}
        </div>
        <div class="input__check-list">
          <div class="input__check-list__item" v-for="(location,index) in locations">
            <input :id="'edit-point' + location.id" class="input__radio-button" type="radio" v-model="new_product_location" :value="location.value">
            <label :for="'edit-point' + location.id" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text">{{location.text}}</p>
              <div class="input__check-label__tick--radio"/>
            </label>
          </div>
        </div>

     </template>
  </ModalBody>

</div>
</template>


<script>

import {API} from "aws-amplify";
import { Storage } from "aws-amplify";
import uuid from "uuid";

import Icon from 'vue-awesome'
import ModalBody from '~/components/modals/ModalBody.vue'


export default {

  components: {
    Icon,
    ModalBody
  },
  props: {
    categories_prop: {
      type: Array,
      required:true
    },
    locations_prop: {
      type: Array,
      required:true
    },
    shop_id: {
      type: String,
      required:true
    }
  },
  data () {
   return {
     new_product_name: '',
     new_product_price: '',
     new_product_desc: '',
     new_product_minimum_order_quantity:'',
     new_product_category: '',
     new_product_location: '',
     new_product_image: process.env.cdn.URL+'no-image.png',
     isLoading: false,
     categories: [],
     locations: [],
     file: null,
     image: '',
     hasImage: false,
     footer: 'none',
     showModal: false,
   }
 },
 computed: {
   // add all the inputs together to make one massive value to watch
   compoundProperty(){
     return[
       this.new_product_name,
       this.new_product_price,
       this.new_product_minimum_order_quantity,
       this.new_product_desc,
       this.new_product_category,
       this.new_product_location
       //this.hasImage
     ].join()
   }

 },

 watch: {

   // if any part of the compound value changes, check if all the inputs have a value, and if at least one tickbox is ticked:
   compoundProperty: function () {

     // console.log('value changed: ' + this.compoundProperty);

     if (this.new_product_name &&
         this.new_product_price &&
         this.new_product_desc &&
         this.new_product_minimum_order_quantity &&
         this.new_product_category &&
         this.new_product_location
         //this.hasImage
       ){

         this.footer = 'save';
         // console.log('Footer!');
       }
      else {
        // console.log('no footer yet');
        this.footer = 'none';
      }
   },
 },
 created () {


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
      // console.log('about to attempt upload', this.hasImage);
      const filename = `${Date.now()}-${uuid.v1()}`
      const stored = await Storage.vault.put(filename, this.image, {contentType: this.image.type, level: 'public'})
      this.new_product_image = process.env.cdn.URL + stored.key
      // console.log('attempted upload', this.hasImage, stored.key, this.new_product_image);
    },

    async newProduct(event) {

      // event.preventDefault();

      try {

        if (!this.new_product_name ||
            !this.new_product_price ||
            !this.new_product_desc ||
            !this.new_product_minimum_order_quantity ||
            !this.new_product_image ||
            !this.new_product_category||
            !this.new_product_location
         )
           {
             return
           }

        this.isLoading = true;

        let new_product  = await this.creatProduct({
          objectName: this.new_product_name,
          objectPrice: this.new_product_price,
          objectDesc: this.new_product_desc,
          objectImage: this.new_product_image,
          objectMinimumOrderQuantity:this.new_product_minimum_order_quantity,
          objectCategory: this.new_product_category,
          objectLocation: this.new_product_location,
          objectShopId: this.shop_id
        });



        this.reflectProducts('post',null,new_product)

        this.isLoading = false;
        this.hasImage = false;
        this.new_product_name = ''
        this.new_product_price = ''
        this.new_product_desc = ''
        this.new_product_minimum_order_quantity = ''
        this.new_product_image = ''
        this.new_product_category = ''
        this.new_product_location = ''
        this.closePopup();

        this.$notify.success(this.$t('app.products.product_added').replace('%s',this.new_product_name), 'success')
      } catch (e) {
        bugsnagClient.notify(e)
        this.$notify.error(this.$t('app.products.add_error'), 'success')
      }
      // this.$refs.newProductModal.hide()
    },
    creatProduct(product) {
      return API.post("metamat", "/products", {
        body: product
      });
    },
    showNewProductModal(){
      // this.$refs.newProductModal.show();

      this.mixpanelTrack('Click: Products Page - New Product Modal');
      this.showModal = true;
      this.$store.dispatch('lockBody');
      this.categories = []

      for(var x in this.categories_prop) {
        if (this.categories_prop[x].objectShopId == this.shop_id ){
        this.categories.push({
          id: this.categories_prop[x].objectId ,
          value:this.categories_prop[x].objectId ,
          text: this.categories_prop[x].objectName ,
        });
      }
      }

      this.locations = []

      for (var x in this.locations_prop) {
        this.locations.push({
          text: this.locations_prop[x].objectName + ' (' + this.locations_prop[x].objectLocation + ')',
          value: this.locations_prop[x].objectId,
          id: this.locations_prop[x].objectId
        });
      }
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}

</script>
