import axiosInstance from './index'

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

export async function createAdmin(_username, _password) {
  let response = await axiosInstance
    .post('admin', { username: _username, password: _password })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })

  return response
}
