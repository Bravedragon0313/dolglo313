import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import Order from '@modules/server.common/entities/Order';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
let OrdersService = class OrdersService {
    constructor(_apollo) {
        this._apollo = _apollo;
    }
    generatePastOrdersPerCarrier() {
        return this._apollo.query({
            query: gql `
				query GeneratePastOrdersPerCarrier {
					generatePastOrdersPerCarrier
				}
			`,
        });
    }
    generateActiveAndAvailableOrdersPerCarrier() {
        return this._apollo.query({
            query: gql `
				query GenerateActiveAndAvailableOrdersPerCarrier {
					generateActiveAndAvailableOrdersPerCarrier
				}
			`,
        });
    }
    addOrdersToTake() {
        return this._apollo.query({
            query: gql `
				query AddOrdersToTake {
					addOrdersToTake
				}
			`,
        });
    }
    addTakenOrders(carrierIds) {
        return this._apollo.query({
            query: gql `
				query AddTakenOrders($carrierIds: [String!]!) {
					addTakenOrders(carrierIds: $carrierIds)
				}
			`,
            variables: { carrierIds },
        });
    }
    generateRandomOrdersCurrentStore(storeId, storeCreatedAt, ordersLimit) {
        return this._apollo
            .query({
            query: gql `
					query GenerateRandomOrdersCurrentStore(
						$storeId: String!
						$storeCreatedAt: Date!
						$ordersLimit: Int!
					) {
						generateRandomOrdersCurrentStore(
							storeId: $storeId
							storeCreatedAt: $storeCreatedAt
							ordersLimit: $ordersLimit
						) {
							error
							message
						}
					}
				`,
            variables: { storeId, storeCreatedAt, ordersLimit },
        })
            .pipe(map((res) => res.data.generateRandomOrdersCurrentStore));
    }
    getOrdersChartTotalOrders() {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetOrdersChartTotalOrders {
						getOrdersChartTotalOrders {
							isCancelled
							_createdAt
							totalPrice
						}
					}
				`,
        })
            .valueChanges.pipe(map((res) => res.data.getOrdersChartTotalOrders), share());
    }
    getOrdersChartTotalOrdersNew() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetOrdersChartTotalOrders {
						getOrdersChartTotalOrders {
							isCancelled
							_createdAt
							totalPrice
							isCompleted
						}
					}
				`,
            })
                .toPromise();
            return res.data.getOrdersChartTotalOrders;
        });
    }
    getDashboardCompletedOrders() {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetDashboardCompletedOrders {
						getDashboardCompletedOrders {
							warehouseId
							totalPrice
						}
					}
				`,
        })
            .valueChanges.pipe(map((res) => res.data.getDashboardCompletedOrders), share());
    }
    getComplatedOrdersInfo(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetComplatedOrdersInfo($storeId: String) {
						getCompletedOrdersInfo(storeId: $storeId) {
							totalOrders
							totalRevenue
						}
					}
				`,
                variables: { storeId },
            })
                .toPromise();
            return res.data['getCompletedOrdersInfo'];
        });
    }
    getDashboardCompletedOrdersToday() {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetDashboardCompletedOrdersToday {
						getDashboardCompletedOrdersToday {
							user {
								_id
							}
							warehouseId
							totalPrice
							isCompleted
						}
					}
				`,
        })
            .valueChanges.pipe(map((res) => res.data.getDashboardCompletedOrdersToday), share());
    }
    getOrders() {
        return this._apollo
            .watchQuery({
            query: gql `
					query Orders {
						orders {
							user {
								_id
							}
							warehouseId
							totalPrice
							isCompleted
						}
					}
				`,
            pollInterval: 4000,
        })
            .valueChanges.pipe(map((res) => res.data.orders), share());
    }
    getOrderById(id) {
        return this._apollo
            .watchQuery({
            query: gql `
					query GetOrderById($id: String!) {
						getOrder(id: $id) {
							id
							warehouseId
							carrierId
							createdAt
							orderNumber
						}
					}
				`,
            pollInterval: 4000,
            variables: { id },
        })
            .valueChanges.pipe(map((res) => res.data['getOrder']), share());
    }
    getUsersOrdersCountInfo(usersIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetUsersOrdersCountInfo($usersIds: [String!]) {
						getUsersOrdersCountInfo(usersIds: $usersIds) {
							id
							ordersCount
						}
					}
				`,
                variables: { usersIds },
            })
                .toPromise();
            return res.data['getUsersOrdersCountInfo'];
        });
    }
    getMerchantsOrdersCountInfo(merchantsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetMerchantsOrdersCountInfo(
						$merchantsIds: [String!]
					) {
						getMerchantsOrdersCountInfo(
							merchantsIds: $merchantsIds
						) {
							id
							ordersCount
						}
					}
				`,
                variables: { merchantsIds },
            })
                .toPromise();
            return res.data['getMerchantsOrdersCountInfo'];
        });
    }
    getMerchantsOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query getMerchantsOrders {
						getMerchantsOrders {
							_id
							ordersCount
						}
					}
				`,
            })
                .toPromise();
            return res.data['getMerchantsOrders'];
        });
    }
    _orderFactory(order) {
        return order == null ? null : new Order(order);
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map