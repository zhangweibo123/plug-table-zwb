<template>
  <div class="filterDate">
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
    <el-date-picker
      v-model="data.value"
      type="datetime"
      size="mini"
      placeholder="选择日期时间"
      @change="dataFormate"
    >
    </el-date-picker>
    <i class="el-icon-error" @click="delItem"></i>
  </div>
</template>

<script>
export default {
  name: 'filterDate',
  data() {
    return {
      options: [
        {
          value: '=',
          label: '等于'
        },
        {
          value: '<>',
          label: '不等于'
        },
        {
          value: '>=',
          label: '大于等于'
        },
        {
          value: '<=',
          label: '小于等于'
        }
      ]
    };
  },
  props: ['data', 'index'],
  components: {},
  created() {},
  methods: {
    dataFormate(val) {
      console.log(val);
      // let data = val.replace('z', ' ');
      // this.data.value = data;
    },
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
.filterDate {
  padding: 10px 20px;
  width: 360px;
  float: left;
}
.el-select {
  width: 70px;
  margin: 0px 8px;
}
.el-date-editor {
  width: 140px;
  margin-right: 4px;
}
.el-icon-error {
  vertical-align: middle;
  color: #f56c6c;
  cursor: pointer;
}
</style>
