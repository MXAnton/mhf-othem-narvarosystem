import axios from 'axios'
// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN, // Set the base URL for all requests
  withCredentials: true
})

export async function getAllMembers() {
  let response = await axiosInstance
    .get('member')
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function getMember(_personnummer) {
  let response = await axiosInstance
    .get('member/' + _personnummer)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function createMember(_personnummer, _firstName, _lastName, _endDate) {
  let response = await axiosInstance
    .post('member', {
      personnummer: _personnummer,
      first_name: _firstName,
      last_name: _lastName,
      end_date: _endDate
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })

  return response
}

export async function updateMember(_id, _personnummer, _firstName, _lastName, _endDate) {
  let response = await axiosInstance
    .put('member/' + _id, {
      personnummer: _personnummer,
      first_name: _firstName,
      last_name: _lastName,
      end_date: _endDate
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function deleteMember(_personnummer) {
  let response = await axiosInstance
    .delete('member/' + _personnummer)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}
