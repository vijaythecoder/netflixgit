<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control input-search" @keyup.enter="searchProxy" v-model="username" placeholder="Type organization username and hit enter @eg: netflix" aria-label="Organization's username">
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="searchProxy" id="button-addon2">Search</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SearchBox',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions([
      'searchOrganization'
    ]),
    searchProxy () {
      this.searchOrganization(this.username)
    }
  }
}
</script>
