const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,

  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,

  cutting: state => state.user.cutting,
  Submenu: state => state.user.Submenu,
  Secondm: state => state.user.Secondm,



  // choices:state => state.user.choices,
}
export default getters
