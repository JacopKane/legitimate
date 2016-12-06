import * as locales from './locales';
import * as validators from './validators';
import { flattenResponse } from './Legitimate';


jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

describe('validators', () => {

  /** @test {validators} */
  it('must be object', () => {
    expect(typeof validators).toBe('object');
  });

  /** @test {isText} */
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

  /** @test {notEmpty} */
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
          expect(response).toContain(locales.EMPTY(''));
          cb();
        });

    });

  });

  /** @test {minLowerCaseChars} */
  describe('minLowerCaseChars', () => {

    it('could resolve', cb => {

      let value = 'aüöıBBBB';

      validators
        .minLowerCaseChars(value, locales, 4)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT(value, 4));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'üöıBBBB';

      validators
        .minLowerCaseChars(value, locales, 4)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.NEED_MORE_LOWER_CASE(value, 4));
          cb();
        });

    });

  })

  /** @test {minUpperCaseChars} */
  describe('minUpperCaseChars', () => {

    it('could resolve', cb => {

      let value = 'BbbBbBBÇ';

      validators
        .minUpperCaseChars(value, locales, 5)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT(value, 5));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'BbbBbBBÇ';

      validators
        .minUpperCaseChars(value, locales, 6)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.NEED_MORE_UPPER_CASE(value, 6));
          cb();
        });

    });

  })

  /** @test {url} */
  describe('url', () => {

    it('could resolve', cb => {

      let value = 'https://example.org/file?a=b&c=d';

      validators
        .url(value, locales)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT(value));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'https//example.orgfile?a=b&c=d';

      validators
        .url(value, locales)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.URL_IS_NOT_VALID(value));
          cb();
        });

    });

  });

  /** @test {email} */
  describe('email', () => {

    it('could resolve', cb => {

      let value = 'furkan@τεστ.com';

      validators
        .email(value, locales)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT(value));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'asdasd.asa';

      validators
        .email(value, locales)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.EMAIL_IS_NOT_VALID(value));
          cb();
        });

    });

  });

  /** @test {fullName} */
  describe('fullName', () => {

    it('could resolve', cb => {

      let value = 'Furkan Tunalı öçÜ';

      validators
        .fullName(value, locales)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.LEGIT(value));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'Abc.Aa';

      validators
        .fullName(value, locales)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.FULL_NAME_IS_NOT_VALID(value));
          cb();
        });

    });

  })

});
