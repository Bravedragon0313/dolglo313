import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
let AppComponent = class AppComponent {
    constructor(analytics) {
        this.analytics = analytics;
    }
    ngOnInit() {
        this.analytics.trackPageViews();
    }
};
AppComponent = __decorate([
    Component({
        selector: 'ea-app',
        template: '<router-outlet></router-outlet>',
    }),
    __metadata("design:paramtypes", [AnalyticsService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map