<template>
  <div class="container">
    <el-drawer :class="[isCollapse ? 'drawer_un_collapse' : 'drawer_collapse']" v-if="styleType == 'drawer'" :visible.sync="isShow" :title="title" direction="rtl" :before-close="beforeClose" size="100%" custom-class="my-add-edit-drawer">
      <section class="drawer_container">
        <CommonModifyInput v-if="modifyType == 'edit'" label="UID" :value="uid" type="modify" :disabled="true" />
        <slot></slot>
      </section>
    </el-drawer>
    <el-dialog v-else-if="styleType == 'dialog'" :visible="isShow" :before-close="beforeClose" :append-to-body="appendToBody" :width="width">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
import { Drawer, Dialog } from "element-ui";
import CommonModifyInput from "@/common/ModifyInput";
import { mapGetters } from "vuex";
export default {
  components: {
    "el-drawer": Drawer,
    "el-dialog": Dialog,
    CommonModifyInput,
  },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
  props: {
    styleType: { type: String, default: "drawer" },
    modifyType: { type: String, default: "edit" },
    isShow: { type: Boolean, default: false },
    title: { type: String, default: "" },
    uid: { type: Number, default: -1 },
    beforeClose: { type: Function }, //关闭前
    appendToBody: { type: Boolean, default: false }, //是否插入页面body
    width: { type: String, default: "" }, //宽度
  },
};
</script>

<style lang="less" scoped>
.container {
}
.common_drawer {
  top: 0 !important;
  outline: none;
}
.drawer_container {
  padding: 20px;
  border: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0px 1px 10px #ccc;
}
.drawer_un_collapse {
  .common_drawer;
  left: 64px !important;
  width: calc(100% - 64px) !important;
}
.drawer_collapse {
  .common_drawer;
  left: 210px !important;
  width: calc(100% - 210px) !important;
}
/deep/ .el-drawer__header > :first-child {
  outline: none;
}
/deep/ .el-drawer__close-btn,
/deep/ .el-drawer {
  outline: none;
}
</style>
