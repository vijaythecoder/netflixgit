<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-sm-6" v-for="repo in repos" :key="repo.id">
        <repo-card :repo="repo"></repo-card>
      </div>
    </div>
  </div>
</template>

<script>
import RepoCard from '@/components/RepoCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Repositories',
  components: {
    RepoCard
  },
  computed: {
    ...mapState({
      repos: state => state.repositories
    })
  }
}
</script>
