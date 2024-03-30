const postcss = require("postcss");
const { validate } = require("schema-utils");
const mqpacker = require("../css-mqpacker/index.js");
const schema = require("./options.json");

class CssMqpackerPlugin {
  static name = "CssMqpackerPlugin";

  #match;
  #mqpacker;

  constructor(options = {}) {
    validate(schema, options, {
      name: CssMqpackerPlugin.name,
      baseDataPath: "options",
    });

    const {
      test = /\.css(\?.*)?$/i,
      include,
      exclude,
      sort = false,
    } = options;

    this.#match = {
      test,
      include,
      exclude,
    };

    this.#mqpacker = postcss([
      mqpacker({ sort }),
    ]);
  }

  async #optimize(compiler, compilation, assets) {
    const { RawSource } = compiler.webpack.sources;
    const matchObject = compiler.webpack.ModuleFilenameHelpers.matchObject.bind(
      undefined,
      this.#match,
    );

    const process = async (name) => {
      const data = compilation.getAsset(name).source.source();

      const { css } = await this.#mqpacker.process(data, {
        from: name,
      });

      if (data !== css) {
        compilation.updateAsset(name, new RawSource(css));
      }
    };

    const scheduledTasks = Object
      .keys(typeof assets === "undefined" ? compilation.assets : assets)
      .reduce((tasks, name) => {
        if (matchObject(name)) {
          tasks.push(process(name));
        }

        return tasks;
      }, []);

    Promise.all(scheduledTasks);
  }

  apply(compiler) {
    const processOptions = {
      name: CssMqpackerPlugin.name,
      stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
      additionalAssets: true,
    };

    compiler.hooks.compilation.tap(CssMqpackerPlugin.name, (compilation) => {
      compilation.hooks.processAssets.tapPromise(processOptions, (assets) => {
        return this.#optimize(compiler, compilation, assets);
      });
    });
  }
}

module.exports = CssMqpackerPlugin;
