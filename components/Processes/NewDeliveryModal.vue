<template lang="html">
  <div>
    <ModalBody
               z_index="3"
               :footerType="footer"
               title="Delivery Log"
               :footerText="footerText"
               @clickedNext="nextStep"
               @clickedSave="newItem"
               @close="closePopup">

      <template slot="modal-content">
        <div v-if="step === 1" class="">
          <input class="list-bar input-text"
                 type="text"
                 v-model="items[0].sender"
                 placeholder="Sender"/>
          </input>

          <div class="list-bar--inline-items">
            <input class="list-bar input-text"
                   type="text"
                   v-model="items[0].batchNo"
                   placeholder="Batch number"/>
            </input>

            <div v-if="!items[0].picture" class="inline-button inline-button--upload">
              <input type="file"
                     id="product-thumbnail"
                     class="input__file"
                     name="product-thumbnail"
                     accept="image/png, image/jpeg, image/tiff, image/gif"
                     @change="onFileChange" />
            </div>
          </div>
          <div v-if="items[0].picture" class="list-bar list-bar__product-image list-bar__product-image--large" :style="{'background-image': 'url(' + items[0].picture + ')'}">
            <div class="round-button round-button--edit-image">
              <input type="file"
                     id="product-thumbnail"
                     class="input__file"
                     name="product-thumbnail"
                     accept="image/png, image/jpeg, image/tiff, image/gif"
                     @change="onFileChange" />
            </div>
          </div>
        </div>

        <div v-if="step === 2" class="">
          <div class="list-bar list-bar--tall">
            <h2 class="list-bar__title--large">Are the items in good condition?</h2>
          </div>
          <YesOrNo/>
        </div>

        <div v-if="step === 3" class="">
          <select v-model="items[0].type" @change="typeChanged" id="itemtype" class="list-bar input__selector" value="1">
            <option v-for="item in itemTypes" :value="item"> {{item}} </option>
          </select>
        </div>

        <div v-if="step === 4" class="">
          <!-- measure temp, is it above or below? -->
          <div class="list-bar list-bar--tall">
            <h2 class="list-bar__title--large">Measure the temperature of the items</h2>
          </div>
          <div class="list-bar u-flex-justify-center">
            <MinusPlusField :value="4"/>
          </div>
        </div>

        <div v-if="success" class="">
          <!-- show success alert and save button -->
        </div>

        <div v-if="fail" class="">
          <!-- show fail alert and file deviation button -->
        </div>

     </template>
  </ModalBody>
  </div>
</template>

<script>
import {API} from "aws-amplify";
import { Storage } from "aws-amplify";

import ModalBody from '~/components/modals/ModalBody.vue'
import YesOrNo from '~/components/general/YesOrNo.vue'
import MinusPlusField from '~/components/general/MinusPlusField.vue'

export default {
  components: {
    ModalBody,
    YesOrNo,
    MinusPlusField
  },
  data(){
    return {
      showModal: false,
      footer: 'next',
      footerText: 'next',
      step: 1,
      success: false,
      fail: false,
      selectedType: '',
      itemTypes: [
        'refrigerated',
        'frozen',
        'dry'
      ],
      items: [
        {
          sender: '',
          batchNo: '',
          type: 'refrigerated',
          temperature: 0,
          picture: '',
          hasImage: false
        }
      ],

    }
  },
  props: {
    z: {
      type: String,
      required: true
    }
  },


  methods: {
    async showPopup(){
      this.$store.dispatch('lockBody');
      this.showModal = true;
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
    async nextStep(){
      this.step++;
      if(this.step === 4){
        this.footerText = 'save';
        this.footer = 'save';
      }
    },
    async newItem(){

    },
    async onFileChange(){
      // console.log('start fileChange', event);
      this.items[0].hasImage = true;
      var files = event.target.files || event.dataTransfer.files;
      // console.log('files: ' + files.length);
      if (!files.length){
        // console.log('no file');
        return;
      }
      // console.log('calling createImage()');
      // this.createImage(files[0]);
      this.items[0].picture = files[0];
      // console.log('image filetype: ' + this.image.type);
      // console.log('end fileChange, calling upload');
      this.uploadProductImage2();
    },
    createDeliveryLog() {

      return API.post("metamat", "/logs/delivery", {
        body:{

          senderName: "der name",
          typeOfGoods: "frozen",
          ingredients:
        	[
          	{
          		path_number: "123",
          		image_url : ''
          	}
          	],
          firstReading: 54,
          logStatus: "good",
          logType: "delivery"
        }
      }).then((response) => {
        if (process.env.stage === 'dev'){
          console.log(response);
        }
      });
    },

    async uploadProductImage2 () {
      // console.log('about to attempt upload', this.hasImage);
      const filename = `${Date.now()}-${this.image.name}`
      const stored = await Storage.vault.put(filename, this.image, {contentType: this.image.type, level: 'public'})
      this.items[0].picture = process.env.cdn.URL + stored.key
      // console.log('attempted upload', this.hasImage, stored.key, this.new_product_image);
    },

    async typeChanged(){

    }

  }
}
</script>

<style lang="css">
</style>
