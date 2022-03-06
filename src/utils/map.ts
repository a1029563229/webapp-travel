import Taro, { MapContext } from "@tarojs/taro";

const getMap = (mapName: string) => {
  const map: MapContext = Taro.createMapContext(mapName);
  const locateTo = (longitude: number, latitude: number, name: string = '目的地') => {
    map.openMapApp({
      longitude: longitude,
      latitude: latitude,
      destination: name
    });
  }
  return {
    locateTo
  }
}

export {
  getMap
}