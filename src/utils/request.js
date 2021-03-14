/*
 * @Author: shenxh
 * @Date: 2021-02-03 11:45:48
 * @LastEditors: shenxh
 * @LastEditTime: 2021-03-14 10:51:10
 * @Description: request 封装
 */

let baseURL = '';
// 生产环境
if (process.env.NODE_ENV === 'production') {
  baseURL = '';
} else {
  // baseURL = 'http://localhost:3000';
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
