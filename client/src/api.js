import axios from "axios";
const API = axios.create({ baseURL: "https://ai-chat-backend-5ha6.onrender.com/" });
API.interceptors.request.use((req)=>{
  const token = localStorage.getItem("token");
  if(token) req.headers.Authorization = token;
  return req;
});
export default API;
