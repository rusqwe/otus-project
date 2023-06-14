<template>
  <div class="grey-darken">
    <div class="empty-layout">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.empty-layout {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 5rem;
  height: 100vh;
}

.grey-darken {
  background-color: gainsboro;
}
</style>
