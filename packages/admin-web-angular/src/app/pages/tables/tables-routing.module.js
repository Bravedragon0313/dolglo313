import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
const routes = [
    {
        path: '',
        component: TablesComponent,
        children: [
            {
                path: 'smart-table',
                component: SmartTableComponent,
            },
        ],
    },
];
let TablesRoutingModule = class TablesRoutingModule {
};
TablesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], TablesRoutingModule);
export { TablesRoutingModule };
export const routedComponents = [TablesComponent, SmartTableComponent];
//# sourceMappingURL=tables-routing.module.js.map