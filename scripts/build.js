/*
 * @Author			jishengsheng
 * @Date			2021-02-01 16:59:27
 * @Version			1.0
 * @Description
 */

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

let webpackConfig = {
    mode: 'development',
    entry: resolvePath('./src'),
    externals: [
        'react',
        'react-dom',
        'prop-types',
        'extend',
        '@ant-design',
        /^antd\/+/,
        'moment',
        'antd',
        /^rc-.+/
    ],
    output: {
        library: 'ItemGenerator',
        libraryTarget: 'umd',
        filename: '[name].js',
        path: resolvePath('./dist')
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: 'antd',
                                        libraryDirectory: 'lib',
                                        style: 'css'
                                    })
                                ]
                            }),
                            compilerOptions: {
                                module: 'es2015'
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jsx|js)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'react-app']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                sourceMap: true,
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        overrideBrowserslist: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9' // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009'
                                    })
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].min.css'
        }),
        new webpack.optimize.SplitChunksPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
        if (err) {
            return reject(err);
        }
        resolve(stats);
    });
});
