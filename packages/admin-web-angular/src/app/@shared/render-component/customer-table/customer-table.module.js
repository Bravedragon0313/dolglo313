import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme';
import { HighlightModule } from 'ngx-highlightjs';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerImageComponent } from './customer-table/customer-image.component';
import { CustomerOrdersNumberComponent } from './customer-orders-number/customer-orders-number.component';
const COMPONENTS = [CustomerImageComponent, CustomerOrdersNumberComponent];
let CustomerTableModule = class CustomerTableModule {
};
CustomerTableModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            HighlightModule.forRoot({ theme: 'github' }),
            TranslateModule.forChild(),
        ],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], CustomerTableModule);
export { CustomerTableModule };
//# sourceMappingURL=customer-table.module.js.map