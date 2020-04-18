import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { first, map, switchMap } from 'rxjs/operators';
import { ContactInfoFormComponent } from '../../../../@shared/warehouse/forms';
import { LocationFormComponent } from '../../../../@shared/forms/location';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { WarehouseManageTabsComponent } from '../../../../@shared/warehouse/forms/warehouse-manage-tabs/warehouse-manage-tabs.component';
import 'rxjs/add/operator/withLatestFrom';
let WarehouseManageComponent = class WarehouseManageComponent {
    constructor(_formBuilder, activatedRoute, toasterService, warehouseRouter) {
        this._formBuilder = _formBuilder;
        this.activatedRoute = activatedRoute;
        this.toasterService = toasterService;
        this.warehouseRouter = warehouseRouter;
        this.form = this._formBuilder.group({
            tabsForm: WarehouseManageTabsComponent.buildForm(this._formBuilder),
        });
        this.tabsForm = this.form.get('tabsForm');
        this.warehouseId$ = this.activatedRoute.params.pipe(map((p) => p['id']));
        this.warehouse$ = this.warehouseId$.pipe(switchMap((id) => {
            return this.warehouseRouter.get(id).pipe(first());
        }));
    }
    ngOnInit() {
        this._loadWarehouse();
    }
    get validForm() {
        return this.warehouseManageTabs.validForm;
    }
    updateWarehouse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const tabsInfoRaw = this.warehouseManageTabs.getValue();
                const warehouseRaw = Object.assign(Object.assign(Object.assign(Object.assign({}, this._currentWarehouse), tabsInfoRaw.basicInfo), tabsInfoRaw.contactInfo), { geoLocation: tabsInfoRaw.location, deliveryAreas: tabsInfoRaw.deliveryAreas, isPaymentEnabled: tabsInfoRaw.isPaymentEnabled, paymentGateways: tabsInfoRaw.paymentsGateways });
                const passwordOld = tabsInfoRaw.password.current;
                const passwordNew = tabsInfoRaw.password.new;
                if (passwordNew.length > 0) {
                    yield this.warehouseRouter.updatePassword(this._currentWarehouse.id, {
                        current: passwordOld,
                        new: passwordNew,
                    });
                }
                const warehouse = yield this.warehouseRouter.save(warehouseRaw);
                this.loading = false;
                this._showWarehouseUpdateSuccessMessage(warehouse);
                this.warehouseManageTabs.warehouseUpdateFinish();
            }
            catch (err) {
                this.loading = false;
                this.toasterService.pop('error', `Error in updating customer: "${err.message}"`);
            }
        });
    }
    _loadWarehouse() {
        this.warehouse$
            .withLatestFrom(this.warehouseId$)
            .subscribe(([warehouse, id]) => {
            if (!warehouse) {
                this.toasterService.pop('error', `Warehouse with id ${id} doesn't exist!`);
            }
            this._currentWarehouse = warehouse;
            this.warehouseManageTabs.setValue(warehouse);
        });
    }
    _showWarehouseUpdateSuccessMessage(warehouse) {
        this.toasterService.pop('success', `Store ${warehouse.name} was updated`);
    }
};
__decorate([
    ViewChild('warehouseManageTabs'),
    __metadata("design:type", WarehouseManageTabsComponent)
], WarehouseManageComponent.prototype, "warehouseManageTabs", void 0);
__decorate([
    ViewChild('contactInfoForm'),
    __metadata("design:type", ContactInfoFormComponent)
], WarehouseManageComponent.prototype, "contactInfoForm", void 0);
__decorate([
    ViewChild('locationForm'),
    __metadata("design:type", LocationFormComponent)
], WarehouseManageComponent.prototype, "locationForm", void 0);
WarehouseManageComponent = __decorate([
    Component({
        selector: 'ea-warehouse-manage',
        templateUrl: './warehouse-manage.component.html',
        styleUrls: ['./warehouse-manage.component.scss'],
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        ToasterService,
        WarehouseRouter])
], WarehouseManageComponent);
export { WarehouseManageComponent };
//# sourceMappingURL=warehouse-manage.component.js.map