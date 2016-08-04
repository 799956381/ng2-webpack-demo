
import { Component } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import {
    TranslateService,
    TranslateLoader,
    TranslatePipe,
    TranslateStaticLoader
} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'translate',
    template: `
        <br>
        <br>
        <br>
        <button (click)="changeLang('en')">英文</button>
        <button (click)="changeLang('zh_cn')">中文</button>
        <br>
        <h1>{{ 'HELLO' | translate:{value: param} }}</h1>
    `,
    pipes: [TranslatePipe]
})

export class Translate {
    param: string = "world";

    // userLang: string = "en";

    constructor(public translate: TranslateService) {
        // var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        // userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
        // // this language will be used as a fallback when a translation isn't found in the current language
        // translate.setDefaultLang('zh_cn');
        // // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use("zh_cn");
    }

    changeLang(userLang) {
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);
    }
}

export const TRANSLATE_PROVIDERS = [
    HTTP_PROVIDERS,
    {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    },
    TranslateService
];