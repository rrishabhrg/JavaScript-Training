/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';

// axios.defaults.baseURL = 'https://express-training.herokuapp.com/';
// axios.defaults.headers.common.Authorization = localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const callApi = async ({ method, url, data = {} }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    // console.log('My Response Is:', response);
    return response;
  } catch (error) {
    console.error('ERROR IS FOUND--->> ', error);
  }
};

export default callApi;
