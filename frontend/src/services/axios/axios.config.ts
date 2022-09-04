import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const devUrl = "http://localhost:3001/"
const prodUrl = "https://training-003.herokuapp.com/"
const axiosConf:AxiosInstance = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? devUrl
  : prodUrl,
  withCredentials: true
});

export default axiosConf