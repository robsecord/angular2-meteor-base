// Angular/Meteor Components
import { Meteor } from 'meteor/meteor';

// Component Publications/Methods
import './publications/demos.pub';
import './publications/users.pub';
import '../../../both/methods/demo.methods';

// Component Fixtures
import { loadDemos } from './fixtures/demos';

// Component Startup
export function initDemos() {
    // load initial Demos
    loadDemos();
}
