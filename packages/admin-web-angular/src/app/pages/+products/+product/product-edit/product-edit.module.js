import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { ProductEditComponent } from './product-edit.component';
import { ProductFormsModule } from '../../../../@shared/product/forms';
import { FormWizardModule } from 'angular2-wizard';
import { ProductsCategoryService } from '../../../../@core/data/productsCategory.service';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';
export const routes = [
    {
        path: '',
        component: ProductEditComponent,
    },
];
let ProductEditModule = class ProductEditModule {
};
ProductEditModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            TranslateModule.forChild(),
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            ProductFormsModule,
            FormWizardModule,
            NbSpinnerModule,
            NbButtonModule,
        ],
        exports: [],
        declarations: [ProductEditComponent],
        providers: [ProductsCategoryService],
    })
], ProductEditModule);
export { ProductEditModule };
//# sourceMappingURL=product-edit.module.js.map