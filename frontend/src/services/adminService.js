import axios from 'axios'
// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN, // Set the base URL for all requests
  withCredentials: true
})

export async function login(_username, _password) {
  let response = await axiosInstance
    .post('admin/login', { username: _username, password: _password })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.response.data.message
    })

  return response
}

export async function getLoggedInAdmin() {
  let response = await axiosInstance
    .get('admin')
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.response.data.message
    })

  return response
}

export async function logout() {
  let response = await axiosInstance
    .post('admin/logout')
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.response.data.message
    })

  return response
}
