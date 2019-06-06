<template>
  <div class="about">
    <user-info></user-info>
    <hr>
    <h4>{{ organization.login }}/{{ $route.params.repo }} commits</h4>
    <div v-for="commit in commits" :key="commit.id">
      <commit :commit="commit"></commit>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import Commit from '@/components/Commit.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Commits',
  components: {
    UserInfo,
    Commit
  },
  computed: {
    ...mapState({
      recentSearches: state => state.recentSearches,
      commits: state => state.commits,
      organization: state => state.organization
    })
  },
  methods: {
    ...mapActions([
      'searchOrganization',
      'getCommits'
    ])
  },
  mounted () {
    if (this.recentSearches.length === 0) {
      this.searchOrganization(localStorage.getItem('recentSearches').split(',')[0])
    }
    let _this = this
    setTimeout(() => {
      _this.getCommits(this.$route.params.repo)
    }, 200)
  }
}
</script>
