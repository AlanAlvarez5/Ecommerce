import {API} from "../axios/api";

export const utils = {
  methods: {
    numberWithCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getHost() {
      let url = API.defaults.baseURL.split('/');
      url.pop();
      url = url.join('/');
      return url.concat('/');
    }
  },
};