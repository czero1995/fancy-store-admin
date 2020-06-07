<template>
  <div :class="['flex_aligin_center', 'mb10', 'pw100']">
    <el-input
      class="flex1"
      :disabled="disabled"
      :size="size"
      :placeholder="placeholder"
      v-model="condition"
      clearable
    >
      <template slot="prepend">{{ label }}</template>
      <el-button
        size="mini"
        v-if="append"
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
import { Input, Button } from "element-ui";
export default {
  components: {
    "el-input": Input,
    "el-button": Button,
  },
  props: {
    label: { type: String, default: "" },
    type: { type: String, default: "query" },
    placeholder: { type: String, default: "" },
    size: { type: String, default: "medium" },
    value: { type: String | Number },
    append: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
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
.label {
  display: inline-block;
  margin-right: 10px;
}
</style>
