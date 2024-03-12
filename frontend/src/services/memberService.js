import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/member/'

export async function getAllMembers() {
  let response = await axios
    .get('')
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function getMember(_id) {
  let response = await axios
    .get('' + _id)
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
  let response = await axios
    .post('', {
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

export async function updateMember(_id, _personnummer, _firstName, _lastName, _endDate) {
  let response = await axios
    .put('' + _id, {
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

export async function deleteMember(_id) {
  let response = await axios
    .delete('' + _id)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}
