import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { ProductsTableComponent } from '@app/@shared/product/forms/products-table';
import { first, takeUntil } from 'rxjs/operators';
import { ProductsService } from '@app/@core/data/products.service';
import { Subject } from 'rxjs';
let SetupMerchantProductsCatalogComponent = class SetupMerchantProductsCatalogComponent {
    constructor(productsService) {
        this.productsService = productsService;
        this.perPage = 3;
        this.ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this.loadData();
        this.smartTablePageChange();
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    loadData(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield this.productsService
                .getProducts({
                skip: this.perPage * (page - 1),
                limit: this.perPage,
            }, this.existedProductsIds)
                .pipe(first())
                .toPromise();
            const dataCount = yield this.getDataCount(this.existedProductsIds);
            this.productsTable.loadDataSmartTable(products, dataCount, page);
        });
    }
    smartTablePageChange() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.productsTable) {
                this.productsTable.pagesChanges$
                    .pipe(takeUntil(this.ngDestroy$))
                    .subscribe((page) => {
                    this.loadData(page);
                });
            }
        });
    }
    getDataCount(existedProductsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsService.getCountOfProducts(existedProductsIds);
        });
    }
};
__decorate([
    ViewChild('productsTable', { static: true }),
    __metadata("design:type", ProductsTableComponent)
], SetupMerchantProductsCatalogComponent.prototype, "productsTable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SetupMerchantProductsCatalogComponent.prototype, "existedProductsIds", void 0);
SetupMerchantProductsCatalogComponent = __decorate([
    Component({
        selector: 'ea-merchants-setup-products-catalog',
        templateUrl: './products-catalog.component.html',
    }),
    __metadata("design:paramtypes", [ProductsService])
], SetupMerchantProductsCatalogComponent);
export { SetupMerchantProductsCatalogComponent };
//# sourceMappingURL=products-catalog.component.js.map