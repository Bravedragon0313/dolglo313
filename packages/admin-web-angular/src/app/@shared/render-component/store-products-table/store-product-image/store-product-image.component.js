import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
let StoreProductImageComponent = class StoreProductImageComponent {
    constructor(warehouseProductsRouter) {
        this.warehouseProductsRouter = warehouseProductsRouter;
    }
    addProduct() {
        const storeId = this.rowData.storeId;
        const productId = this.rowData.id;
        const disableImg = this.rowData.disableImg;
        if (storeId && productId && !disableImg) {
            this.warehouseProductsRouter.increaseCount(storeId, productId, 1);
        }
        else {
            console.warn("Can't add product.");
        }
    }
};
StoreProductImageComponent = __decorate([
    Component({
        templateUrl: './store-product-image.component.html',
    }),
    __metadata("design:paramtypes", [WarehouseProductsRouter])
], StoreProductImageComponent);
export { StoreProductImageComponent };
//# sourceMappingURL=store-product-image.component.js.map