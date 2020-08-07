const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { NODE_ENV } = process.env;

function webpackConfig(env, argv) {
  const isDev = env === 'development' || NODE_ENV === 'development';
  const isProd = !isDev;

  return {
    mode: env,

    devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',

    resolve: {
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ],
      extensions: [
        '.js',
        '.jsx',
        '.json',
        '.ts',
        '.tsx'
      ]
    },

    entry: './src/index.js',

    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      pathinfo: isDev,
      filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash].js',
      chunkFilename: isDev ? 'js/[name].chunk.js' : 'js/[name].[contenthash].chunk.js'
    },

    devServer: {
      host: 'localhost',
      port: process.env.PORT || '9000',
      contentBase: [
          path.resolve(__dirname, 'dist')
      ],
      historyApiFallback: true,
      overlay: true,
      hot: true
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[id].chunk.css"
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        scriptLoading: 'defer'
      }),
      isProd && new CssoWebpackPlugin({
        restructure: false,
        forceMediaMerge: true,
        comments: false
      }),
      isDev && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/i,
          exclude: [/dist/],
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: isProd
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'src')]
                }
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/i,
          exclude: [/node_modules/, /dist/],
          loader: 'babel-loader'
        },
        {
          test: /\.(jpe?g|png|gif|webp|woff|woff2|ttf|otf)$/i,
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: '/media/[name].[hash:8].[ext]'
          }
        },
      ]
    }
  }
}

module.exports = [webpackConfig];