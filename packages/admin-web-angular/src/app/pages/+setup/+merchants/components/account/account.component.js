import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
let SetupMerchantAccountComponent = class SetupMerchantAccountComponent {
    constructor() {
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.accountModel = {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
        };
    }
    get formValid() {
        return (this.accountForm.valid &&
            this.accountModel.password === this.accountModel.repeatPassword);
    }
    emailChange() {
        let targetIndex = this.accountModel.email.indexOf('@');
        if (targetIndex > 0 && this.accountModel.username === '') {
            let defaultUsername = this.accountModel.email.substring(0, targetIndex);
            this.accountModel.username = defaultUsername;
        }
    }
};
__decorate([
    ViewChild('accountForm', { static: true }),
    __metadata("design:type", NgForm)
], SetupMerchantAccountComponent.prototype, "accountForm", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantAccountComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantAccountComponent.prototype, "nextStep", void 0);
SetupMerchantAccountComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-account',
        templateUrl: './account.component.html',
        styleUrls: ['./account.component.scss'],
    })
], SetupMerchantAccountComponent);
export { SetupMerchantAccountComponent };
//# sourceMappingURL=account.component.js.map