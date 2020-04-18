import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
import { ToasterService } from 'angular2-toaster';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
let StoreProductAmountComponent = class StoreProductAmountComponent {
    constructor(productLocalesService, toasterService, warehouseProductsRouter) {
        this.productLocalesService = productLocalesService;
        this.toasterService = toasterService;
        this.warehouseProductsRouter = warehouseProductsRouter;
    }
    ngOnInit() {
        this.productID = this.rowData.product.id;
        this.storeID = this.rowData.storeId;
        this.storeID = this.rowData.storeId;
        this.productAmount = this.value;
        this.productTitle = this.localeTranslate(this.rowData.product.title);
    }
    localeTranslate(member) {
        return this.productLocalesService.getTranslate(member);
    }
    addProduct() {
        this.loading = true;
        this.warehouseProductsRouter.increaseCount(this.storeID, this.productID, 1);
        this.toasterService.pop('info', `${this.productTitle} product amound increased!`);
    }
    removeProduct() {
        this.loading = true;
        this.warehouseProductsRouter.decreaseCount(this.storeID, this.productID, 1);
        this.toasterService.pop('info', `${this.productTitle} product amound decreased!`);
    }
};
StoreProductAmountComponent = __decorate([
    Component({
        styleUrls: ['store-product-amount.component.scss'],
        templateUrl: 'store-product-amount.component.html',
    }),
    __metadata("design:paramtypes", [ProductLocalesService,
        ToasterService,
        WarehouseProductsRouter])
], StoreProductAmountComponent);
export { StoreProductAmountComponent };
//# sourceMappingURL=store-product-amount.component.js.map