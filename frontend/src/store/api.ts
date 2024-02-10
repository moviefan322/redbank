import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
  },
});

export default instance;
