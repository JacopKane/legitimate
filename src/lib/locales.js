const
  okHand = String.fromCodePoint(0x1F44C),
  crossMark = String.fromCodePoint(0x274C);

export const

  LEGIT = () => okHand,

  NOT_LEGIT = () => `${crossMark}`,

  TEXT_LEGIT = LEGIT,

  NOT_ALPHANUMERIC_LEGIT = LEGIT,

  NOT_ALPHANUMERIC = (value = '') => `${crossMark} ${value} must contain only letters and numerals`,

  EMPTY_LEGIT = LEGIT,

  EMPTY = () => `${crossMark} Could not be empty`,

  TOO_SHORT = (value = '', min = '') => `${crossMark} ${value} is shorter than ${min} characters`,

  TOO_SHORT_LEGIT = LEGIT,

  TOO_LONG = (value = '', max = '') => `${crossMark} ${value} is longer than ${max} characters`,

  TOO_LONG_LEGIT = LEGIT,

  NEED_MORE_LOWER_CASE = (value = '', min = '') => `${crossMark} At least ${min} small case characters required`,

  NEED_MORE_LOWER_CASE_LEGIT = LEGIT,

  NEED_MORE_UPPER_CASE = (value = '', min = '') => `${crossMark} At least ${min} upper case characters required`,

  NEED_MORE_UPPER_CASE_LEGIT = LEGIT,

  URL_IS_NOT_VALID = (value = '') => `${crossMark} ${value} is not a valid URL`,

  URL_IS_NOT_VALID_LEGIT = LEGIT,

  EMAIL_IS_NOT_VALID = (value = '') => `${crossMark} ${value} is not a valid email`,

  EMAIL_IS_NOT_VALID_LEGIT = LEGIT,

  FULL_NAME_IS_NOT_VALID = (value = '') => `${crossMark} ${value} is not a valid full name`,

  FULL_NAME_IS_NOT_VALID_LEGIT = LEGIT;

