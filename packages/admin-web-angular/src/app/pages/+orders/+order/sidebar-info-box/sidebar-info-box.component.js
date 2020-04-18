import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let SidebarInfoBoxComponent = class SidebarInfoBoxComponent {
    constructor(router) {
        this.router = router;
    }
    redirect() {
        if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], SidebarInfoBoxComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SidebarInfoBoxComponent.prototype, "imageUrl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SidebarInfoBoxComponent.prototype, "contactDetails", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SidebarInfoBoxComponent.prototype, "redirectUrl", void 0);
SidebarInfoBoxComponent = __decorate([
    Component({
        selector: 'ea-order-sidebar-info-box',
        templateUrl: './sidebar-info-box.component.html',
        styleUrls: ['./sidebar-info-box.component.scss'],
    }),
    __metadata("design:paramtypes", [Router])
], SidebarInfoBoxComponent);
export { SidebarInfoBoxComponent };
//# sourceMappingURL=sidebar-info-box.component.js.map