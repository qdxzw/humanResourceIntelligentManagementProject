<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom: 10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
        <!-- 树形组件 -->
        <!-- 数据、树形配置 -->
        <!-- node-key标识唯一性 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          :default-expand-all="true"
          :expand-on-click-node="false"
          :highlight-current="true"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini" @click="exportEmployee">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <el-avatar
                v-if="row.staffPhoto"
                :src="row.staffPhoto"
                :size="30"
              />
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column label="操作" width="280px">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
import { getEmployeeList, exportEmployee } from '@/api/employee'
import FileSaver from 'file-saver'
export default {
  name: 'Employee',
  data () {
    return {
      depts: [], // 组织数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      // 存储查询参数
      queryParams: {
        departmentId: null,
        page: 1, // 当前页码
        pagesize: 5, // 每页显示的条数
        keyword: ''
      },
      list: [], // 存储员工列表数据
      total: 0 // 记录员工的总数
    }
  },
  created () {
    this.getDepartment()
  },
  methods: {
    async getDepartment () {
      // 递归方法 将列表转化成树形
      this.depts = transListToTreeData(await getDepartment(), 0)
      // 获取首个节点并记录
      this.queryParams.departmentId = this.depts[0].id
      // 设置选中节点
      // 数组件渲染是异步是，等到更新完毕
      this.$nextTick(() => {
        // 此时意味着数渲染完毕
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      // 这个时候参数记录了id
      this.getEmployeeList()
    },
    // 切换节点
    selectNode (node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1 // 设置为第一页
      this.getEmployeeList()
    },
    // 获取员工列表的方法
    async getEmployeeList () {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    // 切换页码
    changePage (newPage) {
      this.queryParams.page = newPage // 赋值新页码
      this.getEmployeeList()
    },
    // 输入值内容改变时触发
    changeValue () {
      // 使用防抖节约资源
      clearTimeout(this.timer)
      // 页码设置第一页
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        // 查询员工
        this.getEmployeeList()
      }, 300)
    },
    // 导出员工的excel
    async exportEmployee () {
      // await exportEmployee()导出所有的员工接口
      // 使用npm包（file-saver），直接将blob文件下载到本地
      // FileSaver.saveAs(blob对象,文件名称)
      FileSaver.saveAs(await exportEmployee(), '员工信息表.xlsx') // 下载文件
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin: 10px;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04c9be;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>
