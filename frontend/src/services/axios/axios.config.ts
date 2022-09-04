import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosConf: AxiosInstance = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? "http://localhost:3001/"
    : `${window.location.href.split(":")[0]}training-003.herokuapp.com/`,
  withCredentials: true
});

export default axiosConf