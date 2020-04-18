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
        template: `
		<div class="product">
			<p class="text-center">
				<span (click)="redirect()" class="button-redirect productBtn">
					<img
						alt=""
						src="{{
							productInfo.warehouseProduct.product.images[0].url
						}}"
					/>
					<span class="productTitle">{{ productTitle }}</span>
				</span>
			</p>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [Router,
        ProductLocalesService])
], ProductOrderProductsComponent);
export { ProductOrderProductsComponent };
//# sourceMappingURL=product-order-products.component.js.map