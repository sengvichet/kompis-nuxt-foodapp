<template>

    <b-tabs class="stats nav-center">

      <b-tab title="Today">
        <b-container>

          <ShopStats
          v-if = "!isLoading"
          :stats="today_stats"
           />

      </b-container>

      </b-tab>


      <b-tab title="This Week">
        <b-container>
          <ShopStats
          v-if = "!isLoading"
          :stats="week_stats"
           />

      </b-container>

      </b-tab>

      <b-tab title="This Month">
        <b-container>

          <ShopStats
          v-if = "!isLoading"
          :stats="month_stats"
           />

      </b-container>

      </b-tab>
    </b-tabs>

</template>



<script>
import {
  API
} from "aws-amplify";

import ShopStats from '~/components/Stats/ShopStats.vue'



export default {

  components: {

    ShopStats
    },

  data() {
    return {
    isLoading:false,
    today_stats:{},
    week_stats:{},
    month_stats:{}
    }
  },

  async created() {

    this.isLoading = true
    await this.listStats()
    this.isLoading = false

  },
  methods : {

    listStats () {

      API.get("metamat", "/shops/stats").then((stats) => {

        this.today_stats = stats.today_stats
        this.week_stats = stats.week_stats
        this.month_stats = stats.month_stats

      })
    }

  }

}
</script>
