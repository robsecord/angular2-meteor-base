import { Component } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';

import template from './demo.component.html';

@Component({
    selector: 'demo',
    template
})
export class DemoComponent extends MeteorComponent {
    greeting: string;

    constructor() {
        super();

        this.greeting = 'Hello Demo Component!';
    }

    getData() {
        return this.greeting;
    }
}
