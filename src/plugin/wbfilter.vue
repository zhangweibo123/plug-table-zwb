<template>
  <div class="wbfilter">
    <div class="filterList">
      <div class="filterButton">
        <el-select
          v-model="searchList"
          size="mini"
          placeholder="请选择历史查询条件列表"
        >
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> -->
        </el-select>
        <el-button size="mini" @click="save">保存查询条件</el-button>
        <el-button size="mini" @click="filterSearchList" type="primary"
          >查询</el-button
        >
      </div>
      <div v-for="(item, index) in filterList" :key="index">
        <component
          :is="item.type"
          :data="item"
          :index="index"
          @delItem="delItem"
        ></component>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="新增筛选条件" :visible.sync="filterMod">
      <div>
        <el-tree
          :data="filterTree"
          show-checkbox
          default-expand-all
          node-key="column"
          ref="tree"
          @check="checkBox"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="filterMod = false">取 消</el-button>
        <el-button type="primary" @click="addFilterBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import String from './filterString.vue';
import Integer from './filterInteger.vue';
import Date from './filterDate.vue';
export default {
  name: 'wbfilter',
  data() {
    return {
      loading: true,
      filterMod: false,
      filterTree: [],
      filterList: [],
      filterItem: '',
      defaultProps: {
        children: 'childrenMenu',
        label: 'columnCn'
      },
      searchList: ''
    };
  },
  props: ['tableParameter', 'axios', 'tableHeader'],
  components: {
    String,
    Integer,
    Date
  },
  created() {
    this.getFilterAllList();
  },
  methods: {
    // 保存
    save() {
      console.log(this.filterList);
    },
    filterSearchList() {
      this.$parent.getTableList();
    },
    // 删除条件
    delItem(index) {
      this.filterList.splice(index, 1);
    },
    // 选中回调
    checkBox(data) {
      this.$refs.tree.setCheckedKeys([], false);
      this.$refs.tree.setCheckedKeys([data.column], false);
      this.filterItem = data;
    },
    // 筛选条件列表
    filterTreeMod() {
      this.filterItem = '';
      this.filterMod = true;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([], false);
      });
    },
    addFilterBtn() {
      this.filterList.push(this.filterItem);
      this.filterMod = false;
    },
    // 获取列表
    getFilterAllList() {
      this.axios({
        method: this.$parent.tableParameter.filterAllList?.methods,
        url: `${this.$parent.tableParameter.filterAllList?.url}?className=${this.$parent.tableParameter.filterAllList?.pageCode}`
      }).then(res => {
        if (res.data.code == '200') {
          this.filterTree = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.filterList {
  border: 1px solid #dddddd;
  clear: both;
  overflow: hidden;
  padding: 10px 0px;
  margin: 20px 0px;
  border-radius: 10px;
  > div {
    float: left;
  }
}
.filterButton {
  // border-bottom: 1px solid #dddddd;
  padding-bottom: 10px;
  clear: both;
  float: none !important;
  .el-select {
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 10px;
  }
}
</style>
