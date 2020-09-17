<template>
  <div class="string">
    <span :title="data.columnCn">
      {{ data.columnCn }}
    </span>
    <el-select v-model="data.condition" de size="mini">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input
      size="mini"
      v-model="data.value"
      placeholder="请输入内容"
    ></el-input>
    <i class="el-icon-error" @click="delItem"></i>
  </div>
</template>

<script>
export default {
  name: 'String',
  data() {
    return {
      input: '',
      options: [
        {
          value: '=',
          label: '='
        },
        {
          value: '<>',
          label: '<>'
        },
        {
          value: 'like',
          label: '包含'
        },
        {
          value: 'not like',
          label: '不包含'
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
.string {
  padding: 10px 20px;
  width: 320px;
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
