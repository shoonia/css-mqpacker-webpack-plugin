# css-mqpacker-webpack-plugin

[![npm version](https://img.shields.io/npm/v/css-mqpacker-webpack-plugin.svg)](https://www.npmjs.com/package/css-mqpacker-webpack-plugin)


The Webpack plugin for pack same CSS media query rules into one using PostCSS.

> [node-css-mqpacker](https://github.com/hail2u/node-css-mqpacker)

## Install

```bash
npm i css-mqpacker-webpack-plugin --save-dev
#or
yarn add css-mqpacker-webpack-plugin -D
```

## Example

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CSSMQPackerPlugin = require('css-mqpacker-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {

  /* ... */

  optimization: {
    minimize: isProd,
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new CSSMQPackerPlugin(),
    ],
  },
  module: {
    rules: [

      /* ... */

      {
        test: /\.css$/,
        use: [
          isProd && { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [

    /* ... */

    isProd && new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
  ].filter(Boolean),
};
```

## Configuration

**`regExp: (default: /\.css$/i)`**

A regular expression to match the asset name that the processor handles.

**`sort: (default: false)`**

By default, CSS MQPacker pack and order media queries as they are defined ([the “first win” algorithm](https://github.com/hail2u/node-css-mqpacker#the-first-win-algorithm)). If you want to sort media queries automatically, pass `sort: true`.

```js
new CSSMQPackerPlugin({
  regExp: /\.css$/i,
  sort: false,
})
```

## License

[MIT](./LICENSE)
