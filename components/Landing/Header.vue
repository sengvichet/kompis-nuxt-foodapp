<template>

  <div class="container-header" :class="shadow">
  <b-navbar class="container" fixed="top"  toggleable="md">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#"><img src="~assets/images/kompis_logo.png"/></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">


    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-dropdown-item href="/auth/login" right>{{$t('landing.header.login')}}</b-dropdown-item>
      <b-dropdown-item href="#subscribe" class="btn btn-nav" right>{{$t('landing.header.register')}}</b-dropdown-item>


    </b-navbar-nav>

  </b-collapse>
</b-navbar>

</div>
</template>

<script>

export default {

  data(){
    return {
      shadow:''
    }
  }
,
  created (){
    if (process.browser) {
        window.addEventListener('scroll', this.handleShadow);
    }
  },
    destroyed () {
  if (window.browser) {
        window.removeEventListener('scroll', this.handleShadow);
    }
  },
  methods: {

  handleShadow () {
    if (window.scrollY > 80) {

      this.shadow =  'navbar-shadow'

    }
    else {
      this.shadow = ''
    }
  }
  }
}

</script>
