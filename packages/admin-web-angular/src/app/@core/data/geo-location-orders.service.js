import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
let GeoLocationOrdersService = class GeoLocationOrdersService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    getOrdersForWork(geoLocation, skippedOrderIds = [], options = {
        sort: 'asc',
    }, searchObj) {
        return this.apollo
            .watchQuery({
            query: gql `
					query GetOrdersForWork(
						$geoLocation: GeoLocationFindInput!
						$skippedOrderIds: [String!]!
						$options: GeoLocationOrdersOptions
						$searchObj: SearchOrdersForWork
					) {
						getOrdersForWork(
							geoLocation: $geoLocation
							skippedOrderIds: $skippedOrderIds
							options: $options
							searchObj: $searchObj
						) {
							id
							carrierStatus
							carrierStatusText
							warehouseStatusText
							createdAt
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
            variables: { geoLocation, skippedOrderIds, options, searchObj },
            pollInterval: 1000,
        })
            .valueChanges.pipe(map((res) => res.data.getOrdersForWork), share());
    }
    getCountOfOrdersForWork(geoLocation, skippedOrderIds = [], searchObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.apollo
                .query({
                query: gql `
					query GetCountOfOrdersForWork(
						$geoLocation: GeoLocationFindInput!
						$skippedOrderIds: [String!]!
						$searchObj: SearchOrdersForWork
					) {
						getCountOfOrdersForWork(
							geoLocation: $geoLocation
							skippedOrderIds: $skippedOrderIds
							searchObj: $searchObj
						)
					}
				`,
                variables: { geoLocation, skippedOrderIds, searchObj },
            })
                .toPromise();
            return res.data['getCountOfOrdersForWork'];
        });
    }
};
GeoLocationOrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], GeoLocationOrdersService);
export { GeoLocationOrdersService };
//# sourceMappingURL=geo-location-orders.service.js.map