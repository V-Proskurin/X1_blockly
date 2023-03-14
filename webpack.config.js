/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Webpack configuration file.
 * @author samelh@google.com (Sam El-Husseini)
 */

require('dotenv').config();

let config;

if (process.env.MODE === 'local') {
    config = require('./webpack.local.config');
} else {
    const path = require('path');
    const webpack = require('webpack');
    const CopyPlugin = require('copy-webpack-plugin');
    const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
    const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
    const TerserPlugin = require("terser-webpack-plugin");

    config = {
        resolve: {
            fallback: {
                "util": require.resolve("util/"),
            }
        },
        target: 'web',
        mode: 'development',
        entry: {
            index: './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'app'),
            filename: 'blockly.js',
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            // Copy over media resources from the Blockly package
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, './node_modules/blockly/media'),
                    to: path.resolve(__dirname, 'app/media'),
                },
            ]),
            new NodePolyfillPlugin(),
            /*new BrowserSyncPlugin(
                {
                  host: 'localhost',
                  port: 3000,
                  proxy: 'http://wcfilters',
                  files: [
                    {
                      match: ['./src'],
                      fn(event, file) {
                        if (event === 'change') {
                          const bs = require('browser-sync').get('bs-webpack-plugin');
                          bs.reload();
                        }
                      },
                    },
                  ],
                },
                {
                  reload: false,
                }
            ),*/
        ],
        devtool: 'source-map',
        devServer: {},
    };
}


module.exports = config;
