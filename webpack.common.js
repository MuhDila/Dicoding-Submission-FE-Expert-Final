// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-undef
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line no-undef
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
  entry: {
    // eslint-disable-next-line no-undef
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // eslint-disable-next-line no-undef
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // eslint-disable-next-line no-undef
          from: path.resolve(__dirname, 'src/public/'),
          // eslint-disable-next-line no-undef
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'resto-dicoding-api',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'resto-dicoding-image-api',
          },
        },
      ],
    }),
  ],
};
