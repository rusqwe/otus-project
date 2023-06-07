<template>
  <div>
    <button
      @click="
        isShowDialog = true;
        isShowConfirm = false;
      "
    >
      Сделать заказ
    </button>
    <p>
      <label v-show="isShowConfirm">Форма успешно отправлена</label>
      <CardProduct v-for="item of products" :product="item" :key="item.id" />
      <Dialog v-model="isShowDialog" @hide="hideDialog">
        <template v-slot:header> Заказ </template>
        <template v-slot:content>
          <FormOrder :submitForm="submitForm" />
        </template>
        <template v-slot:footer> </template>
      </Dialog>
    </p>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import Dialog from "../components/Dialog.vue";
import FormOrder from "../components/FormOrder.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";

const API_URL_STORE = "https://fakestoreapi.com/",
  API_URL_BIN = "http://httpbin.org/";

const products = ref([]);
const isShowDialog = ref(false);
const isShowConfirm = ref(false);

const { getData, postData } = axios;

onMounted(() => {
  getData(`${API_URL_STORE}products`, {}).then((res) => (products.value = res));
});

function submitForm(order) {
  return postData(`${API_URL_BIN}post`, order, {}).then(() => {
    isShowDialog.value = false;
    isShowConfirm.value = true;
  });
}
</script>
<style scoped></style>
