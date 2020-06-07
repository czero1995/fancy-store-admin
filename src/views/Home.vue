  
<template>
  <div class="home">
    这是首页
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      one: "i am the one sadass asdadsa",
      radio: "1",
    };
  },
  components: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log("homeData", this.$data);
    },
  },
};
</script>