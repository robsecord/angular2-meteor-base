// Angular/Meteor Components
import { Component, OnInit, NgZone } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// App Components
import { AuthService } from './auth.service';

// Login Component Template
import template from './recover.component.html';

// Recover Component
@Component({
    selector: 'recover',
    template
})
export class RecoverComponent extends MeteorComponent implements OnInit {
    recoverForm: FormGroup;
    error: string;

    constructor(private ngZone: NgZone, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.recoverForm = this.formBuilder.group({
            email: ['', Validators.required]
        });

        this.error = '';
    }

    recover() {
        if (this.recoverForm.valid) {
            this.authService.recover(this.recoverForm.value.email)
                .then(() => {
                    this.router.navigate(['/']);
                }, (err) => {
                    this.ngZone.run(() => {
                        this.error = err;
                    });
                });
        }
    }
}