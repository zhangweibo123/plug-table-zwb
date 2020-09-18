<template>
  <div class="select">
    <span :title="data.columnCn">
      {{ data.columnCn }}
    </span>
    <el-select v-model="data.condition" size="mini">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="data.value" size="mini" style="width:140px;margin:0px">
      <el-option
        v-for="item in data.selectValues"
        :key="item.key"
        :label="item.value"
        :value="item.key"
      >
      </el-option>
    </el-select>
    <i class="el-icon-error" @click="delItem"></i>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      options: [
        {
          value: '=',
          label: '='
        },
        {
          value: '<>',
          label: '<>'
        }
      ],
      value: '='
    };
  },
  props: ['data', 'index'],
  components: {},
  created() {},
  methods: {
    delItem() {
      this.$emit('delItem', this.index);
    }
  }
};
</script>

<style lang="less" scoped>
span {
  font-size: 12px;
  color: #333333;
  display: inline-block;
  overflow: hidden;
  width: 70px;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.select {
  padding: 10px 20px;
  width: 360px;
  float: left;
}
.el-select {
  width: 70px;
  margin: 0px 8px;
}
.el-input {
  width: 140px;
  margin-right: 4px;
}
.el-icon-error {
  vertical-align: middle;
  color: #f56c6c;
  cursor: pointer;
}
</style>
