var BasicInfoFormComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, ElementRef, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import _ from 'lodash';
import { FormHelpers } from '../../../forms/helpers';
import isUrl from 'is-url';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
let BasicInfoFormComponent = BasicInfoFormComponent_1 = class BasicInfoFormComponent {
    constructor(translateService) {
        this.translateService = translateService;
    }
    get isActive() {
        return this.form.get('isActive');
    }
    get isSharedCarrier() {
        return this.form.get('isSharedCarrier');
    }
    get username() {
        return this.form.get('username');
    }
    get phone() {
        return this.form.get('phone');
    }
    get firstName() {
        return this.form.get('firstName');
    }
    get lastName() {
        return this.form.get('lastName');
    }
    get logo() {
        return this.form.get('logo');
    }
    get showLogoMeta() {
        return this.logo && this.logo.value !== '';
    }
    static buildForm(formBuilder) {
        return formBuilder.group({
            firstName: [
                '',
                [
                    Validators.required,
                    Validators.pattern(new RegExp(`^[a-z ,.'-]+$`, 'i')),
                ],
            ],
            lastName: [
                '',
                [
                    Validators.required,
                    Validators.pattern(new RegExp(`^[a-z ,.'-]+$`, 'i')),
                ],
            ],
            isActive: [true, Validators.required],
            isSharedCarrier: [false],
            phone: [
                '',
                [
                    Validators.required,
                    Validators.pattern(BasicInfoFormComponent_1.phoneNumberRegex),
                ],
            ],
            username: ['', Validators.required],
            logo: [
                '',
                [
                    (control) => {
                        const imageUrl = control.value;
                        if (!isUrl(imageUrl) && !_.isEmpty(imageUrl)) {
                            return { invalidImageUrl: true };
                        }
                        return null;
                    },
                ],
            ],
        });
    }
    static buildPasswordForm(formBuilder) {
        return new FormControl('', [Validators.required]);
    }
    ngOnInit() {
        this.getuploaderPlaceholderText();
    }
    ngAfterViewInit() {
        this._setupCarrierLogoUrlValidation();
    }
    getValue() {
        return this.form.getRawValue();
    }
    setValue(basicInfo) {
        FormHelpers.deepMark(this.form, 'dirty');
        this.form.setValue(_.pick(basicInfo, Object.keys(this.getValue())));
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
    deleteImg() {
        this.logo.setValue('');
    }
    getuploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            this.uploaderPlaceholder = yield this.translateService
                .get('CARRIERS_VIEW.EDIT.PHOTO_URL')
                .pipe(first())
                .toPromise();
            this.uploaderPlaceholder += ' (optional)';
        });
    }
    _setupCarrierLogoUrlValidation() {
        this.logoImagePreview.nativeElement.onload = () => {
            if (this.showLogoMeta) {
                this.logo.setErrors(null);
            }
        };
        this.logoImagePreview.nativeElement.onerror = () => {
            if (this.showLogoMeta) {
                this.logo.setErrors({ invalidUrl: true });
            }
        };
    }
};
BasicInfoFormComponent.phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9x]*$/;
__decorate([
    ViewChild('logoImagePreview'),
    __metadata("design:type", ElementRef)
], BasicInfoFormComponent.prototype, "logoImagePreview", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], BasicInfoFormComponent.prototype, "form", void 0);
__decorate([
    Input(),
    __metadata("design:type", AbstractControl)
], BasicInfoFormComponent.prototype, "password", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BasicInfoFormComponent.prototype, "boxShadow", void 0);
BasicInfoFormComponent = BasicInfoFormComponent_1 = __decorate([
    Component({
        selector: 'ea-carrier-basic-info-form',
        templateUrl: 'basic-info-form.component.html',
        styleUrls: ['basic-info-form.component.scss'],
    }),
    __metadata("design:paramtypes", [TranslateService])
], BasicInfoFormComponent);
export { BasicInfoFormComponent };
//# sourceMappingURL=basic-info-form.component.js.map