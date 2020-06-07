<template>
  <div class="container p10 flex1">
    <section class="flex_justify_end"  v-permission="[1]">
      <el-button type="primary" @click="onModify('add', true)">新增</el-button>
    </section>
    <Table :mainData="mainData">
      <el-table-column width="90" align="center" label="UID" prop="uid" />
      <el-table-column min-width="100" align="center" label="名称" prop="title" />
      <el-table-column width="100" align="center" label="排序" prop="order" />
      <el-table-column width="200" align="center" label="操作" >
        <template slot-scope="scope" class="flex_justify_center">
          <el-button v-permission="[1]" type="warning" @click="onModify('edit', scope.$index, scope.row.uid)">编辑</el-button>
          <el-button v-permission="[1]" type="danger" @click="onDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script>
import { apiGetCategory,apiEditCategoryItem,apiAddCategoryItem,apiDeleteCategoryItem } from "@/api/product/category";
import { confirmation } from "@/util/decorator";
import mainMixin from "@/mixins/main.mixin";
import permission from '@/directive/permission/index.js'
export default {
  name: "CategoryList",
  components: {
  },
  directives: { permission },
  props: {},
  filters: {},
  mixins: [mainMixin],
  data() {
    return {
      categoryUid: 0,
      title: '',
      
    };
  },

  watch: {},
  mounted() {
    this.getMainData();
  },
  methods: {
    async getMainData() {
     let res = await apiGetCategory(this.title);
      this.mainData = res.data.data;
    },

    async editRowData(data, index) {
      console.log('data: ', data);
      let res = await apiEditCategoryItem(data.uid, data)
      if (res.data.code == 0) {
        this.editSuccess(index,data);
      }
    },
    async addRowData(data) {
      let res = await apiAddCategoryItem(data)
      if (res.data.code == 0) {
        this.addSuccess(res.data.data);
      }
    },

    @confirmation(`确定删除?`)
    async onDelete(rowIndex, rowData) {
      let res = await apiDeleteCategoryItem(rowData.uid)
      if(res.data.code == 0){
       this.deleteSuccess(rowIndex);
      }
     
    },


    changePageSize() {},

    changePage() {},
  },
};
</script>

<style lang="less" scoped>
.container {
  background: white;
}
</style>
