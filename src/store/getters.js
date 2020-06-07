export default {
  isCollapse: (state) => state.app.isCollapse,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.userInfo,
  permission_routes: (state) => state.permission.routes,

  productCategory: (state) => state.product.category,
}
