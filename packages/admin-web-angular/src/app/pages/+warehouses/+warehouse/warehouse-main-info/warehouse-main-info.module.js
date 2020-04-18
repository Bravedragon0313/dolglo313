import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardModule } from 'angular2-wizard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme';
import { WarehouseMainInfoViewComponent } from './warehouse-main-info.component';
let WarehouseMainInfoViewModule = class WarehouseMainInfoViewModule {
};
WarehouseMainInfoViewModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            FormWizardModule,
            Ng2SmartTableModule,
            TranslateModule.forChild(),
            NbSpinnerModule,
        ],
        declarations: [WarehouseMainInfoViewComponent],
        exports: [WarehouseMainInfoViewComponent],
    })
], WarehouseMainInfoViewModule);
export { WarehouseMainInfoViewModule };
//# sourceMappingURL=warehouse-main-info.module.js.map