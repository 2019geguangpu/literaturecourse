import axios from 'axios'

/**
* 如果data为空，params有值，不管content-type是什么，都会将params拼接到URL后面
* 如果params为空，data有值，当content-type为application/x-www-form-urlencoded时，应当使用URLSearchParams，当content-type为application/json时，直接传一个自定义对象即可
* let params = new URLSearchParams();
* params.append('username', 'ggp');
* @param overall 全局变量(Vue.prototype)
*/
function http(overall) {
  // 设置最大超时时间
  // axios.defaults.timeout = 5000
  // 设置默认请求地址
  axios.defaults.baseURL = '/'

  overall._ajax = function (type, url, data = {}, params = {}, callback, err = () => { }, exception = () => { }, contentType = 'application/json', responseType = 'json') {
    axios({
      method: type,
      url: url,
      data: data,
      params: params,
      responseType: responseType,
      headers: {
        'Content-Type': contentType
      }
    }).then((res) => {


      // 表示请求成功
      if (res.status >= 200 && res.status < 300) {
        const { code = '' } = res.data;
        if (code >= 200 && code < 300) callback(res.data);
        else if (code === '') callback(res.data);
        else err(res.data);
      }
      else err(res.data); // 表示请求失

    }).catch((res) => {
      exception(res)
    })
  }
}

export default http
