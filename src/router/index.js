import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)如果“hidden:true”，则不会在边栏中显示（默认值为false）
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length如果设置为真，则始终显示根菜单，无论其子路由的长度如何。
 *                                if not set alwaysShow, only more than one route under the children如果未设置AlwaysShow，则子级下只能有一个以上的路由
 *                                it will becomes nested mode, otherwise not show the root menu它将成为嵌套模式，否则不显示根菜单
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb如果“redirect:noredirect”，将不会在面包屑中重新定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)名称由<keep alive>使用（必须设置！
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)在子菜单和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             the icon show in the sidebar,图标显示在侧边栏中，
  }
 **/



export const  asyncRouterMap=[
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: {
  //     name: 'homes'
  //   },
  //   id:'homes',
  //   meta:{role:['homes']},
  //   hidden: true,
  //   children: [{
  //     path: 'homes',
  //     name: 'homes',
  //     id:'homes1',
  //     component: () => import('@/views/homes/index'),
  //     meta: {title: '首页', icon: 'icon-peisongdan'},
  //   }
  //   ]
  // },
  // {
  //   path: '',
  //   component: Layout,
  //     redirect: {
  //       name: 'home'
  //     },
  //   // redirect: '/home/orderData',
  //   name: 'home',
  //   id:'home',
  //   meta: {title: '配台',keepAlive:true,isBack:true},
  //   children:[{
  //     path: 'orderData',
  //     name: 'orderData',
  //     id:'home1',
  //     component: () => import('@/views/home/orderData/index'),
  //     meta: {title: '配台', icon: 'icon--1',keepAlive:true,isBack:true},
  //   },
      {
        path: '',
        component: Layout,
        redirect: '/home',
        id:'home',
        meta: {title: '配台',  icon: 'icon--1'},
        children:[{
          path: 'home',
          name: 'home',
          id:'home1',
          component: () => import('@/views/home/index'),
          meta: {title: '配台', icon: 'icon--1',keepAlive:true,isBack:true},
        },{
      path: 'detailsOrder',
      name: 'detailsOrder',
      id:'home2',
      component: () => import('@/views/home/orderData/detailsOrder'),
      meta: {title: '订单', icon: ''},
      hidden: true
    },
      {
        path: 'MatchingTemplate',
        name: 'MatchingTemplate',
        id:'home3',
        component: () => import('@/views/home/orderData/MatchingTemplate'),
        meta: {title: '选配模板', icon: ''},
        hidden: true
      },
      {
        path: 'HistoricalOrder',
        name: 'HistoricalOrder',
        id:'home4',
        component: () => import('@/views/home/orderData/HistoricalOrder'),
        meta: {title: '历史订单', icon: ''},
        hidden: true
      },
      {
        path: 'HistoricalDetails',
        name: 'HistoricalDetails',
        id:'home5',
        component: () => import('@/views/home/orderData/HistoricalDetails'),
        meta: {title: '订单详情', icon: ''},
        hidden: true
      },
      {
        path: 'HistoricalHistory',
        name: 'HistoricalHistory',
        id:'home6',
        component: () => import('@/views/home/orderData/HistoricalHistory'),
        meta: {title: '历史订单详情', icon: ''},
        hidden: true
      }, {
        path: 'QuickSearchBox',
        name: 'QuickSearchBox',
        id:'home7',
        component: () => import('@/views/home/orderData/QuickSearchBox'),
        meta: {title: '全局搜索', icon: ''},
        hidden: true
      }]
  },
  {
    path: '/warehousing',
    component: Layout,
    redirect: '/warehousing/warehouseProcess',
    name: 'warehousing',
    id:'warehousing',
    meta: {title: '入库', icon: 'icon-icon-test1'},
    children: [{
      path: 'warehouseProcess',
      name: 'warehouseProcess',
      id:'warehousing1',
      component: () => import('@/views/warehousing/warehouseProcess/index'),
      meta: {title: '入库', icon: 'icon-icon-test1'}
    },
      {
        path: 'warehouseLie',
        name: 'warehouseLie',
        id:'warehousing2',
        component: () => import('@/views/warehousing/warehouseProcess/warehouseLie'),
        meta: {title: '入库列表', icon: ''},
        hidden: true
      },
      {
        path: 'warehouser',
        name: 'warehouser',
        id:'warehousing3',
        component: () => import('@/views/warehousing/warehouseProcess/warehouser'),
        meta: {title: '入库表', icon: ''},
        hidden: true
      }
    ]
  },
  {
    path: '/stockOut',
    component: Layout,
    redirect: '/stockOut/stockOuter',
    name: 'stockOut',
    id:'stockOut',
    meta: {title: '出库', icon: 'icon-icon-test2'},
    children: [{
      path: 'stockOuter',
      name: 'stockOuter',
      id:'stockOut1',
      component: () => import('@/views/stockOut/index'),
      meta: {title: '出库', icon: 'icon-icon-test2'}
    },
      {
        path: 'roadwayChoice',
        name: 'roadwayChoice',
        id:'stockOut2',
        component: () => import('@/views/stockOut/stockOuter/roadwayChoice'),
        meta: {title: '选择巷道', icon: ''},
        hidden: true
      },
      {
        path: 'warehouseLie1',
        name: 'warehouseLie1',
        id:'stockOut3',
        component: () => import('@/views/stockOut/stockOuter/warehouseLie'),
        meta: {title: '出库列表', icon: ''},
        hidden: true
      },
      {
        path: 'roadwayTunnel',
        name: 'roadwayTunnel',
        id:'stockOut4',
        component: () => import('@/views/stockOut/stockOuter/roadwayTunnel'),
        meta: {title: '选择货架', icon: ''},
        hidden: true
      },
      {
        path: 'roadwayShelves',
        name: 'roadwayShelves',
        id:'stockOut5',
        component: () => import('@/views/stockOut/stockOuter/roadwayShelves'),
        meta: {title: '选择层级', icon: ''},
        hidden: true
      },
      {
        path: 'roadwayLayer',
        name: 'roadwayLayer',
        id:'stockOut6',
        component: () => import('@/views/stockOut/stockOuter/roadwayLayer'),
        meta: {title: '选择栏位', icon: ''},
        hidden: true
      },
      {
        path: 'roadTray',
        name: 'roadTray',
        id:'stockOut7',
        component: () => import('@/views/stockOut/stockOuter/roadTray'),
        meta: {title: '选择托盘', icon: ''},
        hidden: true
      },
      {
        path: 'roadRetrieval',
        name: 'roadRetrieval',
        id:'stockOut8',
        component: () => import('@/views/stockOut/stockOuter/roadRetrieval'),
        meta: {title: '出库表', icon: ''},
        hidden: true
      },
    ]
  },
  {
    path: '/allocationMaterial',
    component: Layout,
    redirect: '/allocationMaterial/allocationMaterialLie',
    name: 'allocationMaterial',
    id:'allocationMaterial',
    meta: {title: '物资配置', icon: 'icon-icon-test6',keepAlive:true,isBack:true},
    children: [{
      path: 'allocationMaterialLie',
      name: 'allocationMaterialLie',
      id:'allocationMaterial1',
      component: () => import('@/views/allocationMaterial/index'),
      meta: {title: '物资配置', icon: 'icon-icon-test6', keepAlive:true,isBack:true}
    }, {
      path: 'allocationDetails',
      name: 'allocationDetails',
      id:'allocationMaterial2',
      component: () => import('@/views/allocationMaterial/allocationMaterialLie/allocationDetails'),
      meta: {title: '物资配置详情', icon: ''},
      hidden: true
    }

    ]
  },
  {
    path: '/statement',
    component: Layout,
    redirect: '/statement/statementG',
    name: 'statement',
    id:'statement',
    meta: {title: '报表', icon: 'icon-icon-test9'},
    children: [
      {
        path: 'statementG',
        name: 'statementG',
        id:'statement1',
        component: () => import('@/views/statement/index'),
        meta: {title: '报表', icon: 'icon-icon-test9'},
      },
      {
        path: 'homes',
        name: 'homes',
        id:'statement2',
        component: () => import('@/views/statement/statements/homes'),
        meta: {title: '报表首页', icon: 'icon-icon-test9'},
        hidden: true
      },
      {
        path: 'statementDetails',
        name: 'statementDetails',
        id:'statement3',
        component: () => import('@/views/statement/statements/statementDetails'),
        meta: {title: '历史记录', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails1',
        name: 'statementDetails1',
        id:'statement4',
        component: () => import('@/views/statement/statements/statementDetails1'),
        meta: {title: '盘库统计', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails2',
        name: 'statementDetails2',
        id:'statement5',
        component: () => import('@/views/statement/statements/statementDetails2'),
        meta: {title: '物资库存统计', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails3',
        name: 'statementDetails3',
        id:'statement6',
        component: () => import('@/views/statement/statements/statementDetails3'),
        meta: {title: '手术物资分析', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails4',
        name: 'statementDetails4',
        id:'statement7',
        component: () => import('@/views/statement/statements/statementDetails4'),
        meta: {title: '消耗统计', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails5',
        name: 'statementDetails5',
        id:'statement8',
        component: () => import('@/views/statement/statements/statementDetails5'),
        meta: {title: '手术排名', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails6',
        name: 'statementDetails6',
        id:'statement9',
        component: () => import('@/views/statement/statements/statementDetails6'),
        meta: {title: '耗材使用明细', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails7',
        name: 'statementDetails7',
        id:'statement10',
        component: () => import('@/views/statement/statements/statementDetails7'),
        meta: {title: '耗材使用统计', icon: ''},
        hidden: true

      },
      {
        path: 'statementDetails8',
        name: 'statementDetails8',
        id:'statement11',
        component: () => import('@/views/statement/statements/statementDetails8'),
        meta: {title: '耗材品类用量', icon: ''},
        hidden: true

      },
      // {
      //   path: 'statementSon2',
      //   name: 'statementSon2',
      //   id:'statementSonn2',
      //   component: () => import('@/views/statement/statements/statementSon2'),
      //   meta: {title: '盘库统计-报表图', icon: ''},
      //   hidden: true
      //
      // },

    ]
  },

  {
    path: '/distribution',
    component: Layout,
    redirect: '/distribution/distributionl',
    name: 'distribution',
    id:'distribution',
    meta: {title: '配送单', icon: 'icon-peisongdan'},
    children: [{
      path: 'distributionl',
      name: 'distributionl',
      id:'distributionl',
      component: () => import('@/views/distribution/index'),
      meta: {title: '配送单', icon: 'icon-peisongdan'},
      alwaysShow: true,
    }
    ]
  },
  {
    path: '/Privilege',
    component: Layout,
    redirect: '/Privilege/PrivilegeLie',
    name: 'Privilege',
    id:'Privilege',
    meta: {title: '用户管理', icon: 'icon-icon-test13'},
    hidden: true,
    children: [{
      path: 'PrivilegeLie',
      name: 'PrivilegeLie',
      id:'Privilege1',
      component: () => import('@/views/Privilege/PrivilegeLie/index'),
      meta: {title: '用户管理', icon: 'icon-icon-test13'}
    }
    ]
  },
  {
    path: '/catalog',
    component: Layout,
    redirect: '/catalog/catalogWord',
    name: 'catalog',
    hidden: true,
    id:'catalog',
    meta: {title: '一级库', icon: 'icon-icon-test6'},
    children: [{
      path: 'catalogWord',
      name: 'catalogWord',
      id:'catalog1',
      component: () => import('@/views/catalog/catalogWord/index'),
      meta: {title: '一级库', icon: 'icon-icon-test6'}
    }
    ]
  },
  {
    path: '/management',
    component: Layout,
    redirect: '/management/Effective',
    name: 'management',
    id:'management',
    hidden: true,
    meta: {title: '效期管理', icon: 'icon-icon-test5'},
    children: [{
      path: 'Effective',
      name: 'Effective',
      id:'management1',
      component: () => import('@/views/management/Effective/index'),
      meta: {title: '效期管理', icon: 'icon-icon-test5'}
    }
    ]
  },

  {
    path: '/warningEarly',
    component: Layout,
    redirect: '/warningEarly/warningLie',
    name: 'warningEarly',
    id:'warningEarly',
    meta: {title: '预警', icon: 'icon-icon-test8'},
    hidden: true,
    children: [{
      path: 'warningLie',
      name: 'warningLie',
      id:'warningEarly1',
      component: () => import('@/views/warningEarly/warningLie/index'),
      meta: {title: '预警', icon: 'icon-icon-test8'}
    }
    ]
  },
  {
    path: '/operative',
    component: Layout,
    redirect: '/operative/oTemplate',
    name: 'operative',
    id:'operative',
    meta: {title: '手术模板', icon: 'icon-shoushumoban'},
    hidden: true,
    children: [{
      path: 'oTemplate',
      name: 'oTemplate',
      id:'oTemplate',
      component: () => import('@/views/operative/oTemplate/index'),
      meta: {title: '手术模板', icon: 'icon-shoushumoban'}
    }
    ]
  },
  {
    path: '/Inventory',
    component: Layout,
    redirect: '/Inventory/InventoryLie',
    name: 'Inventory',
    id:'Inventory',
    meta: {title: '盘库', icon: 'icon-icon-test4'},
    hidden: true,
    children: [{
      path: 'InventoryLie',
      name: 'InventoryLie',
      id:'Inventory1',
      component: () => import('@/views/Inventory/InventoryLie/index'),
      meta: {title: '盘库', icon: 'icon-icon-test4'},
    },
    ]
  },
  {
    path: '/operational',
    component: Layout,
    redirect: '/operational/operational1',
    // name: 'operational',
    id:'operational',
    meta: {title: '操作日志', icon: 'icon-icon-test13'},
    hidden: true,
    children: [{
      path: 'operational1',
      name: 'operational1',
      id:'operational',
      component: () => import('@/views/operational/index'),
      meta: {title: '操作日志', icon: 'icon-icon-test13'}
    }
    ]
  },

  {
    path: '/searchAllocation',
    component: Layout,
    redirect: '/searchAllocation/searchA',
    name: 'searchAllocation',
    id:'searchAllocation',
    meta: {title: '搜索', icon: 'icon-icon-test35'},
    hidden: true,
    children: [{
      path: 'searchA',
      name: 'searchA',
      id:'searchAllocation1',
      component: () => import('@/views/searchAllocation/searchA/index'),
      meta: {title: '搜索', icon: 'icon-icon-test35'},
    },
    ]
  },
];

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true,public:true},
  {path: '/dailyPaper', component: () => import('@/views/dailyPaper/index'), hidden: true,public:true},
  {path: '/firstPage', component: () => import('@/views/firstPage/index'), hidden: true,public:true},
  {path: '/redirect', component: () => import('@/views/redirect'), hidden: true,public:true},
  {path: '/404', component: () => import('@/views/404'), hidden: true,public:true},

]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

