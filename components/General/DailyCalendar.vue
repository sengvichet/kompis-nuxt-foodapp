<template>


  <div class="daily-calendar calendar">
    <p>Days of the week</p>

    <div :class="isSelected(day.is_selected)" @click.prevent="selectDate(index)" v-for="(day,index) in days_of_the_month">
      {{day.text}}
    </div>

  </div>
</template>

<script>


export default {
  props: {
    selectedDays :{
      type: Array,
      required:false
    },
  },
  data () {
   return {
    selected_days_of_the_month:[],
    days_of_the_month:[
      {
        text: this.$t('app.general.days_of_the_month.sun'),
        value: '0',
        is_selected: false
      },
      {
        text: this.$t('app.general.days_of_the_month.mon'),
        value: '1',
        is_selected: false
      },
      {
        text: this.$t('app.general.days_of_the_month.tue'),
        value: '2',
        is_selected: false
      },
      {
        text: this.$t('app.general.days_of_the_month.wed'),
        value: '3',
        is_selected: false
      },
      {
        text: this.$t('app.general.days_of_the_month.thu'),
        value: '4',
        is_selected: false
      },
      {
        text: this.$t('app.general.days_of_the_month.fri'),
        value: '5',
        is_selected: false
      },
      {
        text: this.$t('app.general.days_of_the_month.sat'),
        value: '6',
        is_selected: false
      }
    ]
   }
 },

 created (){

   for (var x in this.selectedDays){
     if (this.selectedDays[x] >= 0 && this.selectedDays[x] <= 6){
     this.days_of_the_month[this.selectedDays[x]].is_selectedDays = true
     this.selectDate(this.selectedDays[x] )
   }
 }

 },

  methods : {
    selectDate (day_index) {
      this.days_of_the_month[day_index].is_selected = !this.days_of_the_month[day_index].is_selected

      var index =  this.selected_days_of_the_month.indexOf(this.days_of_the_month[day_index].value)
      if ( index == -1 ){
      this.selected_days_of_the_month.push(this.days_of_the_month[day_index].value)
      }
      else {
        this.selected_days_of_the_month.splice(index, 1);
      }

      this.$emit('updateSelectedDays',this.selected_days_of_the_month)

    },

    isSelected(status) {
      if (status) {
      return 'selected'
      }
      else {
        return ''
      }

    }

  }
}


</script>
