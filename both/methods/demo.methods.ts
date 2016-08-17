// Manager App Collections
import { Demos } from '../collections/demos.collection';


function getContactEmail(user:Meteor.User):string {
    if (user.emails && user.emails.length) {
        return user.emails[0].address;
    }
    return null;
}

Meteor.methods({

    invite: function (demoId:string, userId:string) {
        check(demoId, String);
        check(userId, String);

        let demo = Demos.findOne(demoId);

        if (!demo) {
            throw new Meteor.Error('404', 'No such demo-record!');
        }

        if (demo.public) {
            throw new Meteor.Error('400', 'That demo-record is public. No need to invite people.');
        }

        if (demo.owner !== this.userId) {
            throw new Meteor.Error('403', 'No permissions!');
        }

        if (userId !== demo.owner && (demo.invited || []).indexOf(userId) === -1) {
            Demos.update(demoId, {$addToSet: {invited: userId}});

            let from = getContactEmail(Meteor.users.findOne(this.userId));
            let to = getContactEmail(Meteor.users.findOne(userId));

            if (Meteor.isServer && to) {
                Email.send({
                    from: 'noreply@socially.com',
                    to: to,
                    replyTo: from || undefined,
                    subject: 'DEMO: ' + demo.name,
                    text: `Hi, I just invited you to ${demo.name} on Socially.
                        \n\nCome check it out: ${Meteor.absoluteUrl()}\n`
                });
            }
        }
    },

    reply: function(demoId: string, rsvp: string) {
        check(demoId, String);
        check(rsvp, String);

        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be logged-in to reply');
        }

        if (['yes', 'no', 'maybe'].indexOf(rsvp) === -1) {
            throw new Meteor.Error('400', 'Invalid RSVP');
        }

        let demo = Demos.findOne({ _id: demoId });

        if (!demo) {
            throw new Meteor.Error('404', 'No such demo-record');
        }

        if (demo.owner === this.userId) {
            throw new Meteor.Error('500', 'You are the owner!');
        }

        if (!demo.public && (!demo.invited || demo.invited.indexOf(this.userId) == -1)) {
            throw new Meteor.Error('403', 'No such demo-record'); // its private, but let's not tell this to the user
        }

        let rsvpIndex = demo.rsvps ? demo.rsvps.findIndex((rsvp) => rsvp.userId === this.userId) : -1;

        if (rsvpIndex !== -1) {
            // update existing rsvp entry
            if (Meteor.isServer) {
                // update the appropriate rsvp entry with $
                Demos.update(
                    { _id: demoId, 'rsvps.userId': this.userId },
                    { $set: { 'rsvps.$.response': rsvp } });
            } else {
                // minimongo doesn't yet support $ in modifier. as a temporary
                // workaround, make a modifier that uses an index. this is
                // safe on the client since there's only one thread.
                let modifier = { $set: {} };
                modifier.$set['rsvps.' + rsvpIndex + '.response'] = rsvp;

                Demos.update(demoId, modifier);
            }
        } else {
            // add new rsvp entry
            Demos.update(demoId, { $push: { rsvps: { userId: this.userId, response: rsvp } } });
        }
    }
});
