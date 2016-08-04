/**
 * webpack公共配置
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */

// 拷贝插件，不经过wepack编译，直接拷贝目录及文件到指定位置
// 配置信息
//    from:复制文件或所在目录位置，必选
//    to:复制文件或目录到目标位置，可选，默认到根目录，
//    toType:目标位置类型，如果是文件名，值为file,如果是文件夹，值为dir,可选，默认为dir
//    force:强制覆盖，可选，默认为false
//    context:相对与from拷贝路径，，可选，默认与from相同
//    flatten:复制所有文件，不包括目录，如果有相同的文件名，结果是不确定的，可选，默认是false
//    ignore:忽略文件，
//    copyUnmodified:在使用webpack-dev-server的watch的时候，是否每次全部拷贝，可选，默认是false，只拷贝修改的文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// HTML生成工具，
// 配置信息
//    title: 用来生成页面的 title 元素
//    filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
//    template: 模板文件路径，支持加载器，比如 html!./index.html
//    inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
//    favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
//    minify: {} | false , 传递 html-minifier 选项给 minify 输出
//    hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
//    cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
//    showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
//    chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
//    chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
//    excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 根据配置生成HTML元素
const HtmlElementsPlugin = require('./html-elements-plugin');
// 头部元素配置
const headConfig = require('./head-config.common');

// 编译TypeScript的插件 ForkCheckerPlugin是用于异步检测代码的一个插件，提高webpack加载的效率
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// 单独输出文件工具
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 * Webpack Constants
 * Webpack 常量信息
 */
const METADATA = {
    title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

    /*
     * Static metadata for index.html
     *
     * index.html的头部信息
     * See: (custom attribute)
     */
    metadata: METADATA,

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     * 入口文件
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

        'polyfills': './src/polyfills.browser.ts',
        'vendor': './src/vendor.browser.ts',
        'main': './src/main.browser.ts'

    },

    /*
     * Options affecting the resolving of modules.
     * 模块解析选项
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         * 解析模块的拓展名的数组
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['', '.ts', '.js', '.css', '.scss'],

        // Make sure root is src
        // 查找文件根目录
        root: helpers.root('src'),

        // remove other default values
        // 解析引用模块所在的目录
        modulesDirectories: ['node_modules'],

    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        /*
         * An array of applied pre and post loaders.
         * 前置装载文件
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        preLoaders: [

            /*
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

            /*
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular'),
                    helpers.root('node_modules/@ngrx'),
                    helpers.root('node_modules/@angular2-material'),
                ]
            }

        ],

        /*
         * An array of automatically applied loaders.
         *
         * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
         * This means they are not resolved relative to the configuration file.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        loaders: [

            /*
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },

            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            /*
             * to string and css loader support for *.css files
             * Returns file content as string
             *
             */
            {
                test: /\.css$/,
                loaders: ['raw-loader']
            },

            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },

            {
                test: /initial\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            },

            {
                test: /\.woff(2)?(\?v=.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },

            {
                test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file-loader'
            },

            {
                test: /bootstrap\/dist\/js\/umd\//,
                loader: 'imports?jQuery=jquery'
            }
        ]

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

        new ExtractTextPlugin('initial.css', {
            allChunks: true
        }),

        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         * 异步检测插件
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new ForkCheckerPlugin(),

        /*
         * Plugin: OccurenceOrderPlugin
         * Description: Varies the distribution of the ids to get the smallest id length
         * for often used ids.
         * 优化效率生成ID
         * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
         * See: https://github.com/webpack/docs/wiki/optimization#minimize
         */
        new webpack.optimize.OccurenceOrderPlugin(true),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         * 公共模块，多个文件时，记得加载顺序要倒叙
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['polyfills', 'vendor'].reverse()
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         * 拷贝插件
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }]),

        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         * HTML处理插件，通过模版生成HTML文件
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),

        /*
         * Plugin: HtmlHeadConfigPlugin
         * Description: Generate html tags based on javascript maps.
         *
         * If a publicPath is set in the webpack output configuration, it will be automatically added to
         * href attributes, you can disable that by adding a "=href": false property.
         * You can also enable it to other attribute by settings "=attName": true.
         *
         * The configuration supplied is map between a location (key) and an element definition object (value)
         * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
         *
         * Example:
         *  Adding this plugin configuration
         *  new HtmlElementsPlugin({
         *    headTags: { ... }
         *  })
         *
         *  Means we can use it in the template like this:
         *  <%= webpackConfig.htmlElements.headTags %>
         *
         * Dependencies: HtmlWebpackPlugin
         */
        new HtmlElementsPlugin({
            headTags: headConfig
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })

    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }

};
