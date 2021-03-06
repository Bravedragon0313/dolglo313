import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, ElementRef, } from '@angular/core';
import { FormGroup, Validators, } from '@angular/forms';
import { map, first } from 'rxjs/operators';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { Observable, concat } from 'rxjs';
import { FormHelpers } from '../../../../forms/helpers';
import 'rxjs/add/observable/of';
import _ from 'lodash';
import isUrl from 'is-url';
import { TranslateService } from '@ngx-translate/core';
let WarehouseManageTabsDetailsComponent = class WarehouseManageTabsDetailsComponent {
    constructor(_carrierRouter, _translateService) {
        this._carrierRouter = _carrierRouter;
        this._translateService = _translateService;
        this.carriersOptions$ = concat(Observable.of([]), this._carrierRouter.getAllActive().pipe(map((carriers) => carriers
            .filter((c) => c.isSharedCarrier)
            .map((c) => {
            return {
                id: c.id,
                name: `${c.firstName} ${c.lastName}`,
            };
        }))));
        this._delivery = 'all';
    }
    get name() {
        return this.form.get('name');
    }
    get logo() {
        return this.form.get('logo');
    }
    get isActive() {
        return this.form.get('isActive');
    }
    get hasRestrictedCarriers() {
        return this.form.get('hasRestrictedCarriers');
    }
    get carriersIds() {
        return this.form.get('carriersIds');
    }
    get showLogoMeta() {
        return this.logo && this.logo.value !== '';
    }
    get isManufacturing() {
        return this.form.get('isManufacturing');
    }
    get isCarrierRequired() {
        return this.form.get('isCarrierRequired');
    }
    get useOnlyRestrictedCarriersForDelivery() {
        return this.form.get('useOnlyRestrictedCarriersForDelivery');
    }
    get preferRestrictedCarriersForDelivery() {
        return this.form.get('preferRestrictedCarriersForDelivery');
    }
    get delivery() {
        return this._delivery;
    }
    set delivery(value) {
        this._delivery = value;
        this.useOnlyRestrictedCarriersForDelivery.setValue(false);
        this.preferRestrictedCarriersForDelivery.setValue(false);
        switch (value) {
            case 'onlyStore':
                this.useOnlyRestrictedCarriersForDelivery.setValue(true);
                break;
            case 'preferStore':
                this.preferRestrictedCarriersForDelivery.setValue(true);
                break;
        }
    }
    static buildForm(formBuilder) {
        return formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(255),
                ],
            ],
            logo: [
                '',
                [
                    (control) => {
                        const imageUrl = control.value;
                        if (!isUrl(imageUrl) && !_.isEmpty(imageUrl)) {
                            return { invalidUrl: true };
                        }
                        return null;
                    },
                ],
            ],
            isActive: [true, [Validators.required]],
            isManufacturing: [true, [Validators.required]],
            isCarrierRequired: [true, [Validators.required]],
            hasRestrictedCarriers: [false, [Validators.required]],
            useOnlyRestrictedCarriersForDelivery: [false],
            preferRestrictedCarriersForDelivery: [false],
            carriersIds: [[]],
        });
    }
    ngOnInit() {
        this.getUploaderPlaceholderText();
    }
    ngAfterViewInit() {
        this._setupLogoUrlValidation();
    }
    getValue() {
        const basicInfo = this.form.getRawValue();
        return Object.assign(Object.assign({ isActive: basicInfo.isActive, isManufacturing: basicInfo.isManufacturing, isCarrierRequired: basicInfo.isCarrierRequired, name: basicInfo.name, logo: basicInfo.logo }, (basicInfo.hasRestrictedCarriers
            ? {
                hasRestrictedCarriers: basicInfo.hasRestrictedCarriers,
                carriersIds: basicInfo.carriersIds,
            }
            : {})), (basicInfo.hasRestrictedCarriers &&
            basicInfo.carriersIds &&
            basicInfo.carriersIds.length
            ? {
                useOnlyRestrictedCarriersForDelivery: basicInfo.useOnlyRestrictedCarriersForDelivery,
                preferRestrictedCarriersForDelivery: basicInfo.preferRestrictedCarriersForDelivery,
            }
            : {
                useOnlyRestrictedCarriersForDelivery: false,
                preferRestrictedCarriersForDelivery: false,
            }));
    }
    setValue(basicInfo) {
        FormHelpers.deepMark(this.form, 'dirty');
        basicInfo = Object.assign({
            useOnlyRestrictedCarriersForDelivery: false,
            preferRestrictedCarriersForDelivery: false,
        }, basicInfo);
        this.form.setValue(_.pick(basicInfo, [
            ...Object.keys(this.getValue()),
            'hasRestrictedCarriers',
            'carriersIds',
            'useOnlyRestrictedCarriersForDelivery',
            'preferRestrictedCarriersForDelivery',
        ]));
        const onlyStore = basicInfo.useOnlyRestrictedCarriersForDelivery;
        const preferStore = basicInfo.preferRestrictedCarriersForDelivery;
        if (onlyStore) {
            this.delivery = 'onlyStore';
        }
        else if (preferStore) {
            this.delivery = 'preferStore';
        }
        else {
            this.delivery = 'all';
        }
    }
    deleteImg() {
        this.logo.setValue('');
    }
    _setupLogoUrlValidation() {
        this.logoPreviewElement.nativeElement.onload = () => {
            this.logo.setErrors(null);
        };
        this.logoPreviewElement.nativeElement.onerror = () => {
            if (this.showLogoMeta) {
                this.logo.setErrors({ invalidUrl: true });
            }
        };
    }
    getUploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._translateService
                .get(['WAREHOUSE_VIEW.MUTATION.PHOTO', 'OPTIONAL'])
                .pipe(first())
                .toPromise();
            this.uploaderPlaceholder = `${res['WAREHOUSE_VIEW.MUTATION.PHOTO']} (${res['OPTIONAL']})`;
        });
    }
};
__decorate([
    ViewChild('fileInput'),
    __metadata("design:type", ElementRef)
], WarehouseManageTabsDetailsComponent.prototype, "fileInput", void 0);
__decorate([
    ViewChild('logoPreview'),
    __metadata("design:type", ElementRef)
], WarehouseManageTabsDetailsComponent.prototype, "logoPreviewElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], WarehouseManageTabsDetailsComponent.prototype, "form", void 0);
WarehouseManageTabsDetailsComponent = __decorate([
    Component({
        selector: 'ea-warehouse-manage-tabs-details',
        styleUrls: ['./warehouse-manage-tabs-details.component.scss'],
        templateUrl: './warehouse-manage-tabs-details.component.html',
    }),
    __metadata("design:paramtypes", [CarrierRouter,
        TranslateService])
], WarehouseManageTabsDetailsComponent);
export { WarehouseManageTabsDetailsComponent };
//# sourceMappingURL=warehouse-manage-tabs-details.component.js.map