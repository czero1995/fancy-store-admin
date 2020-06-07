<template>
  <div :class="[isCollapse ? 'container_un_collapse ' : 'container_collapse']">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
    >
      <div class="user_info flex_center">
        <img
          v-if="userInfo.avatarUrl"
          :class="[isCollapse ? 'img_fold' : 'img_unfold']"
          :src="userInfo.avatarUrl"
          @click="setCollapse(!isCollapse)"
        />
        <img
          v-else
          :class="[isCollapse ? 'img_fold' : 'img_unfold']"
          src="../../public/image/github.png"
          @click="setCollapse(!isCollapse)"
        />
        <el-dropdown
          class="block ptb10"
          v-show="!isCollapse"
          placement="bottom"
        >
          <span class="color_white">
            {{userInfo.nickName || '未登录'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="onLogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 支持三级菜单，判断权限,判断展示还是隐藏hidden -->

      <!-- 遍历所有的路由 -->
      <section v-for="item in permission_routes" :key="item.name">
        <section v-if="!item.hidden">
          <!-- 第一级路由:没有层级(没有children) -->
          <el-menu-item
            v-if="!item.children"
            :index="item.name"
            @click="toPage($event)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
          <!-- 第一级路由:有层级(有children) -->
          <el-submenu v-else :index="item.name">
            <template slot="title">
              <i v-if="item.meta.icon" :class="item.meta.icon"></i>
              <span v-show="!isCollapse" slot="title">{{
                item.meta.title
              }}</span>
            </template>
            <!-- 遍历二级路由 -->
            <section
              v-for="itemChildren in item.children"
              :key="itemChildren.name"
            >
              <section v-if="!itemChildren.hidden">
                <!-- 第二级路由: 没有层级(没有children)-->
                <el-menu-item
                  v-if="!itemChildren.children"
                  :index="itemChildren.name"
                  @click="toPage($event)"
                >
                  {{ itemChildren.meta.title }}
                </el-menu-item>
                <!-- 第二级路由:有层级(有children) -->
                <el-submenu v-else :index="itemChildren.name">
                  <template slot="title">
                    <i
                      v-if="itemChildren.meta.icon"
                      :class="itemChildren.meta.icon"
                    ></i>
                    <span slot="title">{{ itemChildren.meta.title }}</span>
                  </template>
                  <!--展示第三级路由-->
                  <section
                    v-for="itemChildrenThree in itemChildren.children"
                    :key="itemChildrenThree.name"
                  >
                    <el-menu-item
                      v-if="!itemChildrenThree.hidden"
                      :index="itemChildrenThree.name"
                      @click="toPage($event)"
                    >
                      {{ itemChildrenThree.meta.title }}
                    </el-menu-item>
                  </section>
                </el-submenu>
              </section>
            </section>
          </el-submenu>
        </section>
      </section>
    </el-menu>
  </div>
</template>

<script>
import {
  Menu,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "element-ui";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    "el-menu": Menu,
    "el-menu-item": MenuItem,
    "el-submenu": Submenu,
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem,
  },
  data() {
    return {
      activeIndex: "",
      routes: [],
    };
  },

  watch: {
    $route: {
      handler() {
        this.activeIndex = this.$route.name;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["isCollapse", "permission_routes","userInfo"]),
  },
  mounted() {
    console.log("permission_routes: ", this.permission_routes);
    console.log('this.store',this.userInfo)
    // this.routes = router.options.routes
    // console.log('this.routes: ', this.routes);
  },
  methods: {
    toPage(e) {
      this.$router.push({ name: e.index });
    },
    onLogOut(){
      console.log('点击注销')
      localStorage.removeItem('sessionId')
      this.$router.replace('/login')
    },
    ...mapMutations({
      setCollapse: "SET_COLLAPSE",
    }),
  },
};
</script>

<style lang="less" scoped>
.common_container {
  position: fixed;
  left: 0;
  height: 210vh;
}
.container_collapse {
  .common_container;
  width: 210px;
}
.container_un_collapse {
  .common_container;
  width: 64px;
}
.el-menu-vertical-demo {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 210px;
  }
}
.el-menu--collapse {
  width: 70px;
}
.user_info {
  text-align: center;
  color: white;
  padding-top:30px;
  cursor: pointer;
  .img_fold {
    width: 40px;
    height: 40px;
  }
  .img_unfold {
    width: 60px;
    height: 60px;
  }
}
</style>
