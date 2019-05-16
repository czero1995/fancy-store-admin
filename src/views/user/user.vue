<template >
  <div class="container">
    <PageTop name="用户"/>
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

        <el-table-column width="220" label="用户" prop="user" align="center"></el-table-column>
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
import { apiGetQiNiuToken } from "@/api/product";
import { apiGetUser, apiDeleteUser } from "@/api/user";
import { mapGetters } from "vuex";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";
export default {
  name: "User",
  components: {},
  mixins: [tablePageMixin],
  data() {
    return {
      tableData: []
    };
  },
  async created() {
    this.getTableData();
  },

  mounted() {},
  methods: {
    async getTableData() {
      let res = await apiGetUser();
      this.tableData = res.data.result;
      this.listLoading = false;
      console.log("res", res);
    },
    // 删除
    async onDelete(id, index) {
      let res = await apiDeleteUser(id);
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
.albums_create--sure {
  width: 100%;
  margin-top: 20px;
}
.albums_cover {
  width: 34px;
  height: 34px;
}

.albums_info {
  height: 40px;
}

.upload-demo {
  text-align: center;
}
.upload_popover {
  margin-top: 20px;
  justify-content: space-around;
}
.cover_applyall {
  margin-top: 10px;
}
.cover_origin_img {
  width: 80px;
  height: 60px;
  margin-bottom: 20px;
  // margin-left: 140px;
}

.filter_model {
  position: absolute;
  top: 0%;
  left: 0%;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  position: fixed;
  height: 100%;
  z-index: 100;
}

.coverurl_box {
  text-align: center;
}

.more_change {
  text-align: center;
  margin-top: 20px;
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
