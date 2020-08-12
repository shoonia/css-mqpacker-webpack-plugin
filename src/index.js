const LastCallWebpackPlugin = require('last-call-webpack-plugin');
const mqpacker = require('../css-mqpacker');

class CSSMQPackerPlugin extends LastCallWebpackPlugin {
  constructor() {
    super({
      assetProcessors: [
        {
          phase: LastCallWebpackPlugin.PHASES.OPTIMIZE_CHUNK_ASSETS,
          regExp: /\.css(\?.*)?$/i,
          processor: (assetName, asset) =>
            this.processCss(assetName, asset),
        },
      ],
      canPrint: true,
    });
  }

  buildPluginDescriptor() {
    return { name: 'CSSMQPackerPlugin' };
  }

  async processCss(assetName, asset) {
    const css = asset.sourceAndMap
      ? asset.sourceAndMap()
      : { source: asset.source() };

    return mqpacker.pack(css.source, {
      from: assetName,
      to: assetName,
      map: css.map,
    }).css;
  }
}

module.exports = CSSMQPackerPlugin;
