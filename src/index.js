const postcss = require('postcss');
const { validate } = require('schema-utils');
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

    const process = async (name) => {
      const { source } = compilation.getAsset(name);
      const { css } = await this.mqp.process(source.source());

      compilation.updateAsset(name, new RawSource(css));
    };

    const scheduledTasks = Object
      .keys(typeof assets === 'undefined' ? compilation.assets : assets)
      .reduce((tasks, name) => {
        if (matchObject(name)) {
          tasks.push(process(name));
        }

        return tasks;
      }, []);

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
