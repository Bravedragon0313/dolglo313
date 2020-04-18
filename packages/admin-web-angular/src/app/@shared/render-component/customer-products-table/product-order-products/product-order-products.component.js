import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let ProductOrderProductsComponent = class ProductOrderProductsComponent {
    constructor(router, _productLocalesService) {
        this.router = router;
        this._productLocalesService = _productLocalesService;
    }
    ngOnInit() {
        this.productInfo = this.rowData;
        this.productTitle = this.localeTranslate(this.rowData.warehouseProduct.product.title);
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    redirect() {
        if (this.productInfo) {
            this.router.navigate([
                `products/list/${this.productInfo.warehouseProduct['product'].id}`,
            ]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ProductOrderProductsComponent.prototype, "rowData", void 0);
ProductOrderProductsComponent = __decorate([
    Component({
        templateUrl: './product-order-products.component.html',
    }),
    __metadata("design:paramtypes", [Router,
        ProductLocalesService])
], ProductOrderProductsComponent);
export { ProductOrderProductsComponent };
//# sourceMappingURL=product-order-products.component.js.map