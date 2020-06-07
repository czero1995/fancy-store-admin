<template>
  <div>
    <ModifyLayout :title="modifyType | filterType" :isShow="isShow" :modifyType="modifyType" :uid="modifyData.uid" type="drawer" :beforeClose="onCancel">
      <CommonModifyInput label="名称" v-model="modifyData.title" type="modify" />
      <CommonModifyInput label="排序" v-model="modifyData.order" type="modify" />
      <CommonModifyOpera :modifyType="modifyType" @onCancel="onCancel" @onModify="onModify" />
    </ModifyLayout>
  </div>
</template>

<script>
import { apiGetBannerItem} from "@/api/product/banner";
import modifyMixin from "@/mixins/modify.mixin";
export default {
  components: {},

  mixins: [modifyMixin],
  data() {
    return {};
  },
  methods: {
    async getModifyData(index, uid) {
      let res = await apiGetBannerItem(uid);
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
