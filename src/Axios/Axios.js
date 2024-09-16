import axios from "axios";




export const AxiosApi = axios.create({
   baseURL: 'http://api.mercurio.ae', 
  //  baseURL: 'http://192.168.50.127', 

   // headers: {
   //   'Content-Type': 'application/json',
   // },
 });

 export const AxiosAdminApi = axios.create({
  baseURL: 'http://api.mercurio.ae',
  // baseURL: 'http://192.168.50.127',
  // headers:{'Content-Type': 'application/json',}
});

AxiosAdminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('userKey');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosAdminApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
     
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }

    // Return a rejected Promise to propagate the error further
    return Promise.reject(error);
  }
);