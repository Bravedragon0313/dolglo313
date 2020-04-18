import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NbPopoverDirective, NbThemeService } from '@nebular/theme';
import { ThemeSwitcherListComponent } from './themes-switcher-list/themes-switcher-list.component';
import { AnalyticsService } from '@app/@core/utils/analytics.service';
let ThemeSwitcherComponent = class ThemeSwitcherComponent {
    constructor(themeService, analyticsService) {
        this.themeService = themeService;
        this.analyticsService = analyticsService;
        this.showTitle = true;
        this.switcherListComponent = ThemeSwitcherListComponent;
        this.themeService.onThemeChange().subscribe((theme) => {
            this.activeTheme = theme.name;
        });
        this.activeTheme = themeService.currentTheme;
    }
};
__decorate([
    ViewChild(NbPopoverDirective, { static: true }),
    __metadata("design:type", NbPopoverDirective)
], ThemeSwitcherComponent.prototype, "popover", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ThemeSwitcherComponent.prototype, "showTitle", void 0);
ThemeSwitcherComponent = __decorate([
    Component({
        selector: 'ngx-theme-switcher',
        templateUrl: './theme-switcher.component.html',
        styleUrls: ['./theme-switcher.component.scss'],
    }),
    __metadata("design:paramtypes", [NbThemeService,
        AnalyticsService])
], ThemeSwitcherComponent);
export { ThemeSwitcherComponent };
//# sourceMappingURL=theme-switcher.component.js.map