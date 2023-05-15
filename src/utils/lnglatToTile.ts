/**
 * WGS84地理坐标转Google Tile XY
 * @param    lng  number  经度
 * @param    lat  number  纬度
 * @param   zoom  number  缩放级别
 * @returns  Google Tile XY
 */
export const lnglatToTile = (lng: number, lat: number, zoom: number) => {
    let xtile = Math.floor((lng + 180) / 360 * (1 << zoom));
    let ytile = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * (1 << zoom));
    return { x: xtile, y: ytile };
}
