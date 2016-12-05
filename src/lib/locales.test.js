import { locales } from './Legitimate'

describe('locales', () => {

  it('should be object', () => {
    expect(typeof locales).toBe('object');
  });

  it('should have proper properties', () => {
    expect(Object.keys(locales).map(localeProp => {
      expect(typeof locales[localeProp]).toBe('function');

      let locale = locales[localeProp]('a', 'b', 'c', 'd', 'e', 'f');
      expect(typeof locale).toBe('string');

    }) instanceof Array).toBe(true);
  });

});
