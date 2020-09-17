<template>
  <div class="filterDate">
    <span :title="data.columnCn">
      {{ data.columnCn }}
    </span>
    <el-date-picker
      v-model="data.condition"
      size="mini"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
    >
    </el-date-picker>
    <i class="el-icon-error" @click="delItem"></i>
  </div>
</template>

<script>
export default {
  name: 'filterDate',
  data() {
    return {};
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
  width: 200px;
  margin-right: 4px;
}
.el-icon-error {
  vertical-align: middle;
  color: #f56c6c;
  cursor: pointer;
}
</style>
