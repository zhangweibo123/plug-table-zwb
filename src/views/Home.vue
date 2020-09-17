<template>
  <div class="home">
    <wbtable
      ref="zwbtable"
      :tableParameter="tableParameter"
      :axios="axios"
      :tableHeader="tableHeader"
      @goDetail="godetail"
    ></wbtable>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers['authorityToken'] =
  'b7419ee0-22c6-4174-9985-f7539e2db55b';
export default {
  name: 'Home',
  data() {
    return {
      tableParameter: {
        getList: {
          url: 'http://101.132.242.183:8030/deviceServer/device/getDeviceList',
          methods: 'post',
          show: true
        },
        add: {
          url: 'http://101.132.242.183:8030/deviceServer/device/add',
          methods: 'post',
          show: true
        },
        del: {
          url: 'http://101.132.242.183:8030/deviceServer/device/delById',
          methods: 'delete',
          show: true
        },
        delMore: {
          url: 'http://101.132.242.183:8030/deviceServer/device/delByIds',
          methods: 'delete',
          show: true
        },
        searchById: {
          url: 'http://101.132.242.183:8030/deviceServer/device/getDeviceById',
          methods: 'get',
          show: true
        },
        change: {
          url: 'http://101.132.242.183:8030/deviceServer/device/update',
          methods: 'put',
          show: true
        },
        filterAllList: {
          url: 'http://101.132.242.183:8030/deviceServer/filter/field/list',
          methods: 'get',
          pageCode: 'com.innovent.entity.device.entity.DeviceEntity',
          show: true
        },
        saveFilter: {
          url: 'http://101.132.242.183:8030/deviceServer/filter/getSaveFilter',
          methods: 'post',
          pageCode: 'com.innovent.entity.device.entity.DeviceEntity',
          show: true
        },
        filterSaveList: {
          url: 'http://101.132.242.183:8030/deviceServer/filter/getSaveFilter',
          methods: 'get',
          pageCode: 'com.innovent.entity.device.entity.DeviceEntity',
          show: true
        }
      },
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
        },
        {
          label: '设备地址',
          prop: 'address',
          type: 'text'
        },
        {
          label: '版本',
          prop: 'firmwareVersion',
          type: 'text'
        },
        {
          label: '设备类型',
          prop: 'deviceType',
          type: 'text'
        }
      ],
      axios: axios
    };
  },
  components: {},
  created() {},
  methods: {
    godetail() {}
  }
};
</script>
