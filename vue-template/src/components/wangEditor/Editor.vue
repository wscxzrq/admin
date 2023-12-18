<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor :style="{height:props.height + 'px'}" style="overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>
<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { ApiEnum } from '@/enum/ApiENum';

  interface IProps {
    /**
     * 编辑器高度
     */
    height?: number;
    /**
     * 编辑器内容
     */
    modelValue: string;
  }
  const mode = ref('default');
  const props = withDefaults(defineProps<IProps>(), {
    height: 1000,
    modelValue: '',
  });
  const emit = defineEmits(['update:modelValue']);
  // 内容 HTML
  const valueHtml = ref(props.modelValue);

  /**
   * 富文本改变函数
   */
  const handleChange = (_editor: string) => {
    emit('update:modelValue', valueHtml.value);
  };

  // 编辑器配置项
  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        server: ApiEnum.UPLOAD_IMAGE_URL,
      },
    },
  };

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  const toolbarConfig = {};

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
</script>    