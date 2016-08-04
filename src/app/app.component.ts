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
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent{

}