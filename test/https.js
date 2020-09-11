const axios = require('axios')
// axios.defaults.baseURL=process.env.ADMIN_SERVE
axios.defaults.baseURL = 'http://localhost:8082/'
// 设置超时时间 和 跨域是否允许携带凭证
axios.defaults.timeout = 999999999;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['Content-Type'] = 'text/plain';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.headers.common['Authorization'] = token
// 设置axios请求拦截器
axios.interceptors.request.use(config => {
	if (config.method === 'get') {
		config.params = {
			...config.params
		}
	} else if (config.method === 'post') {
		config.data = {
			...config.data
		}
	}
	return config
}, error => {
	return Promise.reject(error)
});
axios.interceptors.response.use(response => {
	var res = response.data
	if (res.code != 200) {
		// 11111
	} else {
		return response.data //只返回响应主体
	}
}, error => {
	// 222
	return Promise.reject(error)
});

module.exports = axios



