import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WarehousesService } from '../../../../@core/data/warehouses.service';
let StoreOrderProductsComponent = class StoreOrderProductsComponent {
    constructor(router, warehousesService) {
        this.router = router;
        this.warehousesService = warehousesService;
    }
    ngOnInit() {
        this.store$ = this.warehousesService.getStoreById(this.rowData.warehouseId);
    }
    redirect() {
        if (this.rowData) {
            this.router.navigate([`stores/${this.rowData.warehouseId}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StoreOrderProductsComponent.prototype, "rowData", void 0);
StoreOrderProductsComponent = __decorate([
    Component({
        templateUrl: './store-order-products.component.html',
    }),
    __metadata("design:paramtypes", [Router,
        WarehousesService])
], StoreOrderProductsComponent);
export { StoreOrderProductsComponent };
//# sourceMappingURL=store-order-products.component.js.map