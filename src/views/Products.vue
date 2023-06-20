<template>
  <div>
    <button v-if="store.getters.user.isAdmin" @click="isShowDialog = true">
      Добавить товар
    </button>
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
    <Dialog v-model="isShowDialog">
      <template v-slot:header>Товар</template>
      <template v-slot:content>
        <FormProduct :submitForm="submitForm" />
      </template>
      <template v-slot:footer> </template>
    </Dialog>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import Dialog from "../components/Dialog.vue";
import FormProduct from "../components/FormProduct.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();

const { getData } = axios;

const router = useRouter();

const isShowDialog = ref(false);

function submitForm(product) {
  /*   return postData(`${API_URL_BIN}post`, order, {}).then(() => {
    isShowDialog.value = false;
  }); */
  return store.dispatch("addProduct", product).then(() => (isShowDialog.value = false));
}
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
