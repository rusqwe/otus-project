<template>
  <div class="item" v-for="item of products" :key="item.id">
    <CardProduct :product="item">
      <template v-slot:footer>
        <button @click="addProduct(item)">Добавить</button>
      </template>
    </CardProduct>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const API_URL_STORE = "https://fakestoreapi.com/",
  API_URL_BIN = "http://httpbin.org/";

const products = ref([]);

const store = useStore();

const { getData } = axios;

onMounted(() => {
  getData(`${API_URL_STORE}products`, {}).then(
    (res) => (products.value = res.map((item) => ({ ...item, count: 1 })))
  );
});
function addProduct(value) {
  store.commit("ADD_PRODUCT", value);
}
</script>
<style scoped>
.item {
  margin: 5px 5px 5px 5px;
  display: inline-block;
}
</style>
