<template>
  <div class="container p10 flex1">
    <section class="flex_justify_end"  v-permission="[1]">
      <el-button type="primary" @click="onModify('add', true)">新增</el-button>
    </section>
    <Table :mainData="mainData">
      <el-table-column width="90" align="center" label="UID" prop="uid" />
      <el-table-column min-width="100" align="center" label="名称" prop="title" />
      <el-table-column width="100" align="center" label="分类">
        <template slot-scope="scope">
          <div>{{ translateCategory(scope.row.categoryUid) }}</div>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="封面">
        <template slot-scope="scope">
          <el-image :src="scope.row.imgCover" fit="contain" :preview-src-list="[scope.row.imgCover]" lazy />
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="操作" >
        <template slot-scope="scope" class="flex_justify_center" >
          <el-button v-permission="[1]" type="warning" @click="onModify('edit', scope.$index, scope.row.uid)">编辑</el-button>
          <el-button v-permission="[1]" type="danger" @click="onDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </Table>
    <Pagination :pageComponent="this" />
  </div>
</template>

<script>
import { apiGetProductList, apiEditProductItem,apiAddProductItem,apiDeleteProductItem } from "@/api/product/product";
import { apiGetCategory } from "@/api/product/category";
import { confirmation } from "@/util/decorator";
import { Image } from "element-ui";
import { mapGetters, mapMutations } from "vuex";
import mainMixin from "@/mixins/main.mixin";
import permission from '@/directive/permission/index.js'
export default {
  name: "ProductList",
  components: {
    "el-image": Image,
  },
  props: {},
  filters: {},
  directives: { permission },
  mixins: [mainMixin],
  data() {
    return {
      categoryUid: 0,
      dataItem: {},
      query: {},
    };
  },

  computed: {
    ...mapGetters(["productCategory"]),
  },

  watch: {},
  mounted() {
    this.getMainData();
    this.getCategory();
  },
  methods: {
    async getMainData() {
      let res = await apiGetProductList(this.pageNum, this.categoryUid);
      this.mainData = res.data.data;
    },

    async getCategory() {
      let res = await apiGetCategory();
      this.setProductCategory(
        res.data.data.map((item) => {
          return { label: item.title, value: item.uid };
        })
      );
    },

    async editRowData(data, index) {
      let res = await apiEditProductItem(data.uid, data);
      if (res.data.code == 0) {
        this.editSuccess();
      }
    },
    async addRowData(data) {
      let res = await apiAddProductItem(data)
      if (res.data.code == 0) {
        this.addSuccess(res.data.data);
      }
    },

    @confirmation(`确定删除?`)
    async onDelete(rowIndex, rowData) {
      let res = await apiDeleteProductItem(rowData.uid)
       if(res.data.code == 0){
        this.deleteSuccess(rowIndex);
      }
    },

    translateCategory(uid) {
      let val = "";
      this.productCategory.map((item) => {
        item.value == uid && (val = item.label);
      });
      return val;
    },

    changePageSize() {},

    changePage() {},

    ...mapMutations({
      setProductCategory: "SET_PRODUCT_CATEGORY",
    }),
  },
};
</script>

<style lang="less" scoped>
.container {
  background: white;
}
</style>
