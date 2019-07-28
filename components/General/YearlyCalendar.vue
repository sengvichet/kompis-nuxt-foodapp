<template>

  <div class="yearly-calendar calendar">
    <p>Date</p>
    <datepicker @selected="dateSelected" :language="current_lang" :disabledDates="disabledDates" :inline="true"></datepicker>
  </div>
</template>

<script>
import Datepicker  from 'vuejs-datepicker'
import {en, nbNO} from 'vuejs-datepicker/dist/locale'


export default {
  components: {
    Datepicker
  },

  data () {
    return {
      en: en,
      nbNO: nbNO,
      current_lang:'',
      disabledDates: {}
    }
  },
  created() {

    if (this.$store.state.i18n.locale == 'en') {
      this.current_lang = this.en
    }
    else {
        this.current_lang = this.nbNO
    }

    this.buildDisabledDates()
  },
  methods : {

    dateSelected (date) {
      this.$emit('updateSelectedDays',[this.formatDate(date)])
    },

  formatDate(date) {


    return date.getFullYear()+ '-' + (((date.getMonth() + 1) < 10) ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1) ) +'-'+ ((date.getDate() < 10 ) ? '0'+date.getDate() :date.getDate())
  },

  buildDisabledDates () {
    var todayTimeStamp = +new Date;
  //  var oneDayTimeStamp = 1000 * 60 * 60 * 24 * 1;
    var diff = todayTimeStamp - 0;
    var yesterdayDate = new Date(diff);
    this.disabledDates = {to: new Date(yesterdayDate.getFullYear(),yesterdayDate.getMonth(), yesterdayDate.getDate())}

  },

  }

}

</script>
