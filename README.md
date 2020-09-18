# 非常好用的table插件。集成增删改查功能，集成翻页筛选等功能。

**您只需要引入组件，传必要的参数。就可以生成漂亮的表格。**
改组件基于elementUi 是它的再次封装。

## 效果图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200918152823385.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM4MzIzNjU4,size_16,color_FFFFFF,t_70#pic_center)


## 引入

```bash
npm install plug-table-zwb --save
```

## 引用

```bash
//main.js
import wbtable from 'plug-table-zwb';
Vue.use(wbtable);
```

## 使用

```bash
//组件引入
<wbtable
  ref="wbtable"      					//组件名称，方便调用组件内部方法
  :tableParameter="tableParameter"      //接口数据包括 url method 和 type
  :axios="$axios"                       //传入axios。
  :tableHeader="tableHeader"			//传入表格表头
  @goDetail="godetail"					//详情方法 （回调列信息）
  @openAddMod="openAddMod"				//新增按钮调用
  @openChangeMod="openChangeMod"		//修改按钮调用
></wbtable>
//传递增删改查接口数据
tableParameter: {
  getList: {
    url: '/systemServer/user/list',    //接口
    methods: 'post',				   //method
    show: true      				   //是否显示该功能
  },		
  add: {
    url: '/systemServer/user',
    methods: 'post',
    show: true
  },
  del: {
    url: '/systemServer/user',
    methods: 'delete',
    show: true
  },
  delMore: {
    url: '',
    methods: 'delete',
    show: false
  },
  searchById: {
    url: '/systemServer/user/',
    methods: 'get',
    show: false
  },
  change: {
    url: '/systemServer/user',
    methods: 'put',
    show: true
  },
  filterAllList: {
   url: '/deviceServer/filter/field/list',
     methods: 'get',
     show: true
   },
   saveFilter: {
     url: '/deviceServer/filter/getSaveFilter',
     methods: 'post',
     show: true
   },
   filterSaveList: {
     url: '/deviceServer/filter/getFilterList',
     methods: 'get',
     show: true
   },
   delFilter: {
     url: 'http://192.168.3.101:8030/deviceServer/filter',
     methods: 'delete',
     show: true
   }
},
//传递表头
tableHeader: [
  {
    label: '设备编号',
    prop: 'deviceNo',
    type: 'text'
  },
  {
    label: '设备名称',
    prop: 'deviceName',
    type: 'text'
  },
  {
    label: '设备状态',
    prop: 'deviceState',
    type: 'text'
  }
]

//组件内部axios方法调用
this.$refs.wbtable.add(提交数据);
this.$refs.wbtable.change(提交数据);
this.$refs.wbtable.getTableList（pageNo）
```