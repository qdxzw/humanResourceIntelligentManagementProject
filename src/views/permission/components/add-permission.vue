<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input
          v-model="formData.description"
          style="width: 80%"
          size="mini"
        />
      </el-form-item>
      <!-- 如果不需要校验，就不需要写prop属性 -->
      <!-- 重置表单数据，需要prop属性 -->
      <el-form-item label="启用" prop="enVisible">
        <el-switch
          v-model="formData.enVisible"
          :active-value="1"
          :inactive-value="0"
          size="mini"
        />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="btnOk"
              >确定</el-button
            >
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  addPermission,
  getPermissionDetail,
  editPermission
} from '@/api/permission'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    pid: {
      // 获取主组件传递的id，根据这个id进行第二级权限的添加
      type: Number,
      default: null
    },
    sonId: {
      // 获取主组件传递的id，根据这个id进行权限的编辑
      type: Number,
      default: null
    }
  },
  data () {
    return {
      list: [],
      formData: {
        name: '', // 权限点名字
        code: '', // 权限点标识
        description: '', // 权限点描述
        enVisible: '', // 权限点开启状态
        type: null, // 权限点类型
        pid: null // 权限点父级id
      },
      rules: {
        name: [
          { required: true, message: '权限点名字不能为空', trigger: 'blur' }
        ], // 权限点名字
        code: [
          { required: true, message: '权限点标识不能为空', trigger: 'blur' }
        ] // 权限点标识
      }
    }
  },
  computed: {
    // 标题不是表单所以不能绑定v-model事件，使用计算属性进行更新
    showTitle () {
      return this.sonId ? '编辑权限点' : '新增权限点'
    }
  },
  watch: {
    sonId: function () {
      this.getPermissionDetail()
    }
  },
  methods: {
    close () {
      // 修改父组件的值，子传父
      // .sync会自动监听update:showDialog事件
      // resetFields只能重置在模板中绑定的数据
      this.formData = {
        name: '', // 权限点名字
        code: '', // 权限点标识
        description: '', // 权限点描述
        enVisible: '0', // 权限点开启状态
        type: null, // 权限点类型
        pid: null // 权限点父级id
      }
      this.$refs.addDept.resetFields() // 重置表单
      this.$emit('clearId')
      this.$emit('update:showDialog', false)
    },
    btnOk () {
      this.$refs.addDept.validate(async isOk => {
        if (isOk) {
          let msg = '新增'
          if (this.sonId == null) {
            // 如果父组件传id回来了，应该是二级组件
            if (this.pid != null) {
              this.formData.pid = this.pid
            }
            // 判断是否是一级添加
            if (this.formData.pid == null) {
              this.formData.type = 1
              this.formData.pid = 0
              await addPermission(this.formData)
              console.log('一级添加')
            } else {
              this.formData.type = 2
              await addPermission(this.formData)
              console.log('二级添加')
            }
          } else {
            msg = '修改'
            await editPermission(this.formData)
          }
          // 通知父组件更新
          this.$emit('updatePermission')
          // 提示信息
          this.$message.success(`${msg}权限点成功`)
          this.close()
        }
      })
    },
    async getPermissionDetail () {
      if (this.sonId != null) {
        this.formData = await getPermissionDetail(this.sonId)
      }
    } // 获取权限点的详情
  }
}
</script>

<style></style>
