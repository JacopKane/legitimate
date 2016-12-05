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
        Promise.resolve([...response, locales.LEGIT(value)]) : Promise.reject([locales.EMPTY]))
    .catch(response => Promise.reject([response, locales.NOT_LEGIT(value)])),

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
    .catch(response => Promise.reject([response, locales.NEED_MORE_LOWER_CASE(value, min)]));
