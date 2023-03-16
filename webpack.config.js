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


module.exports = env => {
    let config;

    if (process.env.MODE === 'local' && !env.production) {
        config = require('./webpack.local.config');
    } else {
        const path = require('path');
        const webpack = require('webpack');
        const CopyPlugin = require('copy-webpack-plugin');
        const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
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
                "blockly": "./src/index.js",
                'blockly.min': "./src/index.js"
            },
            output: {
                path: path.resolve(__dirname, 'app'),
                filename: '[name].js',
            },
            optimization: {
                minimize: env.production,
                minimizer: [new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    include: /\.min\.js$/,
                    extractComments: false,
                    parallel: true
                })],
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
                new NodePolyfillPlugin()
            ],
            devtool: 'source-map',
            devServer: {},
        };
    }

    return config;
};
