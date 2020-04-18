import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
let AdminsService = class AdminsService {
    constructor(_apollo) {
        this._apollo = _apollo;
    }
    getAdmin(id) {
        return this._apollo
            .watchQuery({
            query: gql `
					query admin($id: String!) {
						admin(id: $id) {
							id
							name
							email
							pictureUrl
							firstName
							lastName
						}
					}
				`,
            variables: { id },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data['admin']), share());
    }
    updatePassword(id, password) {
        return this._apollo.mutate({
            mutation: gql `
				mutation UpdateAdminPassword(
					$id: String!
					$password: AdminPasswordUpdateInput!
				) {
					updateAdminPassword(id: $id, password: $password)
				}
			`,
            variables: { id, password },
        });
    }
    updateById(id, updateInput) {
        return this._apollo
            .mutate({
            mutation: gql `
					mutation UpdateAdmin(
						$id: String!
						$updateInput: AdminUpdateInput!
					) {
						updateAdmin(id: $id, updateInput: $updateInput) {
							id
							name
							email
							pictureUrl
							firstName
							lastName
						}
					}
				`,
            variables: {
                id,
                updateInput,
            },
        })
            .pipe(map((result) => result.data.updateAdmin), share());
    }
};
AdminsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], AdminsService);
export { AdminsService };
//# sourceMappingURL=admins.service.js.map