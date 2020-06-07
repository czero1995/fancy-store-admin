import QueryLayout from '@/layout/QueryLayout'
import CommonQuerySelect from '@/common/QuerySelect'
import CommonQueryInput from '@/common/QueryInput'
export default {
  data() {
    return {
      isFouces: false,
    }
  },
  components: {
    QueryLayout,
    CommonQuerySelect,
    CommonQueryInput,
  },
  props: {
    getPageComponents: { type: Function, require: true }, //获取页面组件
  },
  mounted() {
    const that = this
    document.onkeyup = function (e) {
      const event = e || window.event
      const key = event.which || event.keyCode || event.charCode
      if (key == 13 && that.isFouces) {
        that.handleQuery()
      }
    }
  },
  methods: {
    handleQuery() {
      let pc = this.getPageComponents('main')
      pc.title = this.title
      pc.getMainData()
    },
    changeFocus(val) {
      this.isFouces = val
    },
  },
}
