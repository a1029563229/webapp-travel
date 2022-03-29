import service from "@/service";

export const ApiLogin = (data?: any) => {
  return service.post('/wx/login', data);
}

export const ApiGetUserInfo = (data?: any) => {
  return service.get('/user/info', data);
}