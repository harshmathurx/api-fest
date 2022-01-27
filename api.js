const axios = require("axios").default;

module.exports = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});
