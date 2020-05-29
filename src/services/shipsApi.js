import axios from "axios";

export default {
  getAll() {
    return axios
      .get("https://api.spacexdata.com/v3/ships")
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
};
