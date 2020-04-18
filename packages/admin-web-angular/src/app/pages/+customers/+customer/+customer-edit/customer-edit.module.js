import { __decorate } from "tslib";
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../../@theme';
import { UserFormsModule } from '../../../../@shared/user/forms';
import { LocationFormModule } from '../../../../@shared/forms/location';
import { GoogleMapModule } from '../../../../@shared/forms/google-map/google-map.module';
import { CustomerEditComponent } from './customer-edit.component';
import { ToasterModule } from 'angular2-toaster';
import { NbSpinnerModule, NbButtonModule } from '@nebular/theme';
const routes = [
    {
        path: '',
        component: CustomerEditComponent,
    },
];
let CustomerEditModule = class CustomerEditModule {
};
CustomerEditModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            ToasterModule,
            TranslateModule.forChild(),
            RouterModule.forChild(routes),
            UserFormsModule,
            LocationFormModule,
            GoogleMapModule,
            NbSpinnerModule,
            NbButtonModule,
        ],
        declarations: [CustomerEditComponent],
    })
], CustomerEditModule);
export { CustomerEditModule };
//# sourceMappingURL=customer-edit.module.js.map