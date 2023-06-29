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

// import { exAreasObj } from '../test/exAreasObj'

//初始视图设置
const home: L.LatLng = new LatLng(30.806639647030224, 110.98276232702901);
const zoom = 14;

const mapStore = useMapStore();

onMounted(() => {
  const map: L.Map = L.map("map", {
    center: home,
    zoom: zoom,
    zoomControl: false,
    attributionControl: false,
  })

 mapStore.setMap(map);

  mapStore.map.setView(home, zoom);
  L.tileLayer(mapUrls.mapboxSat, {
    maxZoom: 20,
  }).addTo(mapStore.map as L.Map);

  // mapStore.map.on("click", (e: L.LeafletMouseEvent) => {
  //   console.log("click:", e.latlng);
  // })
})

</script>

<style scoped>
#map {
  z-index: 0;
}
</style>