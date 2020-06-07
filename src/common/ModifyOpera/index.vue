<template>
  <section class="flex_justify_end opera_btn">
    <el-button type="info" @click="onCancel">{{
      modifyType == "add" ? "关闭" : "取消"
    }}</el-button>
    <el-button
      :type="modifyType == 'add' ? 'primary' : 'warning'"
      @click="onModify"
      >{{ modifyType == "add" ? "新增" : "编辑" }}</el-button
    >
  </section>
</template>

<script>
import { Button } from "element-ui";
export default {
  components: {
    "el-button": Button,
  },

  props: {
    modifyType: {
      type: String,
      default: "",
    },
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onModify() {
      this.$emit("onModify");
    },
  },
};
</script>

<style lang="less" scoped></style>
