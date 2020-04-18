import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FormWizardModule } from 'angular2-wizard';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { CarrierMapComponent } from './carrier-map.component';
import { ThemeModule } from '@app/@theme';
let CarrierMapModule = class CarrierMapModule {
};
CarrierMapModule = __decorate([
    NgModule({
        declarations: [CarrierMapComponent],
        imports: [
            FormWizardModule,
            Ng2SmartTableModule,
            FileUploadModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule.forChild(),
            ThemeModule,
        ],
        entryComponents: [CarrierMapComponent],
    })
], CarrierMapModule);
export { CarrierMapModule };
//# sourceMappingURL=carrier-map.module.js.map