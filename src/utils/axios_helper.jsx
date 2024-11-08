import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json"

export const getAuthToken = ()=>{
    return localStorage.getItem("auth_token");
};

export const setAuthHeader = (token)=>{

    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
      } else {
        window.localStorage.removeItem("auth_token");
      }
      
}

export const request = (method, url, data)=>{

    let header = {};
    if(getAuthToken()!== null && getAuthToken() !== "null"){
        header["Authorization"] = `Bearer ${getAuthToken}`;
    }

    return axios({
        method: method,
        headers: header,
        url:url,
        data:data
    });
};