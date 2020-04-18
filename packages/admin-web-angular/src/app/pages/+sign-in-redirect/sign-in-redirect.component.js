import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { WarehousesService } from '@app/@core/data/warehouses.service';
import { Router } from '@angular/router';
let SignInRedirectComponent = class SignInRedirectComponent {
    constructor(_storesService, _router) {
        this._storesService = _storesService;
        this._router = _router;
        this._redirectToProperPage();
    }
    _redirectToProperPage() {
        this._storesService
            .hasExistingStores()
            .toPromise()
            .then((hasExistingStores) => {
            const routeToRedirect = hasExistingStores
                ? 'dashboard'
                : 'setup';
            this._router.navigate([routeToRedirect]);
        });
    }
};
SignInRedirectComponent = __decorate([
    Component({
        template: ` <h1>Please wait a second...</h1> `,
    }),
    __metadata("design:paramtypes", [WarehousesService,
        Router])
], SignInRedirectComponent);
export { SignInRedirectComponent };
//# sourceMappingURL=sign-in-redirect.component.js.map