<template>
  <div>
    <div class="topnav">
      <router-link class="item" :to="{ name: 'products' }">Товары</router-link>
      <router-link class="item" :to="{ name: 'basket' }">Корзина</router-link>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
<style scope>
.topnav {
  background-color: #a39999;
  overflow: hidden;
}

.topnav .item {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #8f8888;
  color: black;
}

.router-link-active {
  background-color: #4caf50;
  color: white;
}
</style>
