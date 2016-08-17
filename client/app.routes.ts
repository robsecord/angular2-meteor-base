// Angular Components
import { Router, Route, Routes, RouterModule } from '@angular/router';

// Manager App Components
import { RootInjector } from './../imports/shared/client/root.injector';
import { AuthService } from '../imports/auth/client/auth.service';
import { WelcomeComponent } from '../imports/welcome/client/welcome.component';
import { ForgotComponent } from '../imports/welcome/client/forgot.component';
import { NotFoundComponent } from '../imports/404/client/notfound.component';
import { DashboardComponent } from '../imports/dashboard/client/dashboard.component';
import { DemoListComponent } from '../imports/demo/client/demo-list.component';
import { DemoDetailsComponent } from '../imports/demo/client/demo-details.component';


const appRoutes: Routes = [
    // Welcome/Login
    <Route>{ path: '',                 component: WelcomeComponent,        canActivate: ['AuthRedirect'] },

    // Dashboard
    <Route>{ path: 'dashboard',        component: DashboardComponent,      canActivate: ['RequireLogin'] },

    // Demo
    <Route>{ path: 'demo',             component: DemoListComponent,       canActivate: ['RequireLogin'] },
    <Route>{ path: 'demo/:demoId',     component: DemoDetailsComponent,    canActivate: ['RequireLogin'] },

    // Standard Routes
    <Route>{ path: 'forgot',           component: ForgotComponent,         canActivate: ['AuthRedirect']},
    <Route>{ path: 'notfound',         component: NotFoundComponent,       canActivate: ['RequireLogin']},

    // Catch-all
    <Route>{ path: '**',               redirectTo: 'notfound' }
];

export const appRoutingProviders: any[] = [

    { provide: 'RequireLogin', useValue: () => {
        let injector = RootInjector();
        if (!injector.get(AuthService).isLoggedIn()) {
            //injector.get(AuthService).redirectUrl = '???';
            injector.get(Router).navigate(['/']);
            return false;
        }
        return true;
    }},

    { provide: 'AuthRedirect', useValue: () => {
        let injector = RootInjector();
        if (injector.get(AuthService).isLoggedIn()) {
            injector.get(Router).navigate(['/dashboard']);
            return false;
        }
        return true;
    }}

];

export const routing = RouterModule.forRoot(appRoutes);
