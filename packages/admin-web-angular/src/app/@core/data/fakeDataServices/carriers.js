import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import CarrierStatus from '@modules/server.common/enums/CarrierStatus';
import { Country } from '@modules/server.common/entities/GeoLocation';
import faker from 'faker';
import { environment } from 'environments/environment';
const lng = environment['DEFAULT_LONGITUDE'];
const lat = environment['DEFAULT_LATITUDE'];
let FakeDataCarriers = class FakeDataCarriers {
    constructor() {
        this.registrationInputs = lng && lat
            ? {
                generate: () => {
                    const firstName = faker.name.firstName();
                    return {
                        carrier: {
                            isDeleted: false,
                            firstName,
                            lastName: faker.name.lastName(),
                            status: faker.random.number({
                                min: 0,
                                max: 2,
                            }),
                            phone: faker.phone.phoneNumber(),
                            username: faker.internet.userName(),
                            logo: faker.image.avatar(),
                            numberOfDeliveries: faker.random.number({
                                min: 200,
                                max: 20000,
                            }),
                            deliveriesCountToday: faker.random.number({
                                min: 0,
                                max: 60,
                            }),
                            isSharedCarrier: true,
                            geoLocation: {
                                city: faker.address.city(),
                                postcode: faker.address.zipCode(),
                                streetAddress: faker.address.streetAddress(),
                                house: faker.random.number(199).toString(),
                                countryId: faker.random.number(220),
                                loc: {
                                    type: 'Point',
                                    coordinates: [
                                        this.getCloseCoordinate(lng),
                                        this.getCloseCoordinate(lat),
                                    ],
                                },
                            },
                        },
                        password: '123456',
                    };
                },
                mike: {
                    carrier: {
                        isDeleted: false,
                        firstName: 'Mike',
                        lastName: 'Carr',
                        status: CarrierStatus.Online,
                        phone: '052-315-2346',
                        username: 'mike',
                        logo: faker.image.avatar(),
                        numberOfDeliveries: faker.random.number({
                            min: 200,
                            max: 20000,
                        }),
                        deliveriesCountToday: faker.random.number({
                            min: 0,
                            max: 60,
                        }),
                        isSharedCarrier: true,
                        geoLocation: {
                            city: 'Ashdod',
                            postcode: '77452',
                            streetAddress: 'HaAtsmaut',
                            house: '28',
                            countryId: Country.IL,
                            loc: {
                                type: 'Point',
                                coordinates: [
                                    this.getCloseCoordinate(lng),
                                    this.getCloseCoordinate(lat),
                                ],
                            },
                        },
                    },
                    password: '123456',
                },
                tom: {
                    carrier: {
                        isDeleted: false,
                        firstName: 'Tom',
                        lastName: 'Bisic',
                        status: CarrierStatus.Online,
                        phone: '052-311-5711',
                        username: 'tom',
                        logo: faker.image.avatar(),
                        numberOfDeliveries: faker.random.number({
                            min: 200,
                            max: 20000,
                        }),
                        deliveriesCountToday: faker.random.number({
                            min: 0,
                            max: 60,
                        }),
                        isSharedCarrier: true,
                        geoLocation: {
                            city: 'Ashdod',
                            postcode: '77452',
                            streetAddress: 'HaAtsmaut',
                            house: '88',
                            countryId: Country.IL,
                            loc: {
                                type: 'Point',
                                coordinates: [
                                    this.getCloseCoordinate(lng),
                                    this.getCloseCoordinate(lat),
                                ],
                            },
                        },
                    },
                    password: '123456',
                },
                josh: {
                    carrier: {
                        firstName: 'Josh',
                        lastName: 'Lenon',
                        status: CarrierStatus.Online,
                        phone: '052-311-5711',
                        username: 'josh',
                        logo: faker.image.avatar(),
                        numberOfDeliveries: faker.random.number({
                            min: 200,
                            max: 20000,
                        }),
                        deliveriesCountToday: faker.random.number({
                            min: 0,
                            max: 60,
                        }),
                        isSharedCarrier: true,
                        geoLocation: {
                            city: 'Ashdod',
                            postcode: '77452',
                            streetAddress: 'HaAtsmaut',
                            house: '88',
                            countryId: Country.IL,
                            loc: {
                                type: 'Point',
                                coordinates: [
                                    this.getCloseCoordinate(lng),
                                    this.getCloseCoordinate(lat),
                                ],
                            },
                        },
                    },
                    password: '123456',
                },
            }
            : null;
    }
    getCloseCoordinate(coord) {
        const num = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        const num2 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        return coord + num * 0.01 + num2 * 0.001;
    }
};
FakeDataCarriers = __decorate([
    Injectable()
], FakeDataCarriers);
export default FakeDataCarriers;
//# sourceMappingURL=carriers.js.map