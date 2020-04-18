import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import Warehouse from '@modules/server.common/entities/Warehouse';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
let WarehousesService = class WarehousesService {
    constructor(_apollo) {
        this._apollo = _apollo;
    }
    hasExistingStores() {
        return this._apollo
            .query({
            query: gql `
					query HasExistingStores {
						hasExistingStores
					}
				`,
        })
            .pipe(map((res) => res.data.hasExistingStores));
    }
    getCountExistingCustomers() {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetCountExistingCustomers {
						getCountExistingCustomers {
							total
							perStore {
								storeId
								customersCount
							}
						}
					}
				`,
        })
            .valueChanges.pipe(map((res) => res.data.getCountExistingCustomers));
    }
    getCountExistingCustomersToday() {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetCountExistingCustomersToday {
						getCountExistingCustomersToday {
							total
							perStore {
								storeId
								customersCount
							}
						}
					}
				`,
        })
            .valueChanges.pipe(map((res) => res.data.getCountExistingCustomersToday));
    }
    getAllStores() {
        return this._apollo
            .query({
            query: gql `
					query GetAllStores {
						getAllStores {
							id
							_createdAt
							geoLocation {
								loc {
									coordinates
								}
							}
						}
					}
				`,
        })
            .pipe(map((res) => res.data.getAllStores));
    }
    getStoreLivePosition() {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetAllStores {
						getAllStores {
							id
							_createdAt
							name
							logo
							geoLocation {
								loc {
									coordinates
								}
								city
								countryId
							}
						}
					}
				`,
            pollInterval: 5000,
        })
            .valueChanges.pipe(map((res) => res.data.getAllStores));
    }
    getStores(pagingOptions) {
        return this._apollo
            .watchQuery({
            query: gql `
					query AllWarehouses($pagingOptions: PagingOptionsInput) {
						warehouses(pagingOptions: $pagingOptions) {
							_id
							_createdAt
							name
							contactEmail
							contactPhone
							logo
							username
							usedCarriersIds
							carriersIds
							geoLocation {
								city
								streetAddress
								house
							}
						}
					}
				`,
            variables: { pagingOptions },
            pollInterval: 5000,
        })
            .valueChanges.pipe(map((res) => res.data.warehouses), map((ws) => ws.map((w) => this._warehouseFactory(w))), share());
    }
    getNearbyStores(geoLocation) {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetNearbyStores($geoLocation: GeoLocationFindInput!) {
						nearbyStores(geoLocation: $geoLocation) {
							_id
							name
							contactEmail
							contactPhone
							logo
							geoLocation {
								city
								streetAddress
								house
							}
						}
					}
				`,
            pollInterval: 5000,
            variables: { geoLocation },
        })
            .valueChanges.pipe(map((res) => res.data.nearbyStores), map((ws) => ws.map((w) => this._warehouseFactory(w))), share());
    }
    removeByIds(ids) {
        return this._apollo.mutate({
            mutation: gql `
				mutation RemoveByIds($ids: [String!]!) {
					removeWarehousesByIds(ids: $ids)
				}
			`,
            variables: { ids },
        });
    }
    addProducts(warehouseId, products) {
        return this._apollo
            .mutate({
            mutation: gql `
					mutation AddProducts(
						$warehouseId: String!
						$products: [WarehouseProductInput!]!
					) {
						addWarehouseProducts(
							warehouseId: $warehouseId
							products: $products
						) {
							product {
								id
							}
						}
					}
				`,
            variables: {
                warehouseId,
                products,
            },
        })
            .pipe(map((result) => result.data.warehouseAddProducts), share());
    }
    removeProductsById(warehouseId, productsIds) {
        return this._apollo.mutate({
            mutation: gql `
				mutation RemoveProductsByIds(
					$warehouseId: String!
					$productsIds: [String!]!
				) {
					removeWarehouseProducts(
						warehouseId: $warehouseId
						productsIds: $productsIds
					)
				}
			`,
            variables: { warehouseId, productsIds },
        });
    }
    getStoreById(id) {
        return this._apollo
            .query({
            query: gql `
					query GetStoreById($id: String!) {
						warehouse(id: $id) {
							id
							name
							logo
						}
					}
				`,
            variables: { id },
        })
            .pipe(map((res) => res.data['warehouse']), share());
    }
    getCountOfMerchants() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetCountOfMerchants {
						getCountOfMerchants
					}
				`,
            })
                .toPromise();
            return res.data['getCountOfMerchants'];
        });
    }
    _warehouseFactory(warehouse) {
        return warehouse == null ? null : new Warehouse(warehouse);
    }
};
WarehousesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], WarehousesService);
export { WarehousesService };
//# sourceMappingURL=warehouses.service.js.map