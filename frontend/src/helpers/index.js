export function personNumFormatted(_personNum) {
  if (_personNum == null) {
    return null
  }

  if (isPersonNumValid(_personNum) !== true) {
    return null
  }

  return _personNum.substring(0, 8) + '-' + _personNum.substring(8)
}

export function dateFormatted(_date) {
  if (_date == null) {
    return null
  }

  const year = _date.getFullYear()
  // Adding 1 because months are zero-indexed
  // padStarts makes sure there is always 2 characters in month and date
  // ex: 1 becomes 01, but 12 stays 12
  const month = (_date.getMonth() + 1).toString().padStart(2, '0')
  const day = _date.getDate().toString().padStart(2, '0')

  // Construct the date string in the desired format
  return `${year}-${month}-${day}`
}

export function isPersonNumValid(_personNum) {
  if (_personNum == null) {
    return 'Måste ange personnummer.'
  }

  if (/\D/.test(_personNum) === true) {
    return 'Personnumret får bara innehålla siffror.'
  }

  if (_personNum.length != 12) {
    return 'Personnummret måste vara 12 siffror.'
  }

  const currentYear = new Date().getFullYear()
  if (_personNum < (currentYear - 150) * Math.pow(10, 8)) {
    // Person too old to exist, birthdate more than 150 years from now
    return `Du kan inte vara född för ${currentYear - _personNum.substring(0, 4)} år sen.`
  }
  if (_personNum > currentYear * Math.pow(10, 8)) {
    // Person too young to exist, birthdate after currentYear
    return 'Du kan inte vara född i framtiden.'
  }

  const month = parseInt(_personNum.substring(4, 6))
  if (month < 1 || month > 12) {
    return 'Skriv in en giltig månad.'
  }

  const day = parseInt(_personNum.substring(6, 8))
  if (day < 1 || day > 31) {
    return 'Skriv in en giltig dag.'
  }

  // Check with mathematical function if personNum could be legit
  const smallPersonNumArray = _personNum.substring(2).split('')
  let checkSum = 0
  for (let _i = 0; _i < smallPersonNumArray.length; _i++) {
    let num = parseInt(smallPersonNumArray[_i])
    if (_i % 2 === 0) {
      // If even number
      num *= 2
    }

    num
      .toString()
      .split('')
      .forEach((_digit) => {
        checkSum += parseInt(_digit)
      })
  }
  if (checkSum % 10 !== 0) {
    return 'Personnummret är inte giltigt.'
  }

  return true
}

export function isNamesValid(_firstName, _lastName) {
  if (_firstName == null || _firstName.trim().length === 0) {
    return 'Skriv in ditt förnamn.'
  }
  if (_lastName == null || _lastName.trim().length === 0) {
    return 'Skriv in ditt efternamn.'
  }

  return true
}

export function needsToPay(_type, _activeMember, _needLicense) {
  const weekDayIndex = new Date().getDay()

  if (_type === 'Ledare' || (weekDayIndex === 1 && (_needLicense === false || _activeMember))) {
    return false
  }

  return true
}
