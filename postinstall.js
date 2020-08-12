/**
 * post-install git hook
 *
 * The `@hail2u/css-mqpacker` package uses the GitHub register.
 * It may create a problem in CI,
 * therefore, we commit the `css-mqpacker` package with this one.
 */

const { resolve } = require('path');
const { copy } = require('fs-extra');

const fromPath = resolve(__dirname, 'node_modules/@hail2u/css-mqpacker');
const toPath = resolve(__dirname, 'css-mqpacker');

(async () => {
  await copy(fromPath, toPath);
})();
