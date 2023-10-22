/**
 * The `@hail2u/css-mqpacker` package uses the GitHub register.
 * It may create a problem in CI,
 * therefore, we commit the `css-mqpacker` package with this one.
 */

import { resolve } from 'node:path';
import fse from 'fs-extra';
import pkg from '@hail2u/css-mqpacker/package.json' assert { type: 'json' };

const fromDir = './node_modules/@hail2u/css-mqpacker';
const toDir = './css-mqpacker';

const packageJson = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author,
  homepage: pkg.homepage,
  license: pkg.license,
  private: true,
};

await fse.emptyDir(toDir);
await Promise.all([
  fse.copy(resolve(fromDir, 'index.js'), resolve(toDir, 'index.js')),
  fse.outputJSON(resolve(toDir, 'package.json'), packageJson, { spaces: 2 }),
]);
