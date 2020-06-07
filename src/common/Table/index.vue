<template>
  <el-table
    ref="table"
    :data="mainData"
    border
    fit
    stripe
    highlight-current-row
    class="table"
  >
    <el-table-column width="50" align="center" label="序号" fixed>
      <template slot-scope="scope">
        <div>{{ scope.$index + 1 }}</div>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
import { Table, TableColumn } from "element-ui";
export default {
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
  },
  props: {
    mainData: { default: [] },
  },
};
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  margin: 10px 0;
}
</style>
