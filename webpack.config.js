/**
 * @File   : webpack.dev.config.js
 * @Author : 瞬光 (shunguang.dty@alibaba-inc.com)
 * @Date   : 2019/7/28 下午1:57:38
 * @Description:
 */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outPath = path.resolve(__dirname, 'lib');

module.exports = {
  devtool: 'none',

  entry: {
    main: [
      path.resolve(__dirname, './src/index.ts')
    ]
  },

  output: {
    path: outPath,
    filename: 'index.js',
    publicPath: '/',
    library: 'seinjs-inspector',
    libraryTarget: 'window'
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  externals: {
    'seinjs': 'Sein'
  },

  module: {
    noParse: [
      /benchmark/
    ],
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, './tsconfig.json'),
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(md|glsl)$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|mp4)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 15000
          }
        }
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(
      ['*'],
      {root: outPath}
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
