import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardModule } from 'angular2-wizard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme';
import { WarehouseProductsViewComponent } from './warehouse-products-view.component';
let WarehouseProductsViewModule = class WarehouseProductsViewModule {
};
WarehouseProductsViewModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            FormWizardModule,
            Ng2SmartTableModule,
            TranslateModule.forChild(),
            NbSpinnerModule,
        ],
        declarations: [WarehouseProductsViewComponent],
        exports: [WarehouseProductsViewComponent],
    })
], WarehouseProductsViewModule);
export { WarehouseProductsViewModule };
//# sourceMappingURL=warehouse-products-view.module.js.map