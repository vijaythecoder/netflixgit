import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/* global axios */
export default new Vuex.Store({
  state: {
    username: '',
    organization: {},
    repositories: [],
    currentPage: 1,
    recentSearches: [],
    commits: [],
    loading: true,
    perPage: 18,
    currentRepo: []
  },
  mutations: {
    NEXT_PAGE (state) {
      state.currentPage++
    },
    PREVIOUS_PAGE (state) {
      state.currentPage--
    },
    FETCH_ORGANIZATION (state, data) {
      state.organization = data
    },
    FETCH_REPOSITORIES (state, data) {
      state.repositories = data
    },
    FETCH_COMMITS (state, data) {
      state.commits = data
    },
    RESET_PAGINATION (state) {
      state.currentPage = 1
    },
    TOGGLE_LOADING (state, loading) {
      state.loading = loading
    },
    ADD_RECENT_SEARCH (state, search) {
      for (var i = 0; i < state.recentSearches.length; i++) {
        if (state.recentSearches[i] === search) {
          state.recentSearches.splice(i, 1)
          i--
        }
      }
      state.recentSearches.unshift(search)
      localStorage.setItem('recentSearches', state.recentSearches)
    }
  },
  actions: {
    nextPage ({ commit, state, dispatch }) {
      let totalPages = Math.ceil(state.organization.public_repos / state.perPage)
      if (state.currentPage < totalPages) {
        commit('NEXT_PAGE')
        dispatch('getRepositories')
      }
    },
    previousPage ({ commit, state, dispatch }) {
      if (state.currentPage > 1) {
        commit('PREVIOUS_PAGE')
        dispatch('getRepositories')
      }
    },
    searchOrganization ({ commit, dispatch, state, rootState }, username) {
      if (username === '') {
        return
      }

      // this.loading = true
      commit('TOGGLE_LOADING', true)
      commit('RESET_PAGINATION')
      // get organization details
      axios.get('https://api.github.com/users/' + username).then(response => {
        commit('FETCH_ORGANIZATION', response.data)
        commit('ADD_RECENT_SEARCH', username)
        dispatch('getRepositories', username)
        // this.fetchRepos()
      }).catch(error => {
        if (error.response.status === 404) {
          alert('Organization is not found!!')
        }
      })
    },
    getRepositories ({ commit, state }, username) {
      if (username === undefined) {
        username = state.organization.login
      }

      let totalPages = Math.ceil(state.organization.public_repos / state.perPage)
      if (state.currentPage <= totalPages || state.currentPage === 1) {
        commit('TOGGLE_LOADING', true)
        // get repositories
        axios.get('https://api.github.com/users/' + username + '/repos?page=' + state.currentPage + '&per_page=' + state.perPage + '&type=all&sort=forks_count&order=asc').then(response => {
          commit('FETCH_REPOSITORIES', response.data)
          commit('TOGGLE_LOADING', false)
        }).catch(error => {
          if (error.response.status === 404) {
            alert('Organization is not found!!')
          }
        })
      }
    },
    getCommits ({ commit, state }, repo) {
      commit('FETCH_COMMITS', [])
      axios.get('https://api.github.com/repos/' + state.organization.login + '/' + repo + '/commits').then(response => {
        commit('FETCH_COMMITS', response.data)
        commit('TOGGLE_LOADING', false)
      }).catch(error => {
        if (error.response.status === 404) {
          alert('Organization is not found!!')
        }
      })
    }
  }
})
