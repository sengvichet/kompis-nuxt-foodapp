<template>
  <div>
    <a href="#" class="edit" @click="showEditWeekDayModal()">
      <img src="~assets/images/icons/Icon_Edit_Dark_Teal.svg" />
    </a>

    <ModalBody v-if="showModal"
               z_index="1"
               :footerType="footer"
               :title="$t(`app.general.days_of_the_week.${name_prop}`)"
               :footerText="$t('app.general.save')"
               @clickedSave="updateLandingPageWeeklySettings"
               @close="closePopup">

      <template slot="modal-content">

        <div class="list-bar">
          <div class="list-bar__text-container">
            <h5 class="list-bar__title">{{ $t('app.customer_landing_page.is_open') }}</h5>
          </div>
          <input class="list-bar__tick-box__input"
                 :id="name + 'isOpen'"
                 type="checkbox" name="showtime"
                 v-model="isOpen"
                 >

          <label class="list-bar__tick-box__label"
                 :for="name + 'isOpen'"
                 title="Toggle delivery time"
                 >
                 &nbsp;
          </label>
        </div>

        <input class="list-bar input-text"
               type="text"
               v-model="heading"
               :placeholder="$t(`app.customer_landing_page.heading`)"/>
        </input>

        <textarea id="dish_description"
           class="list-bar input__text"
           v-model="description"
           :placeholder="$t(`app.customer_landing_page.description`)"
           :rows="6"
           :max-rows="6">
        </textarea>

        <div class="list-bar input checklist-header">
          {{$t(`app.customer_landing_page.allergens_noun`)}}
        </div>

        <div class="input__check-list">
          <div class="input__check-list__item" v-for="(allergen, index) in allergens_prop">
            <input :id="allergen.name + index" class="input__check-box" type="checkbox" v-model="allergen.value" :value="allergen.value">
            <label :for="allergen.name + index" class="input__check-label" :class="{'list-item--alternate-col' : (index + 1) % 2 === 0}">
              <p class="input__check-label__text">{{$t(`app.customer_landing_page.allergens.${allergen.name}`)}}</p>
              <div class="input__check-label__tick--checkbox"/>
            </label>
          </div>
        </div>
      </template>
    </ModalBody>
  </div>
</template>

<script>

import {API} from "aws-amplify";
import ModalBody from '~/components/modals/ModalBody.vue'


export default {

  components: {
    ModalBody
  },
  props: {
    name_prop: {
      type: String,
      required:true
    },
    isOpen_prop: {
      type: Boolean,
      required: false,
      default: false
    },
    heading_prop: {
      type: String,
      required: false,
      default: 'Title of the dish'
    },
    description_prop: {
      type: String,
      required: false,
      default: 'Dish description'
    },
    allergens_prop: {
      type: Array,
      required: true,
      default: []
    }
  },
  data () {
   return {
     modal_title: 'boo',
     isLoading: false,
     footer: 'save',
     showModal: false,
     name: null,
     isOpen: false,
     heading: null,
     description: null,
     allergens: [
     ]
   }
 },
 created(){
   this.modal_title = 'bobo'
   this.name = this.name_prop;
   this.isOpen = this.isOpen_prop;
   this.heading = this.heading_prop;
   this.description = this.description_prop;
   this.allergens = this.allergens_prop;
  },

  methods : {
    updateLandingPageWeeklySettings () {
      this.$emit('updateLandingPageWeeklySettings',{
        name: this.name,
        isOpen: this.isOpen,
        heading: this.heading,
        description: this.description,
        allergens: this.allergens
      })
      this.closePopup()
    },
      async showEditWeekDayModal(){
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
