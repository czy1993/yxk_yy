import axios from "axios";
import { baseUrl } from "./env";
import { Message,Confirm } from "element-ui";
import router from "@/router";
import { getToken,removeToken } from "@/utils/auth";

const service = axios.create({
  baseURL: baseUrl,
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    let urlApi = config.url.split("/");
    // console.log(urlApi[urlApi.length-1])
    if (urlApi[urlApi.length - 1] != "login") {
      config.headers = {
        token: getToken()
      };
    } else {
      config.withCredentials = true;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (!!res.code&& res.code !== 200) {
      if (res.code === 10007) {
        removeToken();
        router.push("/login");
      }else if(res.code === 10005  ){
       
      
      } else {
        Message({
          message: res.message || "Error",
          type: "error",
          duration: 3 * 1000
        });
      }
      return res;
    } else {
      return res;
    }
  },
  err => {
    Message({
      message: "网络错误，请稍后再试！",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
);
export default service;
