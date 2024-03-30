/**
 * The `@hail2u/css-mqpacker` package uses the GitHub register.
 * It may create a problem in CI,
 * therefore, we commit the `css-mqpacker` package with this one.
 */

import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { rm, mkdir, copyFile, writeFile } from 'node:fs/promises';
import pkg from '@hail2u/css-mqpacker/package.json' with { type: 'json' };

const fromDir = './node_modules/@hail2u/css-mqpacker';
const toDir = './css-mqpacker';

const packageJson = JSON.stringify({
  name: pkg.name,
  version: pkg.version,
  author: pkg.author,
  homepage: pkg.homepage,
  license: pkg.license,
  private: true,
}, null, 2);

if (existsSync(toDir)) {
  await rm(toDir, { recursive: true });
}

await mkdir(toDir);

await Promise.all([
  copyFile(resolve(fromDir, 'index.js'), resolve(toDir, 'index.js')),
  writeFile(resolve(toDir, 'package.json'), packageJson + '\n'),
]);
