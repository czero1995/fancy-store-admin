<template >
  <div class="container">
    <div class="flex">
      <div class="flex_space">
        <PageTop name="轮播"/>

        <div class="flex">
          <el-button type="primary" @click="onDetail('new')" v-if="checkPermission([0,1])">新建</el-button>
        </div>
      </div>
    </div>

    <div>
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="tableData"
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

        <el-table-column prop="title" width="220" align="center" label="标题"/>
        <el-table-column prop="url" width="220" align="center" label="地址"/>
        <el-table-column align="center" width="100" label="图片">
          <template slot-scope="scope">
            <img class="cover_img" :src="scope.row.img">
          </template>
        </el-table-column>

        <el-table-column align="center" width="100" label="删除" v-if="checkPermission([0,1])">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDelete(scope.row._id,scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="编辑" v-if="checkPermission([0,1])">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onDetail(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { apiGetBanner, apiDeleteBanner } from "@/api/banner";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";

import moment from "moment";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      productUpdate: {},
      downloadLoading: false,
      moment: null
    };
  },
  mixins: [tablePageMixin],
  async created() {
    this.getTableData();
  },

  mounted() {},
  methods: {
    async getTableData() {
      let res = await apiGetBanner();
      this.tableData = res.data.result;
      this.listLoading = false;
    },
    // 删除
    async onDelete(id, index) {
      let res = await apiDeleteBanner(id);
      if (res.data.code == 0) {
        this.$message({
          message: "删除成功",
          type: "success",
          duration: 1500
        });
        this.tableData.splice(index, 1);
      }
      console.log("res", res);
    },
    onDetail(id) {
      this.$router.push({
        path: `banner_detail`,
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.coverurl_box {
  text-align: center;
}

.table_opera_btn {
  text-align: center;
  button:nth-of-type(1) {
    margin-right: 2px;
  }
}

.cover_img {
  width: 40px;
  height: 40px;
}
</style>
