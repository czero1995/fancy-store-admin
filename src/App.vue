<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // page load and read vuex state grom localStorage
    sessionStorage.getItem("vuex") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("vuex"))
        )
      );
    // page refresh save vuex statw to localStorage
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("vuex", JSON.stringify(this.$store.state));
    });
  }
};
</script>
<style lang="less" >
@import "../static/styles/base.less";
#app .sidebar-container {
  z-index: 9999;
}
</style>
