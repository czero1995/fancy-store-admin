<template>
  <section class="flex_justify_end">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="pageComponent.changePageSize"
      @current-change="pageComponent.changePage"
      :total="pageComponent.dataItem.num"
      :page-size="pageComponent.query.page_size"
      :current-page="pageComponent.query.page"
    />
  </section>
</template>

<script>
import { Pagination } from "element-ui";
export default {
  name: "Pagination",
  components: {
    "el-pagination": Pagination,
  },
  props: {
    pageComponent: { type: Object },
  },
};
</script>
<style lang="less" scoped></style>
