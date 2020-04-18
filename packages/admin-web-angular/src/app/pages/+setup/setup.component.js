import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let SetupComponent = class SetupComponent {
    constructor(_router) {
        this._router = _router;
    }
    navigateToFakeDataPage() {
        this.loading = true;
        this._router.navigate(['/generate-initial-data']);
        this.loading = false;
    }
    navigateToSetupMerchantsPage() {
        this.loading = true;
        this._router.navigate(['/setup/merchants']);
        this.loading = false;
    }
};
SetupComponent = __decorate([
    Component({
        styleUrls: ['./setup.component.scss'],
        templateUrl: './setup.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], SetupComponent);
export { SetupComponent };
//# sourceMappingURL=setup.component.js.map