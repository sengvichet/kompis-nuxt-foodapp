<template lang="html">
  <div  class="list-bar__arrow">
    <!-- <a class="list-bar__click-overlay" href="#" @click="showReport"/> -->
    <a class="list-bar__click-overlay" href="#" @click="showPopup"/>

    <div>
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <view-log-modal v-if="showLog" footerType="none" z_index="1" :title="log_title" footerText="none" @close="closePopup">

      <template slot="subheading">
        <p class="moose__header-info">{{$t('app.logs.logged')}} {{formatTime(log.createdAt)}} {{$t('app.time.on_the')}} {{formatDate(log.createdAt)}}</p>
      </template>
      <template slot="modal-content">
        <div v-if="log.logType === 'delivery'">
          <div class="list-bar list-bar__report">
            <div class="list-bar__text-container">
              <h5 class="report__title">
                {{$t('app.logs.delivery.senderNameDefault')}}
              </h5>
              <p class="report__info">{{log.senderName}}</p>
              <br>
              <div>
                <h6 class="report__sub-title">{{$t('app.logs.delivery.report.typeOfGoods')}} </h6>
                <p class="report__info">{{$t(`app.logs.delivery.goodsTypes.${log.typeOfGoods}`)}}</p>
                <br>
              </div>

              <div v-if="log.typeOfGoods !== 'dry' && log.logStatus === 'good'"class="report__info">
                <h6 class="report__sub-title">{{$t('app.logs.delivery.report.temp')}}</h6>
                <p class="report__info">{{log.firstReading}}</p>
                <br>
              </div>

              <div class="report__info">
                <h6 class="report__sub-title">{{$t('app.logs.delivery.batchNo')}}</h6>
                <p class="report__info">{{log.ingredients[0].path_number}}</p>
              </div>
              <br>

              <div class="report__info">
                <h6 class="report__sub-title">{{$t('app.logs.delivery.report.logStatus')}}</h6>
                <p class="report__info">{{$t(`app.logs.delivery.report.condition_${log.logStatus}`)}}</p>
              </div>
          </div>
        </div>
        <div v-if="log.ingredients[0].image_url"
             class="list-bar list-bar__product-image list-bar__product-image--large"
             :style="{'background-image': 'url(' + log.ingredients[0].image_url + ')'}"/>
        </div>
        <div v-if="log.logType === 'cool'">
          <div class="list-bar list-bar__report">
            <div class="list-bar__text-container">
              <h5 class="report__title">
                {{$t('app.logs.cooldown.report.food_item')}}
              </h5>
              <p class="report__info">{{log.itemName}}</p>
              <br>
              <div>
                <h6 class="report__sub-title">{{$t('app.logs.cooldown.report.firstReading')}} </h6>
                <p class="report__info">{{log.firstReading}}</p>
                <br>
              </div>
          </div>
        </div>
        <div v-if="log.ingredients[0].image_url"
             class="list-bar list-bar__product-image list-bar__product-image--large"
             :style="{'background-image': 'url(' + log.ingredients[0].image_url + ')'}"/>
        </div>
      </template>
    </view-log-modal>
  </div>
</template>

<script>
import ModalBody from '~/components/modals/ModalBody.vue'

export default {
  components: {
    'view-log-modal': ModalBody
  },
  data(){
    return {
      showLog: false
    }
  },
  props: [
    'log',
  ],
  computed: {
    log_title(){
      if (this.log.logType === 'delivery') {
        return this.$t('app.logs.delivery.name')
      }
      if (this.log.logType === 'cooldown') {
        return this.$t('app.logs.cooldown.name')
      }
      if (this.log.logType === 'warmkeeping') {
        return this.$t('app.logs.warmkeeping.name')
      }
    }
  },
  methods: {
    async showPopup(){
      this.showLog = true;
      this.$store.dispatch('lockBody');
    },
    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showLog = false;
    },
    formatDate(epoch){
      let date = new Date(epoch);
      let dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      return dateString;
    },
    formatTime(epoch){
      let time = new Date(epoch);
      let timeString = time.getHours() + ':' + time.getMinutes();
      return timeString;
    },
  }
}
</script>

<style lang="css">
</style>
