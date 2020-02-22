<template >
  <div class="container">
    <PageTop name="产品详情" />
    <div class="coverurl_box">
      <el-input class="input" placeholder="请输入标题" v-model="productCreate.title" clearable></el-input>
      <el-input class="input" placeholder="请输入当前价格" v-model="productCreate.priceNow" clearable></el-input>
      <el-input class="input" placeholder="请输入原始价格" v-model="productCreate.priceOrigin" clearable></el-input>
      <el-select v-model="productCreate.category" filterable placeholder="请选择">
        <el-option v-for="item in categoryData" :key="item._id" :label="item.title" :value="item.title" />
      </el-select>
      <div>
        <img :src="productCreate.imgCover" class="upload_img" />
      </div>
      <el-upload :data="uploadToken" :file-list="fileList2" :on-success="onUploadSuccess" action="http://upload.qiniu.com/" list-type="picture" class="upload-demo">
        <el-button size="small" type="primary" v-if="checkPermission([0,1])">点击上传</el-button>
      </el-upload>
    </div>
    <div class="textarea">
      <tinymce :height="300" v-model="productCreate.detailInfo.content" />
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
  apiGetProductDetail,
  apiAddProduct,
  apiDeleteProduct,
  apiUpdateProduct,
  apiGetQiNiuToken
} from "@/api/product";
import { apiGetCategory } from "@/api/category";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";
import Tinymce from "@/components/Tinymce";

export default {
  name: "ProductDetail",
  components: { Tinymce },
  mixins: [tablePageMixin],
  data() {
    return {
      productCreate: {
        title: "",
        category: "",
        detailInfo: {
          content: ""
        },
        priceNow: null,
        priceOrigin: null,
        imgCover: ""
      },
      productUpdate: {},
      uploadToken: {
        token: ""
      },
      domain: "",
      fileList2: [],
      categoryData: []
    };
  },
  created() {
    this.$route.query.uid != "new" && this.getTableData();
    this.onUpload();
    this.getCategoryData();
  },

  mounted() {},
  methods: {
    async getTableData() {
      let res = await apiGetProductDetail(this.$route.query.uid);
      this.productCreate = res.data.data;
      console.log("this.productCreate ", this.productCreate);
    },
    async getCategoryData() {
      let res = await apiGetCategory();
      this.categoryData = res.data.data;
      console.error("categoryData", this.categoryData);
    },
    async sureCreate() {
      if (this.$route.query.uid == "new") {
        let res = await apiAddProduct(this.productCreate);
        if (res.data.code == 1) {
          this.$message({
            message: "添加成功",
            type: "success",
            duration: 1500
          });
        }
        this.$router.go(-1);
        console.log("res", res);
      } else {
        const res = await apiUpdateProduct(
          this.$route.query.uid,
          this.productCreate
        );
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
      let res = await apiDeleteProduct(this.$route.query.id);
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
    async onUpload() {
      const res = await apiGetQiNiuToken();
      this.uploadToken.token = res.data.token;
      this.domain = res.data.domain;
    },

    onUploadSuccess(file) {
      this.productCreate.imgCover = `${this.domain}/${file.key}`;
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
  margin-top: 10px;
}
.textarea {
  margin-top: 20px;
}
</style>
