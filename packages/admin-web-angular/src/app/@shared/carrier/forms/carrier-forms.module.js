import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormWizardModule } from 'angular2-wizard';
import { BasicInfoFormComponent } from './basic-info';
import { ThemeModule } from '@app/@theme';
import { FileUploaderModule } from '@app/@shared/file-uploader/file-uploader.module';
let CarrierFormsModule = class CarrierFormsModule {
};
CarrierFormsModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            FormWizardModule,
            TranslateModule.forChild(),
            FileUploaderModule,
        ],
        exports: [BasicInfoFormComponent],
        declarations: [BasicInfoFormComponent],
    })
], CarrierFormsModule);
export { CarrierFormsModule };
//# sourceMappingURL=carrier-forms.module.js.map