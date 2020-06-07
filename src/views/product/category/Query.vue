<template>
  <div>
    <QueryLayout>
      <CommonQueryInput label="名称" v-model="title" :isFouces="isFouces" @changeFocus="changeFocus" />
    </QueryLayout>
  </div>
</template>

<script>
import queryMixin from "@/mixins/query.mixin";
export default {
  data() {
    return {
      title: '',
    };
  },
  mixins: [queryMixin],
};
</script>

<style lang="less" scoped></style>
