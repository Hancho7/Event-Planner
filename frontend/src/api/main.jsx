import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5001" ,
});
// import.meta.env.VITE_BACKEND_URL