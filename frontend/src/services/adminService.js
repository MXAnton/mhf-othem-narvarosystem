import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'

export async function login(_username, _password) {
  let response = await axios
    .get('admin/' + _username + '/' + _password)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.response.data.message
    })

  return response
}
