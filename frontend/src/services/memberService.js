import axiosInstance from './index'

export async function downloadMemberlistFromDropbox() {
  let response = await axiosInstance
    .get('download-memberlist')
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

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
      return err
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

export async function updateMember(_personnummer, _firstName, _lastName, _endDate) {
  let response = await axiosInstance
    .put('member/' + _personnummer, {
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
