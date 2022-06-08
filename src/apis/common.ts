import service from "@/service";

export const ApiGetCityList = (data?: any) => {
  return service.get('/common/city/list', data);
}