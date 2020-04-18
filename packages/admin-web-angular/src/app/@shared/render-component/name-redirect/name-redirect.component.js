import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let RedirectNameComponent = class RedirectNameComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    redirect() {
        if (this.redirectPage) {
            this.router.navigate([`${this.redirectPage}/${this.rowData.id}`]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectNameComponent.prototype, "rowData", void 0);
RedirectNameComponent = __decorate([
    Component({
        styleUrls: ['name-redirect.component.scss'],
        templateUrl: './name-redirect.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], RedirectNameComponent);
export { RedirectNameComponent };
//# sourceMappingURL=name-redirect.component.js.map