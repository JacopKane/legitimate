import * as locales from './locales';
import * as validators from './validators';
import { flattenResponse } from './Legitimate';


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

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
          expect(response).toContain(locales.EMPTY_LEGIT('string'));
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

  /** @test {min} */
  describe('min', () => {

    it('could resolve', cb => {

      let value = 'üöı';

      validators
        .min(value, locales, 3)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.TOO_SHORT_LEGIT(value, 3));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'üö';

      validators
        .min(value, locales, 3)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.TOO_SHORT(value, 3));
          cb();
        });

    });

  })

  /** @test {max} */
  describe('max', () => {

    it('could resolve', cb => {

      let value = '12345678';

      validators
        .max(value, locales, 8)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.TOO_LONG_LEGIT(value, 8));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = '12345678';

      validators
        .max(value, locales, 7)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.TOO_LONG(value, 7));
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
          expect(response).toContain(locales.NEED_MORE_LOWER_CASE_LEGIT(value, 4));
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
          expect(response).toContain(locales.NEED_MORE_UPPER_CASE_LEGIT(value, 5));
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
          expect(response).toContain(locales.URL_IS_NOT_VALID_LEGIT(value));
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
          expect(response).toContain(locales.EMAIL_IS_NOT_VALID_LEGIT(value));
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
          expect(response).toContain(locales.FULL_NAME_IS_NOT_VALID_LEGIT(value));
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

  });

  /** @test {username} */
  describe('username', () => {

    it('could resolve', cb => {

      let value = 'jacopkane';

      validators
        .alphanumeric(value, locales)
        .then(flattenResponse)
        .then(response => {
          expect(response).toContain(locales.NOT_ALPHANUMERIC_LEGIT(value));
          cb();
        })
        .catch(cb.fail);

    });

    it('could reject', cb => {

      let value = 'Furkan Tunalı';

      validators
        .alphanumeric(value, locales)
        .then(flattenResponse)
        .then(cb.fail)
        .catch(response => {
          expect(response).toContain(locales.NOT_ALPHANUMERIC(value));
          cb();
        });

    });

  })

});
