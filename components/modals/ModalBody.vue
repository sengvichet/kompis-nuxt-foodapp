<template lang="html">
  <div class="moose" :style="{'z-index': zindex + 1}">

    <transition  appear name="modal-background">
      <div v-if="showHeader" class="moose__background">

      </div>
    </transition>

    <transition appear name="modal-header">
      <div v-if="showHeader" class="moose__header" :style="{'z-index': zindex + 2}">
        <div class="moose__header-text">
          <h1 class="moose__header-title">{{ title }}</h1>
          <div class="moose__header-info">
            <slot name="subheading"></slot>
          </div>
        </div>
        <div class="moose__header-close-button" @click="close">
          <img src="~/assets/images/icons/Icon_Close_X_Dark_Teal.svg" alt="Close window">
        </div>
      </div>
    </transition>

    <LoadingAnimation v-if="isLoading"/>

    <transition appear name="modal-content">

        <div class="moose__content" v-if="!isLoading && showContent">
          <slot name="modal-content" class="order-details"></slot>
        </div>

    </transition>

    <transition appear name="modal-footer" mode="out-in">
      <div v-if="footerType === 'save' && showFooter" key="footer-save" class="moose__footer-button" :style="{'z-index': zindex + 3}" @click="clickedSave">
        <h1 class="moose__footer-button-text">{{ footerText }}</h1>
      </div>

      <div v-if="footerType === 'next' && showFooter" key="footer-next" class="moose__footer-button" :style="{'z-index': zindex + 3}" @click="clickedNext">
        <h1 class="moose__footer-button-text">{{ footerText }}</h1>
      </div>

      <div v-if="footerType === 'warning' && showFooter" key="footer-next" class="moose__footer-button moose__footer-button--warning" :style="{'z-index': zindex + 3}" @click="clickedWarning">
        <h1 class="moose__footer-button-text">{{ footerText }}</h1>
      </div>
    </transition>
  </div>
</template>

<script>
import LoadingAnimation from '~/components/General/LoadingAnimation.vue'
import keycode from 'keycode'

export default {
  components: {
    LoadingAnimation
  },
  data(){
    return{
      showContent: true,
      showHeader: true,
      showFooter: true
    }
  },
  computed: {
    zindex(){
      if (this.z_index == ''){
        return 2
      } else {
        // console.log('z_index = ' + this.z_index);
        return this.z_index

      }
    }
  },

  props: [
    'title',
    'isLoading',
    'footerType',
    'footerText',
    'z_index',
  ],
  created () {

    let that = this
    document.addEventListener('keyup', function(e) {

      if (keycode(e) == 'esc') {
        that.close();
      }

      if (keycode(e) == 'enter') {
        //that.clickedSave();
      }

    })
  },
  methods: {
    close(){

      // this.setTimeOut
      this.showHeader = false;
      this.showContent = false;
      this.showFooter = false;

      // wait .2s for animations before closing
      setTimeout(() => {
        this.$store.dispatch('freeBody');
        this.$emit('close', false);
      }, 200);

    },
    clickedSave(){
      this.$emit('clickedSave', true);
      if(process.env.stage === 'dev'){
        console.log('dev, modal: clicked save!');
      }
      this.close();
    },
    clickedNext(){
      this.$emit('clickedNext', true);
      if(process.env.stage === 'dev'){
        console.log('dev, modal: clicked next!');
      }
    },
    clickedWarning(){
      this.$emit('clickedWarning', true);
      if(process.env.stage === 'dev'){
        console.log('dev, modal: clicked warning!');
      }
      this.close();
    }
  }
}
</script>

<style lang="css">

</style>
