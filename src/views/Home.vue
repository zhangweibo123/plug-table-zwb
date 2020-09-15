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
axios.defaults.headers.post['authorityToken'] =
  'f8e77c66-5569-43aa-867e-ddb154f1ddd1';
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
