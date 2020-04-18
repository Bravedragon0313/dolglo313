import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { SimulationJsonComponent } from './sumulation-json.component';
import { JsonModalModule } from '../../json-modal/json-modal.module';
import { TranslateModule } from '@ngx-translate/core';
const COMPONENTS = [SimulationJsonComponent];
let SimulationTableModule = class SimulationTableModule {
};
SimulationTableModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            JsonModalModule,
            TranslateModule.forChild(),
        ],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], SimulationTableModule);
export { SimulationTableModule };
//# sourceMappingURL=simulation-table.module.js.map