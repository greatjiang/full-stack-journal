import axios from 'axios'
import qs from 'qs'

// console.log(import.meta.env.VITE_BASE_URL)

function isJsonString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}


// const symbolJson = Symbol('json');

// 创建axios实例
const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  // 允许在向服务器发送前，修改请求数据
  transformRequest: [function (data, headers) {
    // 对发送的data进行任意转换
    console.log(JSON.stringify(data))

    // 表单数据 文件上传
    if (data instanceof FormData) {
      return data
    }

    // json格式
    if (isJsonString(data)) {
      headers['Content-Type'] = 'application/json;charset=utf-8'

      return JSON.stringify(data)
    }

    return qs.stringify(data)
  }],
})

// request拦截器
instance.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = config.data;
  }

  return config;
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
});

export default function (url, inputOptions = {}) {
  const options = { ...inputOptions }
  console.log(options)

  // 默认为get请求
  if (!options.method) {
    options.method = 'get'
  }

  console.log(options)

  if (options.upload === true) {
    const fd = new FormData();

    for (const key in options.data) {
      if (Object.prototype.hasOwnProperty.call(options.data, key)) {
        const value = options.data[key];

        if (value === undefined) {
          continue;
        }

        if (Array.isArray(value)) {
          value.forEach((item) => {
            fd.append(`${key}[]`, item);
          });
        }
        else {
          fd.append(key, value);
        }
      }
    }

    options.data = fd;
  }
  else if (options.method === 'post' && options.json === true) {
    if (options.data) {
      options.data[symbolJson] = true;
    }
  }

  if (!options.data) {
    options.data = {};
  }

  if (options.method.toLowerCase() === 'get' && options.cache !== true) {
    options.data._ = String(+new Date()) + String(Math.floor(Math.random() * 9999));
  }

  if (!options.onUploadProgress && options.onUploadPercent) {
    options.onUploadProgress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        options.onUploadPercent(Math.floor((progressEvent.loaded / progressEvent.total) * 100), progressEvent);
      }
    }
  }

  return instance(url, options)
    .then(async (response) => {

      let data = response.data

      // console.log(typeof response.data)

      return {
        data: response.data.data,
        code: response.data.code
      }
    })
    .catch((error) => {
      return {
        code: 110,
        response: error.response
      }
    })
}