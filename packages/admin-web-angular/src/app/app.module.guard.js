import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import { Store } from './@core/data/store.service';
let AppModuleGuard = class AppModuleGuard {
    constructor(router, store) {
        this.router = router;
        this.store = store;
    }
    canActivate(route, state) {
        const maintenanceMode = this.store.maintenanceMode;
        if (maintenanceMode) {
            this.router.navigate(['maintenance-info']);
            return false;
        }
        const serverConnection = Number(this.store.serverConnection);
        if (serverConnection === 0) {
            this.router.navigate(['server-down']);
            return false;
        }
        return true;
    }
};
AppModuleGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, Store])
], AppModuleGuard);
export { AppModuleGuard };
//# sourceMappingURL=app.module.guard.js.map