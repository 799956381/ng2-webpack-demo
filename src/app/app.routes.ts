// 引入ng2路由
import { provideRouter, RouterConfig } from '@angular/router';

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
 * App根路由
 */
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    ...TRANSLATE_PROVIDERS
];
