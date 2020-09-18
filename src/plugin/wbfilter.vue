<template>
  <div class="wbfilter">
    <div class="filterList">
      <div class="filterButton">
        <el-select
          v-model="searchList"
          size="mini"
          placeholder="请选择历史查询条件列表"
          @change="checkfilter"
        >
          <el-option
            v-for="item in filterSaveList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.name }}</span>
            <span
              @click.stop="delFilter(item.id)"
              class="el-icon-error"
              style="float: right; color: #8492a6; font-size: 13px;color:#F56C6C;line-height: 31px;"
            ></span>
          </el-option>
        </el-select>
        <div
          style="margin-top:15px;display: inline-block;width: 38%;text-align:right;float:right;padding-right:20px"
        >
          <el-button
            size="mini"
            @click="
              filterNameMod = true;
              filterName = '';
            "
            >保存查询条件</el-button
          >
          <el-button size="mini" @click="filterSearchList" type="primary"
            >查询</el-button
          >
        </div>
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
    <el-dialog title="输入筛选器名称" :visible.sync="filterNameMod">
      <div>
        <el-input type="text" placeholder="输入名称" v-model="filterName" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="filterNameMod = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!Boolean(filterName.length)"
          @click="saveFilter"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import String from './filterString.vue';
import Integer from './filterInteger.vue';
import Date from './filterDate.vue';
import Select from './filterSelect.vue';
export default {
  name: 'wbfilter',
  data() {
    return {
      loading: true,
      filterMod: false,
      filterNameMod: false,
      filterName: '',
      filterTree: [],
      filterList: [],
      filterSaveList: [],
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
    Date,
    Select
  },
  created() {
    this.getFilterAllList();
    this.getSaveFilterList();
  },
  methods: {
    // 删除行信息
    delFilter(id) {
      this.axios({
        method: this.$parent.tableParameter.delFilter?.methods,
        url: `${this.$parent.tableParameter.delFilter?.url}/?id=${id}`,
        showMag: true
      }).then(res => {
        if (res.data.code == '200') {
          this.getSaveFilterList();
        }
      });
    },
    // 选择过滤器
    checkfilter(id) {
      this.filterSaveList.forEach(item => {
        if (id == item.id) {
          this.filterList = JSON.parse(JSON.stringify(item.fieldInfoResponses));
        }
      });
    },
    // 获取筛选下拉框的列表
    getSaveFilterList() {
      this.axios({
        method: this.$parent.tableParameter.filterSaveList?.methods,
        url: `${this.$parent.tableParameter.filterSaveList?.url}?className=${this.$parent.tableParameter.saveFilter?.pageCode}`,
        showMag: true
      }).then(res => {
        if (res.data.code == '200') {
          this.filterSaveList = res.data.data;
        }
      });
    },
    // 保存
    saveFilter() {
      this.axios({
        method: this.$parent.tableParameter.saveFilter?.methods,
        url: `${this.$parent.tableParameter.saveFilter?.url}/?name=${this.filterName}&className=${this.$parent.tableParameter.saveFilter?.pageCode}&id=${this.searchList}`,
        showMag: true,
        data: this.filterList
      }).then(res => {
        if (res.data.code == '200') {
          this.filterNameMod = false;
          this.getSaveFilterList();
        }
      });
    },
    // 查询按钮
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
      this.filterList.push(JSON.parse(JSON.stringify(this.filterItem)));
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
