<template >
  <div class="container">
    <PageTop name="管理员"/>
    <div>
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="tableData"
        :key="tableKey"
        border
        fit
        stripe
        highlight-current-row
        style="width: 100%"
        height="600"
      >
        <el-table-column width="100" align="center" label="序号">
          <template slot-scope="scope">
            <div>{{ scope.$index+1 }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="admin" align="center" width="200" label="管理员"/>
        <el-table-column align="center" width="200" label="权限">
          <template slot-scope="scope">
            <span>{{scope.row.roles}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="删除">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDelete(scope.row._id,scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { apiGetAdmin, apiDeleteAdmin } from "@/api/admin";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";
export default {
  mixins: [tablePageMixin],
  data() {
    return {
      tableData: [],
      productUpdate: {},
      downloadLoading: false
    };
  },
  async created() {
    this.getTableData();
  },

  mounted() {},
  methods: {
    async getTableData() {
      let res = await apiGetAdmin();
      this.tableData = res.data.result;
      this.listLoading = false;
      console.log("res", res);
    },
    // 删除
    async onDelete(id, index) {
      let res = await apiDeleteAdmin(id);
      if (res.data.code == 0) {
        this.$message({
          message: "删除成功",
          type: "success",
          duration: 1500
        });
        this.tableData.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
