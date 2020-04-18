import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import Admin from '@modules/server.common/entities/Admin';
import { AdminsService } from '../../../../@core/data/admins.service';
import { first, takeUntil } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
let AccountComponent = class AccountComponent {
    constructor(formBuilder, adminsService, toasterService, router, _translateService) {
        this.formBuilder = formBuilder;
        this.adminsService = adminsService;
        this.toasterService = toasterService;
        this.router = router;
        this._translateService = _translateService;
        this.ngDestroy$ = new Subject();
        this.PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH';
        this.SUCCESSFULLY_CHANGE_PASSWORD = 'SUCCESSFULLY_CHANGE_PASSWORD';
        this.PREFIX = 'PROFILE_VIEW.';
        this.validations = {
            oldPasswordControl: () => {
                this.oldPassword.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.oldPasswordErrorMsg =
                        (this.oldPassword.touched || this.oldPassword.dirty) &&
                            this.oldPassword.errors
                            ? Object.keys(this.oldPassword.errors)[0]
                            : '';
                });
            },
            passwordControl: () => {
                this.password.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.passwordErrorMsg =
                        (this.password.touched || this.password.dirty) &&
                            this.password.errors
                            ? Object.keys(this.password.errors)[0]
                            : '';
                });
            },
            repeatPasswordControl: () => {
                this.repeatPassword.valueChanges
                    .debounceTime(500)
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((value) => {
                    this.repeatPasswordErrorMsg =
                        (this.repeatPassword.touched ||
                            this.repeatPassword.dirty) &&
                            this.repeatPassword.errors
                            ? this.repeatPassword.errors.validUrl
                                ? this.passwordDoNotMuch()
                                : Object.keys(this.repeatPassword.errors)[0]
                            : '';
                });
            },
        };
        this.buildForm();
        this.bindFormControls();
        this.loadControls();
    }
    ngOnInit() {
        this.$password = this.password.valueChanges.subscribe((res) => {
            this.repeatPassword.setValue('');
        });
    }
    passwordDoNotMuch() {
        return this._translate(this.PREFIX + this.PASSWORDS_DO_NOT_MATCH);
    }
    successfullyChangePassword() {
        return this._translate(this.PREFIX + this.SUCCESSFULLY_CHANGE_PASSWORD);
    }
    saveChanges() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loading = true;
                const res = yield this.adminsService
                    .updatePassword(this.admin.id, {
                    new: this.password.value,
                    current: this.oldPassword.value,
                })
                    .pipe(first())
                    .toPromise();
                if (res.errors) {
                    this.toasterService.pop('error', res.errors[0].message);
                }
                else {
                    this.toasterService.pop('success', this.successfullyChangePassword());
                    this.router.navigate(['/auth/logout']);
                }
                this.loading = false;
            }
            catch (error) {
                this.loading = true;
                this.toasterService.pop('error', error);
                this.loading = false;
            }
        });
    }
    buildForm() {
        this.accountForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4)]],
            repeatPassword: [
                '',
                [
                    Validators.required,
                    (control) => {
                        if (this.password) {
                            return control.value === this.password.value
                                ? null
                                : { validUrl: true };
                        }
                        else {
                            return null;
                        }
                    },
                ],
            ],
        });
    }
    bindFormControls() {
        this.oldPassword = this.accountForm.get('oldPassword');
        this.password = this.accountForm.get('password');
        this.repeatPassword = this.accountForm.get('repeatPassword');
    }
    loadControls() {
        this.validations.oldPasswordControl();
        this.validations.passwordControl();
        this.validations.repeatPasswordControl();
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    ngOnDestroy() {
        if (this.$password) {
            this.$password.unsubscribe();
        }
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Admin)
], AccountComponent.prototype, "admin", void 0);
AccountComponent = __decorate([
    Component({
        selector: 'ea-account',
        styleUrls: ['/account.component.scss'],
        templateUrl: './account.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        AdminsService,
        ToasterService,
        Router,
        TranslateService])
], AccountComponent);
export { AccountComponent };
//# sourceMappingURL=account.component.js.map