<template>
    <div class="user-info" v-if="user.login">
        <div class="organization-details">
            <div class="user-avatar">
                <img :src="user.avatar_url" class="" alt="">
            </div>

            <div class="user-details">
                <div class="user-name">
                    {{ user.login }}
                </div>
                <div class="user-bio" v-if="user.bio">
                    {{ user.bio }}
                </div>
                <div class="user-bio" v-else>
                    <a href="#">{{ user.blog }}</a>
                </div>
            </div>
        </div>
        <div class="links">
            <!-- <navbar></navbar> -->
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  props: {
    user: Object
  },
  components: {
    Navbar
  }
}
</script>

<style lang="less">

.user-info {
  background-color: white;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
border: 1px solid #E6EAEE;
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
        color: #354052;
        .user-name {
            font-size: 22px;
            font-weight: bold;
        }
        .user-bio {
            font-style: italic;
            margin-left: 2px;
            font-size: 14px;
        }
    }
  }
}
</style>
