import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { PaymentGatewaysComponent } from '@app/@shared/payment-gateways/payment-gateways.component';
let PaymentsSettingsFormComponent = class PaymentsSettingsFormComponent {
    constructor() {
        this.isPaymentEnabled = false;
    }
    get isPaymentValid() {
        return !this.isPaymentEnabled || this.paymentGateways.isValid;
    }
    get paymentsGateways() {
        return this.paymentGateways.paymentsGateways;
    }
    setValue(merchant) {
        this.isPaymentEnabled = merchant.isPaymentEnabled;
        this.paymentGateways.setValue(merchant);
    }
};
__decorate([
    ViewChild('paymentGateways', { static: true }),
    __metadata("design:type", PaymentGatewaysComponent)
], PaymentsSettingsFormComponent.prototype, "paymentGateways", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PaymentsSettingsFormComponent.prototype, "warehouseLogo", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PaymentsSettingsFormComponent.prototype, "warehouseCountry", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PaymentsSettingsFormComponent.prototype, "isEdit", void 0);
PaymentsSettingsFormComponent = __decorate([
    Component({
        selector: 'ea-warehouse-payments-settings-form',
        templateUrl: './payments-settings-form.component.html',
    })
], PaymentsSettingsFormComponent);
export { PaymentsSettingsFormComponent };
//# sourceMappingURL=payments-settings-form.component.js.map