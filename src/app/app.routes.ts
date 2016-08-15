// 引入ng2路由
import { provideRouter, RouterConfig } from '@angular/router';
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { Translate, TRANSLATE_PROVIDERS } from './pages/translate';
import { Home } from './pages/home';
import {
    Provider1Component,
    Provider2Component,
    Provider3Component,
    Provider4Component,
    Provider5Component,
    Provider6Component
} from './pages/providers';


/**
 * 合并路由配置
 */
export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'about',
        component: 'About'
    },

    {
        path: 'translate',
        component: Translate
    },
    {
        path: 'provider1',
        component: Provider1Component
    },
    {
        path: 'provider2',
        component: Provider2Component
    },
    {
        path: 'provider3',
        component: Provider3Component
    },
    {
        path: 'provider4',
        component: Provider4Component
    },
    {
        path: 'provider5',
        component: Provider5Component
    },
    {
        path: 'provider6',
        component: Provider6Component
    }
];


/**
 * 异步加载的路由
 * @type {{provide: OpaqueToken; useValue: any}|WebpackAsyncModules|{provide: WebpackAsyncRoute;
 * useFactory: ((router:any, webpackAsyncModules:any)=>WebpackAsyncRoute);
 * deps: Router|WebpackAsyncModules[]}|{provide: ComponentResolver;
 * useFactory: ((resolver:any, webpackAsyncModules:any)=>WebpackComponentResolver);
 * deps: RuntimeCompiler|WebpackAsyncModules[]}[][]}
 */
export const AsynLoader = [
    provideWebpack({
        'About': require('es6-promise!./pages/about')
    })
]


/**
 * App根路由
 */
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    ...AsynLoader,
    ...TRANSLATE_PROVIDERS
];
