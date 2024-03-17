import axiosInstance from './index'

import { dateFormatted } from '@/helpers'

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
  const currentDateFormatted = dateFormatted(new Date())

  let response = await axiosInstance
    .get('narvaro/amount/date/' + currentDateFormatted)
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
