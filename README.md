# legitimate

[![npm][npm-image]][npm-url]
[![docs][docs-image]][docs-url]
[![build][travis-image]][travis-url]
[![codecov][codecov-image]][codecov-url]
[![dependencies][david-image]][david-url]
[![version][tag-image]][tag-url]

Modular async validation 👌

## [Docs](https://jacopkane.github.io/legitimate/docs "Docs")

## [Demo](https://jacopkane.github.io/legitimate/ "Demo")

## Installation

```bash
npm install --save legitimate
```
or
```bash
yarn add legitimate
```

## Usage

```javascript
import { Legitimate, validators } from 'legitimate';

const legitimate = new Legitimate();

legitimate
  .addRule('propToValidate', validators.notEmpty)
  .update('propToValidate', 'value')
  .validate('propToValidate') //validates single prop
  .then(response => response.map(console.log))
  .catch(response => response.map(console.warn));
```

more customization:

```javascript
import { Legitimate, validators, locales } from 'legitimate';

const
  legitimate = new Legitimate({
    ...locales
    TOO_SHORT : (value, min) => `Custom message : ${min}`;
  }, {

  }),
  secondPropRules = [
    validators.isText,
    (...params) => validators.minLowerCaseChars(...params, 2)
  ];

legitimate
  .addRule('propToValidate', validations.notEmpty)
  .addRule('anotherProp', ...secondPropRules)
  .update('anotherProp', 'aaBBBB')
  .isLegit() //validates all state
  .then(response => response.map(console.log))
  .catch(response => response.map(console.warn));
```



## Development

### start demo
```bash
npm start
```
or
```bash
yarn start
```

### build
```bash
npm run build
```
or
```bash
yarn build
```

### test
```bash
npm test
```
or
```bash
npm test -- --coverage
```
or
```bash
yarn test
```

### version & publish
For versioning you can use [npm version command](https://docs.npmjs.com/cli/version) with [semver](http://semver.org/)

It will also
- test
- build
- generate docs
- stage
- commit
- push the tags to tracked remote repository
- push the demo
- if CI will pass also get deployed to NPM

```bash
npm version patch -f -m "Backwards-compatible bug fixes";
```
or
```bash
npm version minor -f -m "Backwards-compatible new functionality";
```
or
```bash
yarn version major -f -m "Made incompatible API changes";
```

[docs-image]: https://doc.esdoc.org/github.com/JacopKane/legitimate/badge.svg
[docs-url]: https://jacopkane.github.io/legitimate/docs/
[npm-image]: https://img.shields.io/npm/v/legitimate.svg
[npm-url]:https://www.npmjs.org/package/legitimate
[codecov-image]: https://codecov.io/gh/jacopkane/legitimate/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/jacopkane/legitimate
[travis-url]: https://travis-ci.org/JacopKane/legitimate
[travis-image]: https://travis-ci.org/JacopKane/legitimate.svg?branch=master
[david-url]: https://david-dm.org/jacopkane/legitimate?type=dev
[david-image]: https://david-dm.org/jacopkane/legitimate/dev-status.svg
[tag-image]: https://img.shields.io/github/tag/jacopkane/legitimate.svg
[tag-url]: https://github.com/jacopkane/legitimate/tags
