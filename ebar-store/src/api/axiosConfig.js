import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev.backend-api.goldady.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("request config is ", config); // to ensure config is sent

        const token = localStorage.getItem("authToken");
        
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      config.params = {
        ...config.params,
        session_token: sessionToken,
      };
    }
    console.log("sessionToken sent", config.params.session_token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

