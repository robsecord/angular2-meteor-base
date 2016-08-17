// Angular/Meteor Components
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class AuthService {

    private redirectTo: string;

    constructor() {
        this.redirectTo = '';
    }

    public login(email:string, password: string):Promise<any> {
        return new Promise((resolve, reject) => {
            Meteor.loginWithPassword(email, password, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('success');
                }
            });
        });
    }

    public logout():Promise<boolean> {
        return new Promise(function (resolve) {
            Meteor.logout(() => {
                // ...

                // Successfully Logged Out
                resolve(true);
            });
        });
    }

    public recover(email:string):Promise<any> {
        return new Promise((resolve, reject) => {
            Accounts.forgotPassword({email: email}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('success');
                }
            });
        });
    }

    public isLoggedIn():boolean {
        return !!Meteor.userId();
    }

    get redirectUrl():string {
        return this.redirectTo;
    }

    set redirectUrl(url: string) {
        this.redirectTo = url;
    }
}