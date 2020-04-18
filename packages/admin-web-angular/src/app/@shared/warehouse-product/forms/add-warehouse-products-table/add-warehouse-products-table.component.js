import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { first, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { PriceCountInputComponent } from '../../../render-component/price-countInput/price-countInput.component';
import { TranslateService } from '@ngx-translate/core';
import { WarehouseRouter } from '@modules/client.common.angular2/routers/warehouse-router.service';
import { CheckboxComponent } from '@app/@shared/render-component/customer-orders-table/checkbox/checkbox.component';
let AddWarehouseProductsComponent = class AddWarehouseProductsComponent {
    constructor(_translateService, warehouseRouter) {
        this._translateService = _translateService;
        this.warehouseRouter = warehouseRouter;
        this.perPage = 5;
        this.sourceSmartTable = new LocalDataSource();
        this.ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this._loadSettingsSmartTable();
    }
    get allWarehouseProducts() {
        return [...this.warehouseProducts];
    }
    productsIsValid() {
        if (this.warehouseProducts) {
            const notRedy = this.warehouseProducts.filter((p) => !p.count ||
                !p.price ||
                (!p['isTakeaway'] && !p['isDeliveryRequired']))[0];
            return notRedy ? false : true;
        }
    }
    loadDataSmartTable(products, warehouseId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.warehouseProducts = products.map((p) => {
                return { product: p.id };
            });
            if (warehouseId) {
                this.warehouse = yield this.warehouseRouter
                    .get(warehouseId)
                    .pipe(first())
                    .toPromise();
                if (this.warehouseProducts) {
                    this.warehouseProducts.map((p) => {
                        p['isTakeaway'] = this.warehouse.productsTakeaway;
                        p['isDeliveryRequired'] = this.warehouse.productsDelivery;
                        if (!p['isTakeaway'] && !p['isDeliveryRequired']) {
                            p['isDeliveryRequired'] = true;
                        }
                    });
                }
            }
            const productsVM = products.map((product) => {
                const resObj = {
                    name: product.title,
                    id: product.id,
                    takeProductDelivery: this.warehouse.productsDelivery,
                    takeProductTakeaway: this.warehouse.productsTakeaway,
                };
                if (!resObj.takeProductDelivery && !resObj.takeProductTakeaway) {
                    resObj.takeProductDelivery = true;
                }
                return resObj;
            });
            this.sourceSmartTable.load(productsVM);
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'WAREHOUSE_VIEW.SAVE.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(getTranslate('PRODUCT_NAME'), getTranslate('PRICE'), getTranslate('COUNT'), getTranslate('DELIVERY'), getTranslate('TAKEAWAY'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([name, price, count, delivery, takeaway]) => {
            this.settingsSmartTable = {
                actions: false,
                hideSubHeader: true,
                columns: {
                    name: {
                        title: name,
                        filter: false,
                    },
                    price: {
                        title: price,
                        type: 'custom',
                        filter: false,
                        renderComponent: PriceCountInputComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.placeholder = price;
                            const id = yield instance.id
                                .pipe(first())
                                .toPromise();
                            const warehouseProd = this.warehouseProducts.filter((p) => p.product === id)[0];
                            instance.newValue
                                .pipe(takeUntil(this.ngDestroy$))
                                .subscribe((v) => {
                                warehouseProd['initialPrice'] = v;
                                warehouseProd['price'] = v;
                            });
                        }),
                    },
                    count: {
                        title: count,
                        type: 'custom',
                        filter: false,
                        renderComponent: PriceCountInputComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.placeholder = count;
                            const id = yield instance.id
                                .pipe(first())
                                .toPromise();
                            const warehouseProd = this.warehouseProducts.filter((p) => p.product === id)[0];
                            warehouseProd['count'] = 1;
                            instance.newValue
                                .pipe(takeUntil(this.ngDestroy$))
                                .subscribe((v) => {
                                warehouseProd['count'] = v;
                            });
                        }),
                    },
                    delivery: {
                        title: delivery,
                        type: 'custom',
                        filter: false,
                        renderComponent: CheckboxComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.type = 'delivery';
                            const id = yield instance.id
                                .pipe(first())
                                .toPromise();
                            const warehouseProd = this.warehouseProducts.filter((p) => p.product === id)[0];
                            instance.newValue
                                .pipe(takeUntil(this.ngDestroy$))
                                .subscribe((res) => {
                                if (res.type === 'delivery') {
                                    warehouseProd['isDeliveryRequired'] = res.checked;
                                }
                            });
                        }),
                    },
                    takeaway: {
                        title: takeaway,
                        type: 'custom',
                        filter: false,
                        renderComponent: CheckboxComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.type = 'takeaway';
                            const id = yield instance.id
                                .pipe(first())
                                .toPromise();
                            const warehouseProd = this.warehouseProducts.filter((p) => p.product === id)[0];
                            instance.newValue
                                .pipe(takeUntil(this.ngDestroy$))
                                .subscribe((res) => {
                                if (res.type === 'takeaway') {
                                    warehouseProd['isTakeaway'] =
                                        res.checked;
                                }
                            });
                        }),
                    },
                },
                pager: {
                    display: true,
                    perPage: this.perPage,
                },
            };
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], AddWarehouseProductsComponent.prototype, "boxShadow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AddWarehouseProductsComponent.prototype, "perPage", void 0);
AddWarehouseProductsComponent = __decorate([
    Component({
        selector: 'ea-add-warehouse-products-table',
        templateUrl: './add-warehouse-products-table.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService,
        WarehouseRouter])
], AddWarehouseProductsComponent);
export { AddWarehouseProductsComponent };
//# sourceMappingURL=add-warehouse-products-table.component.js.map