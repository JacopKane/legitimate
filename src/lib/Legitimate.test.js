import { Legitimate, flattenResponse, locales, validators as defaultValidators } from './Legitimate';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

/** @test {Legitimate} */
describe('Legitimate', () => {

  let legitimate;

  const
    TEST_OK = value => `alright value : ${value}`,
    TEST_NOT_OKAY = value => `nope value : ${value}`,
    validators = {
      ...defaultValidators,
      mock : jest.fn(),
      async : (value, locales) => new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve([locales.TEST_OK(value)])
        }, 200);
      }),
      test : (value, locales) => new Promise((resolve) => {
        return resolve([locales.TEST_OK(value)]);
      }),
      testFail : (value, locales) => {
        return validators.reject([locales.TEST_NOT_OKAY(value)]);
      }
    },
    testLocales = {
      ...locales,
      TEST_OK,
      TEST_NOT_OKAY
    };

  /** @test {Legitimate#constructor} */
  it('can initialize', () => {
    legitimate = new Legitimate(testLocales, {
      invalidProp : undefined,
      validProp : 'valid prop'
    });
    expect(legitimate).toBeInstanceOf(Legitimate);
  });

  /** @test {Legitimate#constructor} */
  it('legitimate instanceof Legitimate', () => {
    expect(legitimate instanceof Legitimate).toBe(true);
  });

  /** @test {Legitimate#rules} */
  it('get rules', () => {
    expect(typeof legitimate.rules).toBe('object');
  });

  /** @test {Legitimate#state} */
  it('get state', () => {
    expect(typeof legitimate.state).toBe('object');
  });

  /** @test {Legitimate#locales} */
  it('get locales', () => {
    expect(typeof legitimate.locales).toBe('object');
  });

  /** @test {flattenResponse} */
  describe('flattenResponse', () => {

    it('resolve array', cb => {
      flattenResponse([1, 2, 3, 1, 2, 3])
        .then(response => {
          expect(response).toEqual([1,2,3]);
          cb();
        })
        .catch(cb.fail)
    });

    it('resolve object', cb => {

      const error = new Error('test');

      flattenResponse(error)
        .then(response => {
          expect(response).toEqual(error);
          cb();
        })
        .catch(cb.fail)
    });

    it('reject', cb => {
      flattenResponse('string')
        .then(cb.fail)
        .catch(cb)
    });

  });

  it('fails without string props', cb => {
    expect(() => legitimate.setRules(null)).toThrow();
    expect(() => legitimate.update(null)).toThrow();
    legitimate
      .validate(null)
      .then(cb.fail)
      .catch(cb);
  });

  /** @test {Legitimate#setRules} */
  it('setRules', () => {
    legitimate.setRules('newProp', validators.test);
    expect(legitimate.rules['newProp']).toContain(validators.test);
  });

  /** @test {Legitimate#update} */
  it('update', () => {
    const value = 'updated value';
    legitimate.update('newProp', value);
    expect(legitimate.state['newProp']).toBe(value);
  });

  /** @test {Legitimate#validate} */
  describe('validate', () => {

    it('mock', cb => {

      const
        mockProp = 'mockProp',
        mockVal = 'mockVal';

      legitimate
        .update(mockProp, mockVal)
        .setRules(mockProp, validators.mock)
        .validate(mockProp)
        .then(() => {
          expect(validators.mock).toHaveBeenLastCalledWith(mockVal, testLocales);
          cb();
        })
        .catch(cb.fail);
    });

    it('real', cb => {

      let val = 'newPropVal';

      legitimate
        .update('newProp', val)
        .setRules('newProp', validators.test)
        .validate('newProp')
        .then(messages => {
          expect(messages instanceof Array).toBe(true);
          expect(messages).toContain(testLocales.TEST_OK(val));
          cb();
        })
        .catch(cb.fail);
    });

    describe('complex', () => {

      it('resolve', cb => {

        const
          value = 'aaaBBBB',
          rules = [
            validators.isText,
            validators.notEmpty,
            (...params) => validators.minLowerCaseChars(...params, 3)
          ];

        legitimate
          .update('newProp', value)
          .setRules('newProp', ...rules)
          .validate('newProp')
          .then(response => {
            expect(response instanceof Array).toBe(true);
            expect(response).toContain(testLocales.LEGIT(value));
            cb();
          })
          .catch(cb.fail);



      });

      it('reject', cb => {

        let value = 'aaBBBBBBBB';

        legitimate
          .update('newProp', value)
          .validate('newProp')
          .then(cb.fail)
          .catch(response => {
            expect(response instanceof Array).toBe(true);
            expect(response).toContain(testLocales.NEED_MORE_LOWER_CASE(value, 3));
            cb();
          });

      });

    });

  });

  describe('isLegit', () => {

    it('could reject', cb => {

      const value = legitimate.state.newProp;

      legitimate
        .isLegit()
        .then(error => {
          cb.fail(error);
        })
        .catch(response => {
          expect(response instanceof Array).toBe(true);
          expect(response).toContain(testLocales.NEED_MORE_LOWER_CASE(value, 3));

          cb();
        });

    });

    it('could resolve', cb => {

      const
        value = 'aaaBBBB';

      legitimate
        .update('newProp', value)
        .isLegit()
        .then(response => {
          expect(response instanceof Array).toBe(true);
          expect(response).toContain(testLocales.LEGIT(value));
          cb();
        })
        .catch(cb.fail);

    });

  });

});
