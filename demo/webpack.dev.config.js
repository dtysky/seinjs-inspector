/**
 * @File   : webpack.dev.config.js
 * @Author : 瞬光 (shunguang.dty@alibaba-inc.com)
 * @Date   : 2019/7/28 下午1:57:38
 * @Description:
 */
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    main: [
      'webpack-dev-server/client?/',
      'webpack/hot/dev-server',
      path.resolve(__dirname, './index.tsx')
    ]
  },

  output: {
    path: path.resolve(__dirname),
    filename: 'main.js',
    publicPath: '/'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  externals: {
    'fs': true,
    'path': true,
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
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, './tsconfig.json'),
              transpileOnly: true
            }
          },
          // {
          //   loader: 'tslint-loader',
          //   query: {
          //     configFile: path.resolve(__dirname, './tslintConfig.js')
          //   }
          // }
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
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, './config.scss')
            }
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
