/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';

axios.defaults.baseURL = 'https://api.openaq.org/v1/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const callApi = async ({ method, url, data = {} }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response;
  } catch (error) {
    console.error('ERROR IS FOUND--->> ', error);
  }
};

export default callApi;
