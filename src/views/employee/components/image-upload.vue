<template>
  <!-- （自动上传）action是上传地址 人资项目不需要 人资项目（手动上传） -->
  <!-- show-file-list不展示列表 -->
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
  >
    <img v-if="value" :src="value" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 检查函数 判断文件的类型还有大小 return true(继续上传)/false(停止上传)
    beforeAvatarUpload (file) {
      const isJPG = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp'
      ].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    // 选择图片上传
    uploadImage (params) {
      console.log(params.file)
      // 完成cos对象的初始化
      const cos = new COS({
        SecretId: 'AKIDKcpeOzT1kNtXJ40slgYM3Xr6A6xeP8nM',
        SecretKey: 'ZzFOOG2tpX1HMEuOkQGyY7Zt8VpHoHi6'
      })
      cos.putObject(
        {
          Bucket: 'intelligentmanagement-1306913843', // 存储桶名称
          Region: 'ap-nanjing', // 地域名称
          Key: params.file.name, // 文件名称
          StorageClass: 'STANDARD', // 固定值
          Body: params.file // 文件对象
        },
        (err, data) => {
          if (data.statusCode === 200 && data.Location) {
            // 拿到了腾讯会返回的地址
            // 通过input自定义事件将地址传出去
            this.$emit('input', 'http://' + data.Location) // 将地址返回了
          } else {
            this.$message.error(err.message) // 上传失败提示消息
          }
        }
      )
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
