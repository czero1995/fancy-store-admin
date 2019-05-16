<template >
  <div class="container">
    <PageTop name="轮播详情"/>
    <div class="coverurl_box">
      <el-input class="input" placeholder="请输入标题" v-model="apiObject.title" clearable></el-input>
      <el-input class="input" placeholder="请输入地址" v-model="apiObject.url" clearable></el-input>
      <img class="upload_img" :src="apiObject.img">
      <el-upload
        :data="uploadToken"
        :file-list="fileList2"
        :on-success="onUploadSuccess"
        action="http://upload.qiniu.com/"
        list-type="picture"
        class="upload-demo"
      >
        <el-button size="small" type="primary" v-if="checkPermission([0,1])">点击上传</el-button>
      </el-upload>
    </div>
    <div class="opera">
      <el-button type="danger" v-if="checkPermission([0,1])" @click="onDelete">删除</el-button>
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="sureCreate()" v-if="checkPermission([0,1])">确 定</el-button>
    </div>
  </div>
</template>

<script>
import {
  apiAddBanner,
  apiDeleteBanner,
  apiGetBannerDetail,
  apiUpdateBanner
} from "@/api/banner";
import { apiGetQiNiuToken } from "@/api/common";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";

export default {
  mixins: [tablePageMixin],
  data() {
    return {
      apiObject: {
        title: "",
        url: "",
        img: ""
      },
      uploadToken: {
        token: ""
      },
      fileList2: [],
      domain: ""
    };
  },
  created() {
    this.$route.query.id != "new" && this.getTableData();
    this.onUpload();
  },

  mounted() {},
  methods: {
    async getTableData() {
      let res = await apiGetBannerDetail(this.$route.query.id);
      this.apiObject = res.data.result;
      console.log("this.apiObject ", this.apiObject);
    },

    async sureCreate() {
      if (this.$route.query.id == "new") {
        let res = await apiAddBanner(this.apiObject);
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success",
            duration: 1500
          });
          this.$router.go(-1);
        }
        console.log("res", res);
      } else {
        const res = await apiUpdateBanner(this.$route.query.id, this.apiObject);
        if (res.data.code == 0) {
          this.$message({
            message: "编辑成功",
            type: "success",
            duration: 1500
          });
          this.$router.go(-1);
        }
        console.log("res", res);
      }
    },
    // 删除
    async onDelete() {
      let res = await apiDeleteBanner(this.$route.query.id);
      if (res.data.code == 0) {
        this.$message({
          message: "删除成功",
          type: "success",
          duration: 1500
        });
        this.$router.go(-1);
      }
      console.log("res", res);
    },
    onCancel() {
      this.$router.go(-1);
    },
    // 商品详情
    onProductDetail() {},

    async onUpload() {
      const res = await apiGetQiNiuToken();
      this.uploadToken.token = res.data.token;
      this.domain = res.data.domain;
    },

    onUploadSuccess(file) {
      this.apiObject.img = `${this.domain}/${file.key}`;
    }
  }
};
</script>

<style lang="less" scoped>
.upload_img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.input {
  margin-bottom: 10px;
}
.opera {
  margin-top: 20px;
}
</style>
