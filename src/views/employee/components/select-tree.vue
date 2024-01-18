<template>
  <!-- element-ui级联组件 -->
  <el-cascader separator="-" :props="props" :options="treeData" size="mini" />
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
export default {
  data () {
    return {
      treeData: [], // 赋值给级联组件的options
      props: {
        label: 'name', // 要展示的字段
        value: 'id' // 要存储的字段
      }
    }
  },
  created () {
    this.getDepartment()
  },
  methods: {
    async getDepartment () {
      // 将组织架构的数据转化为树形赋值给treeData
      this.treeData = transListToTreeData(await getDepartment(), 0)
    }
  }
}
</script>
