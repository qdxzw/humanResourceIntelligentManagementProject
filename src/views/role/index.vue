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
        <el-table-column align="center" width="200" prop="state" label="启用" />
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作" />
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination layout="prev,pager,next" />
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
      roleList: [] // 角色列表
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { rows } = await getRoleList()
      this.roleList = rows // 赋值数据
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
