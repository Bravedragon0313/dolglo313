import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme';
import { TranslateModule } from '@ngx-translate/core';
import { ConfimationModalComponent } from './confirmation-modal.component';
import { ToasterModule } from 'angular2-toaster';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';
const COMPONENTS = [ConfimationModalComponent];
let ConfirmationModalModule = class ConfirmationModalModule {
};
ConfirmationModalModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            TranslateModule.forChild(),
            ToasterModule.forRoot(),
            NbSpinnerModule,
            NbButtonModule,
        ],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], ConfirmationModalModule);
export { ConfirmationModalModule };
//# sourceMappingURL=confirmation-modal.module.js.map