import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { ByCodeModalComponent } from './by-code-modal.component';
import { NbButtonModule } from '@nebular/theme';
let ByCodeModalModule = class ByCodeModalModule {
};
ByCodeModalModule = __decorate([
    NgModule({
        imports: [ThemeModule, TranslateModule.forChild(), NbButtonModule],
        exports: [ByCodeModalComponent],
        declarations: [ByCodeModalComponent],
        entryComponents: [ByCodeModalComponent],
    })
], ByCodeModalModule);
export { ByCodeModalModule };
//# sourceMappingURL=by-code-modal.module.js.map