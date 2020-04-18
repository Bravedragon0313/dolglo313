import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder } from '@angular/forms';
import { BasicInfoFormComponent, ContactInfoFormComponent } from '../forms';
import { LocationFormComponent } from '../../forms/location';
import { TranslateService } from '@ngx-translate/core';
import { PaymentsSettingsFormComponent } from '../forms/payments-settings/payments-settings-form.component';
let WarehouseMutationComponent = class WarehouseMutationComponent {
    constructor(activeModal, formBuilder, toasterService, warehouseRouter, _translateService) {
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.toasterService = toasterService;
        this.warehouseRouter = warehouseRouter;
        this._translateService = _translateService;
        this.BUTTON_DONE = 'BUTTON_DONE';
        this.BUTTON_NEXT = 'BUTTON_NEXT';
        this.BUTTON_PREV = 'BUTTON_PREV';
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.form = this.formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this.formBuilder),
            password: BasicInfoFormComponent.buildPasswordForm(this.formBuilder),
            contactInfo: ContactInfoFormComponent.buildForm(this.formBuilder),
            location: LocationFormComponent.buildForm(this.formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.contactInfo = this.form.get('contactInfo');
        this.location = this.form.get('location');
        this.password = this.form.get('password');
    }
    get buttonDone() {
        return this._translate(this.BUTTON_DONE);
    }
    get buttonNext() {
        return this._translate(this.BUTTON_NEXT);
    }
    get buttonPrevious() {
        return this._translate(this.BUTTON_PREV);
    }
    get isValidContactInfo() {
        return this.contactInfoForm.validForm !== undefined
            ? this.contactInfoForm.validForm
            : true;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const elementRef = document.querySelector('body > div.pac-container.pac-logo');
            if (elementRef) {
                elementRef['style']['zIndex'] = 10000;
            }
        }, 2000);
        if (this.locationForm) {
            this.locationForm.setDefaultCoords();
        }
    }
    onCoordinatesChanges(coords) {
        this.mapCoordEmitter.emit(coords);
    }
    onGeometrySend(geometry) {
        this.mapGeometryEmitter.emit(geometry);
    }
    createWarehouse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const geoLocationInput = this.locationForm.getValue();
                geoLocationInput.loc.coordinates.reverse();
                this.loading = true;
                const w = yield this.warehouseRouter.register({
                    warehouse: Object.assign(Object.assign(Object.assign({}, this.basicInfoForm.getValue()), this.contactInfoForm.getValue()), { geoLocation: geoLocationInput, isPaymentEnabled: this.paymentsSettingsForm
                            .isPaymentEnabled, paymentGateways: this.paymentsSettingsForm.paymentsGateways }),
                    password: this.basicInfoForm.getPassword(),
                });
                this.loading = false;
                this.toasterService.pop('success', `Warehouse ${w.name} was created!`);
                this.activeModal.close();
            }
            catch (err) {
                this.loading = false;
                this.toasterService.pop('error', `Error in creating warehouse: "${err.message}"`);
            }
        });
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
};
__decorate([
    ViewChild('basicInfoForm'),
    __metadata("design:type", BasicInfoFormComponent)
], WarehouseMutationComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('contactInfoForm', { static: true }),
    __metadata("design:type", ContactInfoFormComponent)
], WarehouseMutationComponent.prototype, "contactInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], WarehouseMutationComponent.prototype, "locationForm", void 0);
__decorate([
    ViewChild('paymentsSettingsForm'),
    __metadata("design:type", PaymentsSettingsFormComponent)
], WarehouseMutationComponent.prototype, "paymentsSettingsForm", void 0);
WarehouseMutationComponent = __decorate([
    Component({
        selector: 'ea-warehouse-mutation',
        templateUrl: './warehouse-mutation.component.html',
        styleUrls: ['./warehouse-mutation.component.scss'],
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        FormBuilder,
        ToasterService,
        WarehouseRouter,
        TranslateService])
], WarehouseMutationComponent);
export { WarehouseMutationComponent };
//# sourceMappingURL=warehouse-mutation.component.js.map