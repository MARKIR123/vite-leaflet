/**
 * @author        Asukais <92195386+MARKIR123@users.noreply.github.com>
 * @date          2023-06-19 19:06:45
 * Copyright © YourCompanyName All rights reserved
 */

import * as L from "leaflet";
import { Route } from "../types/Route";
import getMapStore from "../store/getMapStore";
import { Notify } from "quasar";
import { requestBicyclePath } from "./request";

const markerIcon = L.icon({
    iconUrl: new URL('/map-marker1.png', import.meta.url).href,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// 经过的点
var passMarkers: L.Marker[] = [];

var activeMarker: L.Marker = L.marker([0, 0], { icon: markerIcon });
var activeMarkerAdded: boolean = false;
activeMarker.setOpacity(0);

const drawRoute = () => {
    const dismiss1 = Notify.create({
        message: "正在绘制路径",
        color: "primary",
        icon: "mdi-vector-rectangle",
        position: "bottom-right",
        timeout: 0,
    })
    if (!activeMarkerAdded) {
        activeMarker.addTo(getMapStore.map() as L.Map);
    }
    activeMarker.setOpacity(1);
    //鼠标左击事件
    getMapStore.map().on('click', (e: L.LeafletMouseEvent) => {
        passMarkers.push(L.marker(e.latlng
            , {
                icon: markerIcon,
            }
        ).addTo(getMapStore.map() as L.Map));
    })

    //键盘回车事件 完成绘制
    getMapStore.map().on('keypress', (e: L.LeafletKeyboardEvent) => {
        if (e.originalEvent.key == 'Enter') {
            Notify.create({
                message: "绘制完成",
                color: "primary",
                icon: "mdi-vector-rectangle",
                position: "bottom-right",
                timeout: 2000,
            })
            requestBicyclePath(passMarkers).then((data: Route) => 
            {
                let route = new Route(passMarkers);
                route.readJson(data);
                finishDraw();
            }
            )
        }
    })

    //鼠标右击事件 取消绘制
    getMapStore.map().on('contextmenu', (e: L.LeafletMouseEvent) => {
        stopDraw();
    })

    //鼠标移动事件
    getMapStore.map().on('mousemove', (e: L.LeafletMouseEvent) => {
        activeMarker.setLatLng(e.latlng);
    })

    const finishDraw = () => {
        getMapStore.map().off('click');
        getMapStore.map().off('contextmenu');
        getMapStore.map().off('mousemove');

        activeMarker.setOpacity(0);
        passMarkers = [];
        dismiss1();
    }  

    const stopDraw = () => {
        getMapStore.map().off('click');
        getMapStore.map().off('contextmenu');
        getMapStore.map().off('mousemove');

        // passMarkers.forEach((marker) => {
        //     getMapStore.map().removeLayer(marker);
        // });
        // passMarkers = [];
        activeMarker.setOpacity(0);
        dismiss1();
    }
}

export { drawRoute }