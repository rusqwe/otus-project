<template>
  <div class="topnav">
    <router-link class="item" :to="{ name: 'products' }">Товары</router-link>
    <router-link class="item" :to="{ name: 'basket' }">Корзина</router-link>
    <div class="item-right">
      {{ store.getters.user.login }} |
      <label style="cursor: pointer" @click="logout">Выход</label>
    </div>
  </div>
  <slot name="content"></slot>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

function logout() {
  store.dispatch("logout");
  router.push({ name: "login" });
}
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
.topnav .item-right {
  float: right;
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
