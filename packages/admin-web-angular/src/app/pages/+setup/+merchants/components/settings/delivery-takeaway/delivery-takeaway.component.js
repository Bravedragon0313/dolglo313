import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter, } from '@angular/core';
import { SetupMerchantSharedCarriersComponent } from './shared-carriers/shared-carriers.component';
import { CarriersSmartTableComponent, } from '@app/@shared/carrier/carriers-table/carriers-table.component';
import { Subject } from 'rxjs';
import { SetupMerchantAddNewCarrierComponent } from './add-new-carrier/add-new-carrier.component';
import { getDummyImage } from '@modules/server.common/utils';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
let SetupMerchantDeliveryAndTakeawayComponent = class SetupMerchantDeliveryAndTakeawayComponent {
    constructor(carrierRouter) {
        this.carrierRouter = carrierRouter;
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.componentViews = {
            main: 'main',
            carriersTable: 'carriersTable',
            addNewCarrier: 'addNewCarrier',
            editCarrier: 'editCarrier',
        };
        this.currentView = this.componentViews.main;
        this.carriersPerPage = 3;
        this.restrictedCarriers = [];
        this.ngDestroy$ = new Subject();
    }
    get haveCarriersForAdd() {
        let hasSelectedCarriers = false;
        if (this.sharedCarriers) {
            hasSelectedCarriers = this.sharedCarriers.carriersTable
                .hasSelectedCarriers;
        }
        if (this.newCarrier) {
            hasSelectedCarriers =
                this.newCarrier.form.valid &&
                    this.locationForm &&
                    this.locationForm.form.valid;
        }
        return hasSelectedCarriers;
    }
    get isBasicInfoValid() {
        let res = false;
        if (this.newCarrier) {
            res = this.newCarrier.basicInfoForm.form.valid;
        }
        return res;
    }
    get restrictedCarriersIds() {
        let ids = [];
        if (this.restrictedCarriers) {
            ids = this.restrictedCarriers.map((c) => c.id);
        }
        return ids;
    }
    ngAfterViewInit() { }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentView === this.componentViews.carriersTable) {
                const carriers = this.sharedCarriers.carriersTable.selectedCarriers
                    .map((data) => data['carrier'])
                    .map(CarriersSmartTableComponent.getCarrierSmartTableObject);
                this.restrictedCarriers.unshift(...carriers);
            }
            else if (this.currentView === this.componentViews.addNewCarrier) {
                const geoLocationInput = this.locationForm.getValue();
                geoLocationInput.loc.coordinates.reverse();
                const carrierCreateObj = Object.assign(Object.assign({}, this.newCarrier.basicInfoForm.getValue()), { geoLocation: geoLocationInput });
                if (!carrierCreateObj.logo) {
                    const letter = carrierCreateObj.firstName
                        .charAt(0)
                        .toUpperCase();
                    carrierCreateObj.logo = getDummyImage(300, 300, letter);
                }
                let carrier = yield this.carrierRouter.register({
                    carrier: carrierCreateObj,
                    password: this.newCarrier.basicInfoForm.getPassword(),
                });
                this.restrictedCarriers.unshift(CarriersSmartTableComponent.getCarrierSmartTableObject(carrier));
            }
            this.currentView = this.componentViews.main;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const basicInfo = this.newCarrier.basicInfoForm.getValue();
            const carrier = yield this.carrierRouter.updateById(this.carrierId, Object.assign({}, basicInfo));
            this.restrictedCarriers = this.restrictedCarriers.filter((c) => c.id !== this.carrierId);
            this.restrictedCarriers.unshift(CarriersSmartTableComponent.getCarrierSmartTableObject(carrier));
            this.carrierId = null;
            this.currentView = this.componentViews.main;
        });
    }
    back() {
        this.currentView = this.componentViews.main;
    }
    productsDeliveryChange() {
        if (!this.productsDelivery) {
            this.restrictedCarriers = [];
        }
    }
    removeCarrier(e) {
        if (this.restrictedCarriers) {
            this.restrictedCarriers = this.restrictedCarriers.filter((c) => c.id !== e.data.id);
        }
        this.carriersTable.loadData(this.restrictedCarriers);
    }
    editCarrier(e) {
        this.carrierId = e.data.id;
        this.currentView = this.componentViews.editCarrier;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('newCarrier'),
    __metadata("design:type", SetupMerchantAddNewCarrierComponent)
], SetupMerchantDeliveryAndTakeawayComponent.prototype, "newCarrier", void 0);
__decorate([
    ViewChild('sharedCarriers'),
    __metadata("design:type", SetupMerchantSharedCarriersComponent)
], SetupMerchantDeliveryAndTakeawayComponent.prototype, "sharedCarriers", void 0);
__decorate([
    ViewChild('carriersTable'),
    __metadata("design:type", CarriersSmartTableComponent)
], SetupMerchantDeliveryAndTakeawayComponent.prototype, "carriersTable", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantDeliveryAndTakeawayComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantDeliveryAndTakeawayComponent.prototype, "nextStep", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SetupMerchantDeliveryAndTakeawayComponent.prototype, "locationForm", void 0);
SetupMerchantDeliveryAndTakeawayComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-delivery-takeaway',
        templateUrl: './delivery-takeaway.component.html',
        styleUrls: ['./delivery-takeaway.component.scss'],
    }),
    __metadata("design:paramtypes", [CarrierRouter])
], SetupMerchantDeliveryAndTakeawayComponent);
export { SetupMerchantDeliveryAndTakeawayComponent };
//# sourceMappingURL=delivery-takeaway.component.js.map