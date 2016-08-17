// Angular/Meteor Components
import { Pipe } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';

// Manager App Collections
import { Demos } from '../../../both/collections/demos.collection';
import { Demo } from '../../../both/interfaces/demo.interface';

@Pipe({
    name: 'rsvp',
    pure: false
})
export class RsvpPipe extends MeteorComponent {
    init: boolean = false;
    total: number = 0;

    transform(demo: Demo, type: string): number {
        if (!type) {
            return 0;
        }

        if (!this.init) {
            this.autorun(() => {
                const found = Demos.findOne(demo._id);
                if (found) {
                    this.total = found.rsvps ? found.rsvps.filter(rsvp => rsvp.response === type).length : 0;
                }
            }, true);
            this.init = true;
        }

        return this.total;
    }
}
