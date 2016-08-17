// Angular/Meteor Components
import { Component, OnInit, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { LoginButtons, InjectUser } from 'angular2-meteor-accounts-ui';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { PaginationService, PaginationControlsCmp } from 'ng2-pagination';

// Google Maps
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

// Manager App Collections
import { Demo } from '../../../both/interfaces/demo.interface';
import { Demos } from '../../../both/collections/demos.collection';

// Manager App Components
import { DemoComponent } from './demo.component';
import { DemoFormComponent } from './demo-form.component';
import { RsvpPipe } from './demo-rsvp.pipe';

// Demo-List Component Template
import template from './demo-list.component.html';

// Demo-List Component
@Component({
    selector: 'demo-list',
    viewProviders: [PaginationService],
    directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, DemoComponent, DemoFormComponent, LoginButtons, PaginationControlsCmp],
    pipes: [RsvpPipe],
    template
})
@InjectUser('user')
export class DemoListComponent extends MeteorComponent implements OnInit {

    user: Meteor.User;

    /** @member {Mongo.Cursor} demos - A Cursor to the list of Demo Records in the DB */
    demos: Mongo.Cursor<Demo>;
    demosSize: number = 0;

    currentPage: ReactiveVar<number> = new ReactiveVar<number>(1);
    pageSize: number = 10;
    nameOrder: ReactiveVar<number> = new ReactiveVar<number>(1);

    location: ReactiveVar<string> = new ReactiveVar<string>(null);

    loading: boolean = false;

    constructor(private ngZone: NgZone, private paginationService: PaginationService) {
        super();
    }

    /**
     * After Angular finishes Initializing
     */
    ngOnInit() {
        this.paginationService.register({
            id: this.paginationService.defaultId,
            itemsPerPage: this.pageSize,
            currentPage: this.currentPage.get(),
            totalItems: this.demosSize
        });
        
        this.autorun(() => {
            const options = {
                limit: this.pageSize,
                skip: (this.currentPage.get() - 1) * this.pageSize,
                sort: { name: this.nameOrder.get() }
            };

            this.loading = true;
            this.paginationService.setCurrentPage(this.paginationService.defaultId, this.currentPage.get());
            
            this.subscribe('demos', options, this.location.get(), () => {
                this.ngZone.run(() => {
                    this.demos = Demos.find({}, {sort: {name: this.nameOrder.get()}});
                });
                this.loading = false;
            }, true);
        });

        this.autorun(() => {
            this.ngZone.run(() => {
                this.demosSize = Counts.get('numberOfDemos');
                this.paginationService.setTotalItems(this.paginationService.defaultId, this.demosSize);
            });
        });
    }

    search(value: string) {
        this.currentPage.set(1);
        this.location.set(value);
    }

    changeSortOrder(nameOrder: string) {
        this.nameOrder.set(parseInt(nameOrder));
    }

    onPageChanged(page: number) {
        this.currentPage.set(page);
    }

    /**
     * Remove a Demo Record from the DB
     *
     * @param {Object} demo - The object to remove from the DB
     */
    removeDemo(demo) {
        Demos.remove(demo._id);
    }

    isOwner(demo: Demo): boolean {
        return this.user && this.user._id === demo.owner;
    }
}
