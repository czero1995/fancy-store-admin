<template>
  <div class="container">
    <div class="qrcode-container login_box" >
      <div id="qrcode"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      qrconnect_url:"https://open.weixin.qq.com/connect/qrconnect?appid=wx2b7acc1088ee447b&redirect_uri=http://www.fancystore.cn/baseadmin&scope=snsapi_login&response_type=code"
    }
  },
  mounted(){
     // eslint-disable-next-line no-undef
     var obj = new WxLogin({
            id: "qrcode",
            appid: 'wx2b7acc1088ee447b',
            scope: "snsapi_login", 
            redirect_uri: encodeURIComponent("http://www.fancystore.cn/admin"),            state: "",
            style: "black",
            href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTpub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30="
        });
  },
  methods: {
    setLogin() {
      sessionStorage.setItem("token", "aaa");
      console.log("$route.query.redirect : ", this.$route.query.redirect);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login_box {
}
.qrcode-container {
  margin-top: 28px;
  width: 300px;
  height: 330px;
  overflow: hidden;
  text-align: center;
  position: relative;
}
iframe {
  width: 100%;
  height: 100%;
  transform: scale(0.7);
  margin-top: -82px;
}
</style>
