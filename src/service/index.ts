import Taro from "@tarojs/taro";

export const baseUrl = "http://localhost:7788";
// export const baseUrl = "https://webapi-travel.jt-gmall.com";

class Service {
  constructor() {}

  async request(
    method: any,
    url: string,
    data?: any,
    otherHeaders = {}
  ): Promise<any> {
    const header = {
      "content-type": "application/json",
      ...otherHeaders
    };
    const _baseUrl = url.indexOf('http') === 0 ? '' : baseUrl

    const reply = await Taro.request({
      method,
      url: `${_baseUrl}${url}`,
      data,
      header
    });
    
    if (reply.data.code !== 1) throw new Error(reply.data.message);
    
    return reply.data.data;
  }

  get(url, data?) {
    return this.request("GET", url, data);
  }

  post(url, data) {
    return this.request("POST", url, data);
  }

  put(url, data) {
    return this.request("PUT", url, data);
  }

  delete(url, data) {
    return this.request("DELETE", url, data);
  }
}

const service = new Service();
export default service;
export { Service };
