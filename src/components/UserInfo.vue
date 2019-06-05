<template>
    <div class="user-info" v-if="organization.login">
        <div class="organization-details">
            <div class="user-avatar">
                <img :src="organization.avatar_url" class="" alt="">
            </div>

            <div class="user-details">
                <div class="user-name">
                    {{ organization.login }}
                </div>
                <div class="user-bio" v-if="organization.bio">
                    {{ organization.bio }}
                </div>
                <div class="user-bio" v-else>
                    <a href="#">{{ organization.blog }}</a>
                </div>
            </div>
        </div>
        <div class="links" v-if="$route.path !== '/'">
            <navbar></navbar>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapState } from "vuex";

export default {
  name: 'UserInfo',
  props: {
    user: Object
  },
  computed: {
    ...mapState({
      organization: state => state.organization
    })
  },
  components: {
    Navbar
  }
}
</script>

<style lang="less" scoped>

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
