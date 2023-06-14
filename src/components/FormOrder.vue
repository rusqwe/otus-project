<template>
  <Form @submit="submitForm" ref="formOrder">
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
      <Field name="expiry" :rules="validateExpiry" v-model="order.expiry" />
      <ErrorMessage class="error" name="expiry" />
    </div>
    <input type="submit" />
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";

const order = ref({});
const props = defineProps(["submitForm"]);
const formOrder = ref(null);

function clearForm() {
  order.value = {};
  formOrder.value.resetForm();
}
function submitForm() {
  props.submitForm(order.value).then(() => clearForm());
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
  if (String(value).length !== 16) {
    return "Номер карты может состоять только из 16 цифр";
  }
  return true;
}
function validateExpiry(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  const date_regex = /^\d{1,2}\/\d{4}$/;
  if (!date_regex.test(value)) {
    return "Дата должна соотвествовать формату mm/yyyy";
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
</style>
