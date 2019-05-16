<template >
  <div>
    <div class="flex">
      <PageTop :resource-num="resourceNum" name="文章总数"/>
    </div>

    <TabTableDisplay
      :tab-data.sync="showTableData"
      :tab-show-data.sync="checkedShowTable"
      name="tabAlbums"
      @changeTabData="changeTabData"
    />

    <div>
      <el-table
        v-loading="listLoading"
        ref="table"
        :data="tableRequestData"
        :key="tableKey"
        border
        fit
        stripe
        highlight-current-row
        style="width: 100%"
        height="600"
      >
        <el-table-column v-if="onShowTableItem('序号')" width="100" align="center" label="序号">
          <template slot-scope="scope">
            <div>{{ scope.$index+1 }}</div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkedShowTable.indexOf('页面UID') > -1"
          width="80"
          align="center"
          label="页面UID"
          prop="uid"
        />

        <el-table-column v-if="onShowTableItem('页面标题')" width="180" align="center" label="页面标题">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="onShowTableItem('所在目录')"
          width="110"
          align="center"
          label="所在目录"
          prop="catalogText"
        />

        <el-table-column
          v-if="onShowTableItem('操作')"
          class-name="status-col"
          width="210"
          label="操作"
        >
          <template slot-scope="scope">
            <div class="opera_button flex">
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除文章</el-button>
              <el-button type="warning">发送通知</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="onShowTableItem('分享链接')" width="120" label="分享链接" align="center">
          <template slot-scope="scope">
            <el-button type="primary">点击复制</el-button>
          </template>
        </el-table-column>

        <el-table-column v-if="onShowTableItem('评论数')" width="80" label="评论数" prop="commentCount">
          <template slot-scope="scope"/>
        </el-table-column>
        <el-table-column v-if="onShowTableItem('允许评论')" width="100" label="允许评论" align="center">
          <span>切换</span>
        </el-table-column>
        <el-table-column
          v-if="onShowTableItem('阅读用户数')"
          align="center"
          width="100"
          label="阅读用户数"
          prop="readCount"
        />
        <el-table-column v-if="onShowTableItem('阅读数')" width="80" label="阅读数">
          <template slot-scope="scope"/>
        </el-table-column>

        <!-- 每日必听 -->
        <el-table-column
          v-if="onShowTableItem('状态')"
          class-name="status-col"
          width="110"
          label="状态"
        >
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.refreshEveryday"
              :disabled="!scope.row.edit"
              placeholder="请选择"
              @change="onShareChange(scope.row.noShare)"
            >
              <el-option
                v-for="item in [{value: 'true',label:'是'},{value:'false',label:'否'}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <div v-else>{{ scope.row.refreshEveryday }}</div>
          </template>
        </el-table-column>

        <!-- 专辑分类 -->
        <el-table-column
          v-if="onShowTableItem('修改记录')"
          class-name="status-col"
          multiple
          width="300"
          label="修改记录"
        >
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.categoryIds"
              :disabled="!scope.row.edit"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in albumsCategoryData"
                :key="item.uid"
                :label="item.uid + -item.name"
                :value="item.name"
              />
            </el-select>
            <div v-else>{{ scope.row.categoryIds }}</div>
          </template>
        </el-table-column>

        <!-- 供应商 -->
        <el-table-column
          v-if="onShowTableItem('更新时间')"
          class-name="status-col"
          width="100"
          label="更新时间"
        >
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.vendor"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in vendorData"
                :key="item.cn"
                :label="item.cn"
                :value="item.name"
              />
            </el-select>
            <div v-else>{{ scope.row.vendor }}</div>
          </template>
        </el-table-column>

        <!-- 供应商状态 -->
        <el-table-column
          v-if="onShowTableItem('创建时间')"
          class-name="status-col"
          width="110"
          label="创建时间"
        >
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.vendorState"
              :disabled="!scope.row.edit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in [{value: 'noraml',label:'正常'},{value:'down',label:'下架'}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <div v-else>{{ scope.row.vendorState }}</div>
          </template>
        </el-table-column>

        <el-table-column :width="170" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="table_opera flex">
              <el-button
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                @click="confirmEdit(scope.row)"
              >保存</el-button>
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(scope.row)"
              >取消</el-button>
            </div>
            <div v-else class="table_opera flex">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="scope.row.edit=!scope.row.edit"
              >编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :total="resourceNum"
      background
      layout="prev, pager, next"
      style="float:right"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { apiGetPost } from "@/api/eassy";
import clipboard from "@/directive/clipboard/index.js";
import { vendor } from "@/utils/selectTranslate";
import { mapGetters } from "vuex";
import { tabPost } from "@/utils/TableData";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";
import moment from "moment";
export default {
  name: "Albums",
  directives: {
    clipboard
  },
  filters: {},
  components: {},
  mixins: [tablePageMixin],
  data() {
    return {
      pageOffset: 0, // 请求页码
      apiParamer: {
        dbLoadQuery: {} // 请求参数
      },
      tableRequestData: [] // table请求数据
    };
  },
  async created() {
    await this.getRequestData();
  },

  mounted() {
    this.moment = moment;
    this.showTableData = tabPost;
    this.getShowTableData();
  },
  methods: {
    // 改变显示表格列
    onCheckedShowTable(value) {
      localStorage.setItem("showTableData", this.checkedShowTable);
    },

    onShowTableItem(state) {
      return this.checkedShowTable.includes(state);
    },

    // 分页
    handleCurrentChange(val) {
      this.pageOffset = val - 1;
      this.getAlbums();
      this.$nextTick(() => {
        this.$refs.table.bodyWrapper.scrollTop = 0;
      });
    },

    // 判断显示哪些表格
    getShowTableData() {
      this.checkedShowTable =
        localStorage.getItem("tabPost") || this.showTableData;
      typeof this.checkedShowTable === "string" &&
        (this.checkedShowTable = this.checkedShowTable.split(","));
    },
    //  取消编辑
    cancelEdit(row) {
      row.edit = false;
      this.$message({
        message: "取消编辑",
        type: "warning"
      });
    },

    // 保存编辑
    async confirmEdit(row) {
      row.edit = false;
      this.$message({
        message: "编辑成功",
        type: "success"
      });
    },
    // 获取请求数据
    async getRequestData() {
      const res = await apiGetPost(this.pageOffset, this.apiParamer);
      this.resourceNum = res.data.cnt;
      this.tableRequestData = res.data.data;
      console.log("this.tableRequestData", this.tableRequestData);
      this.listLoading = false;
    },
    // 子组件改变父组件的值
    changeTabData(data) {
      this.checkedShowTable = data;
    },

    // 存储编辑之前的数据
    setOriginData(v) {}
  }
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
}
.opera_button button {
  // padding-left: 3px;
  // padding-right: 3px;
  padding: 4px;
}
</style>
