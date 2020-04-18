import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { TranslateModule } from '@ngx-translate/core';
import { StoreOrderComponent } from './store-order.component';
import { UserOrderComponent } from './user-order-component';
const COMPONENTS = [StoreOrderComponent, UserOrderComponent];
let CarrierOrdersTableModule = class CarrierOrdersTableModule {
};
CarrierOrdersTableModule = __decorate([
    NgModule({
        imports: [CommonModule, ThemeModule, TranslateModule.forChild()],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], CarrierOrdersTableModule);
export { CarrierOrdersTableModule };
//# sourceMappingURL=carrier-orders-table.module.js.map