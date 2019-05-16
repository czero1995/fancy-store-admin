import { mapGetters } from 'vuex'
import PageTop from '../components/CommonUse/pageTop'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
export const tablePageMixin = {
  data() {
    return {
      tableKey: 0,
      filterDisplay: false,
      list: null,
      listLoading: true,
      checkedShowTable: [], // 展示哪些需要显示的table列
      showTableData: []
    }
  },
  directives: { permission },
  components: {
    PageTop
  },
  computed: {
    ...mapGetters(['accessWeightData'])
  },
  methods: {
    checkPermission,
    onPopoverClose() {
      document.querySelector('#app').click()
    }
  }
}
