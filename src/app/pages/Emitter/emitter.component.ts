import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'son-component',
    template: `
        <h1>这是子组件</h1>
        <p>{{name}}</p>
        <button (click)="vote(true)"  [disabled]="voted">Agree</button>
        <button (click)="vote(false)" [disabled]="voted">Disagree</button>
    `,
})

export class SonComponent {
    @Input() name: string;
    @Output() onVoted = new EventEmitter<boolean>();

    voted = false;

    vote(agreed: boolean) {
        this.onVoted.emit(agreed);
        this.voted = true;
    }
}

@Component({
    selector: 'home',
    template: `
        <h1>这是主页</h1>
        <h2>该项目主要做demo使用，每一个导航为一个demo</h2>

        <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
        <son-component *ngFor="let voter of voters"
          [name]="voter"
          (onVoted)="onVoted($event)">
        </son-component>
    `,
    directives: [SonComponent]
})

export class EmitterComponent {
    agreed = 0;
    disagreed = 0;
    voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
    onVoted(agreed: boolean) {
        agreed ? this.agreed++ : this.disagreed++;
    }
}
