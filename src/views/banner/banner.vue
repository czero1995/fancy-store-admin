<template >
  <div class="container">
    <div class="flex">
      <div class="flex_space">
        <PageTop name="轮播"/>

        <div class="flex">
          <el-button v-if="checkPermission([0,1])" type="primary" @click="onDetail('new')">新建</el-button>
        </div>
      </div>
    </div>

    <div>
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="tableData"
        border
        fit
        stripe
        highlight-current-row
        style="width: 100%"
        height="600"
      >
        <el-table-column width="100" align="center" label="序号">
          <template slot-scope="scope">
            <div>{{ scope.$index+1 }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="title" min-width="220" align="center" label="标题"/>
        <!-- <el-table-column prop="url" width="220" align="center" label="地址"/> -->
        <el-table-column align="center" width="100" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="cover_img">
          </template>
        </el-table-column>

        <el-table-column v-if="checkPermission([0,1])" align="center" width="100" label="删除">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDelete(scope.row.uid,scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission([0,1])" align="center" width="100" label="编辑">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="onDetail(scope.row.uid)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { apiGetBanner, apiDeleteBanner } from '@/api/banner'
import { tablePageMixin } from '../../mixins/tablePageMixin.js'

import moment from 'moment'
export default {
  components: {},
  mixins: [tablePageMixin],
  data() {
    return {
      tableData: [],
      productUpdate: {},
      downloadLoading: false,
      moment: null
    }
  },
  async created() {
    this.getTableData()
  },

  mounted() {},
  methods: {
    async getTableData() {
      const res = await apiGetBanner()
      this.tableData = res.data.data
      this.listLoading = false
    },
    // 删除
    async onDelete(uid, index) {
      const res = await apiDeleteBanner(uid)
      if (res.data.code == 0) {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1500
        })
        this.tableData.splice(index, 1)
      }
      console.log('res', res)
    },
    onDetail(uid) {
      this.$router.push({
        path: 'banner_detail',
        query: {
          uid
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.coverurl_box {
  text-align: center;
}

.table_opera_btn {
  text-align: center;
  button:nth-of-type(1) {
    margin-right: 2px;
  }
}

.cover_img {
  width: 40px;
  height: 40px;
}
</style>
