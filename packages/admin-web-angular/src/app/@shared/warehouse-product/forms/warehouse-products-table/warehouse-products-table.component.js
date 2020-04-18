import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input, } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StoreProductPriceComponent } from '@app/@shared/render-component/store-products-table/store-product-price.component';
import { StoreProductAmountComponent } from '@app/@shared/render-component/store-products-table/store-product-amount/store-product-amount.component';
import { ProductCategoriesComponent } from '@app/@shared/render-component/product-categories/product-categories';
import { ProductTitleRedirectComponent } from '@app/@shared/render-component/product-title-redirect/product-title-redirect.component';
import { forkJoin, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { ProductsCategoryService } from '@app/@core/data/productsCategory.service';
import { StoreProductImageComponent } from '@app/@shared/render-component/store-products-table/store-product-image/store-product-image.component';
let WarehouseProductsComponent = class WarehouseProductsComponent {
    constructor(_translateService, _productLocalesService, _productsCategoryService) {
        this._translateService = _translateService;
        this._productLocalesService = _productLocalesService;
        this._productsCategoryService = _productsCategoryService;
        this.onEdit = new EventEmitter();
        this.onDelete = new EventEmitter();
        this.perPage = 5;
        this.selectMode = 'multi';
        this.sourceSmartTable = new LocalDataSource();
        this.selectedProducts = [];
        this.ngDestroy$ = new Subject();
        this.categoriesInfo = [];
    }
    get hasSelectedProducts() {
        return this.selectedProducts.length > 0;
    }
    ngOnInit() {
        this._getCategories();
        this._loadSettingsSmartTable();
        this._applyTranslationOnSmartTable();
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    loadDataSmartTable(products, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsVM = products.map((product) => {
                return {
                    id: product.productId,
                    image: this._productLocalesService.getTranslate(product.product['images']),
                    title: this._productLocalesService.getTranslate(product.product['title']),
                    description: this._productLocalesService.getTranslate(product.product['description']),
                    details: this._productLocalesService.getTranslate(product.product['details']),
                    categories: {
                        ids: product.product['categories'],
                        search: this.categoriesInfo &&
                            this.categoriesInfo
                                .filter((c) => product.product['categories'].includes(c.id))
                                .map((c) => this._productLocalesService.getTranslate(c.name))
                                .toString(),
                    },
                    price: product.price,
                    qty: product.count,
                    storeId,
                    product: product.product,
                    allCategories: this.categoriesInfo,
                };
            });
            this.sourceSmartTable.load(productsVM);
        });
    }
    selectProductTmp(ev) {
        this.selectedProducts = ev.selected;
    }
    _getCategories() {
        this._productsCategoryService
            .getCategories()
            .subscribe((categories) => {
            this.categoriesInfo = categories;
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'WAREHOUSE_VIEW.PRODUCTS_TAB.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('IMAGE'), getTranslate('TITLE'), getTranslate('DESCRIPTION'), getTranslate('DETAILS'), getTranslate('CATEGORY'), getTranslate('PRICE'), getTranslate('QUANTITY'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, image, titleTr, description, details, category, price, quantity,]) => {
            this.settingsSmartTable = {
                mode: 'external',
                actions: {
                    add: false,
                    position: 'left',
                },
                edit: {
                    editButtonContent: '<i class="ion-md-create"></i>',
                },
                delete: {
                    deleteButtonContent: '<i class="ion-md-trash"></i>',
                    confirmDelete: true,
                },
                selectMode: this.selectMode,
                columns: {
                    image: {
                        title: image,
                        type: 'custom',
                        class: 'text-center',
                        renderComponent: StoreProductImageComponent,
                        filter: false,
                    },
                    title: {
                        title: titleTr,
                        type: 'custom',
                        renderComponent: ProductTitleRedirectComponent,
                    },
                    description: { title: description },
                    details: { title: details },
                    categories: {
                        title: category,
                        type: 'custom',
                        renderComponent: ProductCategoriesComponent,
                        filterFunction(cell, search) {
                            if (cell.search.includes(search)) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                    },
                    price: {
                        title: price,
                        type: 'custom',
                        renderComponent: StoreProductPriceComponent,
                    },
                    qty: {
                        title: quantity,
                        class: 'text-center',
                        type: 'custom',
                        renderComponent: StoreProductAmountComponent,
                    },
                },
                pager: {
                    display: true,
                    perPage: this.perPage,
                },
            };
        });
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._loadSettingsSmartTable();
        });
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], WarehouseProductsComponent.prototype, "onEdit", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WarehouseProductsComponent.prototype, "onDelete", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], WarehouseProductsComponent.prototype, "perPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], WarehouseProductsComponent.prototype, "selectMode", void 0);
WarehouseProductsComponent = __decorate([
    Component({
        selector: 'ea-warehouse-products-table',
        templateUrl: './warehouse-products-table.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService,
        ProductLocalesService,
        ProductsCategoryService])
], WarehouseProductsComponent);
export { WarehouseProductsComponent };
//# sourceMappingURL=warehouse-products-table.component.js.map