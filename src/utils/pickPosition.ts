/**
 * @author        Asukais <92195386+MARKIR123@users.noreply.github.com>
 * @date          2023-06-21 20:37:31
 * Copyright © YourCompanyName All rights reserved
 */

import * as L from "leaflet";
import { Notify } from "quasar";
import getMapStore from "../store/getMapStore";

var dismiss = null;

const markerIcon = L.icon({
    iconUrl: new URL('/map-marker1.png', import.meta.url).href,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

var marker = null;

const pickPosition = () => {
    //左键点击事件
    getMapStore.map().on('click', (e: L.LeafletMouseEvent) => {
        if (dismiss != null) {
            dismiss();
        }
        if (marker == null) {
            marker = L.marker(e.latlng, { icon: markerIcon }).addTo(getMapStore.map() as L.Map);
        }
        else {
            marker.setLatLng(e.latlng);
        }
        dismiss = Notify.create({
            message: `经度：${e.latlng.lng}
            纬度：${e.latlng.lat}`,
            color: "primary",
            multiLine: true,
            icon: "mdi-vector-rectangle",
            position: "bottom-right",
            timeout: 0,
        })
    })

    //鼠标右击事件
    getMapStore.map().on('contextmenu', (e: L.LeafletMouseEvent) => {
        stopPick();
    })

    const stopPick = () => {
        getMapStore.map().off('click');
        getMapStore.map().off('contextmenu');
        dismiss();
        marker.remove();
    }
}

export { pickPosition }