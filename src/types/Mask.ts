import L from 'leaflet'
import { exConfig } from './exConfig'
import { exArea } from './exArea';
import { requestImageBase64 } from '../utils/request';
import { Model } from './Model';

export class Mask {
    name: string
    config: exConfig;
    layer!: L.ImageOverlay;
    opacity: number = 0.4;

    constructor(name: string, layer: L.ImageOverlay, config: exConfig) {
        this.name = name;
        this.layer = layer;
        this.config = config;
    }

    getMask() {
        // requestImageBase64('sat', this.exArea.taskID, this.config.model.toString()).then((res) => {
            
        // })
    }

    remove(exArea: exArea) {
        exArea.masks.splice(exArea.masks.indexOf(this), 1);
        this.layer.remove();
    }

    setOpacity() {
        this.layer.setOpacity(this.opacity);
    }
}