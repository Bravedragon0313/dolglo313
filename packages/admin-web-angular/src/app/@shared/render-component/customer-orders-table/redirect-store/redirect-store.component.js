import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WarehousesService } from '../../../../@core/data/warehouses.service';
let RedirectStoreComponent = class RedirectStoreComponent {
    constructor(router, warehousesService) {
        this.router = router;
        this.warehousesService = warehousesService;
    }
    ngOnInit() {
        this.store$ = this.warehousesService.getStoreById(this.rowData.warehouseId);
        this.warehouseStatusText =
            'STATUS_TEXT.' + this.rowData.warehouseStatusText;
    }
    redirect() {
        if (this.rowData.warehouseId) {
            this.router.navigate([`stores/${this.rowData.warehouseId}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectStoreComponent.prototype, "rowData", void 0);
RedirectStoreComponent = __decorate([
    Component({
        styleUrls: ['redirect-store.component.scss'],
        templateUrl: './redirect-store.component.html',
    }),
    __metadata("design:paramtypes", [Router,
        WarehousesService])
], RedirectStoreComponent);
export { RedirectStoreComponent };
//# sourceMappingURL=redirect-store.component.js.map