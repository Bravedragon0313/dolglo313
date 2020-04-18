import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CarrierMutationComponent } from './carrier-mutation.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormWizardModule } from 'angular2-wizard';
import { LocationFormModule } from '../../forms/location';
import { CarrierFormsModule } from '../forms';
import { GoogleMapModule } from '../../forms/google-map/google-map.module';
import { NbSpinnerModule } from '@nebular/theme';
let CarrierMutationModule = class CarrierMutationModule {
};
CarrierMutationModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            FormWizardModule,
            TranslateModule.forChild(),
            CarrierFormsModule,
            LocationFormModule,
            GoogleMapModule,
            NbSpinnerModule,
        ],
        exports: [CarrierMutationComponent],
        declarations: [CarrierMutationComponent],
        entryComponents: [CarrierMutationComponent],
    })
], CarrierMutationModule);
export { CarrierMutationModule };
//# sourceMappingURL=carrier-mutation.module.js.map