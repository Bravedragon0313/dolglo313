import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardModule } from 'angular2-wizard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { NbSpinnerModule } from '@nebular/theme';
import { OrderHeaderInfoComponent } from './order-header-info.component';
import { ThemeModule } from '../../../../../@theme';
let OrderHeaderInfoModule = class OrderHeaderInfoModule {
};
OrderHeaderInfoModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            FormWizardModule,
            Ng2SmartTableModule,
            TranslateModule.forChild(),
            NbSpinnerModule,
        ],
        declarations: [OrderHeaderInfoComponent],
        exports: [OrderHeaderInfoComponent],
    })
], OrderHeaderInfoModule);
export { OrderHeaderInfoModule };
//# sourceMappingURL=order-header-info.module.js.map