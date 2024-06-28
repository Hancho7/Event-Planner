import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.NODE_BACKEND_SERVER,
});
