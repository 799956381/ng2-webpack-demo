// 引入ng2路由
import { provideRouter, RouterConfig } from '@angular/router';

import { Translate,TRANSLATE_PROVIDERS } from './pages/translate';
import { Home } from './pages/home';


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
    }
];

/**
 * App根路由
 */
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    ...TRANSLATE_PROVIDERS
];
