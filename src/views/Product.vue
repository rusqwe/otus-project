<template>
  <div v-if="product">
    <CardProduct :product="product">
      <template v-slot:footer>
        <!--<button @click="addProduct(item)">Добавить</button>-->
      </template>
    </CardProduct>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const API_URL_STORE = "https://fakestoreapi.com/";

const product = ref();

const store = useStore();

const route = useRoute();

const { getData } = axios;

onMounted(() => {
  getData(`${API_URL_STORE}products/${route.params.id}`, {}).then((res) => {
    res.count = 1;
    product.value = res;
  });
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
