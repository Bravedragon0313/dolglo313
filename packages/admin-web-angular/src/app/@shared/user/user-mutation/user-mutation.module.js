import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { UserMutationComponent } from './user-mutation.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormWizardModule } from 'angular2-wizard';
import { ThemeModule } from '../../../@theme/theme.module';
import { UserFormsModule } from '../forms';
import { LocationFormModule } from '../../forms/location';
import { GoogleMapModule } from '../../forms/google-map/google-map.module';
import { NbSpinnerModule } from '@nebular/theme';
let UserMutationModule = class UserMutationModule {
};
UserMutationModule = __decorate([
    NgModule({
        imports: [
            ThemeModule,
            FormWizardModule,
            TranslateModule.forChild(),
            UserFormsModule,
            LocationFormModule,
            GoogleMapModule,
            NbSpinnerModule,
        ],
        exports: [UserMutationComponent],
        declarations: [UserMutationComponent],
        entryComponents: [UserMutationComponent],
    })
], UserMutationModule);
export { UserMutationModule };
//# sourceMappingURL=user-mutation.module.js.map