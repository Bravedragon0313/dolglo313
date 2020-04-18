import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CarriersTableModule } from '@app/@shared/render-component/carriers-table/carriers-table.module';
import { CarriersSmartTableComponent } from './carriers-table.component';
import { TranslateModule } from '@ngx-translate/core';
let CarriersSmartTableModule = class CarriersSmartTableModule {
};
CarriersSmartTableModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            Ng2SmartTableModule,
            CarriersTableModule,
            TranslateModule.forChild(),
        ],
        declarations: [CarriersSmartTableComponent],
        exports: [CarriersSmartTableComponent],
    })
], CarriersSmartTableModule);
export { CarriersSmartTableModule };
//# sourceMappingURL=carriers-table.module.js.map