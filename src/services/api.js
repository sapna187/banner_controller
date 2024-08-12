// import axios from 'axios';

// const API_URL = 'http://localhost:5000';

// export const getBannerData = () => axios.get(`${API_URL}/banner`);
// export const updateBannerData = (data) => axios.post(`${API_URL}/banner`, data);


import axios from 'axios';

// Replace this URL with your API Gateway endpoint
const API_URL = 'https://d1dflmwcyl.execute-api.us-east-1.amazonaws.com/dev';

export const getBannerData = () => axios.get(`${API_URL}/banner`);
export const updateBannerData = (data) => axios.post(`${API_URL}/banner`, data);
