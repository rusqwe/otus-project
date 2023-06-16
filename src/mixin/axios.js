import axios from 'axios';
export default {

  getData(apiURL, params, headers = {}) {
    return axios.get(apiURL, { headers: headers, params: params }).then(response => response.data);
  },
  postData(apiURL, data, params, headers = {}) {
    return axios.post(apiURL, data, { headers: headers, params: params }).
      then(response => response.data);
  },
  putData(apiURL, data, params, headers = {}) {
    return axios.put(apiURL, data, { headers: headers, params: params }).then(response => response.data);
  },
  deleteData(apiURL, params, headers = {}) {
    return axios.delete(apiURL, { headers: headers, params: params }).
      then(response => response.data);
  }

}