<template>
  <div class="product-item">
    <div class="product-img">
      <img :src="props.product.image" height="115" />
    </div>
    <div class="product-list">
      <h3>{{ props.product.title }}</h3>
      <span :title="props.product.description">{{ description }}</span>
    </div>
    <span class="price">{{
      `${(props.product.price * props.product.count).toFixed(2)}$`
    }}</span>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["product"]);

const description = computed(() =>
  props.product.description.length > 314
    ? props.product.description.slice(0, 314) + "..."
    : props.product.description
);
</script>
<style scoped>
.product-item {
  width: 300px;
  height: 410px;
  margin: 0 auto;
  padding: 10px 10px 5px 10px;
  border: 1px solid #eee;
  background: white;
  font-family: "Open Sans";
  overflow: hidden;
  transition: 0.4s linear;
}
.product-img {
  transition: 1s ease-in-out;
}
.product-img:hover {
  transform: scale(1.1);
}
.product-img img {
  display: block;
}
.product-list {
  margin-top: 15px;
  height: 50%;
}
.product-list h3 {
  font-weight: 700;
  color: #39404b;
  margin: 0;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1;
}
.price {
  color: #e34d38;
  display: block;
}
</style>
