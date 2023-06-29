import L from 'leaflet';
import { defineStore } from "pinia";
import { Route } from '../types/Route';

export const useMapStore = defineStore('mapStore', {
    state: () => {
        return {
            map: {} as L.Map,
            routes: [] as Route[],
        }
    },

    actions: {
        setMap(map: L.Map) {
            this.map = map;
        },
    },

    getters: {

    }
})
