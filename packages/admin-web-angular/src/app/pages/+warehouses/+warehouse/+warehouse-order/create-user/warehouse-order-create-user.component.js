import { __awaiter, __decorate, __metadata } from "tslib";
import { FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { BasicInfoFormComponent } from '../../../../../@shared/user/forms';
import { LocationFormComponent } from '../../../../../@shared/forms/location';
import { UsersService } from '../../../../../@core/data/users.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
let WarehouseOrderCreateUserComponent = class WarehouseOrderCreateUserComponent {
    constructor(_formBuilder, _usersService, _toasterService) {
        this._formBuilder = _formBuilder;
        this._usersService = _usersService;
        this._toasterService = _toasterService;
        this.form = this._formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this._formBuilder),
            apartment: LocationFormComponent.buildApartmentForm(this._formBuilder),
            location: LocationFormComponent.buildForm(this._formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.apartment = this.form.get('apartment');
        this.location = this.form.get('location');
        this.mapCoordEmitter = new EventEmitter();
        this.mapGeometryEmitter = new EventEmitter();
        this.newUserEmitter = new EventEmitter();
        this._ngDestroy$ = new Subject();
    }
    ngAfterViewInit() {
        this._listenForNewUser();
    }
    onCoordinatesChanges(location) {
        this.mapCoordEmitter.emit(location);
    }
    onGeometrySend(geometry) {
        this.mapGeometryEmitter.emit(geometry);
    }
    _listenForNewUser() {
        this.createUserEvent.pipe(takeUntil(this._ngDestroy$)).subscribe(() => {
            if (this.form.valid) {
                this._registerNewUser();
            }
        });
    }
    _registerNewUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawData = Object.assign(Object.assign({}, this.basicInfo.value), { apartment: this.apartment.value, geoLocation: this.location.value });
            this.location.value.loc.coordinates.reverse();
            try {
                const user = yield this._usersService.registerUser({
                    user: rawData,
                });
                const userFirstname = user.firstName;
                this.newUserEmitter.emit(user);
                this.form.reset();
                this._toasterService.pop('success', `User "${userFirstname}" was added successfully`);
            }
            catch (error) {
                this._toasterService.pop('error', `Error in creating customer: "${error.message}"`);
            }
        });
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Observable)
], WarehouseOrderCreateUserComponent.prototype, "createUserEvent", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WarehouseOrderCreateUserComponent.prototype, "newUserEmitter", void 0);
WarehouseOrderCreateUserComponent = __decorate([
    Component({
        selector: 'ea-warehouse-order-create-user',
        styleUrls: ['./warehouse-order-create-user.component.scss'],
        templateUrl: './warehouse-order-create-user.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        UsersService,
        ToasterService])
], WarehouseOrderCreateUserComponent);
export { WarehouseOrderCreateUserComponent };
//# sourceMappingURL=warehouse-order-create-user.component.js.map