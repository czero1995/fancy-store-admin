<template>
  <div id="app flex">
    <Menu v-if="!$route.query.redirect"></Menu>
    <section id="container">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          :class="[isCollapse ? 'app_un_collapse ' : 'app_collapse']"
        />
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        :class="[isCollapse ? 'app_un_collapse ' : 'app_collapse']"
      ></router-view>
    </section>
  </div>
</template>
<script>
import Menu from '@/layout/Menu'
import { mapGetters, mapMutations } from 'vuex'
import { apiGetUserLoginInfo } from '@/api/user/login'
export default {
  components: {
    Menu,
  },
  computed: {
    ...mapGetters(['isCollapse']),
  },

  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      if (window.location.href.indexOf('code') >= 0) {
        let code = window.location.href.split('?')[1]
        code = code.substring(5, code.indexOf('&'))
        let res = await apiGetUserLoginInfo(code)
        if (res.data.code === 0) {
          localStorage.setItem('sessionId', res.data.data.sessionId)
          this.setRoles(res.data.data.roles)
          window.location.href = 'https://www.fancystore.cn/admin'
        }
      }
    },
    ...mapMutations({
      setRoles: 'SET_ROLES',
    }),
  },
}
</script>
<style lang="less">
@import url('../public/less/base.less');
#container {
  .pt10;
  .pr10;
  .pb10;
  height: 100vh;
  background: #efefef;
}
.common_app_collapse {
  transition: 0.5s;
  height: 100%;
}
.app_collapse {
  .common_app_collapse;
  padding-left: 220px;
}
.app_un_collapse {
  .common_app_collapse;
  padding-left: 80px;
}
</style>
