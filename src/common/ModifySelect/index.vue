<template>
  <div :class="['container', 'flex_aligin_center', type]">
    <div v-if="label.length > 0" class="label">{{ label }}</div>
    <el-select
      class="wp100 flex1"
      :size="size"
      v-model="condition"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
export default {
  components: {
    "el-option": Option,
    "el-select": Select,
  },
  props: {
    label: { type: String, default: "" },
    type: { type: String, default: "query" },
    size: { type: String, default: "medium" },
    value: { type: Number | String },
    options: { type: Array },
  },
  model: {
    prop: "value",
    event: "change",
  },
  computed: {
    condition: {
      get() {
        return this.$props.value;
      },
      set(v) {
        this.$emit("change", v);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.query {
  width: 240px;
  margin-right: 10px;
}
.modify {
  width: 100%;
}
.label {
  font-size: 14px;
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
</style>
