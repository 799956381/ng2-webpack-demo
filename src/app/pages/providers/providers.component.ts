import { Component, Injectable, Inject }          from '@angular/core';
import {
    APP_CONFIG, AppConfig,
    HERO_DI_CONFIG
}       from './app.config';
import { ItemsService } from './items.service';
import { Logger } from './logger.service';

let template = `
         <h2>provider</h2>
         <div *ngFor="let item of items">
            {{item.name}}
         </div>
`;

//////////////////////////基本模式////////////////////////////////////
@Component({
    selector: 'provider-1',
    template: template,
    providers: [ItemsService, {provide: Logger, useClass: Logger}]
})
export class Provider1Component {
    items: any;

    constructor(itemsService: ItemsService) {
        this.items = itemsService.getItems();
    }

}
//////////////////////////基本模式////////////////////////////////////


//////////////////////////别名模式////////////////////////////////////
class NewLogger extends Logger {
    log(message: string) {
        super.log(`NewLogger: ${message}`);
    }
}
class OldLogger {
    logs: string[] = [];

    log(message: string) {
        console.log(`OldLogger:${message}`);
    };
}
@Component({
    selector: 'provider-2',
    template: template,
    providers: [NewLogger,
        // Alias OldLogger w/ reference to NewLogger
        {provide: OldLogger, useExisting: NewLogger}]
})
export class Provider2Component {
    log: string;

    constructor(newLogger: NewLogger, oldLogger: OldLogger) {
        if (newLogger !== oldLogger) {
            throw new Error('expected the two loggers to be the same instance');
        }
        oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
        this.log = newLogger.logs[0];

    }
}
//////////////////////////别名模式////////////////////////////////////


///////////////////////////值模式////////////////////////////////////////////
let silentLogger = {
    logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
    log: () => {
        console.log("aaaaaaaaaaaa");
    }
};

@Component({
    selector: 'provider-3',
    template: template,
    providers: [{provide: Logger, useValue: silentLogger}]
})
export class Provider3Component {
    log: string;

    constructor(logger: Logger) {
        logger.log('Hello from logger provided with useValue');
        this.log = logger.logs[0];
        console.log(this.log);
    }
}
//////////////////////////值模式//////////////////////////////////////////////


///////////////////////////////////工厂模式/////////////////////////////////////////////////////////



@Injectable()
export class LangConfig {
    getLang() {
        //这里可以写成HTTP或配置文件
        return "zh";
    }
}

@Injectable()
export class LanguageService {
    constructor(private config: string) {
    }

    getLanguage() {
        switch (this.config) {
            case "en":
                return "English";
            case "zh":
                return "中文";
            default:
                return "默认中文";
        }
    }
}

//工厂方法
let langServiceFactory = (config: LangConfig) => {
    return new LanguageService(config.getLang());
};


//DI暴露
export let langServiceProvider =
{
    provide: LanguageService,
    useFactory: langServiceFactory,
    deps: [LangConfig]
};

@Component({
    selector: 'provider-4',
    template: template,
    providers: [LangConfig, langServiceProvider]
})
export class Provider4Component {
    constructor(config: LangConfig, langService: LanguageService) {
        console.log(langService.getLanguage());
    }
}
///////////////////////////////////工厂模式/////////////////////////////////////////////////////////


///////////////////////////////////OpaqueToken 字符串模式/////////////////////////////////////////////////////////

@Component({
    selector: 'provider-5',
    template: template,
    providers: [{provide: APP_CONFIG, useValue: HERO_DI_CONFIG}]
})
export class Provider5Component {

    constructor(@Inject(APP_CONFIG) config: AppConfig) {
        console.log(config.apiEndpoint);
    }
}

///////////////////////////////////OpaqueToken 字符串模式/////////////////////////////////////////////////////////


///////////////////////////////////层级依赖/////////////////////////////////////////////////////////
@Component({
    selector: 'child-component',
    template: `
        <h1>{{title}}</h1>
    `
    //这里不需要写DI，在父类写即可
})
export class ChildComponent {
    title: string;

    constructor(@Inject(APP_CONFIG) config: AppConfig) {
        this.title = config.childTitle;
    }
}

@Component({
    selector: 'provider-6',
    template: `
        <h1>{{title}}</h1>
        <child-component></child-component>
    `,
    directives: [ChildComponent],
    providers: [{provide: APP_CONFIG, useValue: HERO_DI_CONFIG}]
})
export class Provider6Component {
    title: string;

    constructor(@Inject(APP_CONFIG) config: AppConfig) {
        this.title = config.title;
    }
}

///////////////////////////////////层级依赖/////////////////////////////////////////////////////////
