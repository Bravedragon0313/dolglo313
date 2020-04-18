import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminAuthStrategy } from './admin-auth-strategy.service';
import { NbAuthModule } from '@nebular/auth';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
const socialLinks = [
    {
        url: environment.COMPANY_GITHUB_LINK,
        icon: 'github-outline',
    },
    {
        url: environment.COMPANY_FACEBOOK_LINK,
        target: '_blank',
        icon: 'facebook-outline',
    },
    {
        url: environment.COMPANY_TWITTER_LINK,
        target: '_blank',
        icon: 'twitter-outline',
    },
];
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    NgModule({
        imports: [CommonModule, NbAuthModule],
        providers: [
            ...NbAuthModule.forRoot({
                strategies: [AdminAuthStrategy.setup({ name: 'email' })],
                forms: {
                    login: { socialLinks },
                    register: { socialLinks },
                },
            }).providers,
            AdminAuthGuard,
            AdminAuthStrategy,
        ],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map