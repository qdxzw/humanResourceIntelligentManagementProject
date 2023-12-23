<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>
      <!-- 放置table表格组件 -->
      <el-table :data="roleList">
        <!-- 放置列 -->
        <el-table-column align="center" width="200" prop="name" label="角色" />
        <el-table-column align="center" width="200" prop="state" label="启用">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <span>
              {{
                row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无'
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev,pager,next"
          @current-change="changePage"
        />
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data () {
    return {
      roleList: [], // 角色列表
      // 将分页信息放到一个对象中
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { rows, total } = await getRoleList(this.pageParams)
      this.roleList = rows // 赋值数据
      this.pageParams.total = total
    },
    // 切换分页时，请求新的数据
    changePage (newPage) {
      this.pageParams.page = newPage // 赋值当前页码
      this.getRoleList()
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
