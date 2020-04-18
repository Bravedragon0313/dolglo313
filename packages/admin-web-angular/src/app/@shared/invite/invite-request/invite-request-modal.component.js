import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { LocationFormComponent } from '@app/@shared/forms/location';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InviteRequestRouter } from '@modules/client.common.angular2/routers/invite-request-router.service';
let InviteRequestModalComponent = class InviteRequestModalComponent {
    constructor(toasterService, activeModal, formBuilder, inviteRequestRouter) {
        this.toasterService = toasterService;
        this.activeModal = activeModal;
        this.formBuilder = formBuilder;
        this.inviteRequestRouter = inviteRequestRouter;
        this.mapTypeEmitter = new EventEmitter();
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.form = this.formBuilder.group({
            location: LocationFormComponent.buildForm(this.formBuilder),
            apartment: LocationFormComponent.buildApartmentForm(this.formBuilder),
        });
        this.location = this.form.get('location');
        this.apartment = this.form.get('apartment');
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
                const inciteRequest = yield this.inviteRequestRouter.create(this.getInviteRequestCreateObj());
                this.toasterService.pop('success', `Successful create invite request`);
                this.activeModal.close(inciteRequest);
            }
            catch (err) {
                this.toasterService.pop('error', `Error in creating invite request: "${err.message}"`);
            }
        });
    }
    closeModal() {
        this.activeModal.close();
    }
    getInviteRequestCreateObj() {
        const geoLocationInput = this.locationForm.getValue();
        geoLocationInput.loc.coordinates.reverse();
        return {
            geoLocation: geoLocationInput,
            apartment: this.locationForm.getApartment() || ' ',
        };
    }
};
__decorate([
    ViewChild('locationForm', { static: true }),
    __metadata("design:type", LocationFormComponent)
], InviteRequestModalComponent.prototype, "locationForm", void 0);
InviteRequestModalComponent = __decorate([
    Component({
        selector: 'ea-invite-request-modal',
        templateUrl: './invite-request-modal.component.html',
        styleUrls: ['/invite-request-modal.component.scss'],
    }),
    __metadata("design:paramtypes", [ToasterService,
        NgbActiveModal,
        FormBuilder,
        InviteRequestRouter])
], InviteRequestModalComponent);
export { InviteRequestModalComponent };
//# sourceMappingURL=invite-request-modal.component.js.map