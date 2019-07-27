
const webpack = require('webpack');

module.exports = {
  entry: './client/src/index.jsx',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        },
      },
      {
				test: /\.(scss)$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}, {
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [ require('autoprefixer')]
						}
					}
				}]
			}
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/client/public`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    // hot: true,
  },
};