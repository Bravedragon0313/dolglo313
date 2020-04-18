import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AdminsService } from '../../../@core/data/admins.service';
import { Store } from '../../../@core/data/store.service';
import { TranslateService } from '@ngx-translate/core';
let HeaderComponent = class HeaderComponent {
    constructor(sidebarService, menuService, adminsService, store, translateService) {
        this.sidebarService = sidebarService;
        this.menuService = menuService;
        this.adminsService = adminsService;
        this.store = store;
        this.translateService = translateService;
        this.position = 'normal';
        this.ngDestroy$ = new Subject();
        this.initialize();
        this._applyTranslationOnSmartTable();
        this.admin$ = this.adminsService.getAdmin(this.store.adminId);
    }
    ngOnInit() { }
    initialize() {
        this.adminMenu = [
            {
                title: this.getTranslation('HEADER_VIEW.PROFILE'),
                link: '/profile',
            },
            {
                title: this.getTranslation('HEADER_VIEW.LOG_OUT'),
                link: '/auth/logout',
            },
        ];
    }
    getTranslation(prefix) {
        let result = '';
        this.translateService.get(prefix).subscribe((res) => {
            result = res;
        });
        return result;
    }
    _applyTranslationOnSmartTable() {
        this.translateService.onLangChange.subscribe(() => {
            this.initialize();
        });
    }
    toggleSidebar() {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }
    toggleSettings() {
        this.sidebarService.toggle(false, 'settings-sidebar');
        return false;
    }
    navigateHome() {
        this.menuService.navigateHome();
    }
    startSearch() {
        return false;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "position", void 0);
HeaderComponent = __decorate([
    Component({
        selector: 'ngx-header',
        styleUrls: ['./header.component.scss'],
        templateUrl: './header.component.html',
    }),
    __metadata("design:paramtypes", [NbSidebarService,
        NbMenuService,
        AdminsService,
        Store,
        TranslateService])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map