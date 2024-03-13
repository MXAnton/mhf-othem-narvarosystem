import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'

export async function getAllNarvaroYear(_year) {
  let response = await axios
    .get('narvaro/year/' + _year)
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
    .get('narvaro/date/' + _date)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function getNarvaroAmountToday() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Adding 1 because months are zero-indexed
  const day = currentDate.getDate().toString().padStart(2, '0')
  // Construct the date string in the desired format
  const formattedDate = `${year}-${month}-${day}`

  let response = await axios
    .get('narvaro/amount/date/' + formattedDate)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return null
    })

  return response
}

export async function getNarvaroDate(_date, _personnummer) {
  let response = await axios
    .get(`narvaro/date/${_date}/${_personnummer}`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.warn(err)
      return err
    })

  return response
}

export async function createNarvaro(_personnummer, _firstName, _lastName, _type, _hasLicense) {
  let response = await axios
    .post('narvaro', {
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
