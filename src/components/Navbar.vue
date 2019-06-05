<template>
    <div id="nav">
      <router-link to="/">Repositories</router-link> |
      <router-link to="/about">Followers</router-link>
    </div>
</template>

<style lang="less">
#nav {
    padding: 10px;
    margin-top: 10px;
    a {
      font-weight: bold;
      color: #354052;
      margin-left: 10px;
      margin-right: 10px;
      &.router-link-exact-active {
        color: #1991EB;
      }
    }
}
</style>
