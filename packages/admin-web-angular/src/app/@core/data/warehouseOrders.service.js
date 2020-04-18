import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
let WarehouseOrdersService = class WarehouseOrdersService {
    constructor(_apollo) {
        this._apollo = _apollo;
    }
    createOrder(createInput) {
        return this._apollo
            .mutate({
            mutation: gql `
					mutation MakeOrder($createInput: OrderCreateInput!) {
						createOrder(createInput: $createInput) {
							_id
							_createdAt
							_updatedAt
							carrierStatus
							isConfirmed
							warehouseId
							warehouseStatus
							user {
								_id
							}
							carrier {
								_id
							}
						}
					}
				`,
            variables: { createInput },
        })
            .map((result) => result.data.createOrder);
    }
    getDashboardOrdersChartOrders(storeId) {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetDashboardOrdersChartOrders($storeId: String!) {
						getDashboardOrdersChartOrders(storeId: $storeId) {
							isCompleted
							isCancelled
							_createdAt
							totalPrice
						}
					}
				`,
            variables: { storeId },
        })
            .valueChanges.pipe(map((res) => res.data.getDashboardOrdersChartOrders));
    }
    getStoreOrders(storeId) {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetStoreOrders($storeId: String!) {
						getStoreOrders(storeId: $storeId) {
							id
							isCompleted
							products {
								count
								price
							}
						}
					}
				`,
            pollInterval: 5000,
            variables: { storeId },
        })
            .valueChanges.pipe(map((res) => res.data.getStoreOrders));
    }
    getStoreOrdersTableData(storeId, pagingOptions, status) {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetStoreOrdersTableData(
						$storeId: String!
						$pagingOptions: PagingOptionsInput
						$status: String
					) {
						getStoreOrdersTableData(
							storeId: $storeId
							pagingOptions: $pagingOptions
							status: $status
						) {
							orders {
								id
								carrierStatus
								carrierStatusText
								warehouseStatusText
								createdAt
								warehouseStatus
								deliveryTime
								status
								isConfirmed
								finishedProcessingTime
								isCancelled
								isPaid
								orderType
								orderNumber
								_createdAt
								user {
									id
									firstName
									lastName
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
									geoLocation {
										house
										postcode
										countryName
										city
									}
								}

								products {
									count
									price
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
					}
				`,
            pollInterval: 5000,
            variables: { storeId, pagingOptions, status },
        })
            .valueChanges.pipe(map((res) => res.data['getStoreOrdersTableData']));
    }
    getCountOfStoreOrders(storeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query getCountOfStoreOrders(
						$storeId: String!
						$status: String!
					) {
						getCountOfStoreOrders(
							storeId: $storeId
							status: $status
						)
					}
				`,
                variables: { storeId, status },
            })
                .toPromise();
            return res.data['getCountOfStoreOrders'];
        });
    }
};
WarehouseOrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], WarehouseOrdersService);
export { WarehouseOrdersService };
//# sourceMappingURL=warehouseOrders.service.js.map