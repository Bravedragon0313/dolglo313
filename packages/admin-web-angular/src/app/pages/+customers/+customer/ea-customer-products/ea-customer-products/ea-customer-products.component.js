import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { UserRouter } from '@modules/client.common.angular2/routers/user-router.service';
import { first, takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { WarehousesService } from '../../../../../@core/data/warehouses.service';
import { ProductOrderProductsComponent } from '../../../../../@shared/render-component/customer-products-table/product-order-products/product-order-products.component';
import { StoreOrderProductsComponent } from '../../../../../@shared/render-component/customer-products-table/store-order-products/store-order-products.component';
import { OrderBtnOrderProductsComponent } from '../../../../../@shared/render-component/customer-products-table/order-btn-order-products/order-btn-order-products.component';
import { GeoLocationService } from '../../../../../@core/data/geo-location.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
let CustomerProductsComponent = class CustomerProductsComponent {
    constructor(geoLocationProductService, userRouter, _router, _sanitizer, _warehousesService, _translateService) {
        this.geoLocationProductService = geoLocationProductService;
        this.userRouter = userRouter;
        this._router = _router;
        this._sanitizer = _sanitizer;
        this._warehousesService = _warehousesService;
        this._translateService = _translateService;
        this.ngDestroy$ = new Subject();
        this.sourceSmartTable = new LocalDataSource();
        this.params$ = this._router.params.subscribe((res) => __awaiter(this, void 0, void 0, function* () {
            this.userId = res.id;
            const user = yield this.userRouter
                .get(this.userId)
                .pipe(first())
                .toPromise();
            if (user == null) {
                throw new Error(`User can't be found (id: ${this.userId})`);
            }
            this.availableProductsSubscription$ = this.geoLocationProductService
                .getGeoLocationProducts(user.geoLocation)
                .subscribe((products) => {
                this.availableProducts = products;
                this.sourceSmartTable.load(products);
            });
        }));
        this._applyTranslationOnSmartTable();
    }
    ngOnInit() {
        this._setupSmartTable();
        this._loadWarehouses();
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._setupSmartTable();
        });
    }
    _setupSmartTable() {
        const columnTitlePrefix = 'CUSTOMERS_VIEW.SMART_TABLE_COLUMNS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('PRODUCT'), getTranslate('PRICE'), getTranslate('STORE'), getTranslate('AVAILABLE_COUNT'), getTranslate('ORDER'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, prod, price, store, availableCount, order]) => {
            this.settingsSmartTable = {
                actions: false,
                columns: {
                    Product: {
                        title: prod,
                        type: 'custom',
                        renderComponent: ProductOrderProductsComponent,
                    },
                    Price: {
                        title: price,
                        type: 'html',
                        valuePrepareFunction: (val, product) => {
                            return this._sanitizer.bypassSecurityTrustHtml(`<div class="product">
											<p>${product.warehouseProduct.price}</p>
										</div>
									</div>`);
                        },
                    },
                    Store: {
                        title: store,
                        type: 'custom',
                        renderComponent: StoreOrderProductsComponent,
                    },
                    AvailableCount: {
                        title: availableCount,
                        type: 'html',
                        valuePrepareFunction: (val, product) => {
                            return this._sanitizer.bypassSecurityTrustHtml(`<div class="product">
											<p>${product.warehouseProduct.count}</p>
										</div>
									</div>`);
                        },
                    },
                    Order: {
                        title: order,
                        type: 'custom',
                        renderComponent: OrderBtnOrderProductsComponent,
                        onComponentInitFunction: (instance) => __awaiter(this, void 0, void 0, function* () {
                            instance.userId = this.userId;
                            instance.availableProducts = this.availableProducts;
                        }),
                    },
                },
                pager: {
                    display: true,
                    perPage: 3,
                },
            };
        });
    }
    _loadWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            this.warehouses = yield this._warehousesService
                .getStores()
                .pipe(first())
                .toPromise();
        });
    }
    ngOnDestroy() {
        if (this.params$) {
            this.params$.unsubscribe();
        }
        if (this.availableProductsSubscription$) {
            this.availableProductsSubscription$.unsubscribe();
        }
    }
};
CustomerProductsComponent = __decorate([
    Component({
        selector: 'ea-customer-products',
        styleUrls: ['./ea-customer-products.scss'],
        templateUrl: './ea-customer-products.component.html',
    }),
    __metadata("design:paramtypes", [GeoLocationService,
        UserRouter,
        ActivatedRoute,
        DomSanitizer,
        WarehousesService,
        TranslateService])
], CustomerProductsComponent);
export { CustomerProductsComponent };
//# sourceMappingURL=ea-customer-products.component.js.map