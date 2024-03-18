import axios from 'axios';
import qs from 'qs';

const symbolJson = Symbol('json');

// 创建axios实例
const service = axios.create({
  baseURL: '/', // 你的接口地址
  timeout: 30000, // 请求超时时间
  transformRequest: [function (data, headers) {
    if (data instanceof FormData) {
      // headers['Content-Type'] === 'multipart/form-data;charset=UTF-8'
      return data;
    }

    if (data?.[symbolJson] === true) {
      headers['Content-Type'] = 'application/json; charset=utf-8';

      return JSON.stringify(data);
    }

    return qs.stringify(data);
  }]
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // console.log(config)
    // 在发送请求之前做些什么，比如添加token等等
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response.data)
    if (response.data.code === -97) {
      const href = `${window.location.origin}/login`;
      window.location = href;
    } else {
      // 对响应数据做点什么
      return response.data;
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
