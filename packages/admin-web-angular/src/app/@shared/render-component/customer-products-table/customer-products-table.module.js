import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { ProductOrderProductsComponent } from './product-order-products/product-order-products.component';
import { StoreOrderProductsComponent } from './store-order-products/store-order-products.component';
import { OrderBtnOrderProductsComponent } from './order-btn-order-products/order-btn-order-products.component';
import { TranslateModule } from '@ngx-translate/core';
const COMPONENTS = [
    ProductOrderProductsComponent,
    StoreOrderProductsComponent,
    OrderBtnOrderProductsComponent,
];
let CustomerProductsTableModule = class CustomerProductsTableModule {
};
CustomerProductsTableModule = __decorate([
    NgModule({
        imports: [CommonModule, ThemeModule, TranslateModule.forChild()],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], CustomerProductsTableModule);
export { CustomerProductsTableModule };
//# sourceMappingURL=customer-products-table.module.js.map