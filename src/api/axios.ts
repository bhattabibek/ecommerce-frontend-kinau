import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiMedia = axios.create({
  baseURL: BASE_URL,
});

const attachToken = (config: any) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(attachToken);
apiMedia.interceptors.request.use(attachToken);


const refreshInterceptor = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });

      const newToken = res.data.data.accessToken;
      localStorage.setItem("accessToken", newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }

  return Promise.reject(error);
};

api.interceptors.response.use((res) => res, refreshInterceptor);
apiMedia.interceptors.response.use((res) => res, refreshInterceptor);

