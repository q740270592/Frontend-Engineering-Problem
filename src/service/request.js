import axios from 'axios';
const devBaseURL = 'https://httpbin.org';
const proBaseURL = 'https://production.org';
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export const TIMEOUT = 5000;
const instance = axios.create({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})

//添加拦截
instance.interceptors.request.use(config => {
    console.log('请求被拦截')
    return config
},error => {

})

instance.interceptors.response.use(res => {
    
    return res.data
},error => {
    return error;
})
export default instance;
