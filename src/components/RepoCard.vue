<template>
  <div class="card repo-card">
    <div class="repo-info" v-if="repo.name">
      <div class="organization-details">
        <div class="repo-details">
          <div class="repo-name">
            {{ repo.name }}
          </div>
          <div class="last-pushed">
            <timeago :datetime="repo.pushed_at" :auto-update="60"></timeago>
          </div>
          <div class="description">
            {{ repo.description }}
          </div>
        </div>

        <div class="repo-stats">
          <div class="stats-item" title="Stars">
            <i class="fas fa-star"></i>
            {{ repo.stargazers_count }}
          </div>
          <div class="stats-item" title="Open Issues">
            <i class="far fa-clipboard-list-check"></i>
            {{ repo.open_issues_count }}
          </div>
          <div class="stats-item" title="Forks">
            <i class="fas fa-utensil-fork"></i>
            {{ repo.forks_count }}
          </div>
          <div class="stats-item" title="Language" v-if="repo.language">
            <i class="far fa-code"></i>
            {{ repo.language }}
          </div>
        </div>

        <hr>

        <div class="repo-footer">
          <router-link :to="'/' + repo.name + '/commits'" href="#" class="btn btn-primary">
            Commits
          </router-link>
          <div class="language" v-if="repo.license">
            <i class="far fa-balance-scale"></i>
            {{ repo.license.name }}
          </div>
          <div class="language" v-else>
            No License
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoCard',
  props: {
    repo: Object
  },
  methods: {
    search () {
      console.log('searched from userinfo')
    }
  }
}
</script>

<style lang="less">
.repo-card {
  margin-bottom: 20px;
  &:hover {
    text-decoration: none;
    background: #FFFFFF;
    box-shadow: 0 1px 8px 1px rgba(198, 197, 197, 0.4);
  }
  .repo-info {
    background-color: white;
    border-radius: 6px;
    padding: 10px 15px;

    .repo-name {
      color: #354052;
      font-size: 22px;
      text-transform: capitalize;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .last-pushed {
      font-size: 12px;
      color: #7F8FA4;
      font-style: italic;
      margin-bottom: 10px;
    }

    .description {
      font-size: 16px;
      color: #335980;
      height: 50px;
      overflow: hidden;
      margin-bottom: 20px;
    }
  }

  .repo-stats {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #7F8FA4;
  }

  .repo-footer {
    display: flex;
    justify-content: space-between;
    a {
      background-image: linear-gradient(1deg, #1991EB 2%, #2DA1F8 98%);
      border: 1px solid #1585D8;
      border-radius: 4px;
      padding: 4px 10px;
      font-family: Charter-Roman;
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
      line-height: 19px;
    }
    .language {
      color: #7F8FA4;
      font-size: 14px;
      line-height: 28px;
      height: 28px;
      overflow: hidden;
      i {
        font-size: 12px;
      }
    }
  }
}
</style>
