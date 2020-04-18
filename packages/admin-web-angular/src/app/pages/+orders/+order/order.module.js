import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { ToasterModule } from 'angular2-toaster';
import { TranslateModule } from '@ngx-translate/core';
import { OrderComponent } from './order.component';
import { SidebarInfoBoxModule } from './sidebar-info-box/sidebar-info-box.module';
import { WarehouseOrderViewModule } from '@app/pages/+warehouses/+warehouse/warehouse-order-view/warehouse-order-view.module';
import { OrderMapModule } from '@app/@shared/order/order-map/order-map.module';
import { OrderProductsModule } from './order-products/order-products.module';
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            ToasterModule.forRoot(),
            TranslateModule.forChild(),
            SidebarInfoBoxModule,
            WarehouseOrderViewModule,
            OrderMapModule,
            OrderProductsModule,
        ],
        declarations: [OrderComponent],
    })
], OrderModule);
export { OrderModule };
//# sourceMappingURL=order.module.js.map