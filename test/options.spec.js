const { test } = require('uvu');
const { is, throws } = require('uvu/assert');
const { validate } = require('schema-utils');

const schema = require('../src/options.json');

const check = (options) => validate(schema, options, {
  name: "CssMqpackerPlugin",
  baseDataPath: "options",
});

test('empty options', () => {
  is(check({}), undefined);
});

test('valid `sort` option when it is a boolean', () => {
  is(check({ sort: true }), undefined);
  is(check({ sort: false }), undefined);
});

test('invalid `sort` option', () => {
  throws(() => check({ sort: 1 }));
  throws(() => check({ sort: 0 }));
  throws(() => check({ sort: 'some' }));
  throws(() => check({ sort: null }));
});

test.run();
