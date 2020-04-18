import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { LocationFormComponent } from './location-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormWizardModule } from 'angular2-wizard';
import { ThemeModule } from '../../../@theme';
import { AgmCoreModule } from '@agm/core';
let LocationFormModule = class LocationFormModule {
};
LocationFormModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            FormWizardModule,
            TranslateModule.forChild(),
            AgmCoreModule,
        ],
        exports: [LocationFormComponent],
        declarations: [LocationFormComponent],
    })
], LocationFormModule);
export { LocationFormModule };
//# sourceMappingURL=location-form.module.js.map