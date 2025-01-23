<template>
  <div id="homePage">
    <!-- 搜索 -->
    <div class="search-bar">
      <a-input-search
      v-model:value="searchParams.searchText"
      placeholder="从海量图片中搜索"
      enter-button="搜索"
      size="large"
      @search="doSearch"
    />
    </div>

    <!-- 分类和标签筛选 -->
    <a-tabs v-model:active-key="selectCategory" @change="doSearch">
      <a-tab-pane key="all" tab="全部" />
      <a-tab-pane  v-for="category in categoryList" :tab="category" :key="category"/>
    </a-tabs>
    <div class="tag-bar">
      <span style="margin-right: 8px">标签: </span>
      <a-space :size="[0, 8]" wrap>
        <a-checkable-tag
          v-for="(tag, index) in tagList"
          :key="tag"
          v-model:checked="selectTagList[index]"
          @change="doSearch"
        >
          {{ tag }}
        </a-checkable-tag>
      </a-space>
    </div>

    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :pagination="pagination"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item>
          <!-- 单张图片 -->
          <a-card hoverable>
            <template #cover>
              <img :alt="picture.name" :src="picture.url"
              style="height: 180px; object-fit: contain"
              />
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">
                    {{ picture.categories ?? '默认' }}
                  </a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { listPictureTagCategoryUsingGet, listPictureVoByPageUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

//定义数据
const dataList = ref<API.Picture>([])
const total = ref(0)
const loading = ref(true)
//搜索条件
const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  sortField: 'createTime',
  sortOrder: 'descend',
})
//获取数据
const fetchData = async () => {
  loading.value = true;
  //转换搜索参数
  const params = {
    ...searchParams,
    tags:[] as string,
  }
  if(selectCategory.value !== 'all'){
    params.category = selectCategory.value
  }
  selectTagList.value.forEach((useTag), index) => {
    if(useTag){
      params.tags?.push(tagList.value[index])
    }
  })
  const res = await listPictureVoByPageUsingPost({
    ...searchParams,
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取图片列表失败' + res.data.message)
  }
  loading.value = false;
}

//页面加载时获取数据,请求一次
onMounted(() => {
  fetchData()
})
//分页
const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    onChange: (page: number, pageSize: number) => {
      searchParams.current = page
      searchParams.pageSize = pageSize
    },
  }
})

//表格变化之后，重新获取数据
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

//搜索
const doSearch = () => {
  //重置搜索条件
  searchParams.current = 1
  fetchData()
}

//标签和分类列表
const categoryList = ref<string[]>([])
const selectCategory = ref<string[]>('all')
const tagList = ref<string[]>([])
const selectTagList = ref<boolean[] >([])


/**
 * 获取标签和分类选项
 */
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    tagList.value = (res.data.data.tagList ?? [])
    categoryList.value = (res.data.data.categoryList ?? [])
  } else {
    message.error('获取标签分类列表失败，' + res.data.message)
  }
}
onMounted(() => {
  getTagCategoryOptions()
})
</script>

<style scoped>
#homePage .search-bar {
  max-width: 480px;
  margin: 0 auto 16px;
}
#homePage .tag-bar{
  margin-bottom: 16px;
}
</style>
