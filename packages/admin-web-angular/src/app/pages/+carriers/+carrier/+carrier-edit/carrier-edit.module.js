import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CarrierEditComponent } from './carrier-edit.component';
import { ThemeModule } from '../../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { LocationFormModule } from '../../../../@shared/forms/location';
import { CarrierFormsModule } from '../../../../@shared/carrier/forms';
import { GoogleMapModule } from '../../../../@shared/forms/google-map/google-map.module';
import { RouterModule } from '@angular/router';
import { routes } from './carrier-edit.routes';
import { ToasterModule } from 'angular2-toaster';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';
let CarrierEditModule = class CarrierEditModule {
};
CarrierEditModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            TranslateModule.forChild(),
            ToasterModule.forRoot(),
            RouterModule.forChild(routes),
            CarrierFormsModule,
            LocationFormModule,
            GoogleMapModule,
            NbSpinnerModule,
            NbButtonModule,
        ],
        exports: [CarrierEditComponent],
        declarations: [CarrierEditComponent],
    })
], CarrierEditModule);
export { CarrierEditModule };
//# sourceMappingURL=carrier-edit.module.js.map