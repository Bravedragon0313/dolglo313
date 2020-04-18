import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { takeUntil, first } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsService } from '../../@core/data/products.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCreateComponent } from '../../@shared/product/product-create';
import { ProductsTableComponent } from '../../@shared/product/forms/products-table';
import { ProductsCategoryService } from '../../@core/data/productsCategory.service';
import { NotifyService } from '@app/@core/services/notify/notify.service';
const perPage = 5;
let ProductsComponent = class ProductsComponent {
    constructor(_productsService, modalService, productsCategoryService, _notifyService) {
        this._productsService = _productsService;
        this.modalService = modalService;
        this.productsCategoryService = productsCategoryService;
        this._notifyService = _notifyService;
        this.sourceSmartTable = new LocalDataSource();
        this.ngDestroy$ = new Subject();
        this.perPage = perPage;
        this.getCategories();
    }
    ngAfterViewInit() {
        this._loadDataSmartTable();
        if (this.productsTable) {
            this.productsTable.pagesChanges$
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((page) => {
                this._loadDataSmartTable(page);
            });
        }
    }
    openWizardNewProduct() {
        const activeModal = this.modalService.open(ProductCreateComponent, {
            size: 'lg',
            container: 'nb-layout',
            backdrop: 'static',
        });
        const modalComponent = activeModal.componentInstance;
        modalComponent.productsCategories = this.productsCategories;
    }
    deleteSelectedRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const idsForDelete = this.productsTable.selectedProducts.map((c) => c.id);
            try {
                this.loading = true;
                yield this._productsService
                    .removeByIds(idsForDelete)
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `${idsForDelete.length} products was deleted!`;
                this._notifyService.success(message);
                this.productsTable.selectedProducts = [];
            }
            catch (error) {
                this.loading = false;
                const message = `Something went wrong!`;
                this._notifyService.error(message);
                this.productsTable.selectedProducts = [];
            }
        });
    }
    get hasSelectedProducts() {
        return this.productsTable.hasSelectedProducts;
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            this.productsCategories = yield this.productsCategoryService
                .getCategories()
                .pipe(first())
                .toPromise();
        });
    }
    _loadDataSmartTable(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = [];
            if (this.$products) {
                yield this.$products.unsubscribe();
            }
            this.$products = this._productsService
                .getProducts({
                skip: perPage * (page - 1),
                limit: perPage,
            })
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((p) => __awaiter(this, void 0, void 0, function* () {
                this.productsTable.perPage = perPage;
                const dataCount = yield this.getDataCount();
                products = p;
                this.productsTable.loadDataSmartTable(products, dataCount, page);
            }));
        });
    }
    getDataCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._productsService.getCountOfProducts();
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('productsTable', { static: true }),
    __metadata("design:type", ProductsTableComponent)
], ProductsComponent.prototype, "productsTable", void 0);
ProductsComponent = __decorate([
    Component({
        selector: 'ea-products',
        templateUrl: './products.component.html',
        styleUrls: ['/products.component.scss'],
    }),
    __metadata("design:paramtypes", [ProductsService,
        NgbModal,
        ProductsCategoryService,
        NotifyService])
], ProductsComponent);
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map