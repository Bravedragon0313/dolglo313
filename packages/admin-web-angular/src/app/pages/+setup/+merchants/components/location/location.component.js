import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { LocationFormComponent } from '@app/@shared/forms/location';
import { FormBuilder } from '@angular/forms';
let SetupMerchantLocationComponent = class SetupMerchantLocationComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.location = LocationFormComponent.buildForm(this.formBuilder);
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
    }
};
__decorate([
    ViewChild('locationForm', { static: true }),
    __metadata("design:type", LocationFormComponent)
], SetupMerchantLocationComponent.prototype, "locationForm", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantLocationComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantLocationComponent.prototype, "nextStep", void 0);
SetupMerchantLocationComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-location',
        templateUrl: './location.component.html',
        styleUrls: ['./location.component.scss'],
    }),
    __metadata("design:paramtypes", [FormBuilder])
], SetupMerchantLocationComponent);
export { SetupMerchantLocationComponent };
//# sourceMappingURL=location.component.js.map