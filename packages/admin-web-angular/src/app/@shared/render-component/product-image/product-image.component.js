import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
let ProductImageComponent = class ProductImageComponent {
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
], ProductImageComponent.prototype, "rowData", void 0);
ProductImageComponent = __decorate([
    Component({
        styleUrls: ['./product-image.component.scss'],
        templateUrl: './product-image.component.html',
    }),
    __metadata("design:paramtypes", [Router])
], ProductImageComponent);
export { ProductImageComponent };
//# sourceMappingURL=product-image.component.js.map