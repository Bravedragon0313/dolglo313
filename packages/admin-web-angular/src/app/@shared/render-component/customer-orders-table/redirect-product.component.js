import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let RedirectProductComponent = class RedirectProductComponent {
    constructor(router, _productLocalesService) {
        this.router = router;
        this._productLocalesService = _productLocalesService;
    }
    ngOnInit() {
        if (this.rowData.products.length) {
            this.product = this.rowData.products[0];
            this.productTitle = this.localeTranslate(this.rowData.products[0].product.title);
        }
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    redirect() {
        if (this.product) {
            this.router.navigate([
                `products/list/${this.product['product'].id}`,
            ]);
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], RedirectProductComponent.prototype, "rowData", void 0);
RedirectProductComponent = __decorate([
    Component({
        template: `
		<div
			*ngIf="product"
			(click)="redirect()"
			class="redirectBtn productBtn"
		>
			<h6>
				{{ productTitle }}
				<span class="badge badge-secondary">{{ product.count }}</span>
			</h6>
		</div>
	`,
    }),
    __metadata("design:paramtypes", [Router,
        ProductLocalesService])
], RedirectProductComponent);
export { RedirectProductComponent };
//# sourceMappingURL=redirect-product.component.js.map