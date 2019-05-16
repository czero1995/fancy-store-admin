<template >
  <div class="container">
    <div class="flex">
      <div class="flex_space">
        <PageTop name="产品"/>

        <div class="flex">
          <el-button type="primary" @click="onProductDetail('new')" v-if="checkPermission([0,1])">新建</el-button>
        </div>
      </div>
    </div>
    <div>
      筛选分类:
      <el-select
        v-model="categoryDataValue"
        size="mini"
        placeholder="请选择"
        @change="onSelectCategory()"
      >
        <el-option
          v-for="item in categoryData"
          :key="item._id"
          :label="item.title"
          :value="item.title"
        />
      </el-select>
    </div>
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
        style="width: 100%;margin-top:30px;"
        height="600"
      >
        <el-table-column width="100" align="center" label="序号">
          <template slot-scope="scope">
            <div>{{ scope.$index+1 }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="title" width="220" align="center" label="标题"/>
        <el-table-column prop="priceNow" align="center" width="100" label="当前价格"/>
        <el-table-column prop="priceOrigin" align="center" width="100" label="历史价格"/>
        <el-table-column align="center" width="100" label="图片">
          <template slot-scope="scope">
            <img class="cover_img" :src="scope.row.imgCover">
          </template>
        </el-table-column>

        <el-table-column prop="category" align="center" width="100" label="分类"/>
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="onProductDetail(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <el-pagination
      :page-sizes="[30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      style="float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />-->
  </div>
</template>
<script>
import {
  apiAddProduct,
  apiGetProduct,
  apiDeleteProduct,
  apiUpdateProduct,
  apiGetQiNiuToken
} from "@/api/product";
import { apiGetCategory } from "@/api/category";
import { mapGetters } from "vuex";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";
import permission from "@/directive/permission/index.js"; // 权限判断指令
export default {
  name: "Product",
  components: {},
  mixins: [tablePageMixin],
  data() {
    return {
      pageNum: 0,
      pageSize: 30,
      tableData: [],
      productUpdate: {},
      categoryData: [],
      categoryDataValue: ""
    };
  },
  created() {
    this.getTableData();
    this.getCategoryData();
  },

  mounted() {},
  methods: {
    async getTableData() {
      console.log("this.categoryDataValue", this.categoryDataValue);
      let res = await apiGetProduct(
        this.pageNum,
        this.pageSize,
        this.categoryDataValue
      );
      this.tableData = res.data.result;
      this.listLoading = false;
      console.log("res", res);
    },
    async getCategoryData() {
      let res = await apiGetCategory();
      this.categoryData = res.data.result;
    },
    async onSelectCategory() {
      this.pageNum = 0;
      this.getTableData();
    },
    // 删除
    async onDelete(id, index) {
      let res = await apiDeleteProduct(id);
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
    // 商品详情
    onProductDetail(id) {
      this.$router.push({
        path: `product_detail`,
        query: {
          id: id
        }
      });
    },

    // 分页
    handleCurrentChange(val) {
      this.pageNum = val - 1;
      this.getTableData();
      this.$nextTick(() => {
        this.$refs.table.bodyWrapper.scrollTop = 0;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
      console.log(`每页${val}条`);
    }
  }
};
</script>

<style lang="less" scoped>
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
