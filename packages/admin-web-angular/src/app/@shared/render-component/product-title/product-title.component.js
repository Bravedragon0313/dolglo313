import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let ProductTitleComponent = class ProductTitleComponent {
    constructor(router) {
        this.router = router;
    }
    redirect() {
        this.router.navigate([`products/list/${this.rowData.id}/edit`]);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ProductTitleComponent.prototype, "rowData", void 0);
ProductTitleComponent = __decorate([
    Component({
        styleUrls: ['./product-title.component.scss'],
        templateUrl: './product-title.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], ProductTitleComponent);
export { ProductTitleComponent };
//# sourceMappingURL=product-title.component.js.map