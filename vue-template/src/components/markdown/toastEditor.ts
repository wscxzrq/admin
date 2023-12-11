// markdown 编辑器类型支持
import uploadApi from '@/api/uploadApi';
export default class {
  editor: toastui.Editor;
  isFullscreen: boolean = false; // 全屏状态
  constructor(el: string, initialValue: string, public height: string) {
    this.editor = new toastui.Editor({
      el: document.querySelector(el),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height,
      initialValue,
      toolbarItems: this.toolbar(),
    });
    this.ImageHook();
  }

  /**
   * 图片上传
   * 由于默认图片上传格式为 base64 所以需要先使用  removeHook 卸载默认上传钩子函数
   * 然后 addHook 重新注册钩子函数
   */
  private ImageHook() {
    this.editor.removeHook('addImageBlobHook');

    this.editor.addHook('addImageBlobHook', async (blob: any, callback: Function) => {
      const from = new FormData();
      from.append('file', blob, blob.name);
      const response = await uploadApi.uploadImage(from);
      callback(response.data.url, blob.name);
    });
  }

  /**
   * 自定义工具条
   * @returns 工具数组
   */
  private toolbar() {
    return [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      // Using Option: Customize the last button
      [
        {
          el: this.fullscreen(),
          command: 'fullscreen',
          tooltip: '全屏',
        },
      ],
    ];
  }

  /**
   * 全屏工具按钮
   */
  private fullscreen() {
    const button = document.createElement('button') as HTMLButtonElement;
    button.innerHTML = '全屏';
    button.style.margin = '0';

    button.addEventListener('click', () => {
      this.editor.setHeight('100vh');
      this.toggleFullscreen();
    });

    document.documentElement.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key == 'Escape' && this.isFullscreen) {
        this.toggleFullscreen();
      }
    });
    return button;
  }

  /**
   * 切换全屏状态与样式
   */
  private toggleFullscreen() {
    const ui = document.querySelector('.toastui-editor-defaultUI') as HTMLDivElement;
    ui.classList.toggle('fullscreen');
    this.isFullscreen = !this.isFullscreen;
    if (!this.isFullscreen) {
      this.editor.setHeight(this.height);
    }
    this.editor.focus();
  }
}
