<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { h } from 'vue'
import { ElNotification } from 'element-plus'

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  computed,
  getCurrentInstance,
  defineProps,
  toRef,
} from 'vue'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { useRoute, useRouter } from 'vue-router'

export default {
  components: { Editor, Toolbar },
  props: {
    id: Number,
  },
  setup(props, content) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const { proxy } = getCurrentInstance()
    // 内容 HTML
    const valueHtml = ref('')

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = editor => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // const route = useRoute()

    // const id = route.params.id

    const router = useRouter()

    const saveAction = async () => {
      // console.log(valueHtml.value)
      const { code } = await proxy.$fetch('/api/blogs/editArticle', {
        method: 'POST',
        data: {
          content: encodeURIComponent(valueHtml.value),
          id: curBlogId.value,
        },
      })

      if (code === 1) {
        ElNotification({
          title: '编辑成功',
          message: h('i', { style: 'color: teal' }, '数据编辑成功'),
          type: 'success',
        })
        router.push('/blogs/list')
      } else {
        ElNotification({
          title: '编辑失败',
          message: h('i', { style: 'color: teal' }, '数据编辑失败'),
          type: 'error',
        })
      }
    }

    const curBlogId = toRef(props, 'id')
    // console.log(curBlogId.value)

    async function getArticle() {
      console.log(curBlogId.value)
      const { data, code } = await proxy.$fetch('/api/blogs/getArticle', {
        params: {
          id: curBlogId.value,
        },
      })
      if (code === 1) {
        const content = decodeURIComponent(data.content)

        valueHtml.value = content == 'null' ? '' : content
      }
    }

    onMounted(() => {
      getArticle()
    })

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      saveAction,
      curBlogId,
    }
  },
}
</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />

    <button @click="saveAction">保存</button>
  </div>
</template>