  <template>
  <div class="home">
    <div class="input-group mb-3">
      <input type="text" class="form-control" @keyup.enter="searchOrganization" v-model="username" placeholder="Organization Username" aria-label="Organization's username" aria-describedby="button-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="searchOrganization" id="button-addon2">Search</button>
      </div>
    </div>
    <div class="recent-searches">
      Recent Searches: 
      <a href="#" class="badge badge-primary" @click.prevent="searchRecentOrganization(recentSearch)" v-for="recentSearch in recentSearches" :key="recentSearch">
        {{ recentSearch }}
      </a>
    </div>
    <user-info :user="user"></user-info>

    <div v-if="repos.length > 0">
      <hr>
      <div class="header">
        <h3 class="page-header">Repositories ({{ user.public_repos }})</h3>
        <nav aria-label="navigation">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" aria-disabled="true" @click.prevent="previousPage()" href="#">Previous</a></li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" aria-disabled="true" @click.prevent="nextPage()" href="#">Next</a>
            </li>
          </ul>
          <small class="pagination-info">
            Showing page {{ this.currentPage }} of {{ Math.ceil(user.public_repos/20) }}</small>
             &nbsp;<i class="fas fa-spinner fa-pulse" v-if="loading"></i>
        </nav>
      </div>

      <div class="row">
        <div class="col-md-4 col-sm-6" v-for="repo in repos" :key="repo.id">
          <router-link to="/about" class="repo-card">
            <repo-card :repo="repo"></repo-card>
          </router-link>
        </div>
      </div>
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
import UserInfo from '@/components/UserInfo.vue'
import RepoCard from '@/components/RepoCard.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  data () {
    return {
      username: '',
      user: {},
      repos: [],
      loading: true,
      currentPage: 1,
      recentSearches: []
    }
  },
  components: {
    UserInfo,
    Navbar,
    RepoCard
  },
  mounted () {
    this.username = 'netflix'
    this.searchOrganization()
  },
  computed: {
    totalPages () {
      return Math.ceil(this.user.public_repos/20)
    }
  },
  methods: {
    searchRecentOrganization (username) {
      this.username = username
      this.searchOrganization()
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchRepos()
      }
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchRepos()
      }
    },
    searchOrganization () {
      this.loading = true
      this.user = {}
      this.repos = []

      for( var i = 0; i < this.recentSearches.length; i++){ 
        if ( this.recentSearches[i] === this.username) {
          this.recentSearches.splice(i, 1); 
          i--;
        }
      }
      this.recentSearches.unshift(this.username)

      // get organization details
      axios.get('https://api.github.com/users/' + this.username).then(response => {
        this.user = response.data
        this.fetchRepos()
        this.loading = false
      }).catch (error => {
        if(error.response.status === 404) {
          alert('Organization is not found!!')
        }
      })
    },
    fetchRepos () {
      if(this.currentPage <= this.totalPages || this.currentPage === 1) {
        this.loading = true
        // get repositories
        axios.get('https://api.github.com/users/' + this.username + '/repos?page=' + this.currentPage + '&per_page=18').then(response => {
            this.repos = response.data
            this.loading = false
          }).catch (error => {
            if(error.response.status === 404) {
              alert('Organization is not found!!')
            }
          })
        }
    }
  }
}
</script>

<style lang="less">

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

.user-info {
  background-color: white;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  .organization-details {
    display: flex;
    .user-avatar {
        margin-left: 10px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 6px;
        }
    }

    .user-details {
        text-align: left;
        margin-left: 20px;
        .user-name {
            font-size: 22px;
            font-weight: bold;
            color: #354052;
        }
        .user-blog {
            a {
                font-style: italic;
                color: #354052;
                margin-left: 2px;
                i {
                    font-size: 12px;
                }
            }
        }
    }
  }
}
.recent-searches {
  margin-bottom: 10px;
  color: #8B93A0;
  font-size: 16px;
  .badge-primary {
    background-color: #E8EAF1;
    color: #8D909F;
    margin-right: 5px;
    text-transform: capitalize;
  }
}

.repo-card {
  &:hover {
    text-decoration: none;
    background: #FFFFFF;
    box-shadow: 0 1px 8px 1px rgba(158,158,158,0.50);
  }
}
</style>

