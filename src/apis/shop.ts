import service from "@/service";

export const ApiGetShopList = (data?: any) => {
  return service.get('/shop/list', data);
}