import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { WarehousesComponent } from './warehouses.component';
import { NgModule } from '@angular/core';
import { WarehouseTrackComponent } from './+warehouse-track/warehouse-track.component';
const routes = [
    {
        path: '',
        component: WarehousesComponent,
    },
    {
        path: 'track',
        component: WarehouseTrackComponent,
    },
    {
        path: ':id',
        loadChildren: () => import('./+warehouse/warehouse.module').then((m) => m.WarehouseModule),
    },
];
let WarehousesRoutingModule = class WarehousesRoutingModule {
};
WarehousesRoutingModule.routes = routes;
WarehousesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], WarehousesRoutingModule);
export { WarehousesRoutingModule };
//# sourceMappingURL=warehouses-routing.module.js.map