var CoreModule_1;
import { __decorate, __metadata, __param } from "tslib";
import { NgModule, Optional, SkipSelf, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { AuthModule } from './auth/auth.module';
import { NbEverRoleProvider } from './roleProvider';
export const NB_CORE_PROVIDERS = [
    ...DataModule.forRoot().providers,
    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,
    {
        provide: NbRoleProvider,
        useClass: NbEverRoleProvider,
    },
    AnalyticsService,
];
let CoreModule = CoreModule_1 = class CoreModule {
    constructor(parentModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    static forRoot() {
        const providers = {
            ngModule: CoreModule_1,
            providers: [...NB_CORE_PROVIDERS],
        };
        return providers;
    }
};
CoreModule = CoreModule_1 = __decorate([
    NgModule({
        imports: [AuthModule, CommonModule],
        declarations: [],
    }),
    __param(0, Optional()),
    __param(0, SkipSelf()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map