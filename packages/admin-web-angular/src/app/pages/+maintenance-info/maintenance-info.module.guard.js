import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import { Store } from '@app/@core/data/store.service';
let MaintenanceModuleGuard = class MaintenanceModuleGuard {
    constructor(router, store) {
        this.router = router;
        this.store = store;
    }
    canActivate(route, state) {
        const maintenanceMode = this.store.maintenanceMode;
        if (!maintenanceMode) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
};
MaintenanceModuleGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, Store])
], MaintenanceModuleGuard);
export { MaintenanceModuleGuard };
//# sourceMappingURL=maintenance-info.module.guard.js.map