<template>
  <div class="u-flex-justify-center
              u-text-align-center">
    <p class="app-ui-overlay__page-title
           u-margin-bottom-big
           u-flex-justify-center
           u-text-align-center"> This is a centered section title <p/>

     <div class="list-bar" v-for="item in list">
       <h5 class="list-bar__title">{{item.name}}'s tutorial page {{item.link}}</h5>
       <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
     </div>

    <div class="list-bar" v-for="item in list">
      <div class="list-bar__text-container"> <!-- this keeps the text in a flex-column with text-lign: left, to format text, and keep the icons to the right-->
        <h5 class="list-bar__title">{{item.name}}'s tutorial page</h5>
        <p class="list-bar__sub-heading">link: {{item.link}}</p>
      </div>
      <img class="list-bar__arrow" src="~assets/images/icons/Icon_Right_Arrow.svg" />
    </div>

    <DeleteButton @was_clicked="deleteStuff()"
                :prompt="'Are you sure? Bad idea, but your call..'"/>
  </div>

</template>

<script type="text/javascript">
  import DeleteButton from '~/components/General/DeleteButton.vue'

  export default {
    components: {
      DeleteButton
    },
    data(){
      return {
        list: [
          {
            name: 'Hans',
            link: 'derp'
          },
          {
            name: 'Yusu',
            link: 'derpergerg'
          },
          {
            name: 'Feh',
            link: 'ergerghergerg'
          }
        ],
      }
    },
    created(){

    },
    methods: {
      getTheStuff(){
        // do api busniss
      },
      deleteStuff(){

      }
    }

  }
</script>
