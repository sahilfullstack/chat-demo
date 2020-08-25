// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const { resolve, join } = require('path');
const commonConfig = require('./common');

module.exports = merge(commonConfig,
    {
        mode: "development",
        externals: {
            'Config': JSON.stringify(require('./dev-config.json')),
            'build_version_config': JSON.stringify(require('./build_version.json'))
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
            //new webpack.HotModuleReplacementPlugin(), // enable HMR globally
            new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        ]
    });