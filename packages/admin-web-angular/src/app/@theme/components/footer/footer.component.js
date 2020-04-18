import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from 'environments/environment';
let FooterComponent = class FooterComponent {
    constructor() {
        this.companyName = environment.COMPANY_NAME;
        this.companySiteLink = environment.COMPANY_SITE_LINK;
        this.companyGithubLink = environment.COMPANY_GITHUB_LINK;
        this.companyFacebookLink = environment.COMPANY_FACEBOOK_LINK;
        this.companyTwitterLink = environment.COMPANY_TWITTER_LINK;
        this.companyLinkedinLink = environment.COMPANY_LINKEDIN_LINK;
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'ngx-footer',
        styleUrls: ['./footer.component.scss'],
        templateUrl: './footer.component.html',
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map