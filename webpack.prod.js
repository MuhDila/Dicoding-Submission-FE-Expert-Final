// eslint-disable-next-line no-undef
const { merge } = require('webpack-merge');
// eslint-disable-next-line no-undef
const common = require('./webpack.common');
// Import the Webpack Bundle Analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Check if the environment is CI
const isCI = process.env.CI === 'true';

// eslint-disable-next-line no-undef
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Conditionally add the Bundle Analyzer plugin
    !isCI && new BundleAnalyzerPlugin({
      analyzerMode: 'server', // Starts the analyzer as a server
    }),
  ].filter(Boolean), // Remove falsy values (e.g., `false`) from the plugins array
});
