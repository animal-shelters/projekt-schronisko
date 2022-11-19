import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost/'
});

export default axiosInstance;
