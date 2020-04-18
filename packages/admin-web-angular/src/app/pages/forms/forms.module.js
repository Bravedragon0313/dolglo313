import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
let FormsModule = class FormsModule {
};
FormsModule = __decorate([
    NgModule({
        imports: [ThemeModule, FormsRoutingModule],
        declarations: [...routedComponents],
    })
], FormsModule);
export { FormsModule };
//# sourceMappingURL=forms.module.js.map