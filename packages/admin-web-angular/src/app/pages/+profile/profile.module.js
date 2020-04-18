import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme';
import { ProfileComponent } from './profile.component';
import { AdminsService } from '../../@core/data/admins.service';
import { EditProfileModule } from './edit/edit.module';
export const routes = [
    {
        path: '',
        component: ProfileComponent,
    },
];
const PROFILE_COMPONENTS = [ProfileComponent];
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ThemeModule,
            ToasterModule.forRoot(),
            TranslateModule.forChild(),
            RouterModule.forChild(routes),
            EditProfileModule,
        ],
        declarations: [...PROFILE_COMPONENTS],
        entryComponents: [],
        providers: [AdminsService],
    })
], ProfileModule);
export { ProfileModule };
//# sourceMappingURL=profile.module.js.map