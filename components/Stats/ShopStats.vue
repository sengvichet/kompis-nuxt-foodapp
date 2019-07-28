<template>
  <div>
    <b-row>
    <p class="numbers">{{stats.orders}}</p>
    <p class="stat-name">Orders</p>
    </b-row>
 
    <b-row>
    <p class="numbers">{{stats.products}}</p>
    <p class="stat-name">Products Sold</p>
    </b-row>

    <b-row>
    <p class="numbers">{{parseInt(stats.revenue)}} kr</p>
    <p class="stat-name">Revenue</p>
    </b-row>
  </div>
</template>

<script>

export default {

  props: {
    stats:{
      type:Object
    }

  }}

</script>
