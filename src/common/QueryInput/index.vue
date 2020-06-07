<template>
  <div :class="['container', 'flex_aligin_center', 'mb10']">
    <el-input class="flex1" :disabled="disabled" :size="size" :placeholder="placeholder" v-model="condition" @focus="onFocus" @blur="onBlur" clearable>
      <template slot="prepend">{{ label }}</template>
      <el-button size="mini" v-if="append" slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
import { Input, Button } from "element-ui";
export default {
  data() {
    return {};
  },
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
    isFouces: { type: Boolean, default: false },
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
  methods: {
    onFocus() {
      this.$emit("changeFocus", true);
    },
    onBlur() {
      this.$emit("changeFocus", false);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 240px;
  margin-right: 10px;
}
.label {
  display: inline-block;
  margin-right: 10px;
}
</style>
