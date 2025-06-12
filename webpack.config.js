// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      theme: './js/theme.js',
      styles: './js/styles.js'
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: '[name].min.js',
      clean: false // Don't clean assets folder as it contains other files
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: ({ chunk }) => {
          return chunk.name === 'styles' ? 'theme.css' : '[name].css';
        }
      })
    ],
    optimization: {
      minimize: isProduction
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    stats: {
      children: false,
      modules: false
    }
  };
};
