const path = require('path');
const webpack = require('webpack');

const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function getPlugins (mode) {
    const plugins = [
        // track progress
        new webpack.ProgressPlugin(),
        // make jquery available globally
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery'
        }),
        // clear the dist folder before building
        new CleanWebpackPlugin({verbose: true}),
        // extract css to css file
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // init vue loader
        new VueLoaderPlugin(),
    ];

    // init nodemon for dev
    if (mode === 'development') {
        plugins.push(new NodemonPlugin({
            watch : './**/*',
            script: __dirname + '/app.js'
        }));
    }

    return plugins;
}

module.exports = (mode, argv) => {
    const config = {
        entry: {
            app   : [__dirname + '/client/src/js/app.js', __dirname + '/client/src/scss/app.scss'],
            vendor: __dirname + '/client/src/scss/vendor.scss'
        },
        output: {
            filename: 'js/[name].js',
            path    : path.resolve(__dirname, 'client/dist')
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use : [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false, sourceMap: mode === 'development' } },
                        { loader: 'sass-loader', options: { sourceMap: mode === 'development' } }
                    ]
                },
                {
                    test   : /\.vue$/,
                    exclude: /node_modules/,
                    loader : 'vue-loader'
                },
                {
                    test   : /\.js$/,
                    exclude: /node_modules/,
                    use    : {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: getPlugins(argv.mode),
        resolve: {
            extensions: ['.js', '.vue'],
            alias     : {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};