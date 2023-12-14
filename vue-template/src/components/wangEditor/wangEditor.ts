import wangEditor from 'wangeditor';
export default class {
  editor: wangEditor;
  constructor(el: string, callback: Function, config: { [key: string]: any }) {
    this.editor = new wangEditor(el);
    Object.assign(this.editor.config, config);

    this.editor.config.onchange = callback;
    this.editor.config.uploadImgHooks = this.uploadImage();
    this.editor.create();
    this.editor.txt.html(config.modelValue);
  }

  uploadImage() {
    return {
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn: Function, result: any) {
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.data.url);
      },
    };
  }
}
