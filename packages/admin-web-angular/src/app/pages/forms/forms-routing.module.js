import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
const routes = [
    {
        path: '',
        component: FormsComponent,
        children: [
            {
                path: 'inputs',
                component: FormInputsComponent,
            },
            {
                path: 'layouts',
                component: FormLayoutsComponent,
            },
        ],
    },
];
let FormsRoutingModule = class FormsRoutingModule {
};
FormsRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], FormsRoutingModule);
export { FormsRoutingModule };
export const routedComponents = [
    FormsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
];
//# sourceMappingURL=forms-routing.module.js.map