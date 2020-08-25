//const StyleLintPlugin = require('stylelint-webpack-plugin');
const { resolve, join } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const NODE_ENV_DEV = process.env.NODE_ENV ==='development';
var src = resolve(join(__dirname, './src/assets/fonts')); 
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const tsLoaderUse = [{
    loader: 'awesome-typescript-loader',
    options: {
        configFileName: 'tsconfig.json',        
        useCache: NODE_ENV_DEV
    }
}];

module.exports = {
    devtool: 'source-map',
    entry: "./app.tsx",
    watch: true,
    output: {
        filename: "app-bundle-[hash:8].js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx', '.scss', '.css'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['main']
    },
    target: 'web',
    context: resolve(join(__dirname, '../')),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules|bower-components|react-dates/
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules|bower-components/,
                use: tsLoaderUse
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf|png)$/,
                include: src,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        },
                       
                    }
                ]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true ,
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-smart-import'),
                                require('autoprefixer'),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader!style-loader!css-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                ]
            },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

        ],
    },
    plugins: [
        new CheckerPlugin(),
        //new StyleLintPlugin()  //Commenting this out (need more research) as it is throwing error when we run command for webpack --watch.

        new CleanWebpackPlugin(),
        // to genrate "index.html" using "/src/app.html" including some hash value in src path of script
        //which makes browser to get the latest version of the file from server instead of using a cached one whenever it has a new hash
        new HtmlWebpackPlugin({
            hash: false,
            filename: '../index.html', //relative to root of the application
            title: 'demo',
            template: './app.html'
        })
    ],
    //externals: {
    //    'react': 'React',
    //    'react-dom': 'ReactDOM',
    //},
    performance: {
        hints: false,
    },
    stats: {
        colors: true,
        errorDetails: true,
        modules: true,
        reasons: true
    }
}

