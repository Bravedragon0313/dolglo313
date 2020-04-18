import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SignInRedirectModule } from './+sign-in-redirect/sign-in-redirect.module';
const PAGES_COMPONENTS = [PagesComponent];
let PagesModule = class PagesModule {
};
PagesModule = __decorate([
    NgModule({
        imports: [
            PagesRoutingModule,
            ThemeModule,
            DashboardModule,
            SignInRedirectModule,
            MiscellaneousModule,
        ],
        declarations: [...PAGES_COMPONENTS],
    })
], PagesModule);
export { PagesModule };
//# sourceMappingURL=pages.module.js.map