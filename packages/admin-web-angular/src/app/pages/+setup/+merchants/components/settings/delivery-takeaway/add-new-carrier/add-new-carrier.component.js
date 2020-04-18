import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, } from '@angular/core';
import { BasicInfoFormComponent } from '@app/@shared/carrier/forms/basic-info/basic-info-form.component';
import { FormBuilder } from '@angular/forms';
import { CarrierRouter } from '@modules/client.common.angular2/routers/carrier-router.service';
import { first } from 'rxjs/operators';
let SetupMerchantAddNewCarrierComponent = class SetupMerchantAddNewCarrierComponent {
    constructor(formBuilder, carrierRouter) {
        this.formBuilder = formBuilder;
        this.carrierRouter = carrierRouter;
        this.form = this.formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this.formBuilder),
            password: BasicInfoFormComponent.buildPasswordForm(this.formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
    }
    ngOnInit() {
        if (!this.carrierId) {
            this.password = this.form.get('password');
        }
    }
    ngAfterViewInit() {
        this.laodData();
    }
    laodData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.carrierId) {
                const carrier = yield this.carrierRouter
                    .get(this.carrierId)
                    .pipe(first())
                    .toPromise();
                this.basicInfoForm.setValue(carrier);
            }
        });
    }
};
__decorate([
    ViewChild('basicInfoForm', { static: true }),
    __metadata("design:type", BasicInfoFormComponent)
], SetupMerchantAddNewCarrierComponent.prototype, "basicInfoForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SetupMerchantAddNewCarrierComponent.prototype, "carrierId", void 0);
SetupMerchantAddNewCarrierComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-add-new-carrier',
        templateUrl: './add-new-carrier.component.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        CarrierRouter])
], SetupMerchantAddNewCarrierComponent);
export { SetupMerchantAddNewCarrierComponent };
//# sourceMappingURL=add-new-carrier.component.js.map