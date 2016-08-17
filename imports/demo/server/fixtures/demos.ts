
import { Demo } from '../../../../both/interfaces/demo.interface';
import { Demos } from '../../../../both/collections/demos.collection';
import * as Faker from 'faker';

export function loadDemos() {
    // Insert Dummy-data
    if (Demos.find().count() === 0) {
        for (var i = 0; i < 30; i++) {
            Demos.insert({
                name: Faker.company.companyName(),
                location: {
                    name: Faker.address.streetAddress()
                },
                description: Faker.lorem.sentence(100),
                public: true
            });
        }
    }
}
