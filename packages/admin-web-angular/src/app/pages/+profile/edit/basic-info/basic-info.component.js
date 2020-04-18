import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import Admin from '@modules/server.common/entities/Admin';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AdminsService } from '../../../../@core/data/admins.service';
import { getDummyImage } from '@modules/server.common/utils';
import { ToasterService } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/debounceTime';
let BasicInfoComponent = class BasicInfoComponent {
    constructor(formBuilder, adminsService, toasterService, _translateService) {
        this.formBuilder = formBuilder;
        this.adminsService = adminsService;
        this.toasterService = toasterService;
        this._translateService = _translateService;
        this.INVALID_EMAIL_ADDRESS = 'INVALID_EMAIL_ADDRESS';
        this.INVALID_URL = 'INVALID_URL';
        this.NAME_MUST_CONTAIN_ONLY_LETTERS = 'NAME_MUST_CONTAIN_ONLY_LETTERS';
        this.PREFIX = 'PROFILE_VIEW.';
        this.ngDestroy$ = new Subject();
        this.validations = {
            usernameControl: () => {
                this.username.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.usernameErrorMsg = this.hasError(this.username)
                        ? Object.keys(this.username.errors)[0]
                        : '';
                });
            },
            emailControl: () => {
                this.email.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.emailErrorMsg = this.hasError(this.email)
                        ? this.email.errors.email
                            ? this.invalidEmailAddress()
                            : Object.keys(this.email.errors)[0]
                        : '';
                });
            },
            firstNameControl: () => {
                this.firstName.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.firstNameErrorMsg = this.hasError(this.firstName)
                        ? this.firstName.errors.pattern
                            ? this.nameMustContainOnlyLetters()
                            : Object.keys(this.firstName.errors)[0]
                        : '';
                });
            },
            lastNameControl: () => {
                this.lastName.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.lastNameErrorMsg = this.hasError(this.lastName)
                        ? this.lastName.errors.pattern
                            ? this.nameMustContainOnlyLetters()
                            : Object.keys(this.lastName.errors)[0]
                        : '';
                });
            },
        };
        this.getUploaderPlaceholderText();
        this.buildForm();
        this.bindFormControls();
        this._applyTranslationOnSmartTable();
        this.loadControls();
    }
    get pictureUrlErrorMsg() {
        return this.picture.errors.pattern
            ? this.invalidURL()
            : Object.keys(this.picture.errors)[0];
    }
    ngOnChanges() {
        this._applyTranslationOnSmartTable();
        if (this.admin) {
            this.username.setValue(this.admin.name);
            this.email.setValue(this.admin.email);
            this.picture.setValue(this.admin.pictureUrl);
            this.firstName.setValue(this.admin.firstName);
            this.lastName.setValue(this.admin.lastName);
        }
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    invalidEmailAddress() {
        return this._translate(this.PREFIX + this.INVALID_EMAIL_ADDRESS);
    }
    invalidURL() {
        return this._translate(this.PREFIX + this.INVALID_URL);
    }
    nameMustContainOnlyLetters() {
        return this._translate(this.PREFIX + this.NAME_MUST_CONTAIN_ONLY_LETTERS);
    }
    saveChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const res = yield this.adminsService
                    .updateById(this.admin.id, this.getAdminCreateObj())
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                this.toasterService.pop('success', 'Successfully updated data');
            }
            catch (error) {
                this.loading = false;
                this.toasterService.pop('error', error);
            }
        });
    }
    buildForm() {
        const imgUrlRegex = new RegExp(`(http(s?):)s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`);
        const nameRegex = new RegExp(`^[a-z ,.'-]+$`, 'i');
        this.basicInfoForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            picture: ['', [Validators.pattern(imgUrlRegex)]],
            firstName: ['', Validators.pattern(nameRegex)],
            lastName: ['', Validators.pattern(nameRegex)],
        });
    }
    bindFormControls() {
        this.username = this.basicInfoForm.get('username');
        this.email = this.basicInfoForm.get('email');
        this.picture = this.basicInfoForm.get('picture');
        this.firstName = this.basicInfoForm.get('firstName');
        this.lastName = this.basicInfoForm.get('lastName');
    }
    loadControls() {
        this.validations.usernameControl();
        this.validations.emailControl();
        this.validations.firstNameControl();
        this.validations.lastNameControl();
    }
    deleteImg() {
        this.picture.setValue('');
        this.basicInfoForm.markAsDirty();
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this.loadControls();
        });
    }
    hasError(control) {
        return (control.touched || control.dirty) && control.errors;
    }
    getAdminCreateObj() {
        if (!this.picture.value) {
            const letter = this.username.value.charAt(0).toUpperCase();
            this.picture.setValue(getDummyImage(300, 300, letter));
        }
        return {
            name: this.username.value,
            email: this.email.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            pictureUrl: this.picture.value,
        };
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    getUploaderPlaceholderText() {
        return __awaiter(this, void 0, void 0, function* () {
            this.uploaderPlaceholder = yield this._translateService
                .get('PROFILE_VIEW.PICTURE_URL')
                .pipe(first())
                .toPromise();
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Admin)
], BasicInfoComponent.prototype, "admin", void 0);
BasicInfoComponent = __decorate([
    Component({
        selector: 'ea-basic-info',
        styleUrls: ['/basic-info.component.scss'],
        templateUrl: './basic-info.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        AdminsService,
        ToasterService,
        TranslateService])
], BasicInfoComponent);
export { BasicInfoComponent };
//# sourceMappingURL=basic-info.component.js.map