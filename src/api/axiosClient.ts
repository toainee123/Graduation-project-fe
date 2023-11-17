import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL, localStorageConstants, urlRouter } from "../utils/constants";
import { log } from "console";

const axiosClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Accept: 'application/json', 'Content-Type': 'application/json',
  }
})


// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = JSON.parse(localStorage.getItem('access_token') as string);
    console.log(token);
    // Do something before request is sent
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`)
    }

    // const token = localStorage.getItem(localStorageConstants.ACCESS_TOKEN);

    config.headers.Authorization = token ? `Bearer ${token}` : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiZHVuZ25jMDQwMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTI3MTcxMzAsImV4cCI6MTY5MjgwMzUzMH0.wnWYTVMZywHkTLKfME9ezvLnf_38WMwzbyOdNr8Sx6M'
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      (error.response.status === 401 && error.response.data.message === 'Unauthorized') ||
      (error.response.status === 500 && error.response.data.message === 'Error: invalid signature') ||
      (error.response.status === 500 && error.response.data.message === 'Error: Permission denied')
    ) {
      window.location.href = urlRouter.AUTH;
      window.localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
