<template>
  <div class="url-picture-upload">
    <a-input-group compact>
      <a-input
        v-model:value="fileUrl"
        style="width: calc(100% - 120px)"
        placeholder="请输入图片url"
      />
      <a-button type="primary" style="width: 120px" :loading="loading" @click="handleUpload"
        >提交</a-button
      >
      <div class="img-wrapper">
        <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
      </div>

    </a-input-group>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { uploadPictureByUrlUsingPost, uploadPictureUsingPost } from '@/api/pictureController.ts'

interface Props {
  picture?: API.PictureVO
  onSuccess?: (picture: API.PictureVO) => void
}

const props = defineProps<Props>()
const fileUrl = ref<String>()

const loading = ref<boolean>(false)

/**
 * 上传
 * @param file
 */
const handleUpload = async () => {
  loading.value = true
  try {
    const params: API.PictureUploadRequest = { fileUrl: fileUrl.value }
    if (props.picture) {
      params.id = props.picture.id
    }

    props.picture ? { id: props.picture.id } : {}
    const res = await uploadPictureByUrlUsingPost(params)
    if (res.data.code === 0 && res.data.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props.onSuccess?.(res.data.data)
    } else {
      message.error('图片上传失败，' + res.data.message)
    }
  } catch (error) {
    message.error('图片上传失败')
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.url-picture-upload {
  margin-bottom: 16px;
}
.url-picture-upload img {
  max-width: 100%;
  max-height: 480px;
}
.url-picture-upload .img-wrapper {
  text-align: center;
  margin-top: 16px;
}
</style>
