<template>
  <div id="app">
    <div class="row">
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less">
@import url(./assets/style.less);

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
