import * as defaultLocales from './locales';

export const

  /**
   * Checks string
   * @param value
   * @param locales
   */
  isText = (value, locales = defaultLocales) => new Promise((resolve, reject) => typeof value === 'string' ?
    resolve([locales.LEGIT(value)]) : reject([locales.NOT_LEGIT(value)])),

  /**
   * Checks for latin alphanumeric
   * @param value
   * @param locales
   */
  alphanumeric = (value, locales = defaultLocales) => isText(value)
    .then(response => RegExp(/^[a-zA-Z0-9]*$/).test(value)
      ? Promise.resolve([...response, locales.NOT_ALPHANUMERIC_LEGIT(value)])
        : Promise.reject([locales.NOT_ALPHANUMERIC(value)]))
    .catch(response => Promise.reject([...response])),

  /**
   * Checks if string has some length
   * @param value
   * @param locales
   */
  notEmpty = (value, locales = defaultLocales) => isText(value, locales)
    .then(response => value.length > 0 ?
        Promise.resolve([...response, locales.EMPTY_LEGIT(value)]) : Promise.reject([locales.EMPTY(value)]))
    .catch(response => Promise.reject([...response])),

  /**
   * Checks minimum chars
   * @param value
   * @param locales
   * @param min
   */
  min = (value, locales = defaultLocales, min = 1) => isText(value, locales)
    .then(response => value.length >= min ?
      Promise.resolve([...response, locales.TOO_SHORT_LEGIT(value)]) : Promise.reject([locales.TOO_SHORT(value, min)]))
    .catch(response => Promise.reject([...response])),

  /**
   * Checks maximum chars
   * @param value
   * @param locales
   * @param max
   */
  max = (value, locales = defaultLocales, max = 1) => isText(value, locales)
    .then(response => (value.length <= max)
      ? Promise.resolve([...response, locales.TOO_LONG_LEGIT(value, max)])
        : Promise.reject([locales.TOO_LONG(value, max)]))
    .catch(response => Promise.reject([...response])),

  /**
   * Checks minimum amount of lower cases with unicode support
   * @param value
   * @param locales
   *
   * @param min
   */
  minLowerCaseChars = (value, locales = defaultLocales, min = 1) => isText(value, locales)
    .then(response => {
      const pattern = new RegExp(/\p{Lowercase_Letter}/u, 'g'); //eslint-disable-line

      if (value.match(pattern).length >= min) {
        return Promise.resolve([...response, locales.NEED_MORE_LOWER_CASE_LEGIT(value, min)]);
      }
      return Promise.reject([locales.NEED_MORE_LOWER_CASE(value, min)])
    })
    .catch(response => Promise.reject([...response])),

  /**
   * Checks minimum amount of upper cases with unicode support
   * @param value
   * @param locales
   * @param min
   */
  minUpperCaseChars = (value, locales = defaultLocales, min = 1) => isText(value, locales)
    .then(response => {
      const pattern = new RegExp(/\p{Uppercase_Letter}/u, 'g'); //eslint-disable-line

      if (value.match(pattern).length >= min) {
        return Promise.resolve([...response, locales.NEED_MORE_UPPER_CASE_LEGIT(value, min)]);
      }
      return Promise.reject([locales.NEED_MORE_UPPER_CASE(value, min)])
    })
    .catch(response => Promise.reject([...response])),

  /**
   * Checks URL with URL parser spec
   * @param value
   * @param locales
   */
  url = (value, locales = defaultLocales) => new Promise((resolve, reject) => {
    try {
      const url = new URL(value);

      if (typeof url === 'object') {
        resolve([locales.URL_IS_NOT_VALID_LEGIT(value)]);
      }

      reject([locales.URL_IS_NOT_VALID(value)]);

    } catch (error) {
      reject([locales.URL_IS_NOT_VALID(value)]);
    }
  }),

  /**
   * Forgiving email check, checks dots and @
   * @param value
   * @param locales
   */
  email = (value, locales = defaultLocales) => new Promise((resolve, reject) => {

    const atPosition = value.lastIndexOf("@");

    if (atPosition <= 0) {
      reject([locales.EMAIL_IS_NOT_VALID(value)]);
    }

    if (value.lastIndexOf(".") <= atPosition) {
      reject([locales.EMAIL_IS_NOT_VALID(value)]);
    }

    if (value.length - atPosition <= 4) {
      reject([locales.EMAIL_IS_NOT_VALID(value)]);
    }

    resolve([locales.EMAIL_IS_NOT_VALID_LEGIT(value)]);

  }),

  /**
   * Checks an at least two names and special chars
   * @param value
   * @param locales
   */
  fullName = (value, locales = defaultLocales) => isText(value, locales)
    .then(response => {
      const pattern = new RegExp(/^[\p{L}]([-']?[\p{L}]+)*( [\p{L}]([-']?[\p{L}]+)*)+$/u); //eslint-disable-line

      if (pattern.test(value) === true) {
        return Promise.resolve([...response, locales.FULL_NAME_IS_NOT_VALID_LEGIT(value)]);
      }
      return Promise.reject([locales.FULL_NAME_IS_NOT_VALID(value)])
    })
    .catch(response => Promise.reject([...response, locales.FULL_NAME_IS_NOT_VALID(value)]));
