import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { BasicInfoFormComponent } from '../../../../@shared/user/forms';
import { LocationFormComponent } from '../../../../@shared/forms/location';
import { UserRouter } from '@modules/client.common.angular2/routers/user-router.service';
let CustomerEditComponent = class CustomerEditComponent {
    constructor(_activatedRoute, _router, _formBuilder, _customerRouter, _toasterService) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._formBuilder = _formBuilder;
        this._customerRouter = _customerRouter;
        this._toasterService = _toasterService;
        this.mapTypeEmitter = new EventEmitter();
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.form = this._formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this._formBuilder),
            location: LocationFormComponent.buildForm(this._formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.location = this.form.get('location');
        this.customerId$ = this._activatedRoute.params.pipe(map((p) => p['id']));
        this.customer$ = this.customerId$.pipe(switchMap((id) => {
            return this._customerRouter.get(id).pipe(first());
        }));
    }
    ngOnInit() {
        this.customer$
            .withLatestFrom(this.customerId$)
            .subscribe(([customer, id]) => {
            if (!customer) {
                this._toasterService.pop('error', `Customer with id ${id} doesn't exist!`);
            }
            this._currentCustomer = customer;
            const geoLocationInput = customer.geoLocation;
            geoLocationInput.loc.coordinates.reverse();
            this.basicInfoForm.setValue(customer);
            this.locationForm.setValue(geoLocationInput);
            this._emitMapCoordinates([
                customer.geoLocation.coordinates.lat,
                customer.geoLocation.coordinates.lng,
            ]);
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
    _emitMapCoordinates(coords) {
        this.mapCoordEmitter.emit(coords);
    }
    updateCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            const geoLocationInput = this.locationForm.getValue();
            geoLocationInput.loc.coordinates.reverse();
            try {
                this.loading = true;
                const customer = yield this._customerRouter.updateUser(this._currentCustomer.id, Object.assign(Object.assign({}, this.basicInfoForm.getValue()), { geoLocation: geoLocationInput }));
                this.loading = false;
                this._toasterService.pop('success', `Customer ${customer.firstName} was updated`);
                yield this._router.navigate([`/customers/list/${customer.id}`], {
                    relativeTo: this._activatedRoute,
                });
            }
            catch (err) {
                this.loading = false;
                this._toasterService.pop('error', `Error in updating customer: "${err.message}"`);
            }
        });
    }
};
__decorate([
    ViewChild('basicInfoForm'),
    __metadata("design:type", BasicInfoFormComponent)
], CustomerEditComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], CustomerEditComponent.prototype, "locationForm", void 0);
CustomerEditComponent = __decorate([
    Component({
        templateUrl: './customer-edit.component.html',
        styleUrls: ['./customer-edit.component.scss'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        FormBuilder,
        UserRouter,
        ToasterService])
], CustomerEditComponent);
export { CustomerEditComponent };
//# sourceMappingURL=customer-edit.component.js.map