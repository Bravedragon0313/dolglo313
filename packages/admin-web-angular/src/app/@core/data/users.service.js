import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import User from '@modules/server.common/entities/User';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
let UsersService = class UsersService {
    constructor(_apollo) {
        this._apollo = _apollo;
    }
    isUserEmailExists(email) {
        return this._apollo
            .query({
            query: gql `
					query IsUserEmailExists($email: String!) {
						isUserEmailExists(email: $email)
					}
				`,
            variables: { email },
        })
            .pipe(map((res) => res.data.isUserEmailExists))
            .toPromise();
    }
    isUserExists(conditions) {
        return this._apollo
            .query({
            query: gql `
					query IsUserExists($conditions: UserMemberInput!) {
						isUserExists(conditions: $conditions)
					}
				`,
            variables: { conditions },
        })
            .pipe(map((res) => res.data['isUserExists']));
    }
    getUsers(pagingOptions) {
        return this._apollo
            .watchQuery({
            query: gql `
					query AllUsers($pagingOptions: PagingOptionsInput) {
						users(pagingOptions: $pagingOptions) {
							_id
							firstName
							lastName
							image
							email
							apartment
							phone
							isBanned
							geoLocation {
								countryId
								city
								house
								streetAddress
								loc {
									type
									coordinates
								}
							}
						}
					}
				`,
            variables: { pagingOptions },
            pollInterval: 5000,
        })
            .valueChanges.pipe(map((res) => res.data.users), map((users) => users.map((user) => this._userFactory(user))), share());
    }
    getUserById(id) {
        return this._apollo
            .query({
            query: gql `
					query GetUserById($id: String!) {
						user(id: $id) {
							_id
							firstName
							lastName
							image
							email
							apartment
							phone
							isBanned
							geoLocation {
								streetAddress
								city
								house
								loc {
									type
									coordinates
								}
							}
						}
					}
				`,
            variables: { id },
        })
            .pipe(map((res) => res.data['user']), map((user) => this._userFactory(user)), share());
    }
    removeByIds(ids) {
        return this._apollo.mutate({
            mutation: gql `
				mutation RemoveUsersByIds($ids: [String!]!) {
					removeUsersByIds(ids: $ids)
				}
			`,
            variables: { ids },
        });
    }
    registerUser(registerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .mutate({
                mutation: gql `
					mutation RegisterUser($registerInput: UserRegisterInput!) {
						registerUser(registerInput: $registerInput) {
							id
							firstName
							lastName
						}
					}
				`,
                variables: { registerInput },
            })
                .toPromise();
            return res.data['registerUser'];
        });
    }
    banUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._apollo
                .mutate({
                mutation: gql `
					mutation BanUser($id: String!) {
						banUser(id: $id) {
							id
							firstName
							lastName
						}
					}
				`,
                variables: { id },
            })
                .toPromise();
        });
    }
    unbanUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._apollo
                .mutate({
                mutation: gql `
					mutation UnbanUser($id: String!) {
						unbanUser(id: $id) {
							id
							firstName
							lastName
						}
					}
				`,
                variables: { id },
            })
                .toPromise();
        });
    }
    getCountOfUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetCountOfUsers {
						getCountOfUsers
					}
				`,
            })
                .toPromise();
            return res.data['getCountOfUsers'];
        });
    }
    getCustomerMetrics(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetCustomerMetrics($id: String!) {
						getCustomerMetrics(id: $id) {
							totalOrders
							canceledOrders
							completedOrdersTotalSum
						}
					}
				`,
                variables: { id },
            })
                .toPromise();
            return res.data['getCustomerMetrics'];
        });
    }
    generate1000Customers(defaultLng, defaultLat) {
        return this._apollo
            .query({
            query: gql `
					query Generate1000Customers(
						$defaultLng: Float!
						$defaultLat: Float!
					) {
						generate1000Customers(
							defaultLng: $defaultLng
							defaultLat: $defaultLat
						) {
							success
							message
						}
					}
				`,
            variables: { defaultLng, defaultLat },
        })
            .pipe(map((res) => {
            return res.data.generate1000Customers;
        }));
    }
    _userFactory(user) {
        return user == null ? null : new User(user);
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map