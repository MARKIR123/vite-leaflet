<template>
  <div class="toolbar">
    <q-toolbar class="my-toolbar text-black shadow-10">
      <div class="q-gutter-sm">
        <q-btn class="bg-white" round dense icon="mdi-map-marker-distance" @click="drawRoute()">
          <q-tooltip>绘制路线</q-tooltip>
        </q-btn>
        <q-btn class="bg-white" round dense icon="mdi-target" @click="pickPosition()">
          <q-tooltip>坐标拾取</q-tooltip>
        </q-btn>
        <q-btn class="bg-white" round dense icon="mdi-bike">
          <q-tooltip>骑行路线规划</q-tooltip>
          <q-menu>
            <q-list>
              <q-item clickable v-ripple dense @click="handleRoute(1)">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="mdi-bike">
                    </q-icon>
                  </q-avatar>
                </q-item-section>
                <q-item-section>长江路线</q-item-section>
              </q-item>

              <q-item clickable v-ripple dense @click="handleRoute(2)">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="mdi-bike">
                    </q-icon>
                  </q-avatar>
                </q-item-section>
                <q-item-section>三峡景区路线</q-item-section>
              </q-item>

              <q-item clickable v-ripple dense @click="handleRoute(3)">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="mdi-bike">
                    </q-icon>
                  </q-avatar>
                </q-item-section>
                <q-item-section>秭归校区至三峡景区</q-item-section>
              </q-item>

              <q-item clickable v-ripple dense @click="handleRoute(4)">
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="mdi-bike">
                    </q-icon>
                  </q-avatar>
                </q-item-section>
                <q-item-section>环境因素路线</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn class="bg-white" round dense icon="mdi-map">
          <q-tooltip>切换底图</q-tooltip>
          <q-menu>
            <q-list>
              <q-item clickable v-ripple dense @click="handleChangeLayer(1)">
                <q-item-section avatar>
                  <q-avatar size="md">
                    <img src="/gaodelogo.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>高德影像</q-item-section>
              </q-item>

              <q-item clickable v-ripple dense @click="handleChangeLayer(2)">
                <q-item-section avatar>
                  <q-avatar size="md">
                    <img src="/gaodelogo.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>高德地图</q-item-section>
              </q-item>

              <q-item clickable v-ripple dense @click="handleChangeLayer(3)">
                <q-item-section avatar>
                  <q-avatar size="md">
                    <img src="https://developers.google.cn/maps/images/maps-icon.svg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>谷歌地图</q-item-section>
              </q-item>

              <q-item clickable v-ripple dense @click="handleChangeLayer(4)">
                <q-item-section avatar>
                  <q-avatar size="md">
                    <img src="https://avatars.githubusercontent.com/u/600935?s=200&v=4" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Mapbox</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </div>
</template>

<script lang='ts' setup>
import { useMapStore } from "../store/mapStore";

import * as L from "leaflet";
import { useQuasar } from "quasar";

import { drawRoute } from "../utils/drawRoute";
import { pickPosition } from "../utils/pickPosition"
import { mapUrls } from "../utils/mapUrls";
import { readJson, test } from "../utils/utils";
import { Route } from "../types/Route";

const mapStore = useMapStore();
const $q = useQuasar();

const setLayer = (url: string) => {
  mapStore.map.eachLayer((layer) => {
    if ((layer as any)._url != undefined) {
      mapStore.map.removeLayer(layer);
    }
  });
  let layer_ = L.tileLayer(url, {
    maxZoom: 20,
  });
  mapStore.map.addLayer(layer_);
};

const handleRoute = (id: number) => {
  switch (id) {
    case 1:
      readJson('长江路线')
      break;
    case 2:
      readJson('三峡景区路线')
      break;
    case 3:
      readJson('秭归校区至三峡景区')
      break;
    case 4:
      readJson('环境因素秭归三峡')
      break;
    default:
      break;
  }
};


const handleChangeLayer = (id: number) => {
  switch (id) {
    case 1:
      setLayer(mapUrls.gaodeSat);
      break;
    case 2:
      setLayer(mapUrls.gaodeMap);
      break;
    case 3:
      setLayer(mapUrls.googleSat);
      break;
    case 4:
      setLayer(mapUrls.mapboxSat);
      break;
    default:
      break;
  }
};
</script>

<style>
.q-toolbar {
  border-radius: 48px;
}

.my-toolbar {
  backdrop-filter: blur(6px) !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  border: 2px solid rgba(95, 79, 70, 0.8) !important;
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

