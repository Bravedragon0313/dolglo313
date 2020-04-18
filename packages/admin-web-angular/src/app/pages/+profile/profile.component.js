import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AdminsService } from '@app/@core/data/admins.service';
import { Store } from '@app/@core/data/store.service';
let ProfileComponent = class ProfileComponent {
    constructor(adminsService, store) {
        this.adminsService = adminsService;
        this.store = store;
        this.admin$ = this.adminsService.getAdmin(this.store.adminId);
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'ea-profile',
        styleUrls: ['/profile.component.scss'],
        templateUrl: './profile.component.html',
    }),
    __metadata("design:paramtypes", [AdminsService, Store])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map