import L from 'leaflet';
import { defineStore } from "pinia";
import { exArea } from '../types/exArea';
import getMapStore from './getMapStore';
import { Mask } from '../types/Mask';

export const useMapStore = defineStore('mapStore', {
    state: () => {
        return {
            map: {} as L.Map,
            exAreas: [] as exArea[],
        }
    },

    actions: {
        setMap(map: L.Map) {
            this.map = map;
        },

        setExAreas(exAreas: exArea[]) {
            this.exAreas = exAreas;
            this.exAreas.forEach((ex: exArea) => {
                ex.rectangle.addTo(this.map);
                ex.masks.forEach((mask: Mask) => {
                    mask.layer.addTo(this.map);
                })
            })
        }
    },

    getters: {

    }
})
