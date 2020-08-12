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

          async processor(assetName, asset) {
            const { css } = mqpacker.pack(asset.source(), {
              sort,
              from: assetName,
              to: assetName,
            });

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
