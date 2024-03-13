import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'

export async function getAllMembers() {
  let response = await axios
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
  let response = await axios
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
  let response = await axios
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
      console.warn(err)
      return null
    })

  return response
}

export async function updateMember(_id, _personnummer, _firstName, _lastName, _endDate) {
  let response = await axios
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

export async function deleteMember(_id) {
  let response = await axios
    .delete('member/' + _id)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}
