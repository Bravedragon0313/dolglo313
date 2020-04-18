import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
let SetupMerchantContactInfoComponent = class SetupMerchantContactInfoComponent {
    constructor() {
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.contactInfoModel = {
            contactPhone: '',
            forwardOrdersUsing: [],
            ordersEmail: '',
            ordersPhone: '',
        };
    }
};
__decorate([
    ViewChild('contactInfoForm', { static: true }),
    __metadata("design:type", NgForm)
], SetupMerchantContactInfoComponent.prototype, "contactInfoForm", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantContactInfoComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantContactInfoComponent.prototype, "nextStep", void 0);
SetupMerchantContactInfoComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-contact-info',
        templateUrl: './contact-info.component.html',
        styleUrls: ['./contact-info.component.scss'],
    })
], SetupMerchantContactInfoComponent);
export { SetupMerchantContactInfoComponent };
//# sourceMappingURL=contact-info.component.js.map