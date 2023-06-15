<template>
  <Form @submit="submitForm">
    <div class="container">
      <br />
      <label for="uname"><b>Логин</b></label>
      <Field
        name="uname"
        placeholder="Enter Username"
        :rules="validateText"
        v-model="data.uname"
        class="text"
      />

      <ErrorMessage class="error" name="uname" />
      <br /><label for="password"><b>Пароль</b></label>
      <Field
        name="password"
        type="password"
        placeholder="Enter Password"
        :rules="validateText"
        v-model="data.password"
        class="text"
      />

      <ErrorMessage class="error" name="password" />

      <button type="submit">Авторизация</button>
      <!--       <label>
        <input type="checkbox" checked="checked" name="remember" />Запомнить меня
      </label> -->
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";

const data = ref({});

const router = useRouter();

function submitForm(form) {
  sessionStorage.setItem("session", true);
  router.push({ name: "products" });
}

function validateText(value) {
  if (!value) {
    return "Поле обязательно для заполнения";
  }
  if (value.length < 2) {
    return "Минимальное количество символов";
  }
  return true;
}
</script>
<style scoped>
form {
  border: 3px solid #8a8787;
  background: white;
}
.text {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}


img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}
</style>
