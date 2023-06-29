<template>
  <div class="toolbar">
    <q-toolbar class="bg-white text-black">
      <q-btn round dense icon="mdi-vector-rectangle" @click="drawRect()" />
      <q-btn round dense icon="mdi-alert-box" @click="test()" />
      <q-btn round dense icon="mdi-information-outline" @click="test()" />
    </q-toolbar>
  </div>
</template>

<script lang='ts' setup>
import * as L from "leaflet";
import { drawRect } from "../utils/drawRect"
import { requestImageBase64 } from "../utils/request";

import { useMapStore } from "../store/mapStore";

const mapStore = useMapStore();

const test = () => {
  requestImageBase64('mask', 166, 'upernet-swin').then((res) => {
    let bound = L.latLngBounds([30.646653144871006, 114.40763317757964], [30.644547494309816, 114.40456058782883]);
    let imageOverlay = L.imageOverlay((res as string), bound, { opacity: 0.5 });
    mapStore.map.addLayer(imageOverlay);
  })
}

</script>

<style>
.q-toolbar {
  border-radius: 48px;
}

.toolbar {
  position: absolute;
  top: 4px;
  right: 4px;
  height: auto;
  width: auto;
  z-index: 1;
}
</style>

