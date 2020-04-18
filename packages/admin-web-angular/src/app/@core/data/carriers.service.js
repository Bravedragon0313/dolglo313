import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import Carrier from '@modules/server.common/entities/Carrier';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
let CarriersService = class CarriersService {
    constructor(_apollo) {
        this._apollo = _apollo;
        this.carriers$ = this._apollo
            .watchQuery({
            query: gql `
				query getCarriers {
					getCarriers {
						_id
						firstName
						lastName
						phone
						logo
						isDeleted
						numberOfDeliveries
						skippedOrderIds
						status
						geoLocation {
							city
							streetAddress
							house
							loc {
								type
								coordinates
							}
						}
					}
				}
			`,
            pollInterval: 1000,
        })
            .valueChanges.pipe(map((res) => res.data.getCarriers), map((carriers) => carriers.map((c) => this._carrierFactory(c))), share());
    }
    getAllCarriers() {
        return this.carriers$;
    }
    getCarriers(pagingOptions, carriersFindInput) {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetCarriers(
						$pagingOptions: PagingOptionsInput
						$carriersFindInput: CarriersFindInput
					) {
						getCarriers(
							pagingOptions: $pagingOptions
							carriersFindInput: $carriersFindInput
						) {
							_id
							firstName
							lastName
							phone
							logo
							isDeleted
							numberOfDeliveries
							skippedOrderIds
							status
							isActive
							username
							isSharedCarrier
							geoLocation {
								city
								streetAddress
								house
								loc {
									type
									coordinates
								}
							}
						}
					}
				`,
            variables: { pagingOptions, carriersFindInput },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.getCarriers), map((carriers) => carriers.map((c) => this._carrierFactory(c))), share());
    }
    removeByIds(ids) {
        return this._apollo.mutate({
            mutation: gql `
				mutation RemoveCarriersByIds($ids: [String!]!) {
					removeCarriersByIds(ids: $ids)
				}
			`,
            variables: { ids },
        });
    }
    getCarrierByUsername(username) {
        return this._apollo
            .query({
            query: gql `
					query GetCarrierByUsername($username: String!) {
						getCarrierByUsername(username: $username) {
							username
						}
					}
				`,
            variables: { username },
        })
            .pipe(map((res) => res.data['getCarrierByUsername']), share());
    }
    getCarrierById(id) {
        return this._apollo
            .query({
            query: gql `
					query GetCarrierById($id: String!) {
						getCarrier(id: $id) {
							id
							firstName
							logo
						}
					}
				`,
            variables: { id },
        })
            .pipe(map((res) => res.data['getCarrier']), share());
    }
    getCarrierCurrentOrder(carrierId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetCarrierCurrentOrder($carrierId: String!) {
						getCarrierCurrentOrder(carrierId: $carrierId) {
							id
							carrierStatus
							carrierStatusText
							warehouseStatusText
							createdAt
							startDeliveryTime
							status
							deliveryTime
							finishedProcessingTime
							user {
								id
								phone
								email
								apartment
								firstName
								lastName
								image
								geoLocation {
									house
									postcode
									countryName
									city
									streetAddress
									loc {
										coordinates
										type
									}
								}
							}
							warehouse {
								id
								name
								logo
								contactEmail
								contactPhone
								geoLocation {
									house
									postcode
									countryName
									city
									streetAddress
									loc {
										coordinates
										type
									}
								}
							}
						}
					}
				`,
                variables: { carrierId },
            })
                .toPromise();
            return res.data['getCarrierCurrentOrder'];
        });
    }
    getCountOfCarriers(carriersFindInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetCountOfCarriers(
						$carriersFindInput: CarriersFindInput
					) {
						getCountOfCarriers(
							carriersFindInput: $carriersFindInput
						)
					}
				`,
                variables: { carriersFindInput },
            })
                .toPromise();
            return res.data['getCountOfCarriers'];
        });
    }
    _carrierFactory(carrier) {
        return carrier == null ? null : new Carrier(carrier);
    }
};
CarriersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], CarriersService);
export { CarriersService };
//# sourceMappingURL=carriers.service.js.map