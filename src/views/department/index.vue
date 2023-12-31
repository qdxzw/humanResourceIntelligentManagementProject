<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <!-- default-expand-all默认展开所有节点 -->
      <el-tree
        :expand-on-click-node="false"
        default-expand-all
        :data="depts"
        :props="defaultProps"
      >
        <!-- 节点结构 -->
        <!-- v-slot="{node,data}"只能作用在template -->
        <template v-slot="{ data }">
          <el-row
            style="width: 100%; height: 40px"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="10"
              ><span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型 -->
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单内容 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row></template
        >
      </el-tree>
    </div>
    <!-- 放置弹层内容 -->
    <!-- sync表示会接收子组件的事件 update:showDialog,值=>属性-->
    <!-- ref 可以获取dom实例对象 ref 也可以获取自定义组件的实例对象 -->
    <add-dept
      ref="addDept"
      :current-node-id="currentNodeId"
      :show-dialog.sync="showDialog"
      @updateDepartment="getDepartment"
    />
  </div>
</template>
<script>
import { getDepartment, delDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: { AddDept },
  data () {
    return {
      currentNodeId: null, // 存储当前点击的id
      depts: [], // 数据属性
      defaultProps: {
        label: 'name', // 要显示的字段的名字
        children: 'children' // 读取子节点的字段名
      },
      showDialog: false // 控制弹层的显示和隐藏
    }
  },
  created () {
    this.getDepartment() // 调用获取数据接口
  },
  methods: {
    async getDepartment () {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门的方法
    operateDept (type, id) {
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true
        this.currentNodeId = id
      } else if (type === 'edit') {
        // 编辑部门
        this.showDialog = true
        this.currentNodeId = id // 记录id 要用它获取数据
        // 更新props是异步动作,直接调用子组件的方法是同步方法
        // 所以这里要使用$this.$nextTick方法等数据都处理完，在执行方法
        // 要在子组件获取数据
        // 父组件调用子组件的方法来获取数据
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail() // this.$refs.addDept
        })
      } else {
        // 删除部门
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await delDepartment(id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getDepartment()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
  margin-right: 40px;
}
</style>
