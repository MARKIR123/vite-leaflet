/**
 * @author        Asukais <92195386+MARKIR123@users.noreply.github.com>
 * @date          2023-06-19 19:07:09
 * Copyright © YourCompanyName All rights reserved
 */
import { AntPath, antPath } from 'leaflet-ant-path';
import * as L from "leaflet";
import getMapStore from "../store/getMapStore";

const antPathStyle = {
    "delay": 5000,
    "dashArray": [
        10,
        20
    ],
    "weight": 6,
    "color": "#005C93",
    "pulseColor": "#FFFFFF",
    "hardwareAccelerated": true,
    "opacity": 0.8,
    "paused": true,
};

class Route {
    name: string;
    passpoints: L.Marker[];
    path: AntPath;
    desc: string;
    visible: boolean = true;

    constructor(passpoints: L.Marker[], points?: L.LatLngExpression[], name?: string, desc?: string) {
        this.passpoints = passpoints;
        this.name = `路线 ${getMapStore.routes().length + 1}`
        this.desc = desc || this.name;
        if (points != undefined) {
            this.path = antPath(points, antPathStyle).addTo(getMapStore.map() as L.Map);
            getMapStore.routes().push(this);
            this.addControls();
        }
    }

    switchVisible() {
        if (!this.visible) {
            this.path.setStyle({ opacity: 0 });
            this.passpoints.forEach((point) => {
                point.setOpacity(0);
            }
            )
        }
        else {
            this.path.setStyle({ opacity: 0.8 });
            this.passpoints.forEach((point) => {
                point.setOpacity(1);
            }
            )
        }
    }

    readJson(jsonData: Object) {
        let points = [];
        //bicycling
        jsonData['routes'][0]['legs'].forEach((leg: any) => {
            leg['steps'].forEach((step: any) => {
                step['intersections'].forEach((intersection): any => {
                    let location = intersection['location'];
                    points.push(L.latLng(location[1], location[0]));
                })
            })
        });
        this.path = antPath(points, antPathStyle).addTo(getMapStore.map() as L.Map);
        getMapStore.routes().push(this);
        this.addControls();
    }

    addControls() {
        this.path.on('mouseover', () => {
            this.path.resume();
        })

        this.path.on('mousemove', () => {
            this.path.resume();
        })

        this.path.on('mouseout', () => {
            this.path.pause();
        })
    }

    setName(name: string) {
        this.name = name;
    }

    setDesc(desc: string) {
        this.desc = desc;
    }

    focus() {
        getMapStore.map().fitBounds(this.path.getBounds());
    }

    delete() {
        getMapStore.map().removeLayer(this.path);
        getMapStore.routes().splice(getMapStore.routes().indexOf(this), 1);
    }
}

export { Route };