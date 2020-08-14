import axios from "axios";
import { Constants } from "@/constants";

export default {
  getAll(options = {}) {
    const defaults = {
      limit: 5,
      offset: 0
    };
    const params = {
      params: Object.assign(defaults, options)
    };

    return axios
      .get(`${Constants.SPACEX_BASE_URL}/launches`, params)
      .then(response => response.data);
  },
  get(flightNumber) {
    return axios
      .get(`${Constants.SPACEX_BASE_URL}/launches/${flightNumber}`)
      .then(response => response.data);
  }
};
