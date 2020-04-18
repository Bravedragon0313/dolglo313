var DataModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { CarriersService } from './carriers.service';
import { DeviceService } from './device.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { ProductsCategoryService } from './productsCategory.service';
import { WarehousesService } from './warehouses.service';
import { WarehouseOrdersService } from './warehouseOrders.service';
import { Store } from './store.service';
import { DataService } from './data.service';
const SERVICES = [
    DataService,
    CarriersService,
    DeviceService,
    OrdersService,
    UsersService,
    ProductsService,
    ProductsCategoryService,
    WarehousesService,
    WarehouseOrdersService,
    Store,
    StateService,
    SmartTableService,
];
let DataModule = DataModule_1 = class DataModule {
    static forRoot() {
        const providers = {
            ngModule: DataModule_1,
            providers: [...SERVICES],
        };
        return providers;
    }
};
DataModule = DataModule_1 = __decorate([
    NgModule({
        imports: [CommonModule],
        providers: [...SERVICES],
    })
], DataModule);
export { DataModule };
//# sourceMappingURL=data.module.js.map