<template>
  <!-- element-ui级联组件 -->
  <el-cascader
    :value="value"
    separator="-"
    :props="props"
    :options="treeData"
    size="mini"
    @change="changeValue"
  />
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
export default {
  props: {
    value: {
      type: Number, // 存储的是部门的id
      default: null
    }
  },
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
    },
    changeValue (list) {
      // 取到数组的最后一个值
      if (list.length > 0) {
        // 将最后一位的id取出来 传出去
        this.$emit('input', list[list.length - 1])
      } else {
        // 如果长度为0 说明值为空
        this.$emit('input', null)
      }
    }
  }
}
</script>
