// Angular/Meteor Components
import { Component } from '@angular/core';

// App Components
import { LoginComponent } from '../../auth/client/login.component';

// Welcome Component Template
import template from './welcome.component.html';

// Welcome Component
@Component({
    selector: 'welcome',
    directives: [LoginComponent],
    template
})
export class WelcomeComponent {

    constructor() { }

}
