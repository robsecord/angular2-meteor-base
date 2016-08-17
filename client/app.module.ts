// Angular/Meteor Components
import { NgModule, NgModuleMetadataType, enableProdMode } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeteorModule } from 'angular2-meteor';

// App Routing
import { routing, appRoutingProviders } from './app.routes';

// App Services
import { AuthService } from '../imports/auth/client/auth.service';

// App Pipes
import { DisplayErrorMsgPipe } from '../imports/shared/client/display-error-message.pipe';

// App Components
import { RootComponent } from '../imports/root/client/root.component';
import { WelcomeComponent } from '../imports/welcome/client/welcome.component';
import { ForgotComponent } from '../imports/welcome/client/forgot.component';
import { NotFoundComponent } from '../imports/404/client/notfound.component';
import { DashboardComponent } from '../imports/dashboard/client/dashboard.component';
import { DemoListComponent } from '../imports/demo/client/demo-list.component';
import { DemoDetailsComponent } from '../imports/demo/client/demo-details.component';

// Google Maps
//import { GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig } from 'angular2-google-maps/core';

// Google APIs - Maps JS API Key;
//const GOOGLE_MAPS_API_KEY:string = '[google-api-key-here]';

// Production Mode
//enableProdMode();

// App Module
@NgModule(<NgModuleMetadataType> {
    imports: [
        // Modules
        BrowserModule,
        MeteorModule,
        FormsModule,
        CommonModule,
        routing
    ],
    declarations: [
        // Components
        RootComponent,
        WelcomeComponent,
        ForgotComponent,
        NotFoundComponent,
        DashboardComponent,
        DemoListComponent,
        DemoDetailsComponent,

        // Pipes
        DisplayErrorMsgPipe
    ],
    providers: [
        // Service Providers
        FormBuilder,
        appRoutingProviders,
        AuthService,
        //GOOGLE_MAPS_PROVIDERS,
        //provideLazyMapsAPILoaderConfig({apiKey: GOOGLE_MAPS_API_KEY})
    ],
    bootstrap: [RootComponent]
})
export class AppModule {}
