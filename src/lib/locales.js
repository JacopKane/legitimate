const
  okHand = String.fromCodePoint(0x1F44C),
  crossMark = String.fromCodePoint(0x274C);

export const

  LEGIT = () => okHand,

  NOT_LEGIT = () => crossMark,

  EMPTY = () => `Could not be empty`,

  TOO_SHORT = (value, length) => `At least ${length} characters required`,

  NEED_MORE_LOWER_CASE = (value, min) => `At least ${min} small case characters required`,

  NEED_MORE_UPPER_CASE = (value, min) => `At least ${min} upper case characters required`,

  URL_IS_NOT_VALID = (value) => `${value} is not a valid URL`,

  EMAIL_IS_NOT_VALID = (value) => `${value} is not a valid email`,

  FULL_NAME_IS_NOT_VALID = (value) => `${value} is not a valid full name`;

