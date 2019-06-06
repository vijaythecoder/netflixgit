<template>
  <div class="recent-searches" v-if="recentSearches.length > 0">
    Recent Searches:
    <a href="#" class="badge badge-primary" @click.prevent="searchOrganization(recentSearch)" v-for="recentSearch in recentSearches" :key="recentSearch">
      {{ recentSearch }}
    </a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RecentSearches',
  computed: {
    ...mapState([
      'recentSearches'
    ])
  },
  methods: {
    ...mapActions([
      'loadRecentSearches',
      'searchOrganization'
    ])
  },
  mounted () {
    // load recent searches from localstorage
    this.loadRecentSearches()
  }
}
</script>

<style lang="less" scoped>
.recent-searches {
  margin-bottom: 10px;
  color: #8B93A0;
  font-size: 16px;

  .badge-primary {
    background-color: #E8EAF1;
    color: #8D909F;
    font-size: 14px;
    margin-right: 5px;
    text-transform: capitalize;
    &:hover {
      background-color: #2DA1F8;
      color: white !important;
    }
  }
}
</style>
