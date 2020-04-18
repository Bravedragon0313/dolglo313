import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme';
import { JsonModalComponent } from './json-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { HighlightModule } from 'ngx-highlightjs';
const COMPONENTS = [JsonModalComponent];
let JsonModalModule = class JsonModalModule {
};
JsonModalModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            TranslateModule.forChild(),
            HighlightModule.forRoot({ theme: 'github' }),
        ],
        declarations: COMPONENTS,
        entryComponents: COMPONENTS,
        exports: COMPONENTS,
    })
], JsonModalModule);
export { JsonModalModule };
//# sourceMappingURL=json-modal.module.js.map