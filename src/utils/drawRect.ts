import L from 'leaflet';
import getMapStore from '../store/getMapStore'


import { Notify } from 'quasar'

//矩形点集
var rectPoints: L.LatLng[] = [];
//动态矩形
var dynamicRect: L.Rectangle = null;

//矩形样式
var rectStyle: L.PolylineOptions = {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.2,
    weight: 2
}

export const drawRect = () => {
    //提示正在绘制
    const dismiss = Notify.create({
        message: "正在绘制提取区域",
        color: "primary",
        icon: "mdi-vector-rectangle",
        position: "bottom-right",
        timeout: 0,
    })
    //鼠标左击事件
    getMapStore.map().on('click', (e: L.LeafletMouseEvent) => {
        if (rectPoints.length == 0) {
            rectPoints.push(e.latlng);
        }
        else {
            rectPoints.push(e.latlng);
            let bounds = L.latLngBounds(rectPoints);
            let rect = L.rectangle(bounds, rectStyle).addTo(getMapStore.map() as L.Map);
            stopDraw();

            //完成矩形绘制后，将矩形传递给store
            getMapStore.exAreas().push(new ExArea(rect));
            dismiss();
        }
    })

    //鼠标右击事件
    getMapStore.map().on('contextmenu', (e: L.LeafletMouseEvent) => {
        rectPoints = [];
        if (dynamicRect != null) {
            getMapStore.map().removeLayer(dynamicRect);
            dynamicRect = null;
        }
    })

    //鼠标移动事件
    getMapStore.map().on('mousemove', (e: L.LeafletMouseEvent) => {
        if (rectPoints.length == 1) {
            let bounds = L.latLngBounds(rectPoints[0], e.latlng);
            if (dynamicRect == null) {
                dynamicRect = L.rectangle(bounds, rectStyle).addTo(getMapStore.map() as L.Map);
            }
            else {
                dynamicRect.setBounds(bounds);
            }
        }
    })

    //停止绘制
    const stopDraw = () => {
        getMapStore.map().off('click');
        getMapStore.map().off('contextmenu');
        getMapStore.map().off('mousemove');
        if (dynamicRect != null) {
            rectPoints = [];
            getMapStore.map().removeLayer(dynamicRect);
            dynamicRect = null;
        }
    }
}