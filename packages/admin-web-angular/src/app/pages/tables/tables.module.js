import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, TablesRoutingModule } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
let TablesModule = class TablesModule {
};
TablesModule = __decorate([
    NgModule({
        imports: [ThemeModule, TablesRoutingModule, Ng2SmartTableModule],
        declarations: [...routedComponents],
        providers: [SmartTableService],
    })
], TablesModule);
export { TablesModule };
//# sourceMappingURL=tables.module.js.map