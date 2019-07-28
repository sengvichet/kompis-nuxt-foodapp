<template lang="html">
  <div class="">
    <div class="app-ui-overlay__new-object">
      <div class="round-button" href="#" @click.prevent="showNewTaskModal">
        <img src="~assets/images/icons/Icon_Plus_Dark_Teal.svg"/>
      </div>
    </div>

    <ModalBody v-if="showModal && !showTask"
               z_index="2"
               :footerType="footer"
               :title="$t('app.tasks.create_new_task')"
               :footerText="$t('app.general.next')"
               @clickedNext="clickedNext"
               @close="closePopup">

      <template slot="modal-content">

        <select v-model="type" id="newtasktype" class="list-bar input__selector">
          <!-- <option :value="null" selected> {{ $t('app.tasks.task_type') }} </option> -->
          <option v-for="type in types" :value="type.value"> {{type.text}} </option>
        </select>

        <!-- <NewProcess v-if="showProcess"/> -->


     </template>
    </ModalBody>
    <NewTaskModal v-if="showTask"/>
  </div>
</template>

<script>

import ModalBody from '~/components/modals/ModalBody.vue'
import NewTaskModal from '~/components/Tasks/NewTaskModal.vue'
// import NewProcess from '~/components/Processes/NewProcess.vue'

import {
  API
} from "aws-amplify";

export default {
  components: {
    ModalBody,
    // NewProcess,
    NewTaskModal
  },
  data(){
    return{
      showModal: false,
      showTask: false,
      footer: 'none',

      type: null,
      types: [
        {value: null, text: 'oppgave eller prosess?'},
        {value: 'task', text: this.$t('app.tasks.task')},
        {value: 'process', text: this.$t('app.logs.log')}
      ]
    }
  },
  watch: {
    type(){
      this.type === null ? this.footer = 'none' : this.footer = 'next'
    }
  },
  methods: {

    async showNewTaskModal(){

      // this.$refs.newTask.show()
      this.showModal = true;
    },

    clickedNext(){
      if(this.type === 'task'){
        this.showTask = true;
      }
    },

    async closePopup(){
      this.$store.dispatch('freeBody');
      this.showModal = false;
    },
  }
}
</script>

<style lang="css">
</style>
