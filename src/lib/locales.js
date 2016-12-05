const
  okHand = String.fromCodePoint(0x1F44C),
  crossMark = String.fromCodePoint(0x274C);

export const

  LEGIT = () => okHand,

  NOT_LEGIT = () => crossMark,

  EMPTY = () => `Could not be empty`,

  TOO_SHORT = (value, length) => `Must be longer than ${length} characters`,

  NEED_MORE_LOWER_CASE = (value, min) => `At least ${min} small case`;
