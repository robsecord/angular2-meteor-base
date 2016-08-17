
// Manager App Components
import { initDemos } from '../imports/demo/server/component.init';

// Server Startup
Meteor.startup(() => {

    // Initialize Components
    initDemos();

});
