import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from 'environments/environment';
let StoreProductPriceComponent = class StoreProductPriceComponent {
    constructor() {
        this.currencySymbol = environment.CURRENCY_SYMBOL;
    }
};
StoreProductPriceComponent = __decorate([
    Component({
        template: ` <span>{{ currencySymbol }}{{ value }}</span> `,
    }),
    __metadata("design:paramtypes", [])
], StoreProductPriceComponent);
export { StoreProductPriceComponent };
//# sourceMappingURL=store-product-price.component.js.map