import { Injector } from '@angular/core';

let rootInjectorRef: Injector;
export const RootInjector = (injector?: Injector):Injector => {
    if (injector) {
        rootInjectorRef = injector;
    }

    return rootInjectorRef;
};
