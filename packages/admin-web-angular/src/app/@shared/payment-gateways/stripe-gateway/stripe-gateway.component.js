import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import PaymentGateways, { paymentGatewaysToString, paymentGatewaysLogo, } from '@modules/server.common/enums/PaymentGateways';
import { Country } from '@modules/server.common/entities';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
let StripeGatewayComponent = class StripeGatewayComponent {
    constructor(translateService) {
        this.translateService = translateService;
        this.name = paymentGatewaysToString(PaymentGateways.Stripe);
        this.logo = paymentGatewaysLogo(PaymentGateways.Stripe);
        this._ngDestroy$ = new Subject();
        this.COMPANY_BRAND_LOGO = 'FAKE_DATA.SETUP_MERCHANTS.PAYMENTS.STRIPE.COMPANY_BRAND_LOGO';
        this.currenciesCodes = [];
        this.configModel = {
            payButtontext: '',
            currency: '',
            companyBrandLogo: '',
            publishableKey: '',
            allowRememberMe: true,
        };
        translateService
            .stream(this.COMPANY_BRAND_LOGO)
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((text) => {
            this.COMPANY_BRAND_LOGO = text;
        });
    }
    set companyBrandLogo(logo) {
        if (!this.configModel.companyBrandLogo) {
            this.configModel.companyBrandLogo = logo;
        }
    }
    get isFormValid() {
        let isValid = false;
        if (this.stripeConfigForm) {
            isValid =
                (this.stripeConfigForm.touched ||
                    this.stripeConfigForm.dirty) &&
                    this.stripeConfigForm.valid &&
                    !this.invalidUrl &&
                    this.configModel.companyBrandLogo !== '';
        }
        return isValid;
    }
    get createObject() {
        if (!this.isFormValid || !this.isStripeEnabled) {
            return null;
        }
        return {
            paymentGateway: PaymentGateways.Stripe,
            configureObject: this.configModel,
        };
    }
    deleteImg() {
        this.configModel.companyBrandLogo = '';
    }
    setValue(data) {
        this.isStripeEnabled = true;
        this.configModel.payButtontext = data['payButtontext'] || '';
        this.configModel.currency = data['currency'] || '';
        this.configModel.companyBrandLogo = data['companyBrandLogo'] || '';
        this.configModel.publishableKey = data['publishableKey'] || '';
        this.configModel.allowRememberMe = data['allowRememberMe'];
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('stripeConfigForm', { static: true }),
    __metadata("design:type", NgForm)
], StripeGatewayComponent.prototype, "stripeConfigForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], StripeGatewayComponent.prototype, "currenciesCodes", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], StripeGatewayComponent.prototype, "warehouseCountry", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], StripeGatewayComponent.prototype, "companyBrandLogo", null);
StripeGatewayComponent = __decorate([
    Component({
        selector: 'ea-stripe-gateway',
        templateUrl: './stripe-gateway.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService])
], StripeGatewayComponent);
export { StripeGatewayComponent };
//# sourceMappingURL=stripe-gateway.component.js.map