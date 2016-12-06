import * as defaultLocales from './locales';

export const

  /**
   *
   * @param value
   * @param locales
   */
  isText = (value, locales = defaultLocales) => new Promise((resolve, reject) => typeof value === 'string' ?
    resolve([locales.LEGIT(value)]) : reject([locales.NOT_LEGIT(value)])),

  /**
   *
   * @param value
   * @param locales
   */
  notEmpty = (value, locales = defaultLocales) => isText(value, locales)
    .then(response => value.length > 0 ?
        Promise.resolve([...response, locales.LEGIT(value)]) : Promise.reject([locales.EMPTY(value)]))
    .catch(response => Promise.reject([...response, locales.EMPTY(value)])),

  /**
   *
   * @param value
   * @param locales
   * @param min
   */
  minLowerCaseChars = (value, locales = defaultLocales, min = 1) => isText(value, locales)
    .then(response => {
      const pattern = new RegExp(/\p{Lowercase_Letter}/u, 'g'); //eslint-disable-line

      if (value.match(pattern).length >= min) {
        return Promise.resolve([...response, locales.LEGIT(value, min)]);
      }
      return Promise.reject([locales.NEED_MORE_LOWER_CASE(value, min)])
    })
    .catch(response => Promise.reject([...response, locales.NEED_MORE_LOWER_CASE(value, min)])),

  /**
   *
   * @param value
   * @param locales
   * @param min
   */
  minUpperCaseChars = (value, locales = defaultLocales, min = 1) => isText(value, locales)
    .then(response => {
      const pattern = new RegExp(/\p{Uppercase_Letter}/u, 'g'); //eslint-disable-line

      if (value.match(pattern).length >= min) {
        return Promise.resolve([...response, locales.LEGIT(value, min)]);
      }
      return Promise.reject([locales.NEED_MORE_UPPER_CASE(value, min)])
    })
    .catch(response => Promise.reject([...response, locales.NEED_MORE_UPPER_CASE(value, min)])),

  /**
   * uses URL from DOM
   * @param value
   * @param locales
   */
  url = (value, locales = defaultLocales) => new Promise((resolve, reject) => {
    try {
      const url = new URL(value);

      if (typeof url === 'object') {
        resolve([locales.LEGIT(value)]);
      }

      reject([locales.URL_IS_NOT_VALID(value)]);

    } catch (error) {
      reject([locales.URL_IS_NOT_VALID(value)]);
    }
  }),

  /**
   * forgiving email check
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

    resolve([locales.LEGIT(value)]);

  }),

  fullName = (value, locales = defaultLocales) => isText(value, locales)
    .then(response => {
      const pattern = new RegExp(/^[\p{L}]([-']?[\p{L}]+)*( [\p{L}]([-']?[\p{L}]+)*)+$/u); //eslint-disable-line

      if (pattern.test(value) === true) {
        return Promise.resolve([...response, locales.LEGIT(value)]);
      }
      return Promise.reject([locales.FULL_NAME_IS_NOT_VALID(value)])
    })
    .catch(response => Promise.reject([...response, locales.FULL_NAME_IS_NOT_VALID(value)]));
