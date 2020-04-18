import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
let GeoLocationService = class GeoLocationService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    getGeoLocationProducts(geoLocation) {
        return this.apollo
            .watchQuery({
            query: gql `
					query geoLocationProducts(
						$geoLocation: GeoLocationFindInput!
					) {
						geoLocationProducts(geoLocation: $geoLocation) {
							distance
							warehouseId
							warehouseLogo
							warehouseProduct {
								price
								initialPrice
								count
								isManufacturing
								isCarrierRequired
								isDeliveryRequired
								deliveryTimeMin
								deliveryTimeMax
								product {
									id
									title {
										locale
										value
									}
									description {
										locale
										value
									}
									details {
										locale
										value
									}
									images {
										locale
										url
										width
										height
										orientation
									}
								}
							}
						}
					}
				`,
            variables: {
                geoLocation: {
                    countryId: geoLocation.countryId,
                    city: geoLocation.city,
                    postcode: geoLocation.postcode,
                    streetAddress: geoLocation.streetAddress,
                    house: geoLocation.house,
                    loc: geoLocation.loc,
                },
            },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.geoLocationProducts), share());
    }
};
GeoLocationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], GeoLocationService);
export { GeoLocationService };
//# sourceMappingURL=geo-location.service.js.map