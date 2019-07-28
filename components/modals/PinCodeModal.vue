<template lang="html">
  <div >


    <ModalBody v-if="showModal" z_index="1" footerType="none" title="Enter your 4 digits Pin Code" @close="closePopup">
      <template slot="subheading">
         <p class="moose__header-info">{{user_email}}</p>
      </template>

      <template slot="modal-content">
        <!-- <label class="input__label" for="new-location-name"> {{ $t('app.locations.location_name') }} </label> -->
        <div class="pin-code">

          <div class="pin-code__result">
            <span class="pin-code__result--number">{{this.answer_code[0]}}</span>
          </div>
          <div class="pin-code__result">
            <span class="pin-code__result--number">{{this.answer_code[1]}}</span>
          </div>
          <div class="pin-code__result">
            <span class="pin-code__result--number">{{this.answer_code[2]}}</span>
          </div>
          <div class="pin-code__result">
            <span class="pin-code__result--number">{{this.answer_code[3]}}</span>
          </div>

        </div>

        <div class="pin-code">

          <div class="pin-code__button" @click.prevent="addNumber(1)">
            <span class="pin-code__button--number">1</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(2)">
            <span class="pin-code__button--number">2</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(3)">
            <span class="pin-code__button--number">3</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(4)">
            <span class="pin-code__button--number">4</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(5)">
            <span class="pin-code__button--number">5</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(6)">
            <span class="pin-code__button--number">6</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(7)">
            <span class="pin-code__button--number">7</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(8)">
            <span class="pin-code__button--number">8</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(9)">
            <span class="pin-code__button--number">9</span>
          </div>
          <div class="pin-code__button" @click.prevent="deleteNumber()">
            <span class="pin-code__button--text">Delete</span>
          </div>
          <div class="pin-code__button" @click.prevent="addNumber(0)">
            <span class="pin-code__button--number">0</span>
          </div>
          <div class="pin-code__button">
            <span class="pin-code__button--text">Send</span>
          </div>
        </div>

      </template>
    </ModalBody>

  </div>
</template>

<script>

import ModalBody from '~/components/modals/ModalBody.vue'
export default {

  components: {
    ModalBody,
  },
  props: {
    user_email: {
      type: String,
      required: true
    }
  },
    data(){
      return {
        showModal: false,
        answer_code:[]

      }
    },
    computed: {
      compoundProperty(){
        return [this.answer_code].join()
      }
    },
    watch: {
      compoundProperty: function() {

        if (this.answer_code.length == 4) {
          this.$emit('submitPinCode',
                    this.user_email,
                    this.answer_code[0].toString() + this.answer_code[1].toString() + this.answer_code[2].toString() + this.answer_code[3].toString()
                  )
          this.answer_code = []
        }


      },

    },
    created(){

    },
    methods: {

      addNumber (code) {

        if (this.answer_code.length < 4) {
        this.answer_code.push(code)
        }
      },
      deleteNumber() {
        this.answer_code.pop()
      },

      async showPopup(){
        this.mixpanelTrack('Pin Code Open: User Switchboard');
        this.$store.dispatch('lockBody');
        this.showModal = true;
      },
      async closePopup(){
        this.mixpanelTrack('Pin Code Close: User Switchboard');
        this.$store.dispatch('freeBody');
        this.showModal = false;
      },

    }
  }
</script>
