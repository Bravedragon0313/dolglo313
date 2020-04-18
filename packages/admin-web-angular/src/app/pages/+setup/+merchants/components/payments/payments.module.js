import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@app/@theme';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SetupMerchantPaymentsComponent } from './payments.component';
import { NgModule } from '@angular/core';
import { PaymentGatewaysModule } from '@app/@shared/payment-gateways/payment-gateways.module';
import { NbButtonModule } from '@nebular/theme';
let SetupMerchantsPaymentsModule = class SetupMerchantsPaymentsModule {
};
SetupMerchantsPaymentsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            FormsModule,
            TranslateModule.forChild(),
            PaymentGatewaysModule,
            NbButtonModule,
        ],
        declarations: [SetupMerchantPaymentsComponent],
        exports: [SetupMerchantPaymentsComponent],
    })
], SetupMerchantsPaymentsModule);
export { SetupMerchantsPaymentsModule };
//# sourceMappingURL=payments.module.js.map