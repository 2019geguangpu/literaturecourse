/*
 * @Author: ggp
 * @Date: 2020-09-21 11:19:19
 * @LastEditTime: 2020-10-30 19:52:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \client\src\renderer\libs\axiosinterceptors.js
 */
import axios from 'axios'
import {
    Message
} from "element-ui";

function axiosLanJie() {
    axios.interceptors.request.use(
        config => {
            // 在这里拦截请求
            const sessionName = localStorage.getItem('sessionName') ? localStorage.getItem('sessionName') : ''
            const sid = localStorage.getItem('sid') ? localStorage.getItem('sid') : ''
            // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
            config.headers['Authorization'] = `Bearer ${sid}`
            config.headers['sessionName'] = sessionName
            config.headers['sid'] = sid;
            return config;
        },
        error => {
            // 错误处理
            Message.error({
                message: '请求超时！'
            });
            return Promise.reject(error);
        });
    // 拦截响应response，并做一些错误处理
    axios.interceptors.response.use(
        response => {
            console.log(response);
            if (Reflect.has(response.headers, 'sid')) {

                // userDB.setItem('sid', response.headers.sid);
                localStorage.setItem('sid', response.headers.sid);
            }
            return response;
        },
        error => {
            console.log(error);
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.message = error.response.data.errorDescription || '请求参数错误';
                        break;
                    case 401:
                        error.message = '未授权，请登录';
                        break;
                    case 403:
                        error.message = '拒绝访问';
                        break;
                    case 404:
                        error.message = `请求地址出错: ${error.response.config.url}`;
                        break;
                    case 408:
                        error.message = '请求超时';
                        break;
                    case 500:
                        error.message = '服务器内部错误';
                        break;
                    case 501:
                        error.message = '服务未实现';
                        break;
                    case 502:
                        error.message = '网关错误';
                        break;
                    case 503:
                        error.message = '服务不可用';
                        break;
                    case 504:
                        error.message = '网关超时';
                        break;
                    case 505:
                        error.message = 'HTTP版本不受支持';
                        break;
                    default:
                        break;
                }
            } else {
                error.message = '连接服务器失败！';
            }

            return Promise.reject(error); // 返回接口返回的错误信息
        });
}

export default axiosLanJie