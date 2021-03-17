/*
 * @Author: shenxh
 * @Date: 2021-02-03 11:45:48
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-17 19:15:45
 * @Description: request 封装
 */

let baseURL = '';
// 生产环境
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://39.107.140.237:5123';
} else {
  baseURL = 'http://39.107.140.237:5123';
}

/**
 * @description: GET 请求
 * @param {String} url 服务器接口地址
 * @param {Object|String|ArrayBuffer} data 服务器接口地址
 * @return {*} Promise
 */
const get = (url, data) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      data,
      method: 'get',
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

/**
 * @description: POST 请求
 * @param {String} url 服务器接口地址
 * @param {Object|String|ArrayBuffer} data 服务器接口地址
 * @return {*} Promise
 */
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

export default {
  get,
  post
};
