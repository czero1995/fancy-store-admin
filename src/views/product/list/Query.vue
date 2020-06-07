<template>
  <div>
    <QueryLayout>
      <CommonQuerySelect label="分类" v-model="categoruUid" :options="productCategory" @selectChange="handleQuery" />
      <CommonQueryInput label="名称" v-model="stringValue" :isFouces="isFouces" @changeFocus="changeFocus" />
    </QueryLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import queryMixin from "@/mixins/query.mixin";
export default {
  data() {
    return {
      categoruUid: 0,
      title: '',
    };
  },
  mixins: [queryMixin],
  computed: {
    ...mapGetters(["productCategory"]),
  },
};
</script>

<style lang="less" scoped></style>
