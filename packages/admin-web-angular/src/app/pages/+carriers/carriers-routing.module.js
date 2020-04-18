import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarriersComponent } from './carriers.component';
import { TrackComponent } from './track/track.component';
const routes = [
    {
        path: '',
        component: CarriersComponent,
    },
    {
        path: 'track',
        component: TrackComponent,
    },
    {
        path: 'track/:storeId',
        component: TrackComponent,
    },
    {
        path: 'track/:storeId/:carrierId',
        component: TrackComponent,
    },
    {
        path: ':id',
        loadChildren: () => import('./+carrier/carrier.module').then((m) => m.CarrierModule),
    },
];
let CarriersRoutingModule = class CarriersRoutingModule {
};
CarriersRoutingModule.routes = routes;
CarriersRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], CarriersRoutingModule);
export { CarriersRoutingModule };
//# sourceMappingURL=carriers-routing.module.js.map