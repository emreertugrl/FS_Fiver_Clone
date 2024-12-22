import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api", //backend port
  withCredentials: true, // çerezler için verilir.
});

export default api;
