<template>
  <div class="container p10">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="3">
        <template slot="title">
          <i class="el-icon-search"></i>
          <span class="label">搜索</span>
        </template>
        <section class="flex_wrap">
          <slot></slot>
        </section>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from "element-ui";
export default {
  data() {
    return {
      activeNames: ["3"],
    };
  },
  components: {
    "el-collapse": Collapse,
    "el-collapse-item": CollapseItem,
  },
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  margin-bottom: 10px;
  background: white;
}
.el-icon-search {
  font-size: 24px;
}
.label {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
}
</style>
