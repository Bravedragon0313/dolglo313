var WarehouseManageTabsAccountComponent_1;
import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup, Validators, } from '@angular/forms';
let WarehouseManageTabsAccountComponent = WarehouseManageTabsAccountComponent_1 = class WarehouseManageTabsAccountComponent {
    static initialize(passwordControl) {
        this.password = passwordControl;
    }
    static clean() {
        WarehouseManageTabsAccountComponent_1.password = null;
    }
    static buildForm(formBuilder) {
        return formBuilder.group({
            username: ['', [Validators.required]],
            password: formBuilder.group({
                current: [''],
                new: [''],
                confirm: [
                    '',
                    [
                        (control) => {
                            if (this.password) {
                                return control.value.length > 0 &&
                                    control.value !== this.password.value
                                    ? { notMatch: true }
                                    : null;
                            }
                        },
                    ],
                ],
            }),
        });
    }
    get username() {
        return this.form.get('username');
    }
    get password() {
        return this.form.get('password');
    }
    get passwordNew() {
        return this.password.get('new');
    }
    get passwordConfirm() {
        return this.password.get('confirm');
    }
    ngOnInit() {
        WarehouseManageTabsAccountComponent_1.initialize(this.passwordNew);
    }
    ngOnDestroy() {
        WarehouseManageTabsAccountComponent_1.clean();
    }
    getValue() {
        const accountInfo = this.form.getRawValue();
        return accountInfo;
    }
    setValue(username) {
        this.username.setValue(username);
    }
};
__decorate([
    Input(),
    __metadata("design:type", FormGroup)
], WarehouseManageTabsAccountComponent.prototype, "form", void 0);
WarehouseManageTabsAccountComponent = WarehouseManageTabsAccountComponent_1 = __decorate([
    Component({
        selector: 'ea-warehouse-manage-tabs-account',
        styleUrls: ['./warehouse-manage-tabs-account.component.scss'],
        templateUrl: './warehouse-manage-tabs-account.component.html',
    })
], WarehouseManageTabsAccountComponent);
export { WarehouseManageTabsAccountComponent };
//# sourceMappingURL=warehouse-manage-tabs-account.component.js.map