import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormWizardModule } from 'angular2-wizard';
import { ThemeModule } from '../../../../@theme';
import { PasswordUpdateFormComponent } from './password-update-form.component';
let LocationFormModule = class LocationFormModule {
};
LocationFormModule = __decorate([
    NgModule({
        imports: [ThemeModule, FormWizardModule, TranslateModule.forChild()],
        exports: [PasswordUpdateFormComponent],
        declarations: [PasswordUpdateFormComponent],
    })
], LocationFormModule);
export { LocationFormModule };
//# sourceMappingURL=password-update-form.module.js.map