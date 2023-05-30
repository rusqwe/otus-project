<template>
  <main>
    <CardProduct v-for="item of products" :product="item" :key="item.id" />
  </main>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

let products = ref([]);

onMounted(() => getProducts());

function getProducts() {
  return axios.get("https://fakestoreapi.com/products", {}).then((res) => {
    console.log(res.data);
    products = res.data;
  });
}
</script>
