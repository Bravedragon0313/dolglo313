import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NbPopoverDirective, NbThemeService } from '@nebular/theme';
import { AnalyticsService } from '../../../../@core/utils/analytics.service';
let ThemeSwitcherListComponent = class ThemeSwitcherListComponent {
    constructor(themeService, analyticsService) {
        this.themeService = themeService;
        this.analyticsService = analyticsService;
        this.themes = [
            {
                title: 'Light',
                key: 'everlight',
            },
            {
                title: 'Dark',
                key: 'everdark',
            },
            {
                title: 'White',
                key: 'default',
            },
            {
                title: 'Cosmic',
                key: 'cosmic',
            },
            {
                title: 'Corporate',
                key: 'corporate',
            },
        ];
    }
    onToggleTheme(themeKey) {
        this.themeService.changeTheme(themeKey);
        this.analyticsService.trackEvent('switchTheme');
        this.popover.hide();
    }
};
__decorate([
    Input(),
    __metadata("design:type", NbPopoverDirective)
], ThemeSwitcherListComponent.prototype, "popover", void 0);
ThemeSwitcherListComponent = __decorate([
    Component({
        selector: 'ngx-theme-switcher-list',
        templateUrl: './theme-switcher-list.component.html',
        styleUrls: ['./theme-switcher-list.component.scss'],
    }),
    __metadata("design:paramtypes", [NbThemeService,
        AnalyticsService])
], ThemeSwitcherListComponent);
export { ThemeSwitcherListComponent };
//# sourceMappingURL=themes-switcher-list.component.js.map