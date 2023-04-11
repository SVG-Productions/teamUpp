import axios from "axios";

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  withCredentials: process.env.REACT_APP_API_URL ? true : false,
});

export default myAxios;
