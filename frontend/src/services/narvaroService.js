import axios from 'axios'
// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN, // Set the base URL for all requests
  withCredentials: true
})

export async function getAllNarvaroYear(_year) {
  let response = await axiosInstance
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
  let response = await axiosInstance
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

  let response = await axiosInstance
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
  let response = await axiosInstance
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
  let response = await axiosInstance
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
