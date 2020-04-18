import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let SetupMerchantManufacturingComponent = class SetupMerchantManufacturingComponent {
    constructor() {
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantManufacturingComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantManufacturingComponent.prototype, "nextStep", void 0);
SetupMerchantManufacturingComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-manufacturing',
        templateUrl: './manufacturing.component.html',
        styleUrls: ['./manufacturing.component.scss'],
    })
], SetupMerchantManufacturingComponent);
export { SetupMerchantManufacturingComponent };
//# sourceMappingURL=manufacturing.component.js.map