import * as L from "leaflet";
import { exConfig } from "../types/exConfig";
import { exArea } from "../types/exArea";
import { Mask } from "../types/Mask";
import { requestImageBase64 } from "../utils/request";

type MaskObj = {
    name: string;
    config: exConfig;
    opacity: number;
}

type lnglat = {
    lng: number;
    lat: number;
}

type lnglatBounds = {
    _northEast: lnglat;
    _southWest: lnglat;
}

export type exAreaObj = {
    id: number;
    name: string;
    rectangle: lnglatBounds;
    masks: MaskObj[];
    exconfig: exConfig;
}


const lrectToLnglatBounds = (lrect: L.Rectangle): lnglatBounds => {
    return {
        _northEast: {
            lng: lrect.getBounds().getNorthEast().lng,
            lat: lrect.getBounds().getNorthEast().lat
        },
        _southWest: {
            lng: lrect.getBounds().getSouthWest().lng,
            lat: lrect.getBounds().getSouthWest().lat
        }
    }
}

const maskToObj = (mask: Mask) => {
    return {
        name: mask.name,
        config: mask.config,
        opacity: mask.opacity
    }
}

export const exAreasToObj = (exAreas: exArea[]) => {
    let exAreasObj: exAreaObj[] = [];
    exAreas.forEach((exArea) => {
        let obj: exAreaObj = {
            id: exArea.taskID,
            name: exArea.name,
            rectangle: lrectToLnglatBounds(exArea.rectangle),
            masks: [],
            exconfig: exArea.exconfig
        }
        exArea.masks.forEach(mask => {
            obj.masks.push(maskToObj(mask))
        })
        exAreasObj.push(obj);
    })
    return exAreasObj
}

export const exAreasFromObj = async (obj: exAreaObj[]) => {
    let exAreas: exArea[] = [];
    let promises: Promise<any>[] = [];

    obj.forEach((exAreaObj) => {
        exAreaObj.masks.forEach((maskObj: MaskObj) => {
            promises.push(requestImageBase64('mask', exAreaObj.id, maskObj.config.model as string));
        })
    })

    const maskUrls = await Promise.all(promises);

    let maskIndex = 0;
    obj.forEach(exAreaObj => {
      let rect = L.rectangle([[exAreaObj.rectangle._southWest.lat, exAreaObj.rectangle._southWest.lng], [exAreaObj.rectangle._northEast.lat, exAreaObj.rectangle._northEast.lng]],
        {
          color: 'white',
          fillColor: 'white',
          fillOpacity: 0.2,
          weight: 2
        });
      let exarea = new exArea(rect);
      exarea.taskID = exAreaObj.id;
      exAreaObj.masks.forEach((maskObj: MaskObj) => {
        let overlay = L.imageOverlay((maskUrls[maskIndex] as string), exarea.rectangle.getBounds(), { opacity: maskObj.opacity });
        let mask = new Mask(maskObj.name, overlay, maskObj.config);
        exarea.masks.push(mask);
        maskIndex++;
      })
      exAreas.push(exarea);
    })

    return exAreas;
}