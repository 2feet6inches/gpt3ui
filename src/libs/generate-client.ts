import axios from 'axios';

const predictClient = axios.create({
  baseURL: process.env.PREDICTOR_BASE_URL,
  timeout: 3 * 60 * 1000,
  headers: { accept: 'application/json' },
});

predictClient.interceptors.request.use(
  (req: any) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

predictClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default predictClient;
