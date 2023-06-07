<template>
  <div id="myModal" class="modal" :style="{ display: isShow ? 'block' : 'none' }">
    <div class="modal-content">
      <div class="header"><slot name="header"></slot></div>
      <span class="close" @click="onClose">&times;</span>
      <p><slot name="content"></slot></p>
      <div class="footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "hide"]);
const isShow = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function onClose() {
  emit("update:modelValue", false);
  emit("hide");
}
</script>
<style scoped>
.modal {
  display: none; 
  position: fixed;
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4); 
}

.modal-content {
  position: absolute;
  width: 350px;
  height: 495px;
  top: calc(50% - 250px);
  left: calc(50% - 175px);
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  cursor: default;
  padding: 40px 20px;
}
.footer {
  position: absolute;
  bottom: 0;
}

.header {
  position: absolute;
  top: 10px;
  font-size: 28px;
  font-weight: bold;
}
.close {
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
