import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import PaymentGateways, { paymentGatewaysToString, paymentGatewaysLogo, } from '@modules/server.common/enums/PaymentGateways';
import { Country } from '@modules/server.common/entities';
import { NgForm } from '@angular/forms';
let PayPalGatewayComponent = class PayPalGatewayComponent {
    constructor() {
        this.name = paymentGatewaysToString(PaymentGateways.PayPal);
        this.logo = paymentGatewaysLogo(PaymentGateways.PayPal);
        this.currenciesCodes = [];
        this.configModel = {
            currency: '',
            mode: '',
            publishableKey: '',
            secretKey: '',
            description: '',
        };
        this.payPalTypes = ['sandbox', 'live'];
    }
    get isFormValid() {
        let isValid = false;
        if (this.payPalConfigForm) {
            isValid =
                (this.payPalConfigForm.touched ||
                    this.payPalConfigForm.dirty) &&
                    this.payPalConfigForm.valid;
        }
        return isValid;
    }
    get createObject() {
        if (!this.isFormValid || !this.isPayPalEnabled) {
            return null;
        }
        return {
            paymentGateway: PaymentGateways.PayPal,
            configureObject: this.configModel,
        };
    }
    setValue(data) {
        this.isPayPalEnabled = true;
        this.configModel.currency = data['currency'] || '';
        this.configModel.mode = data['mode'] || '';
        this.configModel.publishableKey = data['publishableKey'] || '';
        this.configModel.secretKey = data['secretKey'] || '';
        this.configModel.description = data['description'] || '';
    }
};
__decorate([
    ViewChild('payPalConfigForm', { static: true }),
    __metadata("design:type", NgForm)
], PayPalGatewayComponent.prototype, "payPalConfigForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PayPalGatewayComponent.prototype, "currenciesCodes", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PayPalGatewayComponent.prototype, "warehouseCountry", void 0);
PayPalGatewayComponent = __decorate([
    Component({
        selector: 'ea-payPal-gateway',
        templateUrl: './payPal-gateway.component.html',
    })
], PayPalGatewayComponent);
export { PayPalGatewayComponent };
//# sourceMappingURL=payPal-gateway.component.js.map