import axios from "axios";

const instance = axios.create({
   baseURL: 'http://localhost:4444'
});

instance.interceptors.request.use((config) => {
   config.headers.Authorization = window.localStorage.getItem('token');
   return config;
});
// при любом запросе на этот локалхост проверяет, есть ли такой ключ в локалсторэдж и отправляет его в хэдер вместе с запросом
export default instance;