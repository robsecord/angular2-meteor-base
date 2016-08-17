// Angular/Meteor Components
import { Counts } from 'meteor/tmeasday:publish-counts';

// Manager App Collections
import { Demos } from '../../../../both/collections/demos.collection';


function buildQuery(demoId?: string, location?: string): Object {
    const isAvailable = {
        $or: [
            { 'public': true },
            {
                $and: [
                    { owner: this.userId },
                    { owner: { $exists: true } }
                ]
            }, {
                $and: [
                    { invited: this.userId },
                    { invited: { $exists: true } }
                ]
            }
        ]
    };

    if (demoId) {
        return { $and: [{ _id: demoId }, isAvailable] };
    }

    const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

    return { $and: [{ 'location.name': searchRegEx }, isAvailable] };
}


Meteor.publish('demos', function(options: any, location?: string) {
    check(options, Match.Any);
    check(location, Match.Optional(Match.OneOf(undefined, null, String)));

    const selector = buildQuery.call(this, null, location);

    // Publish Counts
    Counts.publish(this, 'numberOfDemos', Demos.find(selector), { noReady: true });

    // Publish Limited Record-set
    return Demos.find(selector, options);
});

Meteor.publish('demo', function(demoId: string) {
    check(demoId, String);
    return Demos.find(buildQuery.call(this, demoId));
});
