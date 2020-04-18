import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { SetupMerchantAccountComponent } from './components/account/account.component';
import { SetupMerchantBasicInfoComponent } from './components/basic-info/basic-info.component';
import { SetupMerchantContactInfoComponent } from './components/contact-info/contact-info.component';
import { SetupMerchantLocationComponent } from './components/location/location.component';
import { SetupMerchantPaymentsComponent } from './components/payments/payments.component';
import { SetupMerchantManufacturingComponent } from './components/manufacturing/manufacturing.component';
import { SetupMerchantDeliveryAndTakeawayComponent } from './components/settings/delivery-takeaway/delivery-takeaway.component';
import { SetupMerchantOrdersSettingsComponent } from './components/settings/orders/orders.component';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { ToasterService } from 'angular2-toaster';
import { NbStepperComponent } from '@nebular/theme';
let SetupMerchantsComponent = class SetupMerchantsComponent {
    constructor(warehouseRouter, toasterService) {
        this.warehouseRouter = warehouseRouter;
        this.toasterService = toasterService;
    }
    get canCreateMerchant() {
        return (this.stepAccount.formValid &&
            this.stepBasicInfo.formValid &&
            this.stepContactInfo.contactInfoForm.valid &&
            this.stepLocation.location.valid);
    }
    createMerchant() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.currentStore = yield this.warehouseRouter.register(this.getMerchantCreateObj());
                this.toasterService.pop('success', `Warehouse ${this.currentStore.name} was created!`);
                this.nbStepper.next();
            }
            catch (error) {
                this.toasterService.pop({
                    type: 'error',
                    title: `Error in creating warehouse: "${error.message}"`,
                    timeout: 0,
                });
            }
        });
    }
    getMerchantCreateObj() {
        let warehouse;
        let password;
        if (this.canCreateMerchant) {
            const geoLocationInput = this.stepLocation.locationForm.getValue();
            geoLocationInput.loc.coordinates.reverse();
            const accountModel = this.stepAccount.accountModel;
            warehouse = Object.assign(Object.assign(Object.assign({ contactEmail: accountModel.email, username: accountModel.username }, this.stepBasicInfo.basicInfoCreateObj), this.stepContactInfo.contactInfoModel), { geoLocation: geoLocationInput, isPaymentEnabled: this.stepPayments.isPaymentEnabled, isManufacturing: this.stepManufacturing.isManufacturing, isCarrierRequired: this.stepDeliveryAndTakeaway
                    .isCarrierRequired, productsDelivery: this.stepDeliveryAndTakeaway.productsDelivery, productsTakeaway: this.stepDeliveryAndTakeaway.productsTakeaway, hasRestrictedCarriers: this.stepDeliveryAndTakeaway.restrictedCarriersIds.length >
                    0, carriersIds: this.stepDeliveryAndTakeaway.restrictedCarriersIds, orderBarcodeType: this.stepOrdersSettings.iorderBarcodeType, isActive: true, paymentGateways: this.stepPayments.paymentsGateways });
            password = accountModel.password;
        }
        return { warehouse, password };
    }
};
__decorate([
    ViewChild('nbStepper'),
    __metadata("design:type", NbStepperComponent)
], SetupMerchantsComponent.prototype, "nbStepper", void 0);
__decorate([
    ViewChild('account', { static: true }),
    __metadata("design:type", SetupMerchantAccountComponent)
], SetupMerchantsComponent.prototype, "stepAccount", void 0);
__decorate([
    ViewChild('basicInfo', { static: true }),
    __metadata("design:type", SetupMerchantBasicInfoComponent)
], SetupMerchantsComponent.prototype, "stepBasicInfo", void 0);
__decorate([
    ViewChild('contactInfo', { static: true }),
    __metadata("design:type", SetupMerchantContactInfoComponent)
], SetupMerchantsComponent.prototype, "stepContactInfo", void 0);
__decorate([
    ViewChild('location', { static: true }),
    __metadata("design:type", SetupMerchantLocationComponent)
], SetupMerchantsComponent.prototype, "stepLocation", void 0);
__decorate([
    ViewChild('payments'),
    __metadata("design:type", SetupMerchantPaymentsComponent)
], SetupMerchantsComponent.prototype, "stepPayments", void 0);
__decorate([
    ViewChild('manufacturing'),
    __metadata("design:type", SetupMerchantManufacturingComponent)
], SetupMerchantsComponent.prototype, "stepManufacturing", void 0);
__decorate([
    ViewChild('deliveryAndTakeaway'),
    __metadata("design:type", SetupMerchantDeliveryAndTakeawayComponent)
], SetupMerchantsComponent.prototype, "stepDeliveryAndTakeaway", void 0);
__decorate([
    ViewChild('ordersSettings'),
    __metadata("design:type", SetupMerchantOrdersSettingsComponent)
], SetupMerchantsComponent.prototype, "stepOrdersSettings", void 0);
SetupMerchantsComponent = __decorate([
    Component({
        styleUrls: ['./merchants.component.scss'],
        templateUrl: './merchants.component.html',
    }),
    __metadata("design:paramtypes", [WarehouseRouter,
        ToasterService])
], SetupMerchantsComponent);
export { SetupMerchantsComponent };
//# sourceMappingURL=merchants.component.js.map