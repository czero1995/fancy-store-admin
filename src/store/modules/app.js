export default {
  state: {
    isCollapse: false,
  },
  mutations: {
    SET_COLLAPSE: (state, data) => {
      state.isCollapse = data
    },
  },
}
