import { __decorate, __metadata } from "tslib";
import { Component, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
import Warehouse from '@modules/server.common/entities/Warehouse';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
const SHOW_TOP_PRODUCTS_QUANTITY = 10;
let WarehouseProductsViewComponent = class WarehouseProductsViewComponent {
    constructor(warehouseProductsRouter, _productLocalesService, warehouseRouter, _router, toasterService) {
        this.warehouseProductsRouter = warehouseProductsRouter;
        this._productLocalesService = _productLocalesService;
        this.warehouseRouter = warehouseRouter;
        this._router = _router;
        this.toasterService = toasterService;
        this._ngDestroy$ = new Subject();
    }
    ngOnChanges() {
        this._getTopWarehouseProducts();
    }
    ngOnInit() {
        this._getTopWarehouseProducts();
    }
    removeProduct(warehouseProduct) {
        this.warehouse.products = this.warehouse.products.filter((p) => p.id !== warehouseProduct.id);
        this.warehouseRouter.save(this.warehouse);
    }
    editProduct(warehouseProduct) {
        this._router.navigate([
            '/products/list/' + warehouseProduct.product['id'] + '/edit',
        ]);
    }
    addProduct(warehouseProduct) {
        this.warehouseProductsRouter.increaseCount(this.warehouse.id, warehouseProduct.productId, 1);
        this.productTitle = this.localeTranslate(warehouseProduct.product['title']);
        this.toasterService.pop('info', `${this.productTitle} product amound increased!`);
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    _getTopWarehouseProducts() {
        const id = this.warehouse.id;
        const quantity = SHOW_TOP_PRODUCTS_QUANTITY;
        this.warehouseID = id;
        this.warehouseProductsRouter
            .getTopProducts(this.warehouseID, quantity)
            .pipe(takeUntil(this._ngDestroy$))
            .subscribe((products) => (this.topWarehouseProducts = products));
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Warehouse)
], WarehouseProductsViewComponent.prototype, "warehouse", void 0);
WarehouseProductsViewComponent = __decorate([
    Component({
        selector: 'ea-warehouse-products-view',
        styleUrls: ['./warehouse-products-view.component.scss'],
        templateUrl: './warehouse-products-view.component.html',
    }),
    __metadata("design:paramtypes", [WarehouseProductsRouter,
        ProductLocalesService,
        WarehouseRouter,
        Router,
        ToasterService])
], WarehouseProductsViewComponent);
export { WarehouseProductsViewComponent };
//# sourceMappingURL=warehouse-products-view.component.js.map