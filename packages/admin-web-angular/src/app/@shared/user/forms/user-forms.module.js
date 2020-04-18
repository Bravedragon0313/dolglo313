import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormWizardModule } from 'angular2-wizard';
import { ThemeModule } from '../../../@theme/theme.module';
import { BasicInfoFormComponent } from './basic-info';
import { FileUploaderModule } from '@app/@shared/file-uploader/file-uploader.module';
let UserFormsModule = class UserFormsModule {
};
UserFormsModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            FormWizardModule,
            FileUploaderModule,
            TranslateModule.forChild(),
        ],
        exports: [BasicInfoFormComponent],
        declarations: [BasicInfoFormComponent],
        providers: [],
    })
], UserFormsModule);
export { UserFormsModule };
//# sourceMappingURL=user-forms.module.js.map