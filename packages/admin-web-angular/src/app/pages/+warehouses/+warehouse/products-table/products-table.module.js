import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule, HttpLoaderFactory } from '@app/@theme';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ProductsTableComponent } from './products-table.component';
import { ToasterModule } from 'angular2-toaster';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';
import { ConfirmationModalModule } from '../../../../@shared/confirmation-modal/confirmation-modal.module';
import { WarehouseProductFormsModule } from '@app/@shared/warehouse-product/forms';
const COMPONENTS = [ProductsTableComponent];
let ProductsTableModule = class ProductsTableModule {
};
ProductsTableModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            ToasterModule.forChild(),
            TranslateModule.forChild({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
            NbSpinnerModule,
            ConfirmationModalModule,
            WarehouseProductFormsModule,
            NbButtonModule,
        ],
        declarations: [...COMPONENTS],
        exports: [...COMPONENTS],
    })
], ProductsTableModule);
export { ProductsTableModule };
//# sourceMappingURL=products-table.module.js.map