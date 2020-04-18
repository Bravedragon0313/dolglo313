import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let ProductImageRedirectComponent = class ProductImageRedirectComponent {
    constructor(_router, _localeTranslate) {
        this._router = _router;
        this._localeTranslate = _localeTranslate;
    }
    ngOnInit() {
        this.imageUrl = this._localeTranslate.getTranslate(this.rowData.product.images);
    }
    redirect() {
        const productId = this.rowData.id;
        this._router.navigate(['products/list/' + productId]);
    }
};
ProductImageRedirectComponent = __decorate([
    Component({
        styles: ['img { cursor: pointer }'],
        template: ` <img src="{{ imageUrl }}" (click)="redirect()" width="60" /> `,
    }),
    __metadata("design:paramtypes", [Router,
        ProductLocalesService])
], ProductImageRedirectComponent);
export { ProductImageRedirectComponent };
//# sourceMappingURL=product-image-redirect.component.js.map