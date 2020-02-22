<template >
  <div class="container">
    <div class="flex">
      <div class="flex_space">
        <PageTop name="资源" />

        <el-popover placement="bottom" width="300" trigger="click">
          <div class="albums_create">
            <div class="albums_create--title">
              <span>新建分类</span>
              <i class="el-icon-close albums_create--close" @click="onPopoverClose" />
            </div>
            <el-input v-model="createInputTitle" class="filter_input" clearable />
            <el-button class="albums_create--sure" type="success" plain @click="onCreateNew">新建</el-button>
          </div>
          <el-button v-if="checkPermission([0,1])" slot="reference" type="success" plain class="top_button">新建</el-button>
        </el-popover>
      </div>
    </div>

    <div class="type_box flex">
      <el-tag v-for="(item,index) in tableData" :key="index" closable type="success" class="type_item" @close="onDelete(item._id)">{{ item.title }}</el-tag>
    </div>
  </div>
</template>
<script>
import {
  apiAddCategory,
  apiGetCategory,
  apiDeleteCategory
} from '@/api/category'
import { tablePageMixin } from '../../mixins/tablePageMixin.js'

import { mapGetters } from 'vuex'
export default {
  components: {},
  mixins: [tablePageMixin],
  data() {
    return {
      tableData: [],
      createInputTitle: ''
    }
  },
  async created() {
    this.getTableData()
  },

  mounted() {},
  methods: {
    async getTableData() {
      const res = await apiGetCategory()
      this.tableData = res.data.data
    },
    // 删除
    async onDelete(id) {
      if (this.checkPermission([0, 1])) {
        const res = await apiDeleteCategory(id)
        this.getTableData()
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1500
        })
      } else {
        this.$message({
          message: '权限不足,请联系管理员',
          type: 'error',
          duration: 1500
        })
      }
    },
    async onCreateNew() {
      const res = await apiAddCategory(this.createInputTitle.trim())
      this.$message({
        message: '新建成功',
        type: 'success',
        duration: 1500
      })
      this.getTableData()
      this.onPopoverClose()
      console.log('新建', res)
    }
  }
}
</script>

<style lang="less" scoped>
.coverurl_box {
  text-align: center;
}

.more_change {
  text-align: center;
  margin-top: 20px;
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
.type_box {
  flex-wrap: wrap;
}
.type_item {
  margin-right: 30px;
  margin-bottom: 30px;
}
</style>
