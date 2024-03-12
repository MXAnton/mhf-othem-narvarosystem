import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/narvaro/'

export async function getAllNarvaroYear(_year) {
  let response = await axios
    .get('year/' + _year)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function getAllNarvaroDate(_date) {
  let response = await axios
    .get('date/' + _date)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function createNarvaro(_personnummer, _firstName, _lastName, _type, _hasLicense) {
  let response = await axios
    .post('', {
      personnummer: _personnummer,
      first_name: _firstName,
      last_name: _lastName,
      type: _type,
      has_license: _hasLicense
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return err
    })

  return response
}
