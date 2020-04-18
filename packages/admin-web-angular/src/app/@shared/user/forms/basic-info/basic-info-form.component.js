var BasicInfoFormComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, ElementRef, } from '@angular/core';
import { FormGroup, Validators, } from '@angular/forms';
import { Subject } from 'rxjs';
import { UsersService } from '../../../../@core/data/users.service';
import { FormHelpers } from '../../../forms/helpers';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
let BasicInfoFormComponent = BasicInfoFormComponent_1 = class BasicInfoFormComponent {
    constructor(translateService, _usersService, _route) {
        this.translateService = translateService;
        this._usersService = _usersService;
        this._route = _route;
        this.showBasicInfoLabel = false;
        this._ngDestroy$ = new Subject();
        const customerId = this._route.snapshot.paramMap.get('id');
        BasicInfoFormComponent_1.initialize(this._usersService, customerId);
    }
    ngOnInit() {
        this.getUploaderPlaceholderText();
    }
    ngAfterViewInit() {
        this._setupUserLogoUrlValidation();
    }
    get firstName() {
        return this.form.get('firstName');
    }
    get lastName() {
        return this.form.get('lastName');
    }
    get image() {
        return this.form.get('image');
    }
    get showLogoMeta() {
        return this.image && this.image.value !== '';
    }
    get email() {
        return this.form.get('email');
    }
    static initialize(usersService, customerId) {
        this._usersService = usersService;
        this._customerId = customerId;
    }
    static destroy() {
        BasicInfoFormComponent_1._usersService = null;
        BasicInfoFormComponent_1._customerId = null;
    }
    static buildForm(formBuilder) {
        const emailSearch$ = new Subject();
        let isSearchRdy = false;
        return formBuilder.group({
            firstName: [''],
            lastName: [''],
            image: [''],
            email: [
                '',
                [
                    (control) => control.value ? Validators.email(control) : null,
                ],
                (ctrlEmail) => __awaiter(this, void 0, void 0, function* () {
                    if (!isSearchRdy) {
                        emailSearch$.debounceTime(500).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                            const hasExistedEmail = yield this._usersService
                                .isUserExists({
                                exceptCustomerId: this._customerId,
                                memberKey: 'email',
                                memberValue: ctrlEmail.value,
                            })
                                .toPromise();
                            if (hasExistedEmail) {
                                ctrlEmail.setErrors({ emailTaken: true });
                            }
                        }));
                        isSearchRdy = true;
                    }
                    if (isSearchRdy &&
                        ctrlEmail.value &&
                        ctrlEmail.value.length > 0) {
                        emailSearch$.next();
                    }
                }),
            ],
        });
    }
    getValue() {
        const basicInfo = this.form.getRawValue();
        return Object.assign(Object.assign(Object.assign(Object.assign({}, (basicInfo.firstName ? { firstName: basicInfo.firstName } : {})), (basicInfo.lastName ? { lastName: basicInfo.lastName } : {})), (basicInfo.image ? { image: basicInfo.image } : {})), (basicInfo.email ? { email: basicInfo.email } : {}));
    }
    setValue(basicInfo) {
        FormHelpers.deepMark(this.form, 'dirty');
        this.form.setValue({
            firstName: basicInfo.firstName ? basicInfo.firstName : '',
            lastName: basicInfo.lastName ? basicInfo.lastName : '',
            image: basicInfo.image ? basicInfo.image : '',
            email: basicInfo.email ? basicInfo.email : '',
        });
    }
    deleteImg() {
        this.image.setValue('');
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
        BasicInfoFormComponent_1.destroy();
    }
    _setupUserLogoUrlValidation() {
        this.logoImagePreview.nativeElement.onload = () => {
            if (this.showLogoMeta) {
                this.image.setErrors(null);
            }
        };
        this.logoImagePreview.nativeElement.onerror = () => {
            if (this.showLogoMeta) {
                this.image.setErrors({ invalidUrl: true });
            }
        };
    }
    getUploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            this.uploaderPlaceholder = yield this.translateService
                .get('SHARED.USER.FORMS.BASIC_INFO.PICTURE_URL')
                .pipe(first())
                .toPromise();
        });
    }
};
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
    __metadata("design:type", Boolean)
], BasicInfoFormComponent.prototype, "showBasicInfoLabel", void 0);
BasicInfoFormComponent = BasicInfoFormComponent_1 = __decorate([
    Component({
        selector: 'ea-user-basic-info-form',
        styleUrls: ['./basic-info-form.component.scss'],
        templateUrl: 'basic-info-form.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService,
        UsersService,
        ActivatedRoute])
], BasicInfoFormComponent);
export { BasicInfoFormComponent };
//# sourceMappingURL=basic-info-form.component.js.map