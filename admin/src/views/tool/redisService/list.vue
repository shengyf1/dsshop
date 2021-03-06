<template>
  <div class="app-container">
    <div class="tip">
      <p>部分Redis会存在删除不了的问题，可忽略！</p>
    </div>
    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="redis类型">
        <el-select v-model="listQuery.type" placeholder="类型" clearable>
          <el-option label="默认" value="1"/>
          <el-option label="数据库" value="2"/>
          <el-option label="队列" value="3"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        fixed="left"/>
      <el-table-column label="键名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" width="80px;">
        <template slot-scope="scope">
          <span>{{ scope.row.type_show }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小" align="center" width="200px;">
        <template slot-scope="scope">
          <span>{{ scope.row.size }}KB</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="small-padding fixed-width" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button v-permission="$store.jurisdiction.RedisServicesList" type="primary" size="mini" @click="handleUpdate(scope.row)">查看</el-button>
          <el-button v-permission="$store.jurisdiction.DeleteRedisServices" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div class="pagination-operation">
      <div class="operation">
        <el-button size="mini" @click="handleCheckAllChange">全选/反选</el-button>
        <el-button v-permission="$store.jurisdiction.DeleteRedisServices" size="mini" type="danger" @click="handleAllDelete()">删除</el-button>
      </div>
    </div>

    <!--查看-->
    <el-dialog :title="textMap" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <json-viewer
        :value="jsonData.data"
        :expand-depth="5"
        :copyable="copyable"
        theme="my-awesome-json-theme"
        boxed
        sort/>
    </el-dialog>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .my-awesome-json-theme {
    background: #2d2d2d;
    white-space: nowrap;
    color: #ccc;
    font-size: 14px;
    font-family: Consolas, Menlo, Courier, monospace;

    .jv-ellipsis {
      color: #999;
      background-color: #eee;
      display: inline-block;
      line-height: 0.9;
      font-size: 0.9em;
      padding: 0px 4px 2px 4px;
      border-radius: 3px;
      vertical-align: 2px;
      cursor: pointer;
      user-select: none;
    }
    .jv-button { color: #49b3ff }
    .jv-key { color: #ccc }
    .jv-item {
      &.jv-array { color: #ccc }
      &.jv-boolean { color: #fc1e70 }
      &.jv-function { color: #067bca }
      &.jv-number { color: #fc1e70 }
      &.jv-object { color: #ccc }
      &.jv-undefined { color: #e08331 }
      &.jv-string {
        color: #42b983;
        word-break: break-word;
        white-space: normal;
      }
    }
    .jv-code {
      .jv-toggle {
        &:before {
          padding: 0px 2px;
          border-radius: 2px;
        }
        &:hover {
          &:before {
            background: #eee;
          }
        }
      }
    }
  }
</style>

<script>
import { getList, show, setDelete } from '@/api/redis'
import { getToken } from '@/utils/auth'
import JsonViewer from 'vue-json-viewer'
export default {
  name: 'RedisServicesList',
  components: { JsonViewer },
  data() {
    return {
      actionurl: process.env.BASE_API + 'uploadPictures',
      imgHeaders: {
        Authorization: getToken('token_type') + ' ' + getToken('access_token')
      },
      dialogVisible: false,
      ruleForm: [],
      checkAll: false,
      tableKey: 0,
      list: null,
      total: 0,
      textMap: '查看',
      copyable: {
        copyText: '复制',
        copiedText: '复制中'
      },
      imgData: {
        type: 1,
        size: 1024 * 500
      },
      imgProgressPercent: 0,
      loading: false,
      listLoading: false,
      imgProgress: false,
      dialogStatus: '',
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
        activeIndex: '1'
      },
      temp: {},
      jsonData: {
        data: {}
      },
      rules: {
        name: [
          { required: true, message: '请输入场景名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择场景类型', trigger: 'change' }
        ],
        contents: [
          { required: true, message: '请输入场景用例', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      } else if (prop === 'time') {
        this.sortByTIME(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleSelect(key, keyPath) {
      this.listQuery.activeIndex = key
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        state: 0,
        sort: '5',
        img: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) { // 查看
      this.temp = null
      this.temp = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      show(row.name, row).then(response => {
        this.jsonData = response.data
        this.textMap = row.name
      })
    },
    handleCheckAllChange() {
      this.$refs.multipleTable.toggleAllSelection()
    },
    handleSelectionChange(val) { // 设置全选/全不选数据
      this.multipleSelection = val
    },
    handleDelete(row) { // 删除
      var title = '是否确认删除该内容?'
      var win = '删除成功'
      this.$confirm(title, this.$t('hint.hint'), {
        confirmButtonText: this.$t('usuel.confirm'),
        cancelButtonText: this.$t('usuel.cancel'),
        type: 'warning'
      }).then(() => {
        setDelete(row.name, row).then(() => {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: this.$t('hint.succeed'),
            message: win,
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {
      })
    },
    handleAllDelete() { // 批量删除
      var title = '是否确认批量删除内容?'
      var win = '删除成功'
      this.$confirm(title, this.$t('hint.hint'), {
        confirmButtonText: this.$t('usuel.confirm'),
        cancelButtonText: this.$t('usuel.cancel'),
        type: 'warning'
      }).then(() => {
        setDelete(1, this.multipleSelection).then(() => {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: this.$t('hint.succeed'),
            message: win,
            type: 'success',
            duration: 2000
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>
