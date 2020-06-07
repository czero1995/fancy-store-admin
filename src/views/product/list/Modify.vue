<template>
  <div>
    <ModifyLayout :title="modifyType | filterType" :isShow="isShow" :modifyType="modifyType" :uid="modifyData.uid" type="drawer" :beforeClose="onCancel">
      <CommonModifyInput label="名称" v-model="modifyData.title" type="modify" />
      <CommonModifyInput label="价格" v-model="modifyData.priceNow" type="modify" />
      <CommonModifySelect label="分类" v-model="modifyData.categoryUid" type="modify" :options="productCategory" />
      <CommonModifyOpera :modifyType="modifyType" @onCancel="onCancel" @onModify="onModify" />
    </ModifyLayout>
  </div>
</template>

<script>
import { apiGetProductItem } from "@/api/product/product";
import { mapGetters } from "vuex";
import modifyMixin from "@/mixins/modify.mixin";
export default {
  components: {},

  computed: {
    ...mapGetters(["productCategory"]),
  },
  mixins: [modifyMixin],
  data() {
    return {};
  },
  methods: {
    async getModifyData(index, uid) {
      let res = await apiGetProductItem(uid);
      this.modifyData = res.data.data;
      this.modifyIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.modify_input {
  margin-top: 10px;
}
.opera_btn {
  margin-top: 10px;
}
</style>
