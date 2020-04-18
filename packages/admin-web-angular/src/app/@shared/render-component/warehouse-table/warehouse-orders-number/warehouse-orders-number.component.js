import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let WarehouseOrdersNumberComponent = class WarehouseOrdersNumberComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.numberQTY = this.rowData.ordersQty;
    }
    redirect() {
        if (this.redirectPage) {
            this.router.navigate([`${this.redirectPage}/${this.rowData.id}`]);
        }
    }
};
WarehouseOrdersNumberComponent = __decorate([
    Component({
        styleUrls: ['warehouse-orders-number.component.scss'],
        templateUrl: 'warehouse-orders-number.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], WarehouseOrdersNumberComponent);
export { WarehouseOrdersNumberComponent };
//# sourceMappingURL=warehouse-orders-number.component.js.map