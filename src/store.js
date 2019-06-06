import Vue from 'vue'
import Vuex from 'vuex'
/* global axios */

Vue.use(Vuex)
/**
 * Vuex state that holds entire application data. This solves the problem if duplicating axios
 * calls and data variables. Using mutations and actions we modify the data of the state
 * and read the data on the components with computed properties.
 */
export default new Vuex.Store({
  /**
   * state is an object that has all the variables.
   * @username currently searched term
   * @organization searched organization data
   * @repositoriees repos of the searched organization
   * @currentPage the page we are currently seeing for the repos
   * @recentSearches holds the order of the search terms
   * @commits holds the data of the commits of repository.
   * @loading global loading state, toggles depending on the axios calls
   * @perPage can be configured to be used across the application for repos
   * @currentRepo holds the repo details of the commits we are browsing.
   */
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
    /**
     * Increments the current page before we fetch the data from git api
     * @param {*} state
     */
    NEXT_PAGE (state) {
      state.currentPage++
    },
    /**
     * Decrements the current page before we fetch the data from git api
     * @param {*} state
     */
    PREVIOUS_PAGE (state) {
      state.currentPage--
    },
    /**
     * Mutates the organization state
     * @param {*} state
     * @param {*} data oraganization data fetched from git api
     */
    FETCH_ORGANIZATION (state, data) {
      state.organization = data
    },
    /**
     * Mutates the repositories state for a organization
     * @param {*} state
     * @param {*} data list of repositories
     */
    FETCH_REPOSITORIES (state, data) {
      state.repositories = data
    },
    /**
     * Mutates the commits state
     * @param {*} state
     * @param {*} data List of commits for a given repository
     */
    FETCH_COMMITS (state, data) {
      state.commits = data
    },
    /**
     * we reset the page number to 1 before we search the organization
     * @param {*} state
     */
    RESET_PAGINATION (state) {
      state.currentPage = 1
    },
    /**
     * loading state is useful to show the progress when fetching the data
     * @param {*} state
     * @param {*} loading toggles the loading state
     */
    TOGGLE_LOADING (state, loading) {
      state.loading = loading
    },
    /**
     * We need to push the current search term to the recent searches if it doesn't exit
     * but if it exists, we remove it from the list and add to the beginning of the list
     * @param {*} state
     * @param {*} search current search term
     */
    ADD_RECENT_SEARCH (state, search) {
      // remove the search if its already in list
      for (var i = 0; i < state.recentSearches.length; i++) {
        if (state.recentSearches[i] === search) {
          state.recentSearches.splice(i, 1)
          i--
        }
      }
      // add the search to the beginning of the list
      state.recentSearches.unshift(search)
      // we also make sure to set/overwrite the recent searches to the localStorage
      localStorage.setItem('recentSearches', state.recentSearches)
    },
    /**
     * This will load the @recentSearches with data from local storage
     * @param {*} state vuex state
     * @param {recentSearch} data receent search array from local storage
     */
    LOAD_RECENT_SEARCHES (state, data) {
      state.recentSearches = data
    }
  },
  actions: {
    /**
     * This action will load recent searches from localStorage
     * @param {commit} context
     */
    loadRecentSearches ({ commit }) {
      if (localStorage.getItem('recentSearches')) {
        commit('LOAD_RECENT_SEARCHES', localStorage.getItem('recentSearches').split(','))
      }
    },

    /**
     * This action will check if the current page is less
     * @param {commit, state, dispatch} context
     */
    nextPage ({ commit, state, dispatch }) {
      // calculate the total pages
      let totalPages = Math.ceil(state.organization.public_repos / state.perPage)

      /**
       * see if the current page is less than total pages then dispatch the
       * getRepositories action or else no action is taken
       */
      if (state.currentPage < totalPages) {
        commit('NEXT_PAGE')
        dispatch('getRepositories')
      }
    },

    /**
     * This action will check if the current page is greater than 1
     * @param {commit, state, dispatch} context context paramater by vuex
     */
    previousPage ({ commit, state, dispatch }) {
      /**
       * see if the current page is greater than 1 then dispatch previous page
       * to decrement and then getRepositories action or else no action is taken
      */
      if (state.currentPage > 1) {
        commit('PREVIOUS_PAGE')
        dispatch('getRepositories')
      }
    },
    searchOrganization ({ commit, dispatch }, username) {
      if (username === '') {
        return
      }

      /**
       * Dispatch toggle loading(true) and reset the pagination(currentPage) to 1,
       * before we fetch the data
       */
      commit('TOGGLE_LOADING', true)
      commit('RESET_PAGINATION')

      /**
       * Fetch the organization details and dispatch mutations: FETCH_ORGANIZATION,
       *  ADD_RECENT_SEARCH and action: getRepositories
       */
      axios.get('https://api.github.com/users/' + username).then(response => {
        commit('FETCH_ORGANIZATION', response.data)
        commit('ADD_RECENT_SEARCH', username)
        dispatch('getRepositories', username)
      }).catch(error => {
        if (error.response.status === 404) {
          alert('Organization is not found!!')
        }
      })
    },
    getRepositories ({ commit, state }, username) {
      /**
       * sometimes we might not pass the username, which happens in browse commits page,
       * then we use the organization username already set in the state
       */
      if (username === undefined) {
        username = state.organization.login
      }

      let totalPages = Math.ceil(state.organization.public_repos / state.perPage)
      if (state.currentPage <= totalPages || state.currentPage === 1) {
        /**
         * Toggle loading before we fetch repos, this extra layer will make sure
         * if we call the get repos outside of the searchOrganization action
         */
        commit('TOGGLE_LOADING', true)

        // Fetch the repos and dispatch FETCH_REPOSITORIES and TOGGLE_LOADING to false
        axios.get('https://api.github.com/users/' + username + '/repos?page=' + state.currentPage + '&per_page=' + state.perPage + '&type=all&sort=forks_count&order=asc').then(response => {
          commit('FETCH_REPOSITORIES', response.data)
          commit('TOGGLE_LOADING', false)
        })
      }
    },

    /**
     * We search commits for a given repository.
     * @param {commit, state} context context by vuex
     * @param {*} repo to search its commits
     */
    getCommits ({ commit, state }, repo) {
      commit('FETCH_COMMITS', [])
      axios.get('https://api.github.com/repos/' + state.organization.login + '/' + repo + '/commits').then(response => {
        commit('FETCH_COMMITS', response.data)
        commit('TOGGLE_LOADING', false)
      })
    }
  }
})
