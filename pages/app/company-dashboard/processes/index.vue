<template lang="html">
  <div class="">
    <new-delivery></new-delivery>
    <cool-down-process></cool-down-process>
    <!-- <delete-button></delete-button> -->
  </div>
</template>

<script>
import NewDeliveryModal from '~/components/Processes/NewDeliveryModal.vue'
import CoolDownProcess from '~/components/Processes/CoolDownProcess.vue'
// import DeleteButton from '~/components/General/DeleteButton.vue'

export default {
  components: {
    'new-delivery': NewDeliveryModal,
    'cool-down-process': CoolDownProcess,
    // 'delete-button': DeleteButton
  }
}
</script>

<style lang="css">
</style>
