const postcss = require('postcss');
const validate = require('schema-utils');
const mqpacker = require('../css-mqpacker/index.js');
const schema = require('./options.json');

class CssMqpackerPlugin {
  constructor(options = {}) {
    validate(schema, options, {
      name: "CssMqpackerPlugin",
      baseDataPath: "options",
    });

    const {
      test = /\.css(\?.*)?$/i,
      include,
      exclude,
      sort = false,
    } = options;

    this.options = {
      test,
      include,
      exclude,
    };

    this.mqp = postcss([
      mqpacker({ sort }),
    ]);
  }

  async optimize(compiler, compilation, assets) {
    const { RawSource } = compiler.webpack.sources;
    const matchObject = compiler.webpack.ModuleFilenameHelpers.matchObject.bind(
      undefined,
      this.options,
    );

    const assetsForMinify = Object
      .keys(typeof assets === 'undefined' ? compilation.assets : assets)
      .filter((name) => matchObject(name))
      .map((name) => {
        const { source } = compilation.getAsset(name);

        return { name, inputSource: source };
      });

    const scheduledTasks = [];

    for (const asset of assetsForMinify) {
      const task = async () => {
        const { name, inputSource } = asset;
        const { css } = await this.mqp.process(inputSource.source());

        compilation.updateAsset(name, new RawSource(css));
      };

      scheduledTasks.push(task());
    }

    Promise.all(scheduledTasks);
  }

  apply(compiler) {
    const pluginName = this.constructor.name;

    const processOptions = {
      name: pluginName,
      stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
      additionalAssets: true,
    };

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapPromise(processOptions, (assets) => {
        return this.optimize(compiler, compilation, assets);
      });
    });
  }
}

module.exports = CssMqpackerPlugin;
