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
    <label v-show="isShowConfirm">Форма успешно отправлена</label>
    <div v-for="item of store.getters.carts" :key="item.id" class="item">
      <CardProduct :product="item">
        <template v-slot:footer>
          <button class="button-counter" @click="store.commit('DELETE_CART', item)">
            -
          </button>
          <label class="label-counter">{{ item.count }}</label>
          <button class="button-counter" @click="store.commit('ADD_CART', item)">
            +
          </button>
        </template>
      </CardProduct>
    </div>
    <button class="button-clear" @click="store.commit('CLEAR_CARTS')">
      Очистить козину
    </button>
    <Dialog v-model="isShowDialog" @hide="hideDialog">
      <template v-slot:header> Заказ </template>
      <template v-slot:content>
        <FormOrder :submitForm="submitForm" />
      </template>
      <template v-slot:footer> </template>
    </Dialog>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import Dialog from "../components/Dialog.vue";
import FormOrder from "../components/FormOrder.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const API_URL_STORE = "https://fakestoreapi.com/",
  API_URL_BIN = "http://httpbin.org/";

const products = ref([]);

const isShowDialog = ref(false);

const isShowConfirm = ref(false);

const store = useStore();

const { postData } = axios;

function submitForm(order) {
  return postData(`${API_URL_BIN}post`, order, {}).then(() => {
    isShowDialog.value = false;
    isShowConfirm.value = true;
  });
}
</script>
<style scoped>
.item {
  margin: 5px 5px 5px 5px;
  display: inline-block;
}
.button-counter {
  width: 50px;
}
.button-clear {
  width: 20rem;
  display: block;
}
.label-counter {
  margin-right: 4px;
  margin-left: 4px;
}
</style>
