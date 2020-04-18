import { ProductComponent } from './product.component';
export const routes = [
    {
        path: '',
        component: ProductComponent,
    },
    {
        path: 'edit',
        loadChildren: () => import('./product-edit/product-edit.module').then((m) => m.ProductEditModule),
    },
];
//# sourceMappingURL=product.routes.js.map