import * as L from 'leaflet';
import { bound } from '../types/typings';
import { Route } from '../types/Route';
import getMapStore from "../store/getMapStore";
import { mapStores } from 'pinia';

const markerIcon = L.icon({
    iconUrl: new URL('/map-marker1.png', import.meta.url).href,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export const LatLngBoundsToBound = (latLngBounds: L.LatLngBounds): bound => {
    return {
        west: latLngBounds.getWest(),
        east: latLngBounds.getEast(),
        south: latLngBounds.getSouth(),
        north: latLngBounds.getNorth()
    }
}

export const gcjToWgs = (latLng: L.LatLng): L.LatLng => {
    const x = latLng.lng;
    const y = latLng.lat;
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);
    return L.latLng(z * Math.sin(theta) + 0.006, z * Math.cos(theta) + 0.0065);
}

export const wgsToGcj = (latLng: L.LatLng): L.LatLng => {
    const x = latLng.lng - 0.0065;
    const y = latLng.lat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
    return L.latLng(z * Math.sin(theta), z * Math.cos(theta));
}

export const readJson = (name: string) => {
    fetch(`./${name}.json`)
        .then(response => response.json())
        .then(data => {
            let LatLngs = [];
            data['data'].forEach((point: any) => {
                LatLngs.push(L.latLng(point[0], point[1]));
            });
            let passpoints = [];
            let start = L.marker(LatLngs[0], { icon: markerIcon }).addTo(getMapStore.map() as L.Map);
            let end = L.marker(LatLngs[LatLngs.length - 1], { icon: markerIcon }).addTo(getMapStore.map() as L.Map);
            passpoints.push(start);
            passpoints.push(end);
            let route = new Route(passpoints, LatLngs);   
        })
        .catch(error => {
            console.error(error);
        });
}

export const test = () => {
    getMapStore.map().on('click', (e: L.LeafletMouseEvent) => {
        let marker_wgs = L.marker(e.latlng).addTo(getMapStore.map() as L.Map);
        marker_wgs.bindTooltip(`wgs: ${marker_wgs.getLatLng().lat}, ${marker_wgs.getLatLng().lng}`);

        let marker_gcj = L.marker(wgsToGcj(marker_wgs.getLatLng())).addTo(getMapStore.map() as L.Map);
        marker_gcj.bindTooltip(`gcj: ${marker_gcj.getLatLng().lat}, ${marker_gcj.getLatLng().lng}`);
        getMapStore.map().off('click');
    });
}

// 经度0 ~ 360区间转 -180 ~ 180区间
export const convertTo180 = (lon: number) => {
    if (lon > 180) {
        return lon - 360;
    } else {
        return lon;
    }
}

export const convertTo360 = (lon: number) => {
    if (lon < 0) {
        return lon + 360;
    } else {
        return lon;
    }
}