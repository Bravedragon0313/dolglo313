import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { Country } from '@modules/server.common/entities';
import { StripeGatewayComponent } from './stripe-gateway/stripe-gateway.component';
import { PayPalGatewayComponent } from './payPal-gateway/payPal-gateway.component';
import { CurrenciesService } from '@app/@core/data/currencies.service';
import { first } from 'rxjs/operators';
import PaymentGateways from '@modules/server.common/enums/PaymentGateways';
import { countriesDefaultCurrencies } from '@modules/server.common/entities/Currency';
let PaymentGatewaysComponent = class PaymentGatewaysComponent {
    constructor(currenciesService) {
        this.currenciesService = currenciesService;
        this.currenciesCodes = [];
        this.loadCurrenciesCodes();
    }
    get isValid() {
        let valid = false;
        if (this.stripeGateway.isStripeEnabled ||
            this.payPalGateway.isPayPalEnabled) {
            if (this.stripeGateway.isStripeEnabled) {
                valid = this.stripeGateway.isFormValid;
                if (!valid) {
                    return;
                }
            }
            if (this.payPalGateway.isPayPalEnabled) {
                valid = this.payPalGateway.isFormValid;
                if (!valid) {
                    return;
                }
            }
        }
        return valid;
    }
    get paymentsGateways() {
        const paymentsGateways = [];
        const stripeGatewayCreateObject = this.stripeGateway.createObject;
        const payPalGatewayCreateObject = this.payPalGateway.createObject;
        if (stripeGatewayCreateObject) {
            paymentsGateways.push(stripeGatewayCreateObject);
        }
        if (payPalGatewayCreateObject) {
            paymentsGateways.push(payPalGatewayCreateObject);
        }
        return paymentsGateways;
    }
    ngOnChanges() {
        const merchantCountry = Country[this.warehouseCountry];
        if (merchantCountry) {
            const defaultCurrency = countriesDefaultCurrencies[merchantCountry.toString()] || '';
            if (this.stripeGateway &&
                (!this.isEdit || !this.stripeGateway.configModel.currency)) {
                this.stripeGateway.configModel.currency = defaultCurrency;
            }
            if (this.payPalGateway &&
                (!this.isEdit || !this.payPalGateway.configModel.currency)) {
                this.payPalGateway.configModel.currency = defaultCurrency;
            }
        }
    }
    loadCurrenciesCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.currenciesService
                .getCurrencies()
                .pipe(first())
                .toPromise();
            if (res) {
                this.currenciesCodes = res.map((r) => r.currencyCode);
            }
        });
    }
    setValue(merchant) {
        if (merchant.paymentGateways) {
            const stripeConfigObj = merchant.paymentGateways.find((g) => g.paymentGateway === PaymentGateways.Stripe);
            if (stripeConfigObj) {
                this.stripeGateway.setValue(stripeConfigObj.configureObject);
            }
            const payPalConfigObj = merchant.paymentGateways.find((g) => g.paymentGateway === PaymentGateways.PayPal);
            if (payPalConfigObj) {
                this.payPalGateway.setValue(payPalConfigObj.configureObject);
            }
        }
    }
};
__decorate([
    ViewChild('stripeGateway'),
    __metadata("design:type", StripeGatewayComponent)
], PaymentGatewaysComponent.prototype, "stripeGateway", void 0);
__decorate([
    ViewChild('payPalGateway'),
    __metadata("design:type", PayPalGatewayComponent)
], PaymentGatewaysComponent.prototype, "payPalGateway", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PaymentGatewaysComponent.prototype, "warehouseLogo", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaymentGatewaysComponent.prototype, "warehouseCountry", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PaymentGatewaysComponent.prototype, "isEdit", void 0);
PaymentGatewaysComponent = __decorate([
    Component({
        selector: 'ea-payment-gateways',
        templateUrl: './payment-gateways.component.html',
    }),
    __metadata("design:paramtypes", [CurrenciesService])
], PaymentGatewaysComponent);
export { PaymentGatewaysComponent };
//# sourceMappingURL=payment-gateways.component.js.map