import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { delay, takeWhile, withLatestFrom } from 'rxjs/operators';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, } from '@nebular/theme';
import { StateService } from '../../../@core/data/state.service';
let SampleLayoutComponent = class SampleLayoutComponent {
    constructor(stateService, menuService, themeService, bpService, sidebarService) {
        this.stateService = stateService;
        this.menuService = menuService;
        this.themeService = themeService;
        this.bpService = bpService;
        this.sidebarService = sidebarService;
        this.subMenu = [
            {
                title: 'PAGE LEVEL MENU',
                group: true,
            },
            {
                title: 'Buttons',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/buttons',
            },
            {
                title: 'Grid',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/grid',
            },
            {
                title: 'Icons',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/icons',
            },
            {
                title: 'Modals',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/modals',
            },
            {
                title: 'Typography',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/typography',
            },
            {
                title: 'Animated Searches',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/search-fields',
            },
            {
                title: 'Tabs',
                icon: 'ion ion-android-radio-button-off',
                link: '/ui-features/tabs',
            },
        ];
        this.layout = {};
        this.sidebar = {};
        this.alive = true;
        this.stateService
            .onLayoutState()
            .pipe(takeWhile(() => this.alive))
            .subscribe((layout) => (this.layout = layout));
        this.stateService
            .onSidebarState()
            .pipe(takeWhile(() => this.alive))
            .subscribe((sidebar) => {
            this.sidebar = sidebar;
        });
        const isBp = this.bpService.getByName('is');
        this.menuService
            .onItemSelect()
            .pipe(takeWhile(() => this.alive), withLatestFrom(this.themeService.onMediaQueryChange()), delay(20))
            .subscribe(([item, [bpFrom, bpTo]]) => {
            if (bpTo.width <= isBp.width) {
                this.sidebarService.collapse('menu-sidebar');
            }
        });
        this.themeService
            .getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe((theme) => {
            this.currentTheme = theme.name;
        });
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
SampleLayoutComponent = __decorate([
    Component({
        selector: 'ngx-sample-layout',
        styleUrls: ['./sample.layout.scss'],
        templateUrl: 'sample.layout.html',
    }),
    __metadata("design:paramtypes", [StateService,
        NbMenuService,
        NbThemeService,
        NbMediaBreakpointsService,
        NbSidebarService])
], SampleLayoutComponent);
export { SampleLayoutComponent };
//# sourceMappingURL=sample.layout.js.map