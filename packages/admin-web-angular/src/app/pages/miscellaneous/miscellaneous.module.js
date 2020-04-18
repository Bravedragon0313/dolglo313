import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule, routedComponents, } from './miscellaneous-routing.module';
let MiscellaneousModule = class MiscellaneousModule {
};
MiscellaneousModule = __decorate([
    NgModule({
        imports: [ThemeModule, MiscellaneousRoutingModule],
        declarations: [...routedComponents],
    })
], MiscellaneousModule);
export { MiscellaneousModule };
//# sourceMappingURL=miscellaneous.module.js.map