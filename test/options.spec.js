const test = require('node:test');
const { strictEqual, throws } = require('node:assert/strict');
const { validate, ValidationError } = require('schema-utils');

const schema = require('../src/options.json');

const invalidList = [1, 0, '', null, {}, x => x, [null]];

const check = (options) => validate(schema, options, {
  name: "CssMqpackerPlugin",
  baseDataPath: "options",
});

test('empty options', () => {
  strictEqual(check({}), undefined);
});

test('invalid options', () => {
  throws(() => check(x => x), ValidationError);
});

test('unknown option', () => {
  throws(() => check({ some: 'hello' }), ValidationError);
})

// test:

test('valid `test` option when it is a string', () => {
  strictEqual(check({ test: '.css' }), undefined);
  strictEqual(check({ test: ['.css'] }), undefined);
});

test('valid `test` option when it is a RegExp', () => {
  strictEqual(check({ test: /\.css/ }), undefined);
  strictEqual(check({ test: [/\.css/] }), undefined);
});

test('invalid `test` option', () => {
  invalidList.forEach((test) => {
    throws(() => check({ test }), ValidationError);
  });
});

// include:

test('valid `include` option when it is a string', () => {
  strictEqual(check({ include: '.css' }), undefined);
  strictEqual(check({ include: ['.css'] }), undefined);
});

test('valid `include` option when it is a RegExp', () => {
  strictEqual(check({ include: /\.css/ }), undefined);
  strictEqual(check({ include: [/\.css/] }), undefined);
});

test('invalid `include` option', () => {
  invalidList.forEach((include) => {
    throws(() => check({ include }), ValidationError);
  });
});

// exclude:

test('valid `exclude` option when it is a string', () => {
  strictEqual(check({ exclude: '.css' }), undefined);
  strictEqual(check({ exclude: ['.css'] }), undefined);
});

test('valid `exclude` option when it is a RegExp', () => {
  strictEqual(check({ exclude: /\.css/ }), undefined);
  strictEqual(check({ exclude: [/\.css/] }), undefined);
});

test('invalid `exclude` option', () => {
  invalidList.forEach((exclude) => {
    throws(() => check({ exclude }), ValidationError);
  });
});

// sort:

test('valid `sort` option when it is a boolean', () => {
  strictEqual(check({ sort: true }), undefined);
  strictEqual(check({ sort: false }), undefined);
});

test('valid `sort` option when it is a function', () => {
  strictEqual(check({ sort: x => x }), undefined);
})

test('invalid `sort` option', () => {
  [1, 0, '', 'some', null].forEach((sort) => {
    throws(() => check({ sort }), ValidationError);
  });
});
