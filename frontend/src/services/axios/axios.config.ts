import axios, { AxiosInstance } from 'axios';

const axiosConf: AxiosInstance = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? "http://localhost:3001/"
    : `${window.location.href.split(":")[0]}://uzdevumi.herokuapp.com/`,
  withCredentials: true
});

export default axiosConf