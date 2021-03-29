const postcss = require('postcss');
const LastCallWebpackPlugin = require('last-call-webpack-plugin');
const mqpacker = require('../css-mqpacker/index.js');

class CSSMQPackerPlugin extends LastCallWebpackPlugin {
  constructor({
    regExp = /\.css$/i,
    canPrint = true,
    sort = false,
  } = {}) {
    super({
      assetProcessors: [
        {
          regExp,
          canPrint,
          phase: LastCallWebpackPlugin.PHASES.OPTIMIZE_CHUNK_ASSETS,

          async processor(_, asset) {
            const { css } = await postcss([
              mqpacker({ sort }),
            ]).process(asset.source());

            return css;
          },
        },
      ],
    });
  }

  buildPluginDescriptor() {
    return { name: 'css-mqpacker-webpack-plugin' };
  }
}

module.exports = CSSMQPackerPlugin;
