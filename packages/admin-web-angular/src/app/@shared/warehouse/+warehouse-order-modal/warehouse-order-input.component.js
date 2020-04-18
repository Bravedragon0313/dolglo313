import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let WarehouseOrderInputComponent = class WarehouseOrderInputComponent {
    constructor() {
        this.amount = new EventEmitter();
        this._productAmount = 0;
    }
    get warehouseAvailableProducts() {
        if (this.value) {
            return +this.value.available;
        }
        return 0;
    }
    get productId() {
        return this.value.productId;
    }
    get productAmount() {
        return this._productAmount;
    }
    set productAmount(amount) {
        this._productAmount = amount;
        this.amount.emit(amount);
    }
    get warehouseHasAvailable() {
        return this._productAmount < this.warehouseAvailableProducts;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], WarehouseOrderInputComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], WarehouseOrderInputComponent.prototype, "rowData", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WarehouseOrderInputComponent.prototype, "amount", void 0);
WarehouseOrderInputComponent = __decorate([
    Component({
        styles: ['.order-input-wrapper { text-align: center; }'],
        templateUrl: './warehouse-order-input.component.html',
    })
], WarehouseOrderInputComponent);
export { WarehouseOrderInputComponent };
//# sourceMappingURL=warehouse-order-input.component.js.map