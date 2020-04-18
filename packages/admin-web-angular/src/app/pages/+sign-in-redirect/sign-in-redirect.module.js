import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInRedirectComponent } from './sign-in-redirect.component';
import { WarehousesService } from '@app/@core/data/warehouses.service';
let SignInRedirectModule = class SignInRedirectModule {
};
SignInRedirectModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild([
                { path: '', component: SignInRedirectComponent },
            ]),
        ],
        declarations: [SignInRedirectComponent],
        providers: [WarehousesService],
    })
], SignInRedirectModule);
export { SignInRedirectModule };
//# sourceMappingURL=sign-in-redirect.module.js.map