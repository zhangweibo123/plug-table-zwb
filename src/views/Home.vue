<template>
  <div class="home">
    <wbtable
      ref="zwbtable"
      :tableParameter="tableParameter"
      :axios="axios"
      :tableHeader="tableHeader"
      @goDetail="godetail"
      @userDefined="userDefined"
    ></wbtable>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers['authorityToken'] =
  '36e7c6aa-2359-4b47-84d9-98ad8c98171d';
export default {
  name: 'Home',
  data() {
    return {
      tableParameter: {
        // getList: {
        //   url: `${process.env.VUE_APP_API_DEV}/systemServer/menu/list/1`,
        //   methods: 'get',
        //   show: true
        // },
        getList: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/device/getDeviceList`,
          methods: 'post',
          show: true
        },
        add: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/device/add`,
          methods: 'post',
          show: true
        },
        del: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/device/delById`,
          methods: 'delete',
          show: true
        },
        delMore: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/device/delByIds`,
          methods: 'delete',
          show: true
        },
        searchById: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/device/getDeviceById`,
          methods: 'get',
          show: true
        },
        change: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/device/update`,
          methods: 'put',
          show: true
        },
        userDefinedBtn: {
          show: true,
          label: '自定义按钮'
        },
        filterAllList: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/filter/field/list`,
          methods: 'get',
          pageCode: 'com.innovent.entity.device.entity.DeviceEntity',
          show: true
        },
        saveFilter: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/filter/getSaveFilter`,
          methods: 'post',
          pageCode: 'com.innovent.entity.device.entity.DeviceEntity',
          show: true
        },
        filterSaveList: {
          url: `${process.env.VUE_APP_API_DEV}/deviceServer/filter/getFilterList`,
          methods: 'get',
          pageCode: 'com.innovent.entity.device.entity.DeviceEntity',
          show: true
        }
      },
      tableHeader: [
        {
          label: '菜单名称',
          prop: 'menuName',
          type: 'text'
        },
        {
          label: '菜单代码',
          prop: 'menuCode',
          type: 'text'
        },
        {
          label: '父菜单',
          prop: 'parentMenu',
          type: 'text'
        },
        {
          label: '菜单id',
          prop: 'id',
          type: 'text'
        },
        {
          label: '菜单按钮',
          prop: 'buttonList',
          type: 'text'
        }
      ],
      axios: axios
    };
  },
  components: {},
  created() {},
  methods: {
    godetail() {},
    userDefined(val) {
      console.log(val)
    }
  }
};
</script>
