import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let CustomerOrdersNumberComponent = class CustomerOrdersNumberComponent {
    constructor(_router) {
        this._router = _router;
    }
    ngOnInit() {
        this.numberQTY = this.rowData.ordersQty;
    }
};
CustomerOrdersNumberComponent = __decorate([
    Component({
        styleUrls: ['customer-orders-number.component.scss'],
        templateUrl: 'customer-orders-number.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], CustomerOrdersNumberComponent);
export { CustomerOrdersNumberComponent };
//# sourceMappingURL=customer-orders-number.component.js.map