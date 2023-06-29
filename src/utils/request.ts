import { LatLngBounds } from 'leaflet'
import { exConfig } from '../types/exConfig'
import { tileArea } from '../types/typings'
import axios from 'axios'

//const target = 'http://172.27.177.227:5089'
const target = '/api'

export const requestTaskID = () => {
  let url = `${target}//getID`

}
// 请求掩膜
export const requestMaskBase64 = (tileArea: tileArea, bound: LatLngBounds,zoom: number, config: exConfig) => {
  let url = `${target}//predict`
  return axios.post(url, {
    tileArea: tileArea,
    bound: bound,
    zoom: zoom,
    config: config
  }).then((res) => {  //axios返回的是一个promise对象
    // 在请求成功的回调中获取 base64 格式的图片数据   
    const base64Data = 'data:image/png;base64,' + res.data["image"];
    // 将 base64 数据转换成 Blob 对象
    let blob = base64ToBlob(base64Data);
    // 生成临时的 URL 对象
    let imageUrl = URL.createObjectURL(blob);
    // 创建 ImageOverlay
    return imageUrl;
  }).catch((error) => {
    console.log('axios:' + error)
  })
}

// 请求图片Sat & Mask
export const requestImageBase64 = (imgType: string, taskID: number, model?: string) => {
  let url = `${target}//getImage`
  return axios.post(url, {
    Type: imgType,
    TaskID: taskID,
    Model: model
  }).then((res) => {  //axios返回的是一个promise对象
    // 在请求成功的回调中获取 base64 格式的图片数据
    const base64Data = 'data:image/png;base64,' + res.data["image"];
    // 将 base64 数据转换成 Blob 对象
    let blob = base64ToBlob(base64Data);
    // 生成临时的 URL 对象
    let imageUrl = URL.createObjectURL(blob);
    // 创建 ImageOverlay
    return imageUrl;
  }).catch((error) => {
    console.log('axios:' + error)
  })
}

// 辅助函数，将 base64 数据转换成 Blob 对象
function base64ToBlob(base64Data: String, type: string = 'image/png') {
  let bytes = window.atob(base64Data.toString().split(',')[1]);        //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: type });
}