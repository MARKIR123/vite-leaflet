import L from 'leaflet';
import getMapStore from '../store/getMapStore'

//多边形点集
var polygonPoints: L.LatLng[] = [];
//动态多边形
var dynamicPolygon: L.Polygon = null;

//多边形样式
var polygonStyle: L.PolylineOptions = {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.2,
    weight: 2
}

export const drawPolygon = () => {
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

    //鼠标右击事件
    getMapStore.map().on('contextmenu', (e: L.LeafletMouseEvent) => {
        polygonPoints = [];
        if (dynamicPolygon != null) {
            getMapStore.map().removeLayer(dynamicPolygon);
            dynamicPolygon = null;
        }
    })

    //鼠标双击事件
    getMapStore.map().on('dblclick', (e: L.LeafletMouseEvent) => {
        if (polygonPoints.length > 2) {
            let polygon = L.polygon(polygonPoints, polygonStyle).addTo(getMapStore.map() as L.Map);

            //完成多边形绘制后，将多边形传递给store
            // getMapStore.exAreas().push(new exArea(polygon));
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

    //停止绘制
    const stopDraw = () => {
        getMapStore.map().off('click');
        getMapStore.map().off('contextmenu');
        getMapStore.map().off('mousemove');
        if (dynamicPolygon != null) {
            polygonPoints = [];
            getMapStore.map().removeLayer(dynamicPolygon);
            dynamicPolygon = null;
        }
    }
}