// markdown 编辑器类型支持
export default class {
  editor: toastui.Editor;
  constructor(el: string, height: string, initialValue: string) {
    this.editor = new toastui.Editor({
      el: document.querySelector(el),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height,
      initialValue,
    });
  }
}
