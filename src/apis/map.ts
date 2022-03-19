import service from "@/service";

export const ApiMapSearch = (data?: any) => {
  return service.get('/map/search', data);
}