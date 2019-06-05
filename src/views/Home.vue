<template>
  <div class="home">
    <div class="input-group mb-3">
      <input type="text" class="form-control input-search" @keyup.enter="searchProxy" v-model="username" placeholder="Type organization's username and hit enter @eg: netflix" aria-label="Organization's username" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="searchProxy" id="button-addon2">Search</button>
      </div>
    </div>
    <recent-searches></recent-searches>
    <user-info></user-info>

    <div v-if="repos.length > 0">
      <hr>
      <div class="header">
        <h3 class="page-header">Repositories ({{ organization.public_repos }})</h3>
        <nav aria-label="navigation">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" aria-disabled="true" @click.prevent="previousPage()" href="#">Previous</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" aria-disabled="true" @click.prevent="nextPage()" href="#">Next</a>
            </li>
          </ul>
          <small class="pagination-info">
             &nbsp;<i class="fas fa-spinner fa-pulse" v-if="loading"></i>
            Showing page {{ currentPage }} of {{ totalPages }}</small>
        </nav>
      </div>

      <repositories></repositories>
    </div>
    <div v-else-if="!loading">
      <div class="alert alert-warning" role="alert">
        <strong>No Repositories for the searched Organization</strong>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Repositories from '@/components/Repositories.vue'
import UserInfo from '@/components/UserInfo.vue'
import RecentSearches from '@/components/RecentSearches.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      username: '',
      user: {},
      recentSearches: []
    }
  },
  components: {
    Navbar,
    UserInfo,
    RecentSearches,
    Repositories
  },
  mounted () {
    // this.username = 'netflix'
    // this.searchOrganization(this.username)
  },
  computed: {
    ...mapState({
      organization: state => state.organization,
      repos: state => state.repositories,
      currentPage: state => state.currentPage,
      perPage: state => state.perPage,
      loading: state => state.loading
    }),
    totalPages () {
      return Math.ceil(this.organization.public_repos/this.perPage)
    }
  },
  methods: {
    ...mapActions([
      'nextPage',
      'previousPage',
      'searchOrganization'
    ]),
    searchProxy () {
      this.searchOrganization(this.username)
    }
  }
}
</script>

<style lang="less">
hr {
    border-top: 1px solid #d4dfe6;
}
.header {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  .page-header {
    font-family: Helvetica;
    font-size: 24px;
    color: #354052;
  }

  .pagination {
    margin-bottom: 0px;
    margin-top: -10px;
  }
  .pagination-info {
    margin-left: 2px;
  }
}

.btn-outline-secondary {
  &:hover {
    background-color: #2DA1F8;
    border-color: #2DA1F8;
  }
}
.input-search {
  background: #FFFFFF;
  border: 1px solid #DFE3E9;
  border-radius: 4px;
  
}
.alert {
  margin-top: 20px;
  background: #F6DE87;
  border-radius: 6px;
}
</style>

