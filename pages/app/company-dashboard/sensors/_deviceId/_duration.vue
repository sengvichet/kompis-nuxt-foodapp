<template>
<b-container>

  <div v-if="!pageloading" class="breadcrumb">
    <nuxt-link :to="localePath('app')"><b>{{company_name}} </b></nuxt-link>
&rarr;
  <nuxt-link :to="buildAssetLink()">  <b> {{assetName}}</b></nuxt-link>
  &rarr;
  <b>{{deviceName}}</b>
    &nbsp;
    <span> {{numberofSensors}} {{$('app.sensors.sensors')}}</span>
    <div class="grid-icons">
      <icon class="pageloading" name="th-large"  scale="1.5"></icon>
      <icon class="pageloading" name="align-right"  scale="1.5"></icon>
    </div>
  </div>


  <b-row v-if="pageloading">
  <icon class="pageloading" name="refresh"  scale="2" spin></icon>
  </b-row>

  <b-row v-if = "!pageloading" class="duration-filiter">
  <b-col cols="3"></b-col>
  <b-col cols="3"></b-col>
  <b-col cols="3"></b-col>
  <b-col cols="3">
  <b-form-select v-model="duration" :options="durationOptions" @input="updateDuration" class="mb-3" />
  </b-col>
  </b-row>

  <Sensor
  v-if = "!pageloading"
  v-for="(sensor,index) in sensors"
  :sensorId="sensor.sensorId"
  :sensorDataId="sensor.sensorDataId"
  :sensorData="sensor.sensorData"
  :deviceName="deviceName"
  :deviceId="deviceId"
  :duration="duration"
  :deviceType="deviceType"
  />

</b-container>
</template>

<script>
import {
  API
} from "aws-amplify";

import Sensor from '~/components/Sensors/Sensor'
import Icon from 'vue-awesome'

export default {

  components: {
    Sensor,
    Icon
  },

  data () {
    return {
      deviceName:'',
      deviceId: '',
      company_name: (this.$store.getters.user.userInfo['custom:company_name']?this.$store.getters.user.userInfo['custom:company_name']:''),
      deviceType:'',
      assetName:'',
      assetId:'',
      sensors:[],
      duration: '1',
      numberofSensors:0,
      pageloading:true,
      durationOptions: [
        { value: '1', text: this.$t('app.sensors.past_one_hours')},
        { value: '3', text: this.$t('app.sensors.past_three_hours') },
        { value: '6', text: this.$t('app.sensors.past_six_hours') },
        { value: '12', text:this.$t('app.sensors.past_eleven_hours')},
        { value: '24', text:this.$t('app.sensors.past_twenty_four_hours')},
        { value: '168', text: this.$t('app.sensors.past_seven_days')},
        { value: '336', text:this.$t('app.sensors.past_fourteen_days')},
        { value: '720', text:this.$t('app.sensors.past_thirty_days')}
      ]

    }
  },

  async created() {


    try {
      this.duration = (this.$route.params.duration!=null) ? this.$route.params.duration : '1'
      await this.listSensors();

    } catch (e) {

      this.$notify.error(e.message, 'success')
    }


  },
  methods: {

    updateDuration(){

      this.$router.push('/sensors/'+this.$route.params.deviceId+"/"+this.duration)

    },

    buildAssetLink() {

      return this.localePath({name: 'app-devices-assetId',params: { 'assetId':this.assetId }})

    },

    listSensors() {
      this.pageloading = true
      API.get("metamat", "/sensors/" + this.$route.params.deviceId+"/"+this.duration).then((device) => {
        this.sensors = device.sensors
        this.numberofSensors = this.sensors.length
        this.deviceName = device.deviceName
        this.deviceId = device.deviceId
        this.assetName = device.asset[0].objectName
        this.assetId = device.asset[0].objectId
        this.deviceType = device.deviceType
        this.pageloading = false
      })
    }

  }
}

</script>
