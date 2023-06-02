<template>
  <div>
    <button @click="isShowDialog = true">Сделать заказ</button>
    <CardProduct v-for="item of products" :product="item" :key="item.id" />
    <Dialog v-model="isShowDialog" @hide="hideDialog">
      <template v-slot:header> Заказ </template>
      <template v-slot:content>
        <form @submit.prevent="submitForm">
          <div class="row">
            <label for="lastName">Фамилия:</label>
            <input v-model="lastName" name="lastName" required />
            <span class="error">{{ lastNameEr }}</span>
          </div>
          <div class="row">
            <label for="firstName">Имя:</label>
            <input type="text" name="firstName" v-model="firstName" required />
            <span class="error">{{ firstNameEr }}</span>
          </div>
          <div class="row">
            <label for="surname">Отчество:</label>
            <input type="text" name="surname" v-model="surname" />
          </div>
          <div class="row">
            <label for="address">Адрес:</label>
            <input type="text" name="address" v-model="address" />
            <span class="error">{{ addressEr }}</span>
          </div>
          <div class="row">
            <label for="card">Номер карты:</label>
            <input type="number" name="card" required v-model="card" />
            <span class="error">{{ cardEr }}</span>
          </div>
          <div class="row">
            <label for="expiry">Срок действия:</label>
            <input type="number" name="expiry" required v-model="expiry" />
            <span class="error">{{ expiryEr }}</span>
          </div>
          <input type="submit" />
        </form>
      </template>
      <template v-slot:footer> </template>
    </Dialog>
  </div>
</template>

<script setup>
import CardProduct from "../components/CardProduct.vue";
import Dialog from "../components/Dialog.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useField, useForm } from "vee-validate";

const products = ref([]);
const order = ref({});
const isShowDialog = ref(false);
const surname = ref();
const { handleSubmit } = useForm();

onMounted(() => getProducts());

function getProducts() {
  return axios.get("https://fakestoreapi.com/products", {}).then((res) => {
    products.value = res.data;
  });
}
function hideDialog() {
  console.log("hideDialog");
}
function submitForm(values) {
  console.log("submitForm");
  isShowDialog.value = false;
}
const { value: lastName, errorMessage: lastNameEr } = useField("lastName", validateText);
const { value: firstName, errorMessage: firstNameEr } = useField(
  "firstName",
  validateText
);
const { value: address, errorMessage: addressEr } = useField("address", validateText);
const { value: card, errorMessage: cardEr } = useField("card", validateCard);
const { value: expiry, errorMessage: expiryEr } = useField("expiry", validateText);


function validateText(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  if (value.length < 2) {
    return "Минимальное количество символов";
  }
  return true;
}
function validateCard(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  if (String(value).length < 16) {
    return "Введите валдиный номер карты";
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
