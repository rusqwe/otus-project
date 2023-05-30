<template>
  <div class="product-item">
    <div class="product-img">
      <img :src="props.product.image" />
    </div>
    <div class="product-list">
      <h3>{{ props.product.title }}</h3>
      <span>{{ props.product.description }}</span>
      <span class="price">{{ props.product.price }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
</script>
<style scoped>
.product-item {
  width: 300px;
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
  width: 100%;
}
.product-list {
  margin-top: 15px;
}
.product-list h3 {
  font-weight: 700;
  color: #39404b;
  margin: 0;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 2;
}
.price {
  color: #e34d38;
  display: block;
  margin-bottom: 12px;
}
.price {
  color: #e34d38;
  display: block;
  margin-bottom: 12px;
}
</style>
