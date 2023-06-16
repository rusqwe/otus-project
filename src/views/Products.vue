<template>
  <div class="item" v-for="item of store.getters.products" :key="item.id">
    <CardProduct
      :product="item"
      @click="router.push({ name: 'product', params: { id: item.id } })"
    >
      <template v-slot:footer>
        <button @click.stop="store.commit('ADD_CART', item)">Добавить</button>
      </template>
    </CardProduct>

  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();

const { getData } = axios;

const router = useRouter();

onMounted(() => {
  store.dispatch("getProducts");
});
</script>
<style scoped>
.item {
  margin: 5px 5px 5px 5px;
  display: inline-block;
}
</style>
