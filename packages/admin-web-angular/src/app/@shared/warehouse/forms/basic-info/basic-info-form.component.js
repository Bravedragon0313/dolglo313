import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { pick } from 'lodash';
import { FormHelpers } from '../../../forms/helpers';
import { getDummyImage } from '@modules/server.common/utils';
import { TranslateService } from '@ngx-translate/core';
let BasicInfoFormComponent = class BasicInfoFormComponent {
    constructor(carrierRouter, translateService) {
        this.carrierRouter = carrierRouter;
        this.translateService = translateService;
        this._delivery = 'all';
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
                        const isEmpty = control.value === '';
                        if (!isEmpty) {
                            if (!control.value.startsWith('http') ||
                                control.value.match(/s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/) === null) {
                                return { validUrl: true };
                            }
                        }
                        return null;
                    },
                ],
            ],
            isActive: [true, [Validators.required]],
            username: ['', [Validators.required]],
            hasRestrictedCarriers: [false, [Validators.required]],
            useOnlyRestrictedCarriersForDelivery: [false],
            preferRestrictedCarriersForDelivery: [false],
            carriersIds: [[]],
        });
    }
    static buildPasswordForm(formBuilder) {
        return new FormControl('', [Validators.required]);
    }
    getValue() {
        const basicInfo = this.form.getRawValue();
        if (!basicInfo.logo) {
            const letter = basicInfo.name.charAt(0).toUpperCase();
            basicInfo.logo = getDummyImage(300, 300, letter);
        }
        return Object.assign(Object.assign({ isActive: basicInfo.isActive, name: basicInfo.name, username: basicInfo.username, logo: basicInfo.logo }, (basicInfo.hasRestrictedCarriers
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
        this.form.setValue(pick(basicInfo, [
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
    getPassword() {
        if (!this.password) {
            throw new Error("Form doesn't contain password");
        }
        return this.password.value;
    }
    setPassword(value) {
        this.password.setValue(value);
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
    get username() {
        return this.form.get('username');
    }
    get hasRestrictedCarriers() {
        return this.form.get('hasRestrictedCarriers');
    }
    get carriersIds() {
        return this.form.get('carriersIds');
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
    get showLogoMeta() {
        return this.logo && this.logo.value !== '';
    }
    ngOnInit() {
        this.loadCarriersOptions();
        this.getUploaderPlaceholderText();
    }
    deleteImg() {
        this.logo.setValue('');
    }
    getUploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.translateService
                .get(['WAREHOUSE_VIEW.MUTATION.PHOTO', 'OPTIONAL'])
                .pipe(first())
                .toPromise();
            this.uploaderPlaceholder = `${res['WAREHOUSE_VIEW.MUTATION.PHOTO']} (${res['OPTIONAL']})`;
        });
    }
    loadCarriersOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let carriers = yield this.carrierRouter
                .getAllActive()
                .pipe(first())
                .toPromise();
            carriers = carriers.filter((c) => c.isSharedCarrier);
            this.carriersOptions = carriers.map((c) => {
                return {
                    id: c.id,
                    name: `${c.firstName} ${c.lastName}`,
                };
            });
        });
    }
};
__decorate([
    ViewChild('fileInput', { static: true }),
    __metadata("design:type", Object)
], BasicInfoFormComponent.prototype, "fileInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], BasicInfoFormComponent.prototype, "form", void 0);
__decorate([
    Input(),
    __metadata("design:type", AbstractControl)
], BasicInfoFormComponent.prototype, "password", void 0);
BasicInfoFormComponent = __decorate([
    Component({
        selector: 'ea-warehouse-basic-info-form',
        styleUrls: ['basic-info-form.component.scss'],
        templateUrl: 'basic-info-form.component.html',
    }),
    __metadata("design:paramtypes", [CarrierRouter,
        TranslateService])
], BasicInfoFormComponent);
export { BasicInfoFormComponent };
//# sourceMappingURL=basic-info-form.component.js.map