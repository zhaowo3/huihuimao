const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '伸缩菜单',
      description: '点击切换',
      position: 'bottom'
    }
  },
  {
    element: '#hamburger-pageHomeIcon',
    popover: {
      title: '返回首页',
      description: '点击',
      position: 'bottom'
    }
  },
  {
    element: '#hamburger-breadcrumb',
    popover: {
      title: '链接名称',
      description: '',
      position: 'bottom'
    }
  },
  {
    element: '#hamburger-search',
    popover: {
      title: '全局搜索',
      description: '搜索',
      position: 'left'
    }
  },
  {
    element: '#hamburger-History',
    popover: {
      title: '历史订单',
      description: '可以进行订单的查看和恢复',
      position: 'left'
    }
  },
  {
    element: '#hamburger-searcts',
    popover: {
      title: '搜索物资',
      description: '输入后等2秒就可以查找了',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-periodEffective',
    popover: {
      title: '过期',
      description: '效期已过期或块过期进行提醒',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-warningEarly',
    popover: {
      title: '补货',
      description: '到达预警的信息会有提示',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-tmpDownload',
    popover: {
      title: '模板下载',
      description: '模板可以下载，编辑后可以进行物资导入',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-tmpImport',
    popover: {
      title: '模板导入',
      description: '模板可以存入到系统，导入后可以在原基础上上传',
      position: 'left'
    },
    padding: 0
  },

  {
    element: '#hamburger-avatar',
    popover: {
      title: '个人菜单',
      description: '可以进行退出登录,修改密码,系统设置等',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-scrollWrapper',
    popover: {
      title: '左侧菜菜单',
      description: '根据权限显示',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#hamburger-popperT',
    popover: {
      title: '左下菜菜单',
      description: '根据权限显示',
      position: 'top'
    },
    padding: 0
  },
  {
    element: '#hamburger-roomSort',
    popover: {
      title: '手术室排序',
      description: '',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-roomTime',
    popover: {
      title: '手术时间排序',
      description: '',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-seachClick',
    popover: {
      title: '竖排列表搜索',
      description: '点击弹出进行输入搜索',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-telescopic',
    popover: {
      title: '进行伸缩',
      description: '可以点击进行伸缩',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-population',
    popover: {
      title: '订单病人信息',
      description: '',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-AdditionPops',
    popover: {
      title: '导入历史手术订单',
      description: '可以把手术相关病例需要的物资导入进来',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-MaterialM',
    popover: {
      title: '自选物资',
      description: '显示自定义获取的物资',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-templateAdd',
    popover: {
      title: '添加物资',
      description: '可以把物资添加到订单上',
      position: 'auto'
    },
    padding: 0
  },
  {
    element: '#hamburger-determination',
    popover: {
      title: '确定下单',
      description: '可以提交进行下单操作,需要2次确定',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-clickDeletes',
    popover: {
      title: '删除物资',
      description: '已取过的不能删除,',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-ToDeposit',
    popover: {
      title: '入单',
      description: '仓库里没有的可以进行订单的单独存入,',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-detailsCot',
    popover: {
      title: '列表',
      description: '点击进行扫码提取',
      position: 'top'
    },
    padding: 0
  },
  {
    element: '#hamburger-detailsMains',
    popover: {
      title: '列表',
      description: '点击进行退库存入',
      position: 'top'
    },
    padding: 0
  },
  {
    element: '#hamburger-settleS',
    popover: {
      title: '结算',
      description: '点击进行结算操作',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-closeL',
    popover: {
      title: '关闭托盘',
      description: '只有在此页面打开的才能关闭',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-verify',
    popover: {
      title: '核实完毕使用此按钮',
      description: '',
      position: 'left'
    },
    padding: 0
  },

  {
    element: '#hamburger-inputL',
    popover: {
      title: '输入库位',
      description: '库位规则1-2-3(1为设备,2为货架,3为层)',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-stopL',
    popover: {
      title: '打开托盘',
      description: '输入库位才能打开',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '#hamburger-queryClick1',
    popover: {
      title: '扫码查找',
      description: '扫码枪输入条形码',
      position: 'top'
    },
    padding: 0
  },
  {
    element: '#hamburger-queryClick2',
    popover: {
      title: '搜索查找',
      description: '点击右侧放大镜搜索(搜索文字或首字母都可以)',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-queryClick3',
    popover: {
      title: '选择库位',
      description: '点击进入库位选择',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-numNameL',
    popover: {
      title: '名称排序',
      description: '点击可以根据名称排序',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-NumberNameL',
    popover: {
      title: '数量排序',
      description: '点击可以根据数量排序',
      position: 'bottom'
    },
    padding: 0
  },

  {
    element: '#hamburger-allTopBo',
    popover: {
      title: '选择设备',
      description: '查看设备里的资源',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-tabTimes',
    popover: {
      title: '选择时间',
      description: '可查看已过期、1 天内过期、3 天内过期、7 天内过期的物资',
      position: 'bottom'
    },
    padding: 0
  },

  {
    element: '#hamburger-ViewDetails',
    popover: {
      title: '点击查看详情',
      description: '可以进行查看或编辑',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-EditDe',
    popover: {
      title: '修改物资',
      description: '修改当前的物资',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-revision',
    popover: {
      title: '编辑库位',
      description: '修改当前的库位[库位规则1-2-3(1为设备,2为货架,3为层)]',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-EditAdd',
    popover: {
      title: '添加库位',
      description: '对当前物资进行除了数量和库位外的复制[库位规则1-2-3(1为设备,2为货架,3为层)]',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-realQuantity',
    popover: {
      title: '盘点数量',
      description: '如果实际数量与数据不一致请修改数据，可以用+ -调整数字也可直接修改数字，修改\n' +
        '后点击确定',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-pushOpen',
    popover: {
      title: '打开库位',
      description: '打开当前的库位清点物资数量是否与显示的数量一致',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-ButtonPush',
    popover: {
      title: '确定数量',
      description: '点击确定本物资核实完毕',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-openTake',
    popover: {
      title: '打开',
      description: '打开库位并扫码取出物资',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-openDeposit',
    popover: {
      title: '打开',
      description: '打开库位并扫码存入物资',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-AddPersonnel',
    popover: {
      title: '添加人员',
      description: '点击添加HIS里面的人员（如果没有，请联系HIS管理人员）',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-HeadPersonnel',
    popover: {
      title: '人员',
      description: '点击切换人员，查看人员信息',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-Modifys',
    popover: {
      title: '编辑密码',
      description: '管理人员可以进行密码的修改',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-strikeDelete',
    popover: {
      title: '删除人员',
      description: '需要2次确认删除人员（请谨慎）',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-Equipment',
    popover: {
      title: '设备控制',
      description: '设置控制设备的权限',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-controlMenu',
    popover: {
      title: '菜单控制',
      description: '设置每个人的菜单列表限制权限',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-controlSubmenu',
    popover: {
      title: '子菜单控制',
      description: '设置每个人的菜单的子列表限制权限',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-SelectionModule',
    popover: {
      title: '选择模块',
      description: '选择模块',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-periodTime',
    popover: {
      title: '选择时间段',
      description: '',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '#hamburger-periodTimePersonnel',
    popover: {
      title: '选择人员',
      description: '',
      position: 'bottom'
    },
    padding: 0
  },

]

export default steps
