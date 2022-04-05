import Taro, { MapContext } from "@tarojs/taro";

export type Location = {
  longitude: number;
  latitude: number;
}

const getMap = (mapName: string) => {
  const map: MapContext = Taro.createMapContext(mapName);
  const locateTo = (longitude: number, latitude: number, name: string = '目的地') => {
    map.openMapApp({
      longitude: longitude,
      latitude: latitude,
      destination: name
    });
  }

  const getLocation = () => Taro.getLocation({
    type: "gcj02"
  });
  
  return {
    locateTo,
    getLocation,
  }
}

export {
  getMap
}