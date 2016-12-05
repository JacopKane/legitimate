import * as defaultValidators from './validators';
import * as defaultLocales from './locales';

const
  rulesMap = new WeakMap(),
  stateMap = new WeakMap(),
  localesMap = new WeakMap(),
  isPropProper = prop => {
    if (typeof prop !== 'string') {
      throw new Error('Given prop must be a valid string in order to update');
    }
  };

/**
 * Union
 * @param response
 */
export const flattenResponse = response => new Promise((resolve, reject) => {
  try {
    if (typeof response !== 'object') {
      throw new Error(`${response} should be object`);
    }
    if (response instanceof Array === false) {
      return resolve(response);
    }
    resolve([...new Set([].concat(...response))]);
  } catch (error) {
    reject(error);
  }
});

/**
 * @class {class} Legitimate
 * @classdesc Legitimate class to validate given state by updating and validating
 */
export class Legitimate {

  /**
   * @property state
   * @readonly
   * @description Returns the current state
   * @type {object}
   */
  get state() {
    return stateMap.get(this);
  }

  /**
   * @property rules
   * @readonly
   * @description Returns the current rules
   * @type {object}
   */
  get rules() {
    return rulesMap.get(this);
  }

  /**
   * @property locales
   * @readonly
   * @description Returns the current locales
   * @type {object}
   */
  get locales() {
    return localesMap.get(this);
  }

  /**
   * @constructor
   * @param locales {object} [param=defaultLocales]
   * @param initialState {object} [initialState={}]
   */
  constructor(locales = defaultLocales, initialState = {}) {

    rulesMap.set(this, Object.create(null));
    stateMap.set(this, initialState);
    localesMap.set(this, locales);
  }

  /**
   * Sets validation functions for given prop
   * @param prop
   * @param rulesToAdd
   * @returns {Legitimate}
   */
  setRules(prop = false, ...rulesToAdd) {
    isPropProper(prop);

    rulesMap.set(this, { ...this.rules, [prop] : [...rulesToAdd] });

    return this;
  }

  /**
   * Updates the state by given prop and value
   * @param prop {string}
   * @param value {*}
   * @returns {Legitimate}
   */
  update(prop = false, value) {
    isPropProper(prop);

    stateMap
      .set(this, { ...this.state, [prop] : value });

    return this;
  }

  /**
   * Triggers defined rules for prop
   * @param prop
   * @returns {Promise.<*>}
   */
  validate(prop) {
    return new Promise((resolve, reject) => {

      isPropProper(prop);

      Promise
        .all(this.rules[prop].map(validator => validator(this.state[prop], this.locales)))
        .then(flattenResponse)
        .then(resolve)
        .catch(reject);

    });
  }

  /**
   * Validate all
   * @returns {Promise.<*>}
   */
  isLegit() {
    return Promise
      .all(Object.keys(this.rules).map(::this.validate))
      .then(flattenResponse)
      .then(::Promise.resolve)
      .catch(response => {

        return flattenResponse(response)
          .then(::Promise.reject)
          .catch(::Promise.reject);

      });
  }

}

export const
  locales = defaultLocales,
  validators = defaultValidators;

export default Legitimate;
