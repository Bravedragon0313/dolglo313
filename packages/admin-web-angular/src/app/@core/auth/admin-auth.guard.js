import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
let AdminAuthGuard = class AdminAuthGuard {
    constructor(router, apollo) {
        this.router = router;
        this.apollo = apollo;
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.apollo
                .query({
                query: gql `
					query IsAdminAuthenticated {
						adminAuthenticated
					}
				`,
                fetchPolicy: 'network-only',
            })
                .toPromise();
            return res.data.adminAuthenticated;
        });
    }
    canActivate(route, state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isAuthenticated()) {
                return true;
            }
            this.router.navigate(['/auth/login'], {
                queryParams: { returnUrl: state.url },
            });
            return false;
        });
    }
};
AdminAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router,
        Apollo])
], AdminAuthGuard);
export { AdminAuthGuard };
//# sourceMappingURL=admin-auth.guard.js.map