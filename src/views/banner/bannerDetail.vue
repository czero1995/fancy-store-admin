<template >
  <div class="container">
    <PageTop name="轮播详情"/>
    <div class="coverurl_box">
      <el-input v-model="apiObject.title" class="input" placeholder="请输入标题" clearable/>
      <el-input v-model="apiObject.url" class="input" placeholder="请输入地址" clearable/>
      <img :src="apiObject.img" class="upload_img">
      <el-upload
        :data="uploadToken"
        :file-list="fileList2"
        :on-success="onUploadSuccess"
        action="http://upload.qiniu.com/"
        list-type="picture"
        class="upload-demo"
      >
        <el-button v-if="checkPermission([0,1])" size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div class="opera">
      <el-button v-if="checkPermission([0,1])" type="danger" @click="onDelete">删除</el-button>
      <el-button @click="onCancel">取 消</el-button>
      <el-button v-if="checkPermission([0,1])" type="primary" @click="sureCreate()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import {
  apiAddBanner,
  apiDeleteBanner,
  apiGetBannerDetail,
  apiUpdateBanner
} from '@/api/banner'
import { apiGetQiNiuToken } from '@/api/common'
import { tablePageMixin } from '../../mixins/tablePageMixin.js'

export default {
  mixins: [tablePageMixin],
  data() {
    return {
      apiObject: {
        title: '',
        url: '',
        img: ''
      },
      uploadToken: {
        token: ''
      },
      fileList2: [],
      domain: ''
    }
  },
  created() {
    this.$route.query.id != 'new' && this.getTableData()
    this.onUpload()
  },

  mounted() {},
  methods: {
    async getTableData() {
      const res = await apiGetBannerDetail(this.$route.query.uid)
      this.apiObject = res.data.data
      console.log('this.apiObject ', this.apiObject)
    },

    async sureCreate() {
      if (this.$route.query.id == 'new') {
        const res = await apiAddBanner(this.apiObject)
        if (res.data.code == 0) {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1500
          })
          this.$router.go(-1)
        }
        console.log('res', res)
      } else {
        const res = await apiUpdateBanner(this.$route.query.uid, this.apiObject)
        if (res.data.code == 0) {
          this.$message({
            message: '编辑成功',
            type: 'success',
            duration: 1500
          })
          this.$router.go(-1)
        }
        console.log('res', res)
      }
    },
    // 删除
    async onDelete() {
      const res = await apiDeleteBanner(this.$route.query.uid)
      if (res.data.code == 0) {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1500
        })
        this.$router.go(-1)
      }
      console.log('res', res)
    },
    onCancel() {
      this.$router.go(-1)
    },
    // 商品详情
    onProductDetail() {},

    async onUpload() {
      const res = await apiGetQiNiuToken()
      this.uploadToken.token = res.data.token
      this.domain = res.data.domain
    },

    onUploadSuccess(file) {
      this.apiObject.img = `${this.domain}/${file.key}`
    }
  }
}
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
