# css-mqpacker-webpack-plugin

[![npm version](https://img.shields.io/npm/v/css-mqpacker-webpack-plugin.svg)](https://www.npmjs.com/package/css-mqpacker-webpack-plugin)

The Webpack plugin for pack same CSS media query rules into one using [PostCSS](https://github.com/postcss/postcss).

> [node-css-mqpacker](https://github.com/hail2u/node-css-mqpacker)

## Install

```bash
npm i css-mqpacker-webpack-plugin --save-dev
# or
yarn add css-mqpacker-webpack-plugin -D
```

## Example

**webpack.config.js**

```js
const CssMqpackerPlugin = require('css-mqpacker-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMqpackerPlugin(),
    ],
  },
};
```

## Options

### `test`

Type: `String|RegExp|Array<String|RegExp>` Default: `/\.css(\?.*)?$/i`

Test to match files against.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMqpackerPlugin({
        test: /\.foo\.css$/i,
      }),
    ],
  },
};
```

### `include`

Type: `String|RegExp|Array<String|RegExp>` Default: `undefined`

Files to include.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMqpackerPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### `exclude`

Type: `String|RegExp|Array<String|RegExp>` Default: `undefined`

Files to exclude.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMqpackerPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### `sort`

Type: `Boolean|Function` Default: `false`

By default, CSS MQPacker pack and order media queries as they are defined ([the “first win” algorithm](https://github.com/hail2u/node-css-mqpacker#the-first-win-algorithm)). If you want to sort media queries automatically, pass `sort: true`.

**webpack.config.js**

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CssMqpackerPlugin({
        sort: true,
      }),
    ],
  },
};
```

## License

[MIT](./LICENSE)
