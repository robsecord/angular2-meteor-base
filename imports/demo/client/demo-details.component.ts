// Angular/Meteor Components
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, CanActivate } from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';

// Google Maps
import { GOOGLE_MAPS_DIRECTIVES, MouseEvent } from 'angular2-google-maps/core';

// Manager App Collections
import { Demo } from '../../../both/interfaces/demo.interface';
import { Demos } from '../../../both/collections/demos.collection';

// Manager App Components
import { DisplayNamePipe } from '../../shared/client/display-name.pipe';

// Demo-Details Component Template
import template from './demo-details.component.html';

// Demo-Details Component
@Component({
    selector: 'demo-details',
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
    pipes: [DisplayNamePipe],
    template
})
@InjectUser('user')
export class DemoDetailsComponent extends MeteorComponent implements OnInit, CanActivate {

    demoId: string;
    demo: Demo;
    users: Mongo.Cursor<any>;
    user: Meteor.User;

    // Default Map Center:
    //   - INSTANT Financial - Montreal Headquarters
    centerLat: number = 45.5118331;
    centerLng: number = -73.5706217;

    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.route.params
            .map(params => params['demoId'])
            .subscribe(demoId => {
                this.demoId = demoId;

                this.subscribe('demo', this.demoId, () => {
                    this.autorun(() => {
                        this.demo = Demos.findOne(this.demoId);
                        this.getUsers(this.demo);
                    }, true);
                }, true);

                this.subscribe('uninvited', this.demoId, () => {
                    this.getUsers(this.demo);
                }, true);
            });
    }

    canActivate() {
        const demo = Demos.findOne(this.demoId);
        return (demo && demo.owner == Meteor.userId());
    }

    saveDemo() {
        Demos.update(this.demo._id, {
            $set: {
                name: this.demo.name,
                description: this.demo.description,
                location: this.demo.location
            }
        });
    }

    invite(user: Meteor.User) {
        this.call('invite', this.demo._id, user._id, (error) => {
            if (error) {
                alert(`Failed to invite due to ${error}`);
                return;
            }

            alert('User successfully invited.');
        });
    }

    reply(rsvp: string) {
        this.call('reply', this.demo._id, rsvp, (error) => {
            if (error) {
                alert(`Failed to reply due to ${error}`);
            } else {
                alert('You successfully replied.');
            }
        });
    }

    getUsers(demo: Demo) {
        if (demo) {
            this.users = Meteor.users.find({
                _id: {
                    $nin: demo.invited || [],
                    $ne: Meteor.userId()
                }
            });
        }
    }

    get isOwner(): boolean {
        return this.demo && this.user && this.user._id === this.demo.owner;
    }

    get isPublic(): boolean {
        return this.demo && this.demo.public;
    }

    get isInvited(): boolean {
        if (this.demo && this.user) {
            const invited = this.demo.invited || [];
            return invited.indexOf(this.user._id) !== -1;
        }
        return false;
    }

    get lat(): number {
        return this.demo && this.demo.location.lat;
    }

    get lng(): number {
        return this.demo && this.demo.location.lng;
    }

    mapClicked($event: MouseEvent) {
        this.demo.location.lat = $event.coords.lat;
        this.demo.location.lng = $event.coords.lng;
    }

}
