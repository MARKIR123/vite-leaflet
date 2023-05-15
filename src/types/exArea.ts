import L from 'leaflet'
import getMapStore from '../store/getMapStore'
import { Mask } from '../types/Mask'
import { tileArea } from '../types/typings'
import { lnglatToTile } from '../utils/lnglatToTile'
import { exConfig } from './exConfig'
import { requestMaskBase64, requestImageBase64 } from '../utils/request'

export class exArea {
    taskID: number;
    name: string;
    rectangle: L.Rectangle;
    satdownload: boolean = false;
    masks: Mask[];
    exconfig: exConfig = new exConfig();
    visible: boolean = true;

    constructor(rect: L.Rectangle) {
        this.taskID = 154;
        this.masks = [];
        this.name = `提取区域 ${getMapStore.exAreas().length + 1}`;
        this.rectangle = rect;
    }

    //计算zoom级别下的瓦片范围
    getTileAreas(zoom: number) {
        let tileArea: tileArea = { xs: 0, ys: 0, xe: 0, ye: 0 };
        let tile1 = lnglatToTile(this.rectangle.getBounds().getNorthWest().lng, this.rectangle.getBounds().getNorthWest().lat, zoom);
        let tile2 = lnglatToTile(this.rectangle.getBounds().getSouthEast().lng, this.rectangle.getBounds().getSouthEast().lat, zoom);
        tileArea.xs = tile1.x;
        tileArea.ys = tile1.y;
        tileArea.xe = tile2.x;
        tileArea.ye = tile2.y;
        return tileArea;
    }

    extract(zoom: number) {
        //计算zoom级别下的瓦片
        let includeTiles = this.getTileAreas(zoom);
        //请求掩膜
        requestMaskBase64(includeTiles, this.rectangle.getBounds(), zoom, this.exconfig).then((res) => {
            if (res === undefined) {
                console.log('返回错误，请重试');
                return;
            }
            // 在请求成功的回调中获取 base64 格式的图片数据
            const overlay = L.imageOverlay((res as string), this.rectangle.getBounds(), { opacity: 0.5 });
            // 创建 Mask 对象
            let mask = new Mask(`Mask ${this.masks.length + 1}`, overlay, this.exconfig, this);
            // 添加到 masks 数组中
            this.masks.push(mask);
            // 将 ImageOverlay 添加到 Leaflet 中
            overlay.addTo(getMapStore.map());
        }).catch((error) => {
            console.log('axios:' + error)
        })
    }

    getSat(zoom: number) {
        requestImageBase64('sat', this.taskID).then((res) => {

        })
    }

    focus() {
        getMapStore.map().fitBounds(this.rectangle.getBounds());
    }

    show() {
        this.rectangle.setStyle({
            fillOpacity: 0.2,
        });
    }

    hide() {
        this.rectangle.setStyle({
            fillOpacity: 0,
        });
    }

    showOrHide() {
        if (this.visible) {
            this.show();
        } else {
            this.hide();
        }
    }

    delete() {
        this.masks.forEach((mask: Mask) => {
            mask.remove(this);
        })
        getMapStore.exAreas().splice(getMapStore.exAreas().indexOf(this), 1);
        this.rectangle.remove();
    }
}