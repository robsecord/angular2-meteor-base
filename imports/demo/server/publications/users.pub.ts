// Manager App Collections
import { Demos } from '../../../../both/collections/demos.collection';

Meteor.publish('uninvited', function (demoId: string) {
    check(demoId, String);

    let demo = Demos.findOne(demoId);

    if (!demo) {
        throw new Meteor.Error('404', 'No such demo-record!');
    }

    return Meteor.users.find({
        _id: {
            $nin: demo.invited || [],
            $ne: this.userId
        }
    });
});