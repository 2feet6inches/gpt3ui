import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 3 * 60 * 1000,
  headers: { accept: 'application/json' },
});

httpClient.interceptors.request.use(
  (req: any) => {
    // displayBlockUI();
    return req;
  },
  (error) => {
    // hiddenBlockUI();
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    // hiddenBlockUI();
    return response.data;
  },
  (error) => {
    // hiddenBlockUI();
    return Promise.reject(error);
  }
);

export default httpClient;
