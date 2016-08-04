const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev


/**
 * Webpack Plugins
 */
//全局变量设置
const DefinePlugin = require('webpack/lib/DefinePlugin');


/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig.metadata, {
    host: 'localhost',
    port: 5000,
    ENV: ENV,
    HMR: HMR
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {

    /**
     * Merged metadata from webpack.common.js for index.html
     * index.html的头部信息
     * See: (custom attribute)
     */
    metadata: METADATA,

    /**
     * Switch loaders to debug mode.
     *
     * See: http://webpack.github.io/docs/configuration.html#debug
     */
    debug: true,

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

        /**
         * The output directory as absolute path (required).
         *
         * See: http://webpack.github.io/docs/configuration.html#output-path
         */
        path: helpers.root('dist'),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: '[name].bundle.js',

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
         */
        sourceMapFilename: '[name].map',

        /** The filename of non-entry chunks as relative path
         * inside the output.path directory.
         * 需要进行异步加载、按需加载时候，按需打包的文件,
         * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
         * 参考：http://bbs.react-china.org/t/webpack-output-filename-output-chunkfilename/2256/4
         */
        chunkFilename: '[id].chunk.js',

        //不希望被webpack打包的库，并且希望以var的形式引入
        //libraryTarget 引用的方式
        //library 库的名称
        //参考： https://github.com/zhengweikeng/blog/issues/10
        library: 'ac_[name]',
        libraryTarget: 'var',
    },

    plugins: [

        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Environment helpers
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         */
        //用于设置全局变量设置，需要添加.d.ts，用于识别全局变量设置
        // 如果是存字符串记得用JSON.stringify()进行转换，否则会出错，
        // 例如 TEST="测试" 在main.ts 写如console.log(TEST),经过webpack编译会编程 console.log((测试))，
        // 这里没有引号，所以会保存找不到 测试 这个关键字
        // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            'ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
            }
        }),
    ],

    /**
     * Static analysis linter for TypeScript advanced options configuration
     * Description: An extensible linter for the TypeScript language.
     * tslint-loader 配置项
     * See: https://github.com/wbuchwalter/tslint-loader
     */
    tslint: {
        emitErrors: false, //是否显示错误警告
        failOnHint: false, //是否终端编译
        resourcePath: 'src' //检测路径
    },

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * webpack-dev-server 配置项
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
        port: METADATA.port,
        host: METADATA.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: helpers.root('dist')
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: 'window',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

});
