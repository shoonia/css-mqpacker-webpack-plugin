const { test } = require('uvu');
const { is, throws } = require('uvu/assert');
const { validate } = require('schema-utils');

const schema = require('../src/options.json');

const invalidList = [1, 0, '', null, {}, x => x, [null]];

const check = (options) => validate(schema, options, {
  name: "CssMqpackerPlugin",
  baseDataPath: "options",
});

test('empty options', () => {
  is(check({}), undefined);
});

test('invalid options', () => {
  throws(() => check(x => x));
});

test('unknown option', () => {
  throws(() => check({ some: 'hello' }));
})

// test:

test('valid `test` option when it is a string', () => {
  is(check({ test: '.css' }), undefined);
  is(check({ test: ['.css'] }), undefined);
});

test('valid `test` option when it is a RegExp', () => {
  is(check({ test: /\.css/ }), undefined);
  is(check({ test: [/\.css/] }), undefined);
});

test('invalid `test` option', () => {
  invalidList.forEach((test) => {
    throws(() => check({ test }));
  });
});

// include:

test('valid `include` option when it is a string', () => {
  is(check({ include: '.css' }), undefined);
  is(check({ include: ['.css'] }), undefined);
});

test('valid `include` option when it is a RegExp', () => {
  is(check({ include: /\.css/ }), undefined);
  is(check({ include: [/\.css/] }), undefined);
});

test('invalid `include` option', () => {
  invalidList.forEach((include) => {
    throws(() => check({ include }));
  });
});

// exclude:

test('valid `exclude` option when it is a string', () => {
  is(check({ exclude: '.css' }), undefined);
  is(check({ exclude: ['.css'] }), undefined);
});

test('valid `exclude` option when it is a RegExp', () => {
  is(check({ exclude: /\.css/ }), undefined);
  is(check({ exclude: [/\.css/] }), undefined);
});

test('invalid `exclude` option', () => {
  invalidList.forEach((exclude) => {
    throws(() => check({ exclude }));
  });
});

// sort:

test('valid `sort` option when it is a boolean', () => {
  is(check({ sort: true }), undefined);
  is(check({ sort: false }), undefined);
});

test('valid `sort` option when it is a function', () => {
  is(check({ sort: x => x }), undefined);
})

test('invalid `sort` option', () => {
  [1, 0, '', 'some', null].forEach((sort) => {
    throws(() => check({ sort }));
  });
});

test.run();
