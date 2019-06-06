<template>
  <div class="commit-info" v-if="commit.sha && commit.committer">
        <div class="organization-details">
            <div class="commit-avatar">
                <img :src="commit.author.avatar_url" v-if="commit.author" class="" :alt="commit.author.login">
                <img src="@/assets/gituser.png" v-else-if="commit.committer" class="" :alt="commit.commit.author.name">
                <img :src="commit.committer.avatar_url" class="" v-if="commit.author.login !== commit.committer.login" :alt="commit.committer.login">
            </div>

            <div class="commit-details">
                <div class="commit-message">
                    <a :href="commit.html_url" target="_blank">
                        {{ commit.commit.message.split('\n\n')[0] }}
                    </a>
                </div>
                <div class="commit-authors">
                    <div v-if="commit.author.login !== commit.committer.login">
                      <div v-if="commit.author">
                        <a target="_blank" :href="'https://github.com/' + commit.author.login"> {{ commit.author.login }} </a> authored &nbsp;
                      </div>
                      <div v-else-if="commit.commit.author">
                        <strong>{{ commit.commit.author.name }}</strong> authored &nbsp;
                      </div>
                    </div>

                    <a target="_blank" :href="'https://github.com/' + commit.committer.login"> {{ commit.committer.login }} </a>  &nbsp;committed
                     &nbsp; <timeago :datetime="commit.commit.committer.date" :auto-update="60"></timeago>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    commit: Object
  }
}
</script>

<style lang="less" scoped>

.commit-info {
  background-color: white;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #E6EAEE;
  margin-bottom: 10px;

  .organization-details {
    display: flex;
    .commit-avatar {
        margin-left: 5px;
        img {
            width: 36px;
            height: 36px;
            border-radius: 6px;
            margin-right: 5px;
        }
    }

    .commit-details {
        text-align: left;
        margin-left: 5px;
        color: #354052;
        .commit-message {
            font-size: 14px;
            font-weight: bold;
            a {
              color: #354052;
            }
        }
        .commit-authors {
            font-style: italic;
            margin-left: 2px;
            font-size: 14px;
            display: flex;
          a {
            color: #00AAFF;
          }
        }
    }
  }
}
</style>
