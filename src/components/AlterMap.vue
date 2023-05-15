<template>
  <div id="map" class="fullscreen">
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';

import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

import { mapUrls } from "../utils/mapUrls"
import { useMapStore } from "../store/mapStore"

import { exAreasToObj, exAreasFromObj } from "../store/persistStore"
import { exArea } from '../types/exArea';

// import { exAreasObj } from '../test/exAreasObj'

//初始视图设置
const home: L.LatLng = new LatLng(30.594, 114.311);
const zoom = 11;

const mapStore = useMapStore();

// 从localStorage读取obj，并初始化地图
const initMap = () => {
  let obj = JSON.parse(localStorage.getItem("store-exArea"));
  if (obj) {
    exAreasFromObj(obj).then((exAreas) => {
      mapStore.setExAreas(exAreas);
    });
  }
}

//监听mapStore的变化,存入localStorage
mapStore.$subscribe((mutation, state) => {
  let obj = exAreasToObj(state.exAreas as exArea[]);
  localStorage.setItem("store-exArea", JSON.stringify(obj))
})

onMounted(() => {
  const map: L.Map = L.map("map", {
    center: home,
    zoom: zoom,
    zoomControl: false,
    attributionControl: false,
  })
  mapStore.setMap(map);
  initMap();

  mapStore.map.setView(home, zoom);
  L.tileLayer(mapUrls.googleSat, {
    maxZoom: 20,
  }).addTo(mapStore.map);

  // mapStore.map.on("click", (e: L.LeafletMouseEvent) => {
  //   console.log(e)
  // })
})

</script>

<style scoped>
#map {
  z-index: 0;
}
</style>