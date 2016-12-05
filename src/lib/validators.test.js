import * as locales from './locales';
import * as validators from './validators';
import { flattenResponse } from './Legitimate';


jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

describe('validators', () => {

  /** @test {validators} */
  it('must be object', () => {
    expect(typeof validators).toBe('object');
  });

  /** @test {validators#isText} */
  describe('isText', () => {

    it('could resolve', cb => {

      const testText = 'Just TESTING';

      validators
        .isText(testText)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT(testText));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      validators
        .isText(null)
        .then(flattenResponse)
        .then(response => {
          cb.fail(response);
        })
        .catch((...response) => {

          flattenResponse(...response)
            .then(response => {
              expect(response).toContain(locales.NOT_LEGIT(null));
              cb();
            })
            .catch(cb.fail)
        });

    });

  });

  /** @test {validators#notEmpty} */
  describe('notEmpty', () => {

    it('could resolve', cb => {

      validators
        .notEmpty('string')
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT('string'));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      validators
        .notEmpty('')
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.NOT_LEGIT(''));
          cb();
        });

    });

  })

});
