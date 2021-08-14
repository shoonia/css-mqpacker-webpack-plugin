# css-mqpacker-webpack-plugin

[![npm version](https://img.shields.io/npm/v/css-mqpacker-webpack-plugin.svg)](https://www.npmjs.com/package/css-mqpacker-webpack-plugin)


The Webpack plugin for pack same CSS media query rules into one using PostCSS.

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
const CSSMQPackerPlugin = require('css-mqpacker-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMQPackerPlugin(),
    ],
  },
};
```

## Options

### `test`

Type: `RegExp` Default: `/\.css(\?.*)?$/i`

A regular expression to match the asset name that the processor handles.

### `sort`

Type: `Boolean` Default: `false`

By default, CSS MQPacker pack and order media queries as they are defined ([the “first win” algorithm](https://github.com/hail2u/node-css-mqpacker#the-first-win-algorithm)). If you want to sort media queries automatically, pass `sort: true`.

**webpack.config.js**

```js
const CSSMQPackerPlugin = require('css-mqpacker-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMQPackerPlugin({
        test: /\.css(\?.*)?$/i,
        sort: false,
      }),
    ],
  },
};
```

## License

[MIT](./LICENSE)
