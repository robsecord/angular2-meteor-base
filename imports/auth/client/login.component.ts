// Angular/Meteor Components
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';

// App Components
import { AuthService } from './auth.service';

// Login Component Template
import template from './login.component.html';

// Login Component
@Component({
    selector: 'login',
    template
})
export class LoginComponent extends MeteorComponent implements OnInit {
    public loginForm: FormGroup;
    public error: string;

    constructor(private ngZone: NgZone, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
        super();
    }

    public ngOnInit():void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
    }

    public login():void {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
                .then(() => {
                    let url = '/dashboard';
                    if (this.authService.redirectUrl.length) {
                        url = this.authService.redirectUrl;
                    }
                    this.router.navigate([url]);
                }, (err) => {
                    this.ngZone.run(() => {
                        this.error = err;
                    });
                });
        }
    }
}
