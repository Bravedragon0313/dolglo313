import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, share, first } from 'rxjs/operators';
import Device from '@modules/server.common/entities/Device';
let DeviceService = class DeviceService {
    constructor(apollo) {
        this.apollo = apollo;
        this.devices$ = this.apollo
            .watchQuery({
            query: gql `
				query allDevices {
					devices {
						_id
						language
						type
						uuid
					}
				}
			`,
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((result) => result.data.devices), map((devices) => devices.map((d) => this._deviceFactory(d))), share());
    }
    getByFindInput(findInput) {
        return this.apollo
            .query({
            query: gql `
					query GetByUuid($findInput: DeviceFindInput) {
						devices(findInput: $findInput) {
							id
						}
					}
				`,
            variables: { findInput },
        })
            .pipe(map((res) => res.data['devices']), share());
    }
    getDeviceByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getByFindInput({ uuid }).pipe(first()).toPromise();
        });
    }
    getWithWebsocket() {
        const COMMENT_QUERY = gql `
			query _allDevices {
				devices {
					_id
					language
					type
					uuid
				}
			}
		`;
        return this.apollo.watchQuery({
            query: COMMENT_QUERY,
        });
    }
    getDevices() {
        return this.devices$;
    }
    update(deviceId, updateInput) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation UpdateDevice(
						$deviceId: String!
						$updateInput: DeviceUpdateInput!
					) {
						updateDevice(id: $deviceId, updateInput: $updateInput) {
							id
						}
					}
				`,
            variables: {
                deviceId,
                updateInput,
            },
        })
            .pipe(map((result) => result.data.updateDevice.update), map((d) => this._deviceFactory(d)), share());
    }
    removeByIds(ids) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation RemoveDeviceByIds($ids: [String!]!) {
						removeDeviceByIds(ids: $ids) {
							n
						}
					}
				`,
            variables: { ids },
        })
            .pipe(map((result) => result.data.removeDeviceByIds), share());
    }
    create(createInput) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation CreateDevice($createInput: DeviceCreateInput!) {
						createDevice(createInput: $createInput) {
							id
						}
					}
				`,
            variables: {
                createInput,
            },
        })
            .pipe(map((result) => result.data.createDevice), share());
    }
    _deviceFactory(device) {
        return device == null ? null : new Device(device);
    }
};
DeviceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], DeviceService);
export { DeviceService };
//# sourceMappingURL=device.service.js.map