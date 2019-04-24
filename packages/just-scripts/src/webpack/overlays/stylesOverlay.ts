import { tryRequire } from '../../tryRequire';
import { resolveCwd, resolve } from 'just-task';

const styleLoader = resolveCwd('@microsoft/loader-load-themed-styles') || resolveCwd('style-loader');
const sassLoader = resolveCwd('sass-loader');
const cssLoader = resolveCwd('css-loader');
const postCssLoader = resolveCwd('postcss-loader');

export const stylesOverlay = {
  ...(sassLoader &&
    styleLoader &&
    cssLoader &&
    postCssLoader && {
      test: /\.scss$/,
      enforce: 'pre',
      exclude: [/node_modules/],
      use: [
        {
          loader: styleLoader // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[name]_[local]_[hash:base64:5]',
            minimize: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [require('autoprefixer')];
            }
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }),
  ...(cssLoader &&
    postCssLoader && {
      test: /\.css$/,
      enforce: 'pre',
      exclude: [/node_modules/],
      use: [
        {
          loader: styleLoader // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[name]_[local]_[hash:base64:5]',
            minimize: false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [require('autoprefixer')];
            }
          }
        }
      ]
    })
};
