import service from "@/service";

export const ApiGetShopList = (data?: any) => {
  return service.get('/shop/list', data);
}

export const ApiAddShop = (data: any) => {
  return service.post('/shop/add', data);
}