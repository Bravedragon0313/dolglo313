import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Output, EventEmitter, Input, } from '@angular/core';
import { SetupMerchantProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { SetupMerchantAddProductsComponent } from './add-products/add-products.component';
import { WarehouseProductsRouter } from '@modules/client.common.angular2/routers/warehouse-products-router.service';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { WarehouseProductsComponent } from '@app/@shared/warehouse-product/forms/warehouse-products-table';
import { SetupMerchantProductMutationComponent } from './product-mutation/product-mutation.component';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { Router } from '@angular/router';
let SetupMerchantProductsComponent = class SetupMerchantProductsComponent {
    constructor(warehouseProductsRouter, warehouseRouter, notifyService, router) {
        this.warehouseProductsRouter = warehouseProductsRouter;
        this.warehouseRouter = warehouseRouter;
        this.notifyService = notifyService;
        this.router = router;
        this.previousStep = new EventEmitter();
        this.nextStep = new EventEmitter();
        this.componentViews = {
            main: 'main',
            productsTable: 'productsTable',
            createProduct: 'createProduct',
            editProduct: 'editProduct',
            addProducts: 'addProducts',
        };
        this.productsPerPage = 3;
        this.showProductsTable = false;
        this.productsForAdd = [];
        this._currentView = this.componentViews.main;
        this._prevView = this.componentViews.main;
        this._ngDestroy$ = new Subject();
    }
    get haveProductsForAdd() {
        let hasSelectedCarriers = false;
        if (this.productsCatalog) {
            hasSelectedCarriers = this.productsCatalog.productsTable
                .hasSelectedProducts;
        }
        return hasSelectedCarriers;
    }
    get currentView() {
        return this._currentView;
    }
    set currentView(view) {
        this._prevView = this.currentView;
        this._currentView = view;
    }
    get existedProductsIds() {
        let ids = [];
        if (this.storeProducts) {
            ids = this.storeProducts.map((p) => p.productId);
        }
        return ids;
    }
    select(products) {
        this.productsForAdd = products;
        this.currentView = this.componentViews.addProducts;
    }
    back() {
        if (this.currentView === this.componentViews.addProducts) {
            this.currentView = this._prevView;
            return;
        }
        this.currentProduct = null;
        this.currentView = this.componentViews.main;
    }
    editProduct({ data }) {
        this.currentProduct = data.product;
        this.currentView = this.componentViews.editProduct;
    }
    removeProduct({ data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.storeId) {
                    const store = yield this.warehouseRouter
                        .get(this.storeId, true)
                        .pipe(first())
                        .toPromise();
                    store.products = store.products.filter((p) => p.productId !== data.id);
                    yield this.warehouseRouter.save(store);
                }
                else {
                    throw new Error("Store id don't exist");
                }
            }
            catch (error) {
                const message = `Can't remove products error: ${error.message}`;
                this.notifyService.error(message);
            }
        });
    }
    loadProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storeId) {
                if (this.products$) {
                    yield this.products$.unsubscribe();
                }
                this.products$ = this.warehouseProductsRouter
                    .get(this.storeId)
                    .pipe(takeUntil(this._ngDestroy$))
                    .subscribe((products) => {
                    this.showProductsTable = products.length > 0;
                    this.productsTable.loadDataSmartTable(products, this.storeId);
                    this.storeProducts = products;
                });
            }
        });
    }
    updateMain() {
        this.currentProduct = null;
        this.currentView = this.componentViews.main;
        this.loadProducts();
    }
    finish() {
        this.nextStep.emit();
        this.router.navigateByUrl('/setup');
    }
    ngOnChanges() {
        this.loadProducts();
    }
    ngOnDestroy() {
        this._ngDestroy$.next();
        this._ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('productsCatalog'),
    __metadata("design:type", SetupMerchantProductsCatalogComponent)
], SetupMerchantProductsComponent.prototype, "productsCatalog", void 0);
__decorate([
    ViewChild('addProducts'),
    __metadata("design:type", SetupMerchantAddProductsComponent)
], SetupMerchantProductsComponent.prototype, "addProducts", void 0);
__decorate([
    ViewChild('productsTable'),
    __metadata("design:type", WarehouseProductsComponent)
], SetupMerchantProductsComponent.prototype, "productsTable", void 0);
__decorate([
    ViewChild('productMutation'),
    __metadata("design:type", SetupMerchantProductMutationComponent)
], SetupMerchantProductsComponent.prototype, "productMutation", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantProductsComponent.prototype, "previousStep", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SetupMerchantProductsComponent.prototype, "nextStep", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SetupMerchantProductsComponent.prototype, "storeId", void 0);
SetupMerchantProductsComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.scss'],
    }),
    __metadata("design:paramtypes", [WarehouseProductsRouter,
        WarehouseRouter,
        NotifyService,
        Router])
], SetupMerchantProductsComponent);
export { SetupMerchantProductsComponent };
//# sourceMappingURL=products.component.js.map