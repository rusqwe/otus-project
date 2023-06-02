<template>
  <div>
    <button @click="isShowDialog = true">Сделать заказ</button>
    <p>
      <label v-show="isShowConfirm">Форма успешно отправлена</label>
      <CardProduct v-for="item of products" :product="item" :key="item.id" />
      <Dialog v-model="isShowDialog" @hide="hideDialog">
        <template v-slot:header> Заказ </template>
        <template v-slot:content>
          <Form @submit="submitForm">
            <div class="row">
              <label for="lastName">Фамилия:</label>
              <Field name="lastName" :rules="validateText" v-model="order.lastName" />
              <ErrorMessage class="error" name="lastName" />
            </div>
            <div class="row">
              <label for="firstName">Имя:</label>
              <Field name="firstName" :rules="validateText" v-model="order.firstName" />
              <ErrorMessage class="error" name="firstName" />
            </div>
            <div class="row">
              <label for="surname">Отчество:</label>
              <input type="text" name="surname" v-model="order.surname" />
            </div>
            <div class="row">
              <label for="address">Адрес:</label>
              <Field name="address" :rules="validateText" v-model="order.address" />
              <ErrorMessage class="error" name="address" />
            </div>
            <div class="row">
              <label for="card">Номер карты:</label>
              <Field name="card" :rules="validateCard" v-model="order.card" />
              <ErrorMessage class="error" name="card" />
            </div>
            <div class="row">
              <label for="expiry">Срок действия:</label>
              <Field name="expiry" :rules="validateText" v-model="order.expiry" />
              <ErrorMessage class="error" name="expiry" />
            </div>
            <input type="submit" />
          </Form>
        </template>
        <template v-slot:footer> </template>
      </Dialog>
    </p>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import Dialog from "../components/Dialog.vue";
import axios from "../mixin/axios.js";
import { ref, onMounted } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";

const API_URL_STORE = "https://fakestoreapi.com/",
  API_URL_BIN = "http://httpbin.org/";

const products = ref([]);
const order = ref({});
const isShowDialog = ref(false);
const isShowConfirm = ref(false);
const surname = ref();
const { getData, postData } = axios;

onMounted(() => {
  getData(`${API_URL_STORE}products`, {}).then((res) => (products.value = res));
});

function hideDialog() {
  //
}
function clearForm() {
  order.value = {};
}
function submitForm() {
  postData(`${API_URL_BIN}post`, order.value, {}).then(() => {
    isShowDialog.value = false;
    isShowConfirm.value = true;
    clearForm();
  });
}

function validateText(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  if (value.length < 3) {
    return "Минимальное количество символов";
  }
  return true;
}
function validateCard(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  if (String(value).length < 16) {
    return "Введите валидиный номер карты";
  }
  return true;
}
</script>
<style scoped>
form .row {
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
}
.error {
  color: red;
}
</style>
