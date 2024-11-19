import LayerGroup from 'ol/layer/Group';
// 分组
export function getLayerGroup(layers: any[]) {
  const layer_arr = Array.isArray(layers) ? layers : [];
  const group = new LayerGroup({
    layers: layer_arr,
    visible: true,
  });
  if (layers.length <= 0) {
    console.log('输入图层数组错误！');
  }
  return group;
}
