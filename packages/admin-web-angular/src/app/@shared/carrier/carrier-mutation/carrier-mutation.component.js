import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasicInfoFormComponent } from '../forms';
import { LocationFormComponent } from '../../forms/location';
import { getDummyImage } from '@modules/server.common/utils';
import { TranslateService } from '@ngx-translate/core';
let CarrierMutationComponent = class CarrierMutationComponent {
    constructor(toasterService, activeModal, formBuilder, carrierRouter, _translateService) {
        this.toasterService = toasterService;
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.carrierRouter = carrierRouter;
        this._translateService = _translateService;
        this.form = this.formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this.formBuilder),
            location: LocationFormComponent.buildForm(this.formBuilder),
            password: BasicInfoFormComponent.buildPasswordForm(this.formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.location = this.form.get('location');
        this.password = this.form.get('password');
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.BUTTON_DONE = 'BUTTON_DONE';
        this.BUTTON_NEXT = 'BUTTON_NEXT';
        this.BUTTON_PREV = 'BUTTON_PREV';
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
    ngAfterViewInit() {
        if (this.locationForm) {
            this.locationForm.setDefaultCoords();
        }
    }
    onGeometrySend(geometry) {
        this.mapGeometryEmitter.emit(geometry);
    }
    onCoordinatesChanges(location) {
        this.mapCoordEmitter.emit(location);
    }
    createCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const geoLocationInput = this.locationForm.getValue();
                geoLocationInput.loc.coordinates.reverse();
                this.loading = true;
                const carrierCreateObj = Object.assign(Object.assign({}, this.basicInfoForm.getValue()), { geoLocation: geoLocationInput });
                if (!carrierCreateObj.logo) {
                    const letter = carrierCreateObj.firstName
                        .charAt(0)
                        .toUpperCase();
                    carrierCreateObj.logo = getDummyImage(300, 300, letter);
                }
                const carrier = yield this.carrierRouter.register({
                    carrier: carrierCreateObj,
                    password: this.basicInfoForm.getPassword(),
                });
                this.loading = false;
                this.toasterService.pop('success', `Carrier ${carrier.firstName} was created`);
                this.activeModal.close(carrier);
            }
            catch (err) {
                this.loading = false;
                this.toasterService.pop('error', `Error in creating carrier: "${err.message}"`);
                this.activeModal.dismiss('canceled');
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
], CarrierMutationComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], CarrierMutationComponent.prototype, "locationForm", void 0);
CarrierMutationComponent = __decorate([
    Component({
        selector: 'ea-carrier-mutation',
        templateUrl: './carrier-mutation.component.html',
        styleUrls: ['./carrier-mutation.component.scss'],
    }),
    __metadata("design:paramtypes", [ToasterService,
        NgbActiveModal,
        FormBuilder,
        CarrierRouter,
        TranslateService])
], CarrierMutationComponent);
export { CarrierMutationComponent };
//# sourceMappingURL=carrier-mutation.component.js.map