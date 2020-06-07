import { Button, TableColumn } from 'element-ui'
import Pagination from '@/common/Pagination'
import Table from '@/common/Table'
export default {
  data() {
    return {
      mainData: [],
      tableLoading: false,
      pageNum: 0,
    }
  },
  components: {
    'el-button': Button,
    'el-table-column': TableColumn,
    Pagination,
    Table,
  },
  props: {
    getPageComponents: { type: Function, require: true }, //获取页面组件
  },
  methods: {
    /**
     * 新增或者编辑
     * @param {*} modifyType add:新增 edit:编辑
     * @param {*} rowIndex 行的下标
     * @param {*} rowUid 行的UID
     */
    onModify(modifyType, rowIndex, rowUid) {
      let pc = this.getPageComponents('modify')
      pc.isShow = !pc.isShow
      pc.modifyType = modifyType
      if (modifyType === 'edit') {
        pc.getModifyData(rowIndex, rowUid)
      }
    },
    /**
     * 确定新增或者编辑
     * @param {*} modifyType add:新增 edit:编辑
     * @param {*} rowData 行的数据
     * @param {*} rowIndex 行的下标
     */
    sureModify(modifyType, rowData, rowIndex) {
      modifyType == 'edit'
        ? this.editRowData(rowData, rowIndex)
        : this.addRowData(rowData)
    },
    /**
     * 编辑成功
     * @param {*} rowIndex 行的下表
     * @param {*} rowData 行的数据
     */
    editSuccess(rowIndex, rowData) {
      this.mainData.splice(rowIndex, 1, rowData)
      let pc = this.getPageComponents('modify')
      pc.isShow = !pc.isShow
      pc.cleanData()
    },

    /**
     * 添加成功
     * @param {*} rowData 行的数据
     */
    addSuccess(rowData) {
      this.mainData.unshift(rowData)
      let pc = this.getPageComponents('modify')
      pc.isShow = !pc.isShow
      pc.cleanData()
      console.log('rowData: ', rowData)
    },

    /**
     * 删除成功
     * @param {*} rowIndex
     */
    deleteSuccess(rowIndex) {
      this.mainData.splice(rowIndex, 1)
    },
  },
}
