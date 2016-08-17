// Angular/Meteor Components
import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

// Manager App Collections
import { Demos } from '../../../both/collections/demos.collection';

// Demo-Form Component Template
import template from './demo-form.component.html';

// Demo-Form Component
@Component({
    selector: 'demo-form',
    directives: [REACTIVE_FORM_DIRECTIVES],
    template
})
@InjectUser('user')
export class DemoFormComponent extends MeteorComponent implements OnInit {
    user: Meteor.User;
    addForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        super();

        console.log(this.user);

    }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [],
            location: ['', Validators.required],
            public: [false]
        });
    }

    resetForm() {
        this.addForm.controls['name']['updateValue']('');
        this.addForm.controls['description']['updateValue']('');
        this.addForm.controls['location']['updateValue']('');
        this.addForm.controls['public']['updateValue'](false);
    }

    addDemo() {
        if (this.addForm.valid) {
            if (!Meteor.userId()) {
                return alert('Please log in to add a demo');
            }

            Demos.insert({
                name: this.addForm.value.name,
                description: this.addForm.value.description,
                location: {
                    name: this.addForm.value.location
                },
                public: this.addForm.value.public,
                owner: Meteor.userId()
            });
            this.resetForm(); // XXX will be replaced by this.addForm.reset() in RC5+
        }
    }
}
