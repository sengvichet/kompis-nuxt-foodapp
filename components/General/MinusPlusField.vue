<template>
  <div class="temp-input">
    <div class="temp-input__button" @click="mpminus()">
      <img class="temp-input__button
                  temp-input__button__image
                  temp-input__button__image--decrease"
           src="~/assets/images/icons/Icon_Left_Back_Arrow.svg"
           alt="decrease"
      />
    </div>

    <div class="temp-input__value" :class="{'temp-input__value--warning': ((this.newValue > this.max) || (this.newValue < this.min)) }">
      <input class="temp-input__value__input-field"
           type="number"
           step="0.1"
           v-model="newValue"
           @input="update"
      />

    <div class="temp-input__value__degree-sign">
        &deg;
      </div>
    </div>

    <div class="temp-input__button" @click="mpplus()">
      <img class="temp-input__button
                  temp-input__button__image
                  temp-input__button__image--increase"
           src="~/assets/images/icons/Icon_Left_Back_Arrow.svg"
           alt="increase"
      />
    </div>
  </div>
</template>

<script>
export default {
  created(){
    console.log('created');
  },
  props: {
      value: {
        default: 0,
        // type: Number
      },
      min: {
        default: -100,
        // type: Number
      },
      max: {
        default: 4,
        // type: Number
      },
      id: {
        default: 'no_id',
        type: String
      }

  },
  data(){
    return {
        newValue: parseFloat(0).toFixed(1)
    }
  },
  methods: {
    mpplus() {
      this.newValue = (parseFloat(this.newValue) + 0.1).toFixed(1);
      this.$emit('updateValue',this.id,this.newValue,true);
    },
    mpminus(){
      this.newValue = (parseFloat(this.newValue )- 0.1).toFixed(1);
      this.$emit('updateValue',this.id,this.newValue,true);
    },
    update({ type, target }) {
      // console.log('emitted');
      this.$emit('updateValue',this.id,target.value,true);
    }
  },

  watch: {
      value: {
          handler: function (newVal, oldVal) {
              this.newValue = newVal;
          }
      }
  },
  created: function() {
      this.newValue = this.value;
  }
}
</script>

<style>
#field_container {
  position: relative;
}
.degree_sign {
  position: absolute;
  top: 10px;
  right:10px;
  font-weight: bold;
  font-size: 12px;

}
</style>
