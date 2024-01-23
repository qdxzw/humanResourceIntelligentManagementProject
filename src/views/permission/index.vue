<template>
  <div class="container">
    <div class="app-container">
      <el-button
        class="btn-add"
        type="primary"
        size="mini"
        @click="showDialog = true"
        >添加权限</el-button
      >
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              v-if="row.type === 1"
              size="mini"
              type="text"
              @click="addPermissionSecond(row.id)"
              >添加</el-button
            >
            <el-button type="text" size="mini" @click="editPermission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addPermission
      :son-id="id"
      :show-dialog.sync="showDialog"
      :pid="fatherId"
      @updatePermission="getPermissionList"
      @clearId="clearId"
    />
  </div>
</template>
<script>
import { getPermissionList, delPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
import addPermission from './components/add-permission.vue'
export default {
  name: 'Permission',
  components: { addPermission },
  data () {
    return {
      list: [],
      showDialog: false, // 控制弹层的显隐
      fatherId: null, // 传递父节点的id给子组件用于增加二级权限点
      id: null // 传递父节点的id给子组件用于编辑权限点
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList () {
      this.list = transListToTreeData(await getPermissionList(), 0)
    },
    // 删除权限点
    delPermission (id) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delPermission(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPermissionList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 增加二级权限点
    addPermissionSecond (id) {
      this.showDialog = true
      this.fatherId = id
    },
    // 编辑权限点
    editPermission (id) {
      this.showDialog = true
      this.id = id
    },
    clearId () {
      this.id = null
    }
  }
}
</script>
<style>
.btn-add {
  margin: 10px;
}
</style>
