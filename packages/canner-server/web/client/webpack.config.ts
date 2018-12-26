import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import tsImportPluginFactory from 'ts-import-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import createEntryFile from './src/utils/createEntryFile';
import createWindowVarsFile from './src/utils/createWindowVarsFile';
const devMode = process.env.NODE_ENV !== 'production';
const ENTRY_PATH = path.join(__dirname, 'index.tsx');
const HTML_PATH = path.join(__dirname, 'src/index.html');
const WINDOW_VARS_PATH = path.join(__dirname, 'windowVars.ts');
// create entry file dynamic so that we can change appPath, schemaPath by CLI
createEntryFile({
  entryPath: ENTRY_PATH,
  appPath: path.join(__dirname, 'src/app')
});

createWindowVarsFile({
  windowVarsPath: WINDOW_VARS_PATH,
  schemaPath: path.join(__dirname, 'schema/canner.schema'),
  cloudPath: path.join(__dirname, 'default.canner.cloud.ts')
});

const plugins = [
  [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
  require("@babel/plugin-proposal-function-sent"),
  require("@babel/plugin-proposal-export-namespace-from"),
  require("@babel/plugin-proposal-numeric-separator"),
  require("@babel/plugin-proposal-throw-expressions"),
  require("@babel/plugin-proposal-export-default-from"),
  require("@babel/plugin-syntax-dynamic-import"),
  require("@babel/plugin-syntax-import-meta"),
  [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
  require("@babel/plugin-proposal-json-strings"),
  require("@babel/plugin-transform-modules-commonjs"),
  [require('babel-plugin-import'), {libraryName: 'antd', style: true}]
];

const config: webpack.Configuration = {
  entry: {
    index: [WINDOW_VARS_PATH, ENTRY_PATH]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: devMode ? 'http://localhost:8090/' : '/'
  },
  mode: devMode ? 'development' : 'production',
  devServer: {
    port: 8090,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    // https://github.com/webpack/webpack-dev-server/issues/1604
    disableHostCheck: true
  },
  resolve: {
    "extensions": [".jsx", ".js", ".ts", ".tsx"]
  },
  externals: {
    // antd: "antd",
    react: "React",
    "react-dom": "ReactDOM",
    lodash: "_",
    moment: 'moment',
    firebase: "firebase",
    "styled-components": "styled",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        style: {
          test: /\.css/,
          name: 'style',
          chunks: 'all',
          enforce: true
        },
        vendors: {
          test: (module) => {
            return module.nameForCondition && /node_modules/.test(module.nameForCondition()) && !(/\.(c|le)ss$/.test(module.type));
          },
          name: 'vendors',
          chunks: 'all',
          priority: -10
        }
      },
    }
  },
  module: {
    rules: [
      {
        oneOf: [{
          test: /canner\.schema\.tsx?$/,
          use: [{
            loader: "canner-schema-loader"
          }, {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                "jsx": "react",
                "jsxFactory": "CannerScript"
              }
            }
          }]
        }, {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({
                libraryName: 'antd',
                style: true,
              })]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }]
      },
      {
        oneOf: [{
          test: /(\.schema\.js|canner\.def\.js)$/,
          use: [{
            loader: "canner-schema-loader"
          }, {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    "pragma": "CannerScript", // default pragma is React.createElement
                    "pragmaFrag": "CannerScript.Default", // default is React.Fragment
                    "throwIfNamespace": false // defaults to true
                  }
                ],
                "@babel/preset-flow"
              ],
              plugins
            }
          }]
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                require("@babel/preset-env"),
                require("@babel/preset-react"),
                require("@babel/preset-flow")
              ],
              plugins
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"]
      }, {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
              modifyVars: {}
            }
          }
        ]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: HTML_PATH
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: devMode ? 'server' : 'disabled',
      openAnalyzer: false
    }),
    new CompressionPlugin()
  ]
};

export default config;