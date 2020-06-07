export default {
  methods: {
    getPageComponents(name) {
      let com = null
      const fun = (refs) => {
        for (let item in refs) {
          if (item === name) {
            com = refs[name]
          }
        }
      }
      fun(this.$refs)
      return com
    },
  },
}
