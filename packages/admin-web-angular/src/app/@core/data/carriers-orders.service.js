import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
let CarriersOrdersService = class CarriersOrdersService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    getCarrierOrdersHistory(carrierId, options = {
        sort: 'asc',
    }) {
        return this.apollo
            .watchQuery({
            query: gql `
					query GetCarrierOrdersHistory(
						$carrierId: String!
						$options: GeoLocationOrdersOptions
					) {
						getCarrierOrdersHistory(
							carrierId: $carrierId
							options: $options
						) {
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
								firstName
								lastName
								image
								geoLocation {
									streetAddress
									house
									postcode
									countryName
									city
								}
							}
							warehouse {
								id
								name
								logo
								geoLocation {
									house
									postcode
									countryName
									city
								}
							}
						}
					}
				`,
            variables: { carrierId, options },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.getCarrierOrdersHistory), share());
    }
    getCountOfCarrierOrdersHistory(carrierId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.apollo
                .query({
                query: gql `
					query GetCountOfCarrierOrdersHistory($carrierId: String!) {
						getCountOfCarrierOrdersHistory(carrierId: $carrierId)
					}
				`,
                variables: { carrierId },
            })
                .toPromise();
            return res.data['getCountOfCarrierOrdersHistory'];
        });
    }
};
CarriersOrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], CarriersOrdersService);
export { CarriersOrdersService };
//# sourceMappingURL=carriers-orders.service.js.map