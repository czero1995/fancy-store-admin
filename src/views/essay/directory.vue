<template>
  <div>
    <div class="flex">
      <PageTop :resource-num="resourceNum" name="专辑分类数"/>
      <el-popover placement="bottom" width="300" trigger="click">
        <div class="albums_create">
          <div class="albums_create--title">
            <span>喜马拉雅专辑主播ID</span>
            <i class="el-icon-close albums_create--close" @click="onPopoverClose"/>
          </div>
          <el-input placeholder="请输入ID" clearable/>
          <div class="create--sure">
            <el-button type="success" plain>确定</el-button>
          </div>
        </div>
        <el-button slot="reference" type="success" plain class="top_button">新建</el-button>
      </el-popover>
      <el-button
        class="top_button"
        type="primary"
        @click="filterDisplay = !filterDisplay"
      >{{ filterDisplay ? '关闭过滤' : ' 条件过滤' }}</el-button>
      <el-button v-if="filterDisplay" class="top_button" type="danger" @click="onClearFilter">清除条件</el-button>
    </div>
    <transition name="fade">
      <div v-show="filterDisplay" class="filter_box">
        <div class="flex">
          <!-- <AccessWeight/> -->
          <div class="filter_item">
            <p class="filter_head">权限</p>
            <el-select
              v-model="filterSelectValue.accessWeight"
              multiple
              filterable
              placeholder="请选择"
              @change="onAccessChange"
            >
              <el-option
                v-for="item in accessWeightData"
                :key="item.cn"
                :label="item.cn"
                :value="item.name"
              />
            </el-select>
          </div>
          <div class="filter_item">
            <p class="filter_head">大类选择</p>
            <el-select
              v-model="filterSelectValue.bigCategory"
              placeholder="请选择"
              @change="onBigTypeChange"
            >
              <el-option label="所有" value="所有"/>
              <el-option
                v-for="item in bigTypeSelectData"
                :key="item.uid"
                :label="item.name"
                :value="item.uid"
              />
            </el-select>
          </div>
        </div>
        <div class="flex">
          <div class="filter_item">
            <p class="filter_head">专辑名过滤</p>
            <el-input v-model="filterSelectValue.albumUid" class="filter_input" clearable/>
          </div>
          <div/>
          <div class="filter_item">
            <p class="filter_head">主播名过滤</p>
            <el-input v-model="filterSelectValue.albumName" class="filter_input" clearable/>
          </div>
          <el-button type="primary" class="btn_query" @click="onFilter">查询</el-button>
        </div>
      </div>
    </transition>

    <TabTableDisplay
      :tab-data.sync="showTableData"
      :tab-show-data.sync="checkedShowTable"
      name="tabAlbumsCategory"
      @changeTabData="changeTabData"
    />

    <div class="class-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        :key="tableKey"
        border
        fit
        stripe
        highlight-current-row
        style="width: 100%"
        height="600"
      >
        <el-table-column width="50" align="center" label="序号">
          <template slot-scope="scope">
            <div>{{ scope.$index+1 }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="onShowTableItem('锁定')" width="60" align="center" label="锁定">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.lock"
              :disabled="!scope.row.edit"
              class="fleter_strict"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="onShowTableItem('修改记录')" width="80" align="center" label="修改记录">
          <template slot-scope="scope">
            <span>点击</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="onShowTableItem('专辑分类ID')"
          width="120"
          align="center"
          label="专辑分类ID"
          sortable
          prop="uid"
        />
        <el-table-column
          v-if="onShowTableItem('资源权限')"
          class-name="status-col"
          width="90"
          align="center"
          label="资源权限"
        >
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.access"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in accessWeightData"
                :key="item.cn"
                :label="item.cn"
                :value="item.name"
              />
            </el-select>
            <div v-else>{{ scope.row.access }}</div>
          </template>
        </el-table-column>
        <!-- 分类排序 -->
        <el-table-column v-if="onShowTableItem('分类排序')" width="80" align="center" label="分类排序">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.order" class="edit-input" size="small"/>
            </template>
            <span v-else>{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <!-- 分组编号 -->
        <el-table-column v-if="onShowTableItem('分组编号')" width="80" align="center" label="分组编号">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.groupId" class="edit-input" size="small"/>
            </template>
            <span v-else>{{ scope.row.groupId }}</span>
          </template>
        </el-table-column>
        <!-- 分组名 -->
        <el-table-column v-if="onShowTableItem('分组名')" width="80" align="center" label="分组名">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.volume" class="edit-input" size="small"/>
            </template>
            <span v-else>{{ scope.row.volume }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="onShowTableItem('分类图标')" width="80" label="分类图标" align="center">
          <template slot-scope="scope">
            <!-- <img v-lazy="scope.row.cover" v-if="!scope.row.edit" class="albums_cover"> -->
            <!-- <el-popover v-else placement="right" width="400" trigger="click"> -->
            <!-- <div>
                <el-upload
                  :data="uploadToken"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :limit="1"
                  :file-list="fileList2"
                  :on-success="onUploadSuccess"
                  :on-error="onUploadError"
                  :on-exceed="onExceed"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture"
                  class="upload-demo"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <div class="upload_popover flex">
                  <el-button size="small" type="primary" @click="onPopoverSure">确定</el-button>
                  <el-button size="small" type="primary" @click="onPopoverSure">取消</el-button>
                </div>
            </div>-->
            <!-- <img v-lazy="scope.row.coverUrl" slot="reference" class="albums_cover"> -->
            <!-- </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column v-if="onShowTableItem('推荐图标')" width="80" align="center" label="推荐图标">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <img v-lazy="scope.row.icon" class="albums_cover">
            </template>
            <span v-else>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <!-- 推荐排序 -->
        <el-table-column v-if="onShowTableItem('推荐排序')" width="90x" align="center" label="推荐排序">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.orderRecommend" class="edit-input" size="small"/>
            </template>
            <span v-else>{{ scope.row.orderRecommend }}</span>
          </template>
        </el-table-column>
        <!-- 专辑分类名 -->
        <el-table-column v-if="onShowTableItem('专辑分类名')" width="100x" align="center" label="专辑分类名">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.name" class="edit-input" size="small"/>
            </template>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- 年龄 -->
        <el-table-column v-if="onShowTableItem('年龄')" width="60x" align="center" label="年龄">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.volume" class="edit-input" size="small"/>
            </template>
            <span v-else>{{ scope.row.min }} - {{ scope.row.max }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="onShowTableItem('专辑数')"
          width="100"
          align="center"
          label="专辑数"
          sortable
          prop="albumsCnt"
        />
        <el-table-column
          v-if="onShowTableItem('音频数')"
          width="100"
          align="center"
          label="音频数"
          sortable
          prop="tracksCnt"
        />
        <el-table-column
          v-if="onShowTableItem('下架音频')"
          width="110"
          align="center"
          label="下架音频"
          sortable
          prop="bannedTracksCnt"
        />
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
    <!-- </div> -->
  </div>
</template>
<script>
// import AccessWeight from "../../components/CommonUse/accessWeight";
import { apiGetAlbumCategories } from "@/api/albums";
import { tabAlbumsCategory } from "@/utils/commonUseTableData";
import { mapGetters } from "vuex";
import { tablePageMixin } from "../../mixins/tablePageMixin.js";
export default {
  components: {
    // AccessWeight
  },
  mixins: [tablePageMixin],
  data() {
    return {
      filterSelectValue: {
        accessWeight: [], // 权限
        bigCategory: "所有",
        albumUid: "",
        albumName: ""
      },
      apiAlbumsParamer: {
        dbLoadQuery: {
          categoryId: null,
          nameFilterInputArray: null
        }
      },

      bigTypeSelectData: []
    };
  },
  mounted() {
    this.getCategoiresData();
    this.getShowTableData();
    this.showTableData = tabAlbumsCategory;
  },
  methods: {
    async getCategoiresData() {
      const res = await apiGetAlbumCategories(this.apiAlbumsParamer);
      this.resourceNum = res.data.cnt;
      this.list = res.data.data.map(v => {
        this.$set(v, "edit", false);
        this.accessWeightData.forEach(item => {
          v.access === item.name && (v.access = item.cn);
        });
        return v;
      });
      this.bigTypeSelectData = res.data.options.slice(0, 36);
      this.listLoading = false;
      console.log("res", res);
    },
    onFilter() {
      console.log("搜过过滤条件");
      this.filterRequestData();
      this.getCategoiresData();
    },
    onShowTableItem(state) {
      return this.checkedShowTable.includes(state);
    },
    cancelEdit(row) {
      row.edit = false;
    },

    // 判断显示哪些表格
    getShowTableData() {
      this.checkedShowTable =
        localStorage.getItem("tabAlbumsCategory") || tabAlbumsCategory;
      typeof this.checkedShowTable === "string" &&
        (this.checkedShowTable = this.checkedShowTable.split(","));
    },
    onAccessChange() {
      this.filterRequestData();
      console.log("filterSelectValue", this.filterSelectValue.accessWeight);

      this.getCategoiresData();
    },
    onBigTypeChange() {
      this.filterRequestData();
      this.getCategoiresData();
      console.log("onBigTypeChange", this.filterSelectValue.bigCategory);
    },
    onClearFilter() {
      this.filterSelectValue = {
        accessWeight: [], // 权限
        bigCategory: "所有",
        albumUid: "",
        albumName: ""
      };
      this.filterRequestData();
      this.getCategoiresData();
    },
    filterRequestData() {
      // 权限
      this.filterSelectValue.accessWeight.length > 0
        ? (this.apiAlbumsParamer.dbLoadQuery.access = {
            $in: this.filterSelectValue.accessWeight
          })
        : delete this.apiAlbumsParamer.dbLoadQuery.access;

      // 大类选择
      this.filterSelectValue.bigCategory != "所有"
        ? (this.apiAlbumsParamer.dbLoadQuery.$or = [
            { uid: this.filterSelectValue.bigCategory }
          ])
        : delete this.apiAlbumsParamer.dbLoadQuery.$or;

      // 专辑名过滤
      this.filterSelectValue.albumUid.length > 0
        ? (this.apiAlbumsParamer.dbLoadQuery.uid = {
            $in: this.filterSelectValue.albumUid.split()
          })
        : delete this.apiAlbumsParamer.dbLoadQuery.uid;

      // 主播名过滤
      this.filterSelectValue.albumName.length > 0
        ? (this.apiAlbumsParamer.nameFilterInputArray = this.filterSelectValue.albumName.split())
        : delete this.apiAlbumsParamer.dbLoadnameFilterInputArrayQuery;
    },
    changeTabData(data) {
      this.checkedShowTable = data;
    },
    handleCurrentChange(val) {}
  }
};
</script>
<style lang="less" scoped>
.filter_item {
  margin-right: 30px;
}
.btn_query {
  margin-top: 46px;
}
</style>
