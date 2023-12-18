<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名字" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="2-10个字符"
          style="width: 80%"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="2-10个字符"
          style="width: 80%"
          size="mini"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select
          v-model="formData.managerId"
          placeholder="请选择负责人"
          style="width: 80%"
          size="mini"
        >
          <!-- 下拉选项 循环负责人数据 label表示显示的字段 value表示存储的字段-->
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          placeholder="1-100个字符"
          type="textarea"
          :row="4"
          style="width: 80%"
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
import { getDepartment, getManagerList, addDepartment } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      managerList: [],
      formData: {
        code: '', // 部门编managerList
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '部门名称的长度为2-10个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            // 自定义校验模式
            validator: async (rule, value, callback) => {
              // value就是输入的编码
              const result = await getDepartment()
              // result数组中是否存在value值
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ], // 部门名称
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '部门编码的长度为2-10个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            // 自定义校验模式
            validator: async (rule, value, callback) => {
              // value就是输入的编码
              const result = await getDepartment()
              // result数组中是否存在value值
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ], // 部门编码
        introduce: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '部门介绍的长度为1-100个字符',
            trigger: 'blur'
          }
        ], // 部门介绍
        managerId: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' }
        ] // 部门负责人名字
      }
    }
  },
  created () {
    this.getManagerList()
  },
  methods: {
    close () {
      // 修改父组件的值，子传父
      // .sync会自动监听update:showDialog事件
      this.$refs.addDept.resetFields() // 重置表单
      this.$emit('update:showDialog', false)
    },
    async getManagerList () {
      this.managerList = await getManagerList()
    },
    btnOk () {
      this.$refs.addDept.validate(async isOk => {
        if (isOk) {
          await addDepartment({
            ...this.formData,
            pid: this.currentNodeId
          })
          // 通知父组件更新
          this.$emit('updateDepartment')
          // 提示信息
          this.$message.success('新增部门成功')
          this.close()
        }
      })
    }
  }
}
</script>

<style></style>
