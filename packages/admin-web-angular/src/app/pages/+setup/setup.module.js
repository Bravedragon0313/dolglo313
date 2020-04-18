import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SetupComponent } from './setup.component';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme';
import { TranslateModule } from '@ngx-translate/core';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';
const routes = [
    {
        path: '',
        component: SetupComponent,
    },
    {
        path: 'merchants',
        loadChildren: () => import('./+merchants/merchants.module').then((m) => m.SetupMerchantsModule),
    },
];
let SetupModule = class SetupModule {
};
SetupModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            RouterModule.forChild(routes),
            TranslateModule.forChild(),
            NbSpinnerModule,
            NbButtonModule,
        ],
        declarations: [SetupComponent],
    })
], SetupModule);
export { SetupModule };
//# sourceMappingURL=setup.module.js.map