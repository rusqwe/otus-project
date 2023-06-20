<template>
  <Form @submit="submitForm" ref="formProduct">
    <div class="row">
      <label for="title">Заголовок:</label>
      <Field name="title" :rules="validateText" v-model="product.title" />
      <ErrorMessage class="error" name="title" />
    </div>
    <div class="row">
      <label for="price">Цена:</label>
      <Field
        type="number"
        name="price"
        :rules="validateText"
        v-model.number="product.price"
      />
      <ErrorMessage class="error" name="price" />
    </div>
    <div class="row">
      <label for="description">Описание:</label>
      <Field
        v-slot="{ field }"
        name="description"
        :rules="validateText"
        v-model="product.description"
      >
        <textarea v-bind="field" name="description" />
      </Field>
      <ErrorMessage class="error" name="description" />
    </div>
    <div class="row">
      <label for="image">Путь к изображению:</label>
      <Field name="image" :rules="validateLink" v-model="product.image" />
      <ErrorMessage class="error" name="image" />
    </div>
    <div class="row">
      <label for="category">Категория:</label>
      <Field name="category" :rules="validateText" v-model="product.category" />
      <ErrorMessage class="error" name="category" />
    </div>
    <input type="submit" />
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useStore } from "vuex";

const product = ref({});

const props = defineProps(["submitForm"]);

const formProduct = ref(null);

const store = useStore();

function clearForm() {
  product.value = {};
  formProduct.value.resetForm();
}
function submitForm() {
  props.submitForm(product.value).then(() => clearForm());
}
function validateText(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  return true;
}
function validateLink(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  const date_regex = /^(http|https)/;
  if (!date_regex.test(value)) {
    return "Не валидная ссылка";
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
