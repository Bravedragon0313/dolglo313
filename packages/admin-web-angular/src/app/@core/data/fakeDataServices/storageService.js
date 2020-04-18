import { __decorate } from "tslib";
import { StorageService } from '@modules/server.common/StorageService';
import GeoLocation from '@modules/server.common/entities/GeoLocation';
import { generateObjectIdString } from '@modules/server.common/utils';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
const lng = environment['DEFAULT_LONGITUDE'];
const lat = environment['DEFAULT_LATITUDE'];
let AdminStorageService = class AdminStorageService extends StorageService {
    constructor() {
        super(...arguments);
        this.isConnected = false;
        this.order = null;
        this.user = null;
        this.customerGeoLocation = lng && lat
            ? new GeoLocation({
                _id: generateObjectIdString(),
                _createdAt: new Date().toString(),
                _updatedAt: new Date().toString(),
                city: 'אשדוד',
                postcode: '77452',
                streetAddress: 'העצמאות',
                house: '38',
                countryId: 1,
                loc: {
                    type: 'Point',
                    coordinates: [lng, lat],
                },
            })
            : null;
    }
};
AdminStorageService = __decorate([
    Injectable()
], AdminStorageService);
export { AdminStorageService };
//# sourceMappingURL=storageService.js.map