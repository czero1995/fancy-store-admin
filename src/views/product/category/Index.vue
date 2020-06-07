<template>
  <div class="flex_direction_column">
    <Query ref="query" :getPageComponents="getPageComponents"></Query>
    <Main ref="main" :getPageComponents="getPageComponents"></Main>
    <Modify ref="modify" :getPageComponents="getPageComponents"></Modify>
  </div>
</template>

<script>
import Query from "./Query";
import Main from "./Main";
import Modify from "./Modify";
import indexMixin from "@/mixins/index.mixin";
export default {
  components: {
    Query,
    Main,
    Modify,
  },
  mixins: [indexMixin],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped></style>
