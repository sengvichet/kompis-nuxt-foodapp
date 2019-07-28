<template lang="html">
  <div>
    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               title="Cooldown Process"
               :footerText="footerText"
               @clickedNext="nextStep"
               @clickedSave="newItem"
               @close="closePopup">

      <template slot="modal-content">
        <div v-if="step === 1" class="">
          <div v-for="(ingredient, index) in ingredients" class="u-margin-bottom-default">
            <div class="list-bar--inline-items">
              <input class="list-bar input-text"
                     type="text"
                     v-model="ingredient.sender"
                     placeholder="Sender"/>
              </input>
              <button v-if="ingredients.length > 1" @click="ingredients.splice(index, 1)" type="button" class="inline-button inline-button--delete">&nbsp;</button>
            </div>
            <div class="list-bar--inline-items">
              <input class="list-bar input-text"
                     type="text"
                     v-model="ingredient.batchNo"
                     placeholder="Batch number"/>
              </input>

              <div v-if="!ingredient.picture" class="inline-button inline-button--upload">
                <input type="file"
                       id="product-thumbnail"
                       class="input__file"
                       name="product-thumbnail"
                       accept="image/png, image/jpeg, image/tiff, image/gif"
                       @change="onFileChange" />
              </div>
            </div>

            <div v-if="ingredient.picture" class="list-bar list-bar__product-image list-bar__product-image--large" :style="{'background-image': 'url(' + items[0].picture + ')'}">
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

          <div class="app-ui-overlay__new-object">
            <div class="round-button" href="#" @click.prevent="addIngredient">
              <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
            </div>
          </div>
        </div>

        <div v-if="step === 2" class="">
          <div class="list-bar list-bar--tall">
            <h2 class="list-bar__title--large">Measure the starting temperature</h2>
          </div>
          <div class="list-bar u-flex-justify-center">
            <MinusPlusField :max="2000"
                            :value="85"
                            @updateValue="update()"/>
          </div>
        </div>

        <div v-if="step === 3" class="">
          <div class="list-bar list-bar--tall">
            <h2 class="list-bar__title--large">Measure the starting temperature</h2>
          </div>
        </div>

        <div v-if="step === 4" class="">
          <!-- measure temp, is it above or below? -->
          <div class="list-bar list-bar--tall">
            <h2 class="list-bar__title--large">Measure the temperature of the items</h2>
          </div>
          <div class="list-bar u-flex-justify-center">
            <MinusPlusField key="start-temp"
                            :value="4"
                            @updateValue="update()"
            />
          </div>
        </div>

        <div v-if="step === 5" class="">
          <!-- measure temp, is it above or below? -->
          <div class="list-bar list-bar--tall">
            <h2 class="list-bar__title--large">Measure the temperature of the items</h2>
          </div>
          <div class="list-bar u-flex-justify-center">
            <MinusPlusField key="start-temp"
                            :value="4"
                            @updateValue="update()"
            />
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
import { API } from "aws-amplify";
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
      showModal: true,
      footer: 'next',
      footerText: 'next',
      step: 1,
      success: false,
      fail: false,
      measurement: 0,
      ingredients: [
        {
          sender: '',
          batchNo: '',
          picture: '',
          hasImage: false
        }
      ],
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
      if(this.step === 5){
        this.footerText = 'save';
        this.footer = 'save';
      }
    },
    async newItem(){

    },
    async onFileChange(index){
      // console.log('start fileChange', event);
      this.ingredients[index].hasImage = true;
      var files = event.target.files || event.dataTransfer.files;
      // console.log('files: ' + files.length);
      if (!files.length){
        // console.log('no file');
        return;
      }
      // console.log('calling createImage()');
      // this.createImage(files[0]);
      this.ingredients[index].picture = files[0];
      // console.log('image filetype: ' + this.image.type);
      // console.log('end fileChange, calling upload');
      this.uploadProductImage2(index);
    },


    async uploadProductImage2(index) {
      // console.log('about to attempt upload', this.hasImage);
      const filename = `${Date.now()}-${this.image.name}`
      const stored = await Storage.vault.put(filename, this.image, {contentType: this.image.type, level: 'public'})
      this.ingredients[index].picture = process.env.cdn.URL + stored.key
      // console.log('attempted upload', this.hasImage, stored.key, this.new_product_image);
    },

    async typeChanged(){

    },

    async update(task_id, new_temp, update,click_source=null){
      // this.measurement = event.
      console.log('updated');
      console.log(task_id, new_temp, update);
    },

    async addIngredient(){
      let ingredient = {
        sender: '',
        batchNo: '',
        picture: '',
        hasImage: false
      }
      this.ingredients.push(ingredient);
    }
  }
}
</script>

<style lang="css">
</style>
