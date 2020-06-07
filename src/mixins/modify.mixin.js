import ModifyLayout from '@/layout/ModifyLayout'
import CommonModifySelect from '@/common/ModifySelect'
import CommonModifyInput from '@/common/ModifyInput'
import CommonModifyOpera from '@/common/ModifyOpera'
export default {
  data() {
    return {
      isShow: false,
      title: '',
      modifyData: {},
      modifyIndex: null,
      modifyType: '',
    }
  },
  components: {
    ModifyLayout,
    CommonModifyInput,
    CommonModifySelect,
    CommonModifyOpera,
  },
  filters: {
    filterType(value) {
      return value == 'add' ? '新增' : '编辑'
    },
  },
  props: {
    getPageComponents: { type: Function, require: true }, //获取页面组件
  },
  methods: {
    onCancel() {
      this.isShow = false
      this.cleanData()
    },
    onModify() {
      let pc = this.getPageComponents('main')
      pc.sureModify(this.modifyType, this.modifyData, this.modifyIndex)
    },
    cleanData() {
      this.modifyData = {}
      this.modifyIndex = null
    },
  },
}
