import axios from "axios";

export default axios.create({
  baseURL: "https://api-fest-production.up.railway.app/api",
});
