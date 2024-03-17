import axios from 'axios'
import router from '@/router'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
  withCredentials: true
})

// Add a response interceptor to catch 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 errors here
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
