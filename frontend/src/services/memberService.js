import axiosInstance from './index'

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
      return err
    })

  return response
}

export async function deleteMember(_id) {
  let response = await axiosInstance
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
