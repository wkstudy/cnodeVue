const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const normalcssExtractTextWebpackPlugin = new ExtractTextWebpackPlugin('/css/normal.css');
const stylecssExtractTextWebpackPlugin = new ExtractTextWebpackPlugin('/css/style.css');
const isDev = process.env.NODE_ENV === 'development';


const config = {
  target: 'web',
  mode: 'none',
  entry: {
    main: path.join(__dirname, '/src/index.js'),
    vendor: ['vue']
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/dist/')
  },
  resolve: {
    alias: {
        vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, 
      {
        test: /\.(gif)|jpg|jpeg|png|svg/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new VueLoaderPlugin()
  ]
}
if (isDev) {
  config.devtool = 'cheap-module-eval-source-map',
  config.devServer = {
    port: 8888,
    // host: '192.168.0.127',
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    },
    proxy: {
      '/api': {
          target: 'https://cnodejs.org',
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true //如果接口跨域，需要进行这个参数配置
      }
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    new webpack.NamedModulesPlugin() // 当开启 HMR 的时候使用该插件会显示模块的相对路径，
  );
  config.module.rules.push(
    {
      test: /\.css/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.styl(us)?$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  );
} else {
  config.plugins.push(
    normalcssExtractTextWebpackPlugin,
    stylecssExtractTextWebpackPlugin
  );
  config.module.rules.push(
    {
      test: /\.css$/,
      use: normalcssExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    },
    {
      test: /\.styl(us)?$/,
      use: stylecssExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
}


module.exports = config