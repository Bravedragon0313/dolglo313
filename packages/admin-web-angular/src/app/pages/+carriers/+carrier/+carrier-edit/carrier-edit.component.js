import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInfoFormComponent } from '../../../../@shared/carrier/forms';
import { LocationFormComponent } from '../../../../@shared/forms/location';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { ToasterService } from 'angular2-toaster';
import { first, map, switchMap } from 'rxjs/operators';
let CarrierEditComponent = class CarrierEditComponent {
    constructor(toasterService, activatedRoute, formBuilder, carrierRouter, router) {
        this.toasterService = toasterService;
        this.activatedRoute = activatedRoute;
        this.formBuilder = formBuilder;
        this.carrierRouter = carrierRouter;
        this.router = router;
        this.mapTypeEmitter = new EventEmitter();
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.form = this.formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this.formBuilder),
            location: LocationFormComponent.buildForm(this.formBuilder),
            apartment: LocationFormComponent.buildApartmentForm(this.formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.location = this.form.get('location');
        this.apartment = this.form.get('apartment');
        this.carrierId$ = this.activatedRoute.params.pipe(map((p) => p['id']));
        this.carrier$ = this.carrierId$.pipe(switchMap((id) => {
            return this.carrierRouter.get(id).pipe(first());
        }));
    }
    get isCarrierValid() {
        return this.basicInfo.valid && this.location.valid;
    }
    ngOnInit() {
        this.carrier$
            .withLatestFrom(this.carrierId$)
            .subscribe(([carrier, id]) => {
            if (!carrier) {
                this.toasterService.pop('error', `Carrier with id ${id} doesn't exist!`);
            }
            this.currentCarrier = carrier;
            const geoLocationInput = carrier.geoLocation;
            geoLocationInput.loc.coordinates.reverse();
            this.basicInfoForm.setValue(carrier);
            this.locationForm.setValue(geoLocationInput);
            this.locationForm.setApartment(carrier.apartment);
        });
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
    updateCarrier() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basicInfo = this.basicInfoForm.getValue();
                basicInfo['apartment'] = this.apartment.value;
                const geoLocationInput = this.locationForm.getValue();
                geoLocationInput.loc.coordinates.reverse();
                this.loading = true;
                const carrier = yield this.carrierRouter.updateById(this.currentCarrier.id, Object.assign(Object.assign({}, basicInfo), { geoLocation: geoLocationInput }));
                this.loading = false;
                this.toasterService.pop('success', `Carrier ${carrier.firstName} was updated`);
            }
            catch (err) {
                this.loading = false;
                this.toasterService.pop('error', `Error in updating carrier: "${err.message}"`);
            }
        });
    }
};
__decorate([
    ViewChild('basicInfoForm'),
    __metadata("design:type", BasicInfoFormComponent)
], CarrierEditComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], CarrierEditComponent.prototype, "locationForm", void 0);
CarrierEditComponent = __decorate([
    Component({
        selector: 'ea-carrier-edit',
        templateUrl: './carrier-edit.component.html',
        styleUrls: ['./carrier-edit.component.scss'],
    }),
    __metadata("design:paramtypes", [ToasterService,
        ActivatedRoute,
        FormBuilder,
        CarrierRouter,
        Router])
], CarrierEditComponent);
export { CarrierEditComponent };
//# sourceMappingURL=carrier-edit.component.js.map