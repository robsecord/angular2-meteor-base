// Angular/Meteor Components
import { Component } from '@angular/core';

// App Components
import { RecoverComponent } from './../../auth/client/recover.component';

// Forgot Password Component Template
import template from './forgot.component.html';

// Forgot Password Component
@Component({
    selector: 'forgot',
    directives: [RecoverComponent],
    template
})
export class ForgotComponent {

    constructor() { }

}
