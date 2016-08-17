// Angular/Meteor Components
import { Component } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { DROPDOWN_DIRECTIVES, CollapseDirective } from 'ng2-bootstrap';

// App Components
import { AuthService } from '../../auth/client/auth.service';
import { SideMenuComponent } from '../../sidemenu/client/sidemenu.component';

// Root Template
import template from './root.component.html';

// Root Component
@Component({
    selector: 'app',
    directives: [DROPDOWN_DIRECTIVES, CollapseDirective, SideMenuComponent],
    template
})
@InjectUser('user')
export class RootComponent extends MeteorComponent {

    /** @member {boolean} isCollapsed - Controls the Collapsed State of the Bootstrap Collapse Plugin for Main Menu in Header */
    public isCollapsed: boolean = true;

    /** @member {Meteor.User} user - The currently logged in user. Used to hide/show layout elements based on Logged-In state */
    public user: Meteor.User;

    public loggingOut: boolean = false;

    constructor(private authService: AuthService) {
        // Pass construction to MeteorComponent
        //  which will auto-update the state of our Injected User
        super();
    }

    public logout():void {
        this.loggingOut = true;
        this.authService.logout().then(function () {
            this.loggingOut = false;
        });
    }
}
