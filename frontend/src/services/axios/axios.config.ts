import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const url = "http://localhost:3001/"
const axiosConf:AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true
});

export default axiosConf