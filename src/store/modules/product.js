export default {
  state: {
    category: [],
  },
  mutations: {
    SET_PRODUCT_CATEGORY: (state, data) => {
      state.category = data
    },
  },
}
