<template lang="html">
  <div class="">
    <div v-if="show" class="list-bar__warning-flag">
      <p class="list-bar__warning-flag__content">!</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  props: {
    show: false
  }
}
</script>

<style lang="css">
</style>
