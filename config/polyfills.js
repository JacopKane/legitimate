if (typeof self === 'undefined') {
  self = global;
}

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

if (typeof WeakMap === 'undefined') {
  require('core-js/es6/weak-map');
}

if (typeof Set === 'undefined') {
  require('core-js/es6/set');
}

if (typeof URL === 'undefined') {
  require('url-parse');
} else {
  require('url-parse');
}

if (typeof String.fromCodePoint === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('core-js/modules/es6.string.from-code-point');
}


// fetch() polyfill for making API calls.
require('isomorphic-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
