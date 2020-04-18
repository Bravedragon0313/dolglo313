import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbAuthComponent, NbLoginComponent, NbLogoutComponent, NbRegisterComponent, NbRequestPasswordComponent, NbResetPasswordComponent, } from '@nebular/auth';
import { AdminAuthGuard } from './@core/auth/admin-auth.guard';
import { AppModuleGuard } from './app.module.guard';
import { MaintenanceModuleGuard } from './pages/+maintenance-info/maintenance-info.module.guard';
const routes = [
    {
        path: '',
        loadChildren: () => import('app/pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AppModuleGuard, AdminAuthGuard],
    },
    {
        path: 'auth',
        component: NbAuthComponent,
        canActivate: [AppModuleGuard],
        children: [
            {
                path: '',
                component: NbLoginComponent,
            },
            {
                path: 'login',
                component: NbLoginComponent,
            },
            {
                path: 'register',
                component: NbRegisterComponent,
            },
            {
                path: 'logout',
                component: NbLogoutComponent,
            },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NbResetPasswordComponent,
            },
        ],
    },
    {
        path: 'maintenance-info',
        loadChildren: () => import('app/pages/+maintenance-info/maintenance-info.module').then((m) => m.MaintenanceInfoModule),
        canActivate: [MaintenanceModuleGuard],
    },
    {
        path: 'server-down',
        loadChildren: () => import('app/pages/+server-down/server-down.module').then((m) => m.ServerDownModule),
    },
    { path: '**', redirectTo: '' },
];
const config = {
    useHash: true,
    enableTracing: true,
};
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, config)],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map