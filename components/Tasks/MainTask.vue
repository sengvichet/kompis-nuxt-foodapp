<template>

  <div>



  <div class="list-bar">
   <div class="list-bar__text-container"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
     <h5 class="list-bar__title">{{task.task_type}} - {{task.task_name}} in {{task.location_name}}</h5>
     <p class="list-bar__sub-heading">{{task.task_status}} - Created By: {{task.task_assigner}} for {{task.assignees}}</p>
     <p class="list-bar__info">Scheduled: {{task.task_repeat}} at {{task.task_time}}</p>
   </div>
   <EditTaskModal
    :task_id_prop="task.task_id "
    :title="task.task_name +' ' +task.location_name"
    :assigner_id_prop="task.task_assigner_id"
    :users_prop="users_prop"
    modalMode=true
    @reflectTasks="reflectTasks"
    />
 </div>

</div>

</template>

<script>

import EditTaskModal from '~/components/Tasks/EditTaskModal.vue'

export default {

  components: {
    EditTaskModal
  },
  props: {
    task_details: {
      type: Object,
      required: true
    },
    users_prop: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      task:this.task_details
    }
  },
  methods : {
    reflectTasks () {
      this.$emit('reflectTasks')

    }
  }
}

</script>
