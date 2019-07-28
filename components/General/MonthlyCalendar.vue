<template>


  <div class="monthly-calendar calendar">
    <p>Days of the month</p>

    <div :class="isSelected(day.is_selected)" @click.prevent="selectDate(index)" v-for="(day,index) in days_of_the_month">
      {{day.value}}
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
    days_of_the_month:[],
    selected_days_of_the_month:[]
   }
 },

 created (){
   for (var i = 1; i <= 30; i++) {
     this.days_of_the_month.push({
       value: i,
       is_selected: false
     })
   }

   for (var x in this.selectedDays){
     this.days_of_the_month[this.selectedDays[x] - 1].is_selectedDays = true
     this.selectDate(this.selectedDays[x] - 1 )
   }

 },

  methods : {

    selectDate (day_index) {

      this.days_of_the_month[day_index].is_selected = ! this.days_of_the_month[day_index].is_selected

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
