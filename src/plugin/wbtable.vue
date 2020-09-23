<template>
  <div class="zwbTable">
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="openAddMod"
      size="small"
      v-if="tableParameter.add && tableParameter.add.show"
      >新增</el-button
    >
    <el-button
      type="danger"
      icon="el-icon-delete"
      size="small"
      v-if="tableParameter.delMore && tableParameter.delMore.show"
      @click="delMoreRow"
      >批量删除</el-button
    >
    <el-button
      icon="el-icon-search"
      v-show="tableParameter.filterAllList && tableParameter.filterAllList.show"
      size="small"
      @click="filterMod"
      >新增筛选条件</el-button
    >
    <wbfilter
      v-show="tableParameter.filterAllList && tableParameter.filterAllList.show"
      ref="wbfilter"
      :axios="axios"
    ></wbfilter>
    <div class="mytable">
      <el-table
        v-loading="loading"
        :data="tableList"
        size="small"
        stripe
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'childrenMenu' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="tableParameter.delMore && tableParameter.delMore.show"
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column
          v-if="
            tableParameter.searchById.show ||
              tableParameter.change.show ||
              tableParameter.del.show
          "
          fixed="right"
          label="操作"
          width="250"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-if="tableParameter.searchById && tableParameter.searchById.show"
              @click="getDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              v-if="tableParameter.change && tableParameter.change.show"
              @click="openChangeMod(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              v-if="tableParameter.del && tableParameter.del.show"
              type="danger"
              @click="delRow(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              v-if="
                tableParameter.userDefinedBtn &&
                  tableParameter.userDefinedBtn.show
              "
              type="danger"
              @click="userDefinedBtn(scope.$index, scope.row)"
              >{{ tableParameter.userDefinedBtn.label }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="extCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import wbfilter from './wbfilter.vue';
export default {
  name: 'wbtable',
  data() {
    return {
      tableList: [],
      extCount: 0,
      pageSize: Number(window.localStorage.getItem('pageSize')) || 5,
      pageNo: 0,
      checkouBoxRow: [],
      currentPage: 1,
      loading: true
    };
  },
  props: ['tableParameter', 'axios', 'tableHeader'],
  components: {
    wbfilter: wbfilter
  },
  created() {},
  mounted() {
    this.getTableList();
  },
  methods: {
    filterMod() {
      this.$refs.wbfilter.filterTreeMod();
    },
    // 获取列表
    getTableList(pageNo) {
      this.loading = true;
      if (!this.tableParameter.getList?.url) return;
      this.axios({
        method: this.tableParameter.getList?.methods || 'post',
        url: `${this.tableParameter.getList?.url}` || '/xmlhttp/',
        data: {
          pageSize: this.pageSize,
          pageNo: pageNo || this.pageNo,
          fieldInfoResponses: this.$refs.wbfilter.filterList,
          className: this.tableParameter.filterAllList?.pageCode
        }
      }).then(res => {
        if (res.data.code == '200') {
          this.loading = false;
          this.tableList = res.data.data;
          this.extCount = res.data.extCount;
        }
      });
    },
    userDefinedBtn(index, row) {
      console.log(index);
      this.$emit('userDefined', row);
    },
    // checkbox多选列
    handleSelectionChange(val) {
      this.checkouBoxRow = val;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      window.localStorage.setItem('pageSize', val);
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.pageNo = val - 1;
      this.getTableList(this.pageNo);
    },
    // 删除单个数据
    delRow(index, row) {
      console.log(index);
      this.$confirm('此操作将永久该条删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delRowAxios(row);
        })
        .catch(() => {
          console.log(2);
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    delRowAxios(row) {
      if (!this.$parent.tableParameter.del?.url) return;
      this.axios({
        method: this.tableParameter.del?.methods || 'get',
        url: `${this.tableParameter.del?.url}/${row.id}` || '/xmlhttp/',
        showMsg: true
      }).then(res => {
        if (res.data.code == '200') {
          this.getTableList(this.pageNo);
        }
      });
    },
    // 删除多条数据
    delMoreRow() {
      if (this.checkouBoxRow.length == 0) {
        this.$message.error('请勾选要删除的信息');
        return;
      }
      this.$confirm('此操作将永久删除所选信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delMoreRowAxios();
        })
        .catch(() => {
          console.log(2);
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    delMoreRowAxios() {
      let rowIds = this.checkouBoxRow.map(item => {
        return item.id;
      });
      if (!this.$parent.tableParameter.delMore?.url) return;
      this.axios({
        method: this.tableParameter.delMore?.methods || 'get',
        url:
          `${this.tableParameter.delMore?.url}/?ids=${rowIds}` || '/xmlhttp/',
        showMsg: true
      }).then(res => {
        if (res.data.code == '200') {
          this.getTableList(this.pageNo);
        }
      });
    },
    // 查看详情
    getDetail(index, row) {
      console.log(index);
      if (!this.$parent.tableParameter.searchById?.url) return;
      this.axios({
        method: this.tableParameter.searchById?.methods || 'get',
        url: `${this.tableParameter.searchById?.url}/${row.id}` || '/xmlhttp/'
      }).then(res => {
        if (res.data.code == '200') {
          this.$emit('goDetail', res.data.data);
        }
      });
    },
    // 新增设备
    openAddMod() {
      this.$emit('openAddMod');
    },
    openChangeMod(index, row) {
      this.$emit('openChangeMod', row);
    },
    add(data) {
      if (!this.$parent.tableParameter.add?.url) return;
      this.axios({
        method: this.tableParameter.add?.methods || 'post',
        url: `${this.tableParameter.add?.url}` || '/xmlhttp/',
        data: data,
        showMsg: true
      }).then(res => {
        if (res.data.code == '200') {
          this.getTableList();
          return 'true';
        }
      });
    },
    change(data) {
      if (!this.$parent.tableParameter.change?.url) return;
      this.axios({
        method: this.tableParameter.change?.methods || 'post',
        url: `${this.tableParameter.change?.url}` || '/xmlhttp/',
        data: data,
        showMsg: true
      }).then(res => {
        if (res.data.code == '200') {
          this.getTableList();
          return true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  float: right !important;
  clear: both;
  margin-top: 15px;
}
.mytable {
  margin-top: 10px;
  border: 1px solid #ebeef5;
  border-bottom: 0px;
  .el-button--mini,
  .el-button--mini.is-round {
    padding: 4px 10px;
    font-size: 10px;
  }
}
.el-pagination {
  margin-top: 15px;
}
</style>
