import LayerGroup from 'ol/layer/Group';
import { LineString, Polygon } from 'ol/geom.js';

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

/**
 * 测量长度输出
 * @param line
 */
export const formatLength = (line: LineString) => {
  const transformedLine = line.clone().transform('EPSG:4326', 'EPSG:3857');
  const length = transformedLine.getLength();
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + '' + 'km';
  } else {
    output = Math.round(length * 100) / 100 + '' + 'm';
  }
  return output;
};

/**
 * 测量面积输出
 * @param polygon
 */
export const formatArea = (polygon: Polygon) => {
  const transformedLine = polygon.clone().transform('EPSG:4326', 'EPSG:3857');
  const area = transformedLine.getArea();
  let output;
  if (area > 10000) {
    output = (Math.round(area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
  } else {
    output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
  }
  return output;
};

export const key = 'c3e13f43d5f380c070aaff0b2920fae8';
