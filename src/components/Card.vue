<template>
  <div class="card">
    <div class="card-header" v-if="title" v-text="title"></div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="less">
.card {
  background-color: white;
  border-color: #E6EAEE;
}
</style>
