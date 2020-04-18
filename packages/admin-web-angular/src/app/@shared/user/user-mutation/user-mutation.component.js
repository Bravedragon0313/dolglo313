import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { BasicInfoFormComponent } from '../forms/basic-info';
import { LocationFormComponent } from '../../forms/location';
import { UserAuthRouter } from '@modules/client.common.angular2/routers/user-auth-router.service';
import { TranslateService } from '@ngx-translate/core';
let UserMutationComponent = class UserMutationComponent {
    constructor(userAuthRouter, toasterService, activeModal, formBuilder, translateService) {
        this.userAuthRouter = userAuthRouter;
        this.toasterService = toasterService;
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.translateService = translateService;
        this.mapTypeEmitter = new EventEmitter();
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.BUTTON_DONE = 'BUTTON_DONE';
        this.BUTTON_NEXT = 'BUTTON_NEXT';
        this.BUTTON_PREV = 'BUTTON_PREV';
        this.form = this.formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this.formBuilder),
            apartment: LocationFormComponent.buildApartmentForm(this.formBuilder),
            location: LocationFormComponent.buildForm(this.formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.apartment = this.form.get('apartment');
        this.location = this.form.get('location');
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
    onCoordinatesChanges(coords) {
        this.mapCoordEmitter.emit(coords);
    }
    onGeometrySend(geometry) {
        this.mapGeometryEmitter.emit(geometry);
    }
    emitMapType(mapType) {
        this.mapTypeEmitter.emit(mapType);
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const location = this.locationForm.getValue();
                location.loc.coordinates.reverse();
                const user = yield this.userAuthRouter.register({
                    user: Object.assign(Object.assign({}, this.basicInfoForm.getValue()), { geoLocation: location, apartment: this.locationForm.getApartment() }),
                });
                this.loading = false;
                this.toasterService.pop('success', `Customer with '${user.id}' was added`);
                this.activeModal.close(user);
            }
            catch (err) {
                this.loading = false;
                this.toasterService.pop('error', `Error in creating customer: "${err.message}"`);
            }
        });
    }
    cancel() {
        this.activeModal.dismiss('canceled');
    }
    _translate(key) {
        let translationResult = '';
        this.translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
};
__decorate([
    ViewChild('basicInfoForm'),
    __metadata("design:type", BasicInfoFormComponent)
], UserMutationComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], UserMutationComponent.prototype, "locationForm", void 0);
UserMutationComponent = __decorate([
    Component({
        selector: 'ea-user-mutation',
        templateUrl: './user-mutation.component.html',
        styleUrls: ['/user-mutation.component.scss'],
    }),
    __metadata("design:paramtypes", [UserAuthRouter,
        ToasterService,
        NgbActiveModal,
        FormBuilder,
        TranslateService])
], UserMutationComponent);
export { UserMutationComponent };
//# sourceMappingURL=user-mutation.component.js.map