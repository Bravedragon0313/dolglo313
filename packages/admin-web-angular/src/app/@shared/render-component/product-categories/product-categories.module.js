import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { ProductCategoriesComponent } from './product-categories';
const COMPONENTS = [ProductCategoriesComponent];
let ProductCategoriesModule = class ProductCategoriesModule {
};
ProductCategoriesModule = __decorate([
    NgModule({
        imports: [CommonModule, ThemeModule],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], ProductCategoriesModule);
export { ProductCategoriesModule };
//# sourceMappingURL=product-categories.module.js.map