<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true"
          >添加角色</el-button
        >
      </div>
      <!-- 放置table表格组件 -->
      <el-table :data="roleList" border>
        <!-- 放置列 -->
        <el-table-column align="center" width="200" prop="id" label="序号" />
        <el-table-column align="center" width="200" prop="name" label="角色">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.name"
              size="mini"
            />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200" prop="state" label="启用">
          <!-- 自定义列结构 -->
          <template v-slot="{ row }">
            <!-- 开 1  关 0 -->
            <el-switch
              v-if="row.isEdit"
              v-model="row.editRow.state"
              :active-value="1"
              :inactive-value="0"
            />
            <span v-else>
              {{
                row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无'
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述">
          <template v-slot="{ row }">
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.description"
              size="mini"
            />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnEditOk(row)"
                >确定</el-button
              >
              <el-button size="mini" @click="row.isEdit = false"
                >取消</el-button
              >
            </template>
            <!-- 非编辑状态 -->
            <template v-else
              ><el-button size="mini" type="text" @click="btnPermission(row.id)"
                >分配权限</el-button
              >
              <el-button size="mini" type="text" @click="btnEditRow(row)"
                >编辑</el-button
              >
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button
                  slot="reference"
                  style="margin-left: 10px"
                  size="mini"
                  type="text"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
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
    <!-- 放置新增角色弹层 -->
    <el-dialog
      title="新增角色"
      width="500px"
      :visible.sync="showDialog"
      @close="btnCancel"
    >
      <!-- 表单内容 -->
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" style="width: 300px" size="mini" />
        </el-form-item>
        <!-- 如果不需要校验，就不需要写prop属性 -->
        <!-- 重置表单数据，需要prop属性 -->
        <el-form-item label="启用" prop="state">
          <el-switch
            v-model="roleForm.state"
            :active-value="1"
            :inactive-value="0"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            :rows="3"
            style="width: 300px"
            size="mini"
          />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOk"
                >确认</el-button
              >
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放置权限弹层 -->
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <!-- 内容 -->
      <el-tree
        ref="permTree"
        check-strictly
        node-key="id"
        :data="permissionData"
        :props="{ label: 'name' }"
        show-checkbox
        default-expand-all
        :default-checked-keys="permIds"
      />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnPermissionOk"
            >确定</el-button
          >
          <el-button size="mini" @click="showPermissionDialog = false"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRoleList,
  addRole,
  updateRole,
  deleteRole,
  getRoleDetail,
  assignPrem
} from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Role',
  data () {
    return {
      roleList: [], // 角色列表
      showDialog: false, // 控制弹层显示隐藏
      // 将分页信息放到一个对象中
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0
      },
      roleForm: {
        name: '',
        state: 0,
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      showPermissionDialog: false, // 控制权限弹层的显隐
      permissionData: [], // 接收权限树数据
      currentRoleId: '',
      permIds: []
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
      // 针对每一行数据添加一个编辑标记
      this.roleList.forEach(item => {
        // item.isEdit = false // 添加一个属性 初始值为false
        // 数据响应式的问题 数据变化 视图更新
        // 添加的动态属性 不具备响应式特点
        // this.$set(目标对象，属性名称，初始值)可以针对目标对象 添加的属性 添加响应式
        this.$set(item, 'isEdit', false)
        // 初始化定义缓存数据
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    // 切换分页时，请求新的数据
    changePage (newPage) {
      this.pageParams.page = newPage // 赋值当前页码
      this.getRoleList()
    },
    btnOk () {
      this.$refs.roleForm.validate(async isOk => {
        if (isOk) {
          // 调用新增接口
          await addRole(this.roleForm)
          // 重新渲染页面并关闭弹层
          this.getRoleList()
          this.btnCancel()
          this.$message.success('添加成功')
        }
      })
    },
    btnCancel () {
      this.$refs.roleForm.resetFields() // 将数据重置
      this.showDialog = false
    },
    // 点击编辑行
    btnEditRow (row) {
      row.isEdit = true
      // 更新缓存数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOk (row) {
      // 检查必填
      if (row.editRow.name && row.editRow.description) {
        // 调用更新接口
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success('更新数据成功')
        // 更新显示数据 退出编辑状态
        // row.name=row.editRow.name //eslint的校验（误判）
        // Object.assign(target,source)
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        }) // 规避eslint的误判
      } else {
        this.$message.warning('角色和描述不能为空')
      }
    },
    // 点击了确定触发的
    async confirmDel (id) {
      await deleteRole(id) // 后端删除
      this.$message.success('删除数据成功')
      // 删除的如果是最后一个
      if (this.roleList.length === 1) this.pageParams.page--
      this.getRoleList()
    },
    // 分配权限
    async btnPermission (id) {
      this.currentRoleId = id
      const { permIds } = await getRoleDetail(id)
      this.permIds = permIds
      this.permissionData = transListToTreeData(await getPermissionList(), 0)
      this.showPermissionDialog = true
    },
    async btnPermissionOk () {
      await assignPrem({
        id: this.currentRoleId,
        permIds: this.$refs.permTree.getCheckedKeys()
      })
      this.$message.success('角色分配权限成功')
      this.showPermissionDialog = false
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
