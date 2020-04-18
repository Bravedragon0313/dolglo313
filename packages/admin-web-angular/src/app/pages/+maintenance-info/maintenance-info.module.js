import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '@modules/client.common.angular2/services/maintenance.service';
import { MaintenanceInfoComponent } from './maintenance-info.component';
import { PipesModule } from '@modules/client.common.angular2/pipes/pipes.module';
import { ThemeModule } from '@app/@theme';
const routes = [
    {
        path: '',
        component: MaintenanceInfoComponent,
    },
];
let MaintenanceInfoModule = class MaintenanceInfoModule {
};
MaintenanceInfoModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
            PipesModule,
            ThemeModule,
        ],
        providers: [MaintenanceService],
        declarations: [MaintenanceInfoComponent],
    })
], MaintenanceInfoModule);
export { MaintenanceInfoModule };
//# sourceMappingURL=maintenance-info.module.js.map