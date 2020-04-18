import { __decorate, __metadata } from "tslib";
import { Input, Component, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WarehouseManageTabsDetailsComponent } from './details/warehouse-manage-tabs-details.component';
import { WarehouseManageTabsAccountComponent } from './account/warehouse-manage-tabs-account.component';
import { ContactInfoFormComponent } from '../contact-info';
import { LocationFormComponent } from '../../../forms/location';
import { WarehouseManageTabsDeliveryAreasComponent } from './delivery-areas/warehouse-manage-tabs-delivery-areas.component';
import { PaymentsSettingsFormComponent } from '../payments-settings/payments-settings-form.component';
let WarehouseManageTabsComponent = class WarehouseManageTabsComponent {
    constructor() {
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
    }
    static buildForm(formBuilder) {
        return formBuilder.group({
            details: WarehouseManageTabsDetailsComponent.buildForm(formBuilder),
            account: WarehouseManageTabsAccountComponent.buildForm(formBuilder),
            contactInfo: ContactInfoFormComponent.buildForm(formBuilder),
            location: LocationFormComponent.buildForm(formBuilder),
            deliverAreas: WarehouseManageTabsDeliveryAreasComponent.buildForm(formBuilder),
        });
    }
    get details() {
        return this.form.get('details');
    }
    get account() {
        return this.form.get('account');
    }
    get contactInfo() {
        return this.form.get('contactInfo');
    }
    get location() {
        return this.form.get('location');
    }
    get validForm() {
        return (this.form.valid &&
            this.contactInfoForm.validForm &&
            this.paymentsSettingsForm.isPaymentValid);
    }
    get deliveryAreas() {
        return this.form.get('deliverAreas');
    }
    onCoordinatesChanges(coords) {
        this.mapCoordEmitter.emit(coords);
    }
    onGeometrySend(geometry) {
        this.mapGeometryEmitter.emit(geometry);
    }
    getValue() {
        const geoLocationInput = this.locationForm.getValue();
        geoLocationInput.loc.coordinates.reverse();
        const detailsRaw = this.detailsComponent.getValue();
        const accountRaw = this.accountComponent.getValue();
        const contactRaw = this.contactInfoForm.getValue();
        const locationRaw = geoLocationInput;
        const deliveryAreasRaw = this.deliveryAreasForm.getValue();
        const inputResult = {
            basicInfo: Object.assign(Object.assign({}, detailsRaw), { username: accountRaw.username }),
            password: accountRaw.password,
            contactInfo: contactRaw,
            location: locationRaw,
            deliveryAreas: deliveryAreasRaw,
            isPaymentEnabled: this.paymentsSettingsForm.isPaymentEnabled,
            paymentsGateways: this.paymentsSettingsForm.paymentsGateways,
        };
        return inputResult;
    }
    setValue(warehouse) {
        const geoLocationInput = warehouse.geoLocation;
        geoLocationInput.loc.coordinates.reverse();
        this.detailsComponent.setValue(warehouse);
        this.accountComponent.setValue(warehouse.username);
        this.contactInfoForm.setValue(warehouse);
        this.locationForm.setValue(geoLocationInput);
        this.deliveryAreasForm.setValue(warehouse.deliveryAreas);
        this.paymentsSettingsForm.setValue(warehouse);
    }
    warehouseUpdateFinish() {
        this.tabSet.tabs._results[0].activeValue = true;
        this.tabSet.tabs._results[1].activeValue = false;
        this.tabSet.tabs._results[2].activeValue = false;
        this.tabSet.tabs._results[3].activeValue = false;
        this.tabSet.tabs._results[4].activeValue = false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], WarehouseManageTabsComponent.prototype, "form", void 0);
__decorate([
    ViewChild('detailsComponent'),
    __metadata("design:type", WarehouseManageTabsDetailsComponent)
], WarehouseManageTabsComponent.prototype, "detailsComponent", void 0);
__decorate([
    ViewChild('accountComponent'),
    __metadata("design:type", WarehouseManageTabsAccountComponent)
], WarehouseManageTabsComponent.prototype, "accountComponent", void 0);
__decorate([
    ViewChild('contactInfoForm'),
    __metadata("design:type", ContactInfoFormComponent)
], WarehouseManageTabsComponent.prototype, "contactInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], WarehouseManageTabsComponent.prototype, "locationForm", void 0);
__decorate([
    ViewChild('paymentsSettingsForm'),
    __metadata("design:type", PaymentsSettingsFormComponent)
], WarehouseManageTabsComponent.prototype, "paymentsSettingsForm", void 0);
__decorate([
    ViewChild('deliveryAreasForm'),
    __metadata("design:type", WarehouseManageTabsDeliveryAreasComponent)
], WarehouseManageTabsComponent.prototype, "deliveryAreasForm", void 0);
__decorate([
    ViewChild('tabSet'),
    __metadata("design:type", Object)
], WarehouseManageTabsComponent.prototype, "tabSet", void 0);
WarehouseManageTabsComponent = __decorate([
    Component({
        selector: 'ea-warehouse-manage-tabs',
        styleUrls: ['./warehouse-manage-tabs.component.scss'],
        templateUrl: './warehouse-manage-tabs.component.html',
    })
], WarehouseManageTabsComponent);
export { WarehouseManageTabsComponent };
//# sourceMappingURL=warehouse-manage-tabs.component.js.map