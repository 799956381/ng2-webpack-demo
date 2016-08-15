import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['./app.scss'],
    template: `
    <div id="root">
       <nav>
        <a [routerLink]="['/home']" routerLinkActive="active">主页</a>
        <a [routerLink]="['/translate']" routerLinkActive="active">全球化</a>
        <a [routerLink]="['/provider1']" routerLinkActive="active">依赖注入-基础</a>
        <a [routerLink]="['/provider2']" routerLinkActive="active">依赖注入-别名</a>
        <a [routerLink]="['/provider3']" routerLinkActive="active">依赖注入-值</a>
        <a [routerLink]="['/provider4']" routerLinkActive="active">依赖注入-工厂</a>
        <a [routerLink]="['/provider5']" routerLinkActive="active">依赖注入-字符串</a>
        <a [routerLink]="['/provider6']" routerLinkActive="active">依赖注入-层级依赖</a>
        <br>
        <a [routerLink]="['/about']" routerLinkActive="active">异步加载</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent{

}