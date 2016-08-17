// Angular Components
import 'angular2-meteor-polyfills';
import { Injector, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// App Components
import { AppModule } from './app.module';
import { RootInjector } from './../imports/shared/client/root.injector';

// App Methods
import '../both/all.methods';


// Initialize the App
platformBrowserDynamic().bootstrapModule(AppModule)
    .then((appRef: NgModuleRef<AppModule>) => {
        RootInjector(appRef.injector);
    })
    .catch(err => {
        console.error('App Error!!');
        console.log(err);
    });
