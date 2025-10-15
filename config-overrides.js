const path = require('path');
const webpack = require('webpack');

module.exports = function override(config) {
  const uikitSrc = path.resolve(__dirname, 'node_modules/boo-uikit/src');

  // Extend Babel loader to include boo-uikit/src
  const babelLoader = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf.find(
    rule => rule.loader && rule.loader.includes('babel-loader')
  );

  if (babelLoader) {
    babelLoader.include = Array.isArray(babelLoader.include)
      ? [...babelLoader.include, uikitSrc]
      : [babelLoader.include, uikitSrc];
  }

  // ✅ Inject process shim globally
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};