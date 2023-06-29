import L from 'leaflet'
import axios from 'axios'
import { convertTo180 } from './utils'

const API_KEY = 'pk.eyJ1IjoiYXN1a2FpIiwiYSI6ImNsaDM2cjh0eDFreTAzZ3F2ZHF3OGRmNm8ifQ.nkqWxDbL6cGmo7aDQhAUiA'

// mapbox路径规划api
const requestBicyclePath = async (points: L.Marker[]) => {
    let pointsStr = '';
    for (let i = 0; i < points.length; i++) {
        pointsStr += `${convertTo180(points[i].getLatLng().lng)},${points[i].getLatLng().lat}`
        if (i < points.length - 1) pointsStr += ';';
    }
    const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/cycling/${pointsStr}`, {
        params: {
          access_token: API_KEY,
          steps: true,
        }
    })
    return res.data
}

export { requestBicyclePath }


