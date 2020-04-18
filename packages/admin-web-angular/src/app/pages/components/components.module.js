import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsRoutingModule, routedComponents, } from './components-routing.module';
let ComponentsModule = class ComponentsModule {
};
ComponentsModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            ComponentsRoutingModule,
            TreeModule,
            ToasterModule.forRoot(),
        ],
        declarations: [...routedComponents],
    })
], ComponentsModule);
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map