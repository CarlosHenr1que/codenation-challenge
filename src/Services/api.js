const axios = require("axios");
const url = "https://api.codenation.dev/v1";
const api = axios.create({ baseURL: url });

module.exports = api;
