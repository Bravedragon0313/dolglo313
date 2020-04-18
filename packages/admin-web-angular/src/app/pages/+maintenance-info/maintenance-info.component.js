import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MaintenanceService } from '@modules/client.common.angular2/services/maintenance.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { Store } from '@app/@core/data/store.service';
let MaintenanceInfoComponent = class MaintenanceInfoComponent {
    constructor(maintenanceService, router, store) {
        this.maintenanceService = maintenanceService;
        this.router = router;
        this.store = store;
        this.maintenanceMode = this.store.maintenanceMode;
        this.getMessage();
        this.getStatus();
    }
    getMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.message = yield this.maintenanceService.getMessage(this.maintenanceMode, environment['SETTINGS_MAINTENANCE_API_URL']);
        });
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const status = yield this.maintenanceService.getStatus(environment['SETTINGS_APP_TYPE'], environment['SETTINGS_MAINTENANCE_API_URL']);
                console.warn(`Maintenance on '${this.maintenanceMode}': ${status}`);
                if (!status) {
                    clearInterval(interval);
                    this.store.clearMaintenanceMode();
                    this.router.navigate(['']);
                }
            }), 5000);
        });
    }
};
MaintenanceInfoComponent = __decorate([
    Component({
        templateUrl: './maintenance-info.component.html',
    }),
    __metadata("design:paramtypes", [MaintenanceService,
        Router,
        Store])
], MaintenanceInfoComponent);
export { MaintenanceInfoComponent };
//# sourceMappingURL=maintenance-info.component.js.map