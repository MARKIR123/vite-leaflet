import * as L from 'leaflet';
import getMapStore from '../store/getMapStore'
import { Notify } from 'quasar'

//多边形点集
var polygonPoints: L.LatLng[] = [];
//动态多边形
var dynamicPolygon: L.Polygon = null;
// 消息窗口
var dismiss: any = null;
//多边形样式
var polygonStyle: L.PolylineOptions = {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.5,
    weight: 4
}

export const drawPolygon = () => {
    //提示正在绘制
    dismiss = Notify.create({
        message: `正在绘制样本 ${getMapStore.editingClass().labelArea.name} - ${getMapStore.editingClass().name}`,
        color: "primary",
        icon: "mdi-vector-rectangle",
        position: "bottom-right",
        timeout: 0,
    })
    polygonStyle.fillColor = getMapStore.editingClass().color;
    //鼠标左击事件
    getMapStore.map().on('click', (e: L.LeafletMouseEvent) => {
        polygonPoints.push(e.latlng);
        if (dynamicPolygon == null) {
            dynamicPolygon = L.polygon(polygonPoints, polygonStyle).addTo(getMapStore.map() as L.Map);
        }
        else {
            dynamicPolygon.setLatLngs(polygonPoints);
        }
    })

    //鼠标右击事件完成绘制
    getMapStore.map().on('contextmenu', (e: L.LeafletMouseEvent) => {
        if (polygonPoints.length > 2) {
            dynamicPolygon.remove();
            let polygon = L.polygon(polygonPoints, polygonStyle).addTo(getMapStore.map() as L.Map);
            // 完成多边形绘制后，将多边形传递给store
            if (getMapStore.classEditing()) {
                getMapStore.editingClass().addLabel(polygon);
            }
            else {
                console.log('当前没有正在编辑的类别！！！');
            }
            polygonPoints = [];
            dynamicPolygon = null;
        }
    })

    //鼠标移动事件
    getMapStore.map().on('mousemove', (e: L.LeafletMouseEvent) => {
        if (polygonPoints.length > 0) {
            let points = polygonPoints.concat(e.latlng);
            if (dynamicPolygon == null) {
                dynamicPolygon = L.polygon(points, polygonStyle).addTo(getMapStore.map() as L.Map);
            }
            else {
                dynamicPolygon.setLatLngs(points);
            }
        }
    })
}

export const stopDrawPolygon = () => {
    getMapStore.map().off('click');
    getMapStore.map().off('contextmenu');
    getMapStore.map().off('mousemove');
    if (dynamicPolygon != null) {
        polygonPoints = [];
        getMapStore.map().removeLayer(dynamicPolygon);
        dynamicPolygon = null;
    }
    dismiss();
}