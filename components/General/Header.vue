<template>
  <div class="app-header">
    <b-container>
      <b-navbar toggleable>
        <nuxt-link :to="menu_url">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        </nuxt-link>
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      home_url:'',
      menu_url:''
    }
  }
}
</script>
