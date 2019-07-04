import axios from 'axios';

axios.defaults.baseURL = 'https://api.openaq.org/v1/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const callApi = async ({ method, url, data }) => {
  return await axios({
    method,
    url,
    data
  });
};

export default callApi;
