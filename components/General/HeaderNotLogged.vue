<template>

  <div class="header">
  <b-container>

  <b-navbar toggleable>
<b-navbar-brand><nuxt-link :to="home_url"><img class="logo" src = "~assets/images/kompis_logo.png"  /></nuxt-link></b-navbar-brand>

</b-navbar>
</b-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      home_url:'/'
    }
  }
}
</script>
