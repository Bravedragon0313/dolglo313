import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import faker from 'faker';
import { environment } from '../../../../environments/environment';
let FakeDataUsers = class FakeDataUsers {
    getUserRegistrationInput() {
        return {
            user: {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                image: faker.image.avatar(),
                apartment: faker.random.number(199).toString(),
                geoLocation: {
                    countryId: faker.random.number(200),
                    city: faker.address.city(),
                    postcode: faker.address.zipCode(),
                    streetAddress: faker.address.streetAddress(),
                    house: faker.random.number(199).toString(),
                    loc: {
                        type: 'Point',
                        coordinates: [
                            environment.DEFAULT_LONGITUDE,
                            environment.DEFAULT_LATITUDE,
                        ],
                    },
                },
                isBanned: Math.random() < 0.01,
            },
            password: '123456',
        };
    }
    getEnterByCodeToken1(invite) {
        return {
            location: invite.geoLocation.loc,
            inviteCode: invite.code,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        };
    }
};
FakeDataUsers = __decorate([
    Injectable()
], FakeDataUsers);
export default FakeDataUsers;
//# sourceMappingURL=users.js.map