import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, Input, ViewChild, } from '@angular/core';
import { LocationFormComponent } from '@app/@shared/forms/location';
import { PaymentGatewaysComponent } from '@app/@shared/payment-gateways/payment-gateways.component';
let SetupMerchantPaymentsComponent = class SetupMerchantPaymentsComponent {
    constructor() {
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
    }
    get isPaymentValid() {
        return !this.isPaymentEnabled || this.paymentGateways.isValid;
    }
    get paymentsGateways() {
        return this.paymentGateways.paymentsGateways;
    }
};
__decorate([
    ViewChild('paymentGateways', { static: true }),
    __metadata("design:type", PaymentGatewaysComponent)
], SetupMerchantPaymentsComponent.prototype, "paymentGateways", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantPaymentsComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantPaymentsComponent.prototype, "nextStep", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SetupMerchantPaymentsComponent.prototype, "warehouseLogo", void 0);
__decorate([
    Input(),
    __metadata("design:type", LocationFormComponent)
], SetupMerchantPaymentsComponent.prototype, "locationForm", void 0);
SetupMerchantPaymentsComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-payments',
        templateUrl: './payments.component.html',
        styleUrls: ['./payments.component.scss'],
    })
], SetupMerchantPaymentsComponent);
export { SetupMerchantPaymentsComponent };
//# sourceMappingURL=payments.component.js.map