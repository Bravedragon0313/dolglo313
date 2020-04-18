import { CarrierComponent } from './carrier.component';
export const routes = [
    {
        path: '',
        component: CarrierComponent,
    },
    {
        path: 'edit',
        loadChildren: () => import('./+carrier-edit/carrier-edit.module').then((m) => m.CarrierEditModule),
    },
];
//# sourceMappingURL=carrier.routes.js.map