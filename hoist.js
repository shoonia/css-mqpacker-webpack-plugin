/**
 * The `@hail2u/css-mqpacker` package uses the GitHub register.
 * It may create a problem in CI,
 * therefore, we commit the `css-mqpacker` package with this one.
 */

 const { resolve } = require('node:path');
 const { emptyDir, copy, outputJSON } = require('fs-extra');
 const pkg = require('@hail2u/css-mqpacker/package.json');

 const fromDir = resolve(__dirname, 'node_modules/@hail2u/css-mqpacker');
 const toDir = resolve(__dirname, 'css-mqpacker');

 const toPkg = {
   name: pkg.name,
   version: pkg.version,
   author: pkg.author,
   homepage: pkg.homepage,
   license: pkg.license,
   private: true,
 };

 (async () => {
   await emptyDir(toDir);
   await copy(resolve(fromDir, 'index.js'), resolve(toDir, 'index.js'));
   await outputJSON(resolve(toDir, 'package.json'), toPkg, { spaces: 2 });
 })();
