import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { TreeComponent } from './tree/tree.component';
import { NotificationsComponent } from './notifications/notifications.component';
const routes = [
    {
        path: '',
        component: ComponentsComponent,
        children: [
            {
                path: 'tree',
                component: TreeComponent,
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
            },
        ],
    },
];
let ComponentsRoutingModule = class ComponentsRoutingModule {
};
ComponentsRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ComponentsRoutingModule);
export { ComponentsRoutingModule };
export const routedComponents = [
    ComponentsComponent,
    TreeComponent,
    NotificationsComponent,
];
//# sourceMappingURL=components-routing.module.js.map