import axios from "axios";
import { Constants } from "@/constants";

export default {
  getAll() {
    return axios
      .get(`${Constants.SPACEX_BASE_URL}/ships`)
      .then(response => response.data);
  }
};
