<template>
  <div class="albums_num flex">
    {{ name }}
    <count-to
      v-show="resourceNum>0"
      :start-val="0"
      :end-val="resourceNum"
      :duration="2000"
      class="card-panel-num"
    />
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  props: {
    name: String,
    resourceNum: Number
    // accessData: Array
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.albums_num {
  margin-bottom: 40px;
  font-size: 24px;
  //   margin-left: 20px;
  .card-panel-num {
    color: white;
    border-radius: 10px;
    padding: 0 6px;
    font-size: 20px;
    background: red;
  }
}
.albums_filter_title {
  margin-top: 30px;
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
