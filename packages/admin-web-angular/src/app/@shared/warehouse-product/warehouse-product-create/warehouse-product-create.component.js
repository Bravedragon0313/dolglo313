import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WarehouseAddChoiceComponent } from '../forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BasicInfoFormComponent } from '../../product/forms';
import { ProductsTableComponent } from '../../product/forms/products-table';
import { ProductsService } from '../../../@core/data/products.service';
import { AddWarehouseProductsComponent } from '../forms/add-warehouse-products-table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehousesService } from '../../../@core/data/warehouses.service';
import { WizardComponent } from 'angular2-wizard';
import { TranslateService } from '@ngx-translate/core';
import { NbThemeService } from '@nebular/theme';
import { ProductsCategoryService } from '@app/@core/data/productsCategory.service';
import { NotifyService } from '@app/@core/services/notify/notify.service';
const perPage = 3;
let WarehouseProductCreateComponent = class WarehouseProductCreateComponent {
    constructor(_formBuilder, _productsService, _warehousesService, _activeModal, _translateService, _themeService, _productsCategoryService, _notifyService) {
        this._formBuilder = _formBuilder;
        this._productsService = _productsService;
        this._warehousesService = _warehousesService;
        this._activeModal = _activeModal;
        this._translateService = _translateService;
        this._themeService = _themeService;
        this._productsCategoryService = _productsCategoryService;
        this._notifyService = _notifyService;
        this.currentThemeCosmic = false;
        this.BUTTON_DONE = 'BUTTON_DONE';
        this.BUTTON_NEXT = 'BUTTON_NEXT';
        this.BUTTON_PREV = 'BUTTON_PREV';
        this.hasSelectedProducts = () => false;
        this.validAllProducts = () => false;
        this.form = this._formBuilder.group({
            basicInfo: BasicInfoFormComponent.buildForm(this._formBuilder),
        });
        this.basicInfo = this.form.get('basicInfo');
        this.ngDestroy$ = new Subject();
        this.createdProducts = [];
        this.selectedProducts = [];
        this.perPage = perPage;
        this.loadProductCategories();
        this.checkCurrentTheme();
    }
    ngOnInit() {
        this.wizzardFromStep1.showNext = false;
        this.warehouseAddChoice.choice
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((res) => __awaiter(this, void 0, void 0, function* () {
            this.choiced = res;
        }));
    }
    checkCurrentTheme() {
        if (this._themeService.currentTheme === 'cosmic') {
            this.currentThemeCosmic = true;
        }
    }
    get buttonDone() {
        return this._translate(this.BUTTON_DONE);
    }
    get buttonNext() {
        return this._translate(this.BUTTON_NEXT);
    }
    get buttonPrevious() {
        return this._translate(this.BUTTON_PREV);
    }
    get hasCoiced() {
        return this.choiced;
    }
    get isValidBasicInfoForm() {
        return this.basicInfo && this.basicInfo.valid && this.isSetp2;
    }
    addProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            try {
                const productsForAdd = this.addWarehouseProductsTable
                    .allWarehouseProducts;
                const res = yield this._warehousesService
                    .addProducts(this.warehouseId, productsForAdd)
                    .pipe(first())
                    .toPromise();
                this.loading = false;
                const message = `${productsForAdd.length} products was added`;
                this._notifyService.success(message);
                this.cancel();
            }
            catch (error) {
                let message = `Something went wrong`;
                if (error.message === 'Validation error') {
                    message = error.message;
                }
                this.loading = false;
                this._notifyService.error(message);
                this.cancel();
            }
        });
    }
    onStep1Next() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isSetp2 = true;
            if (this.choiced === 'existing') {
                this.hasSelectedProducts = () => {
                    if (this.productsTable) {
                        return this.productsTable.hasSelectedProducts;
                    }
                    return false;
                };
                if (this.$productsTablePagesChanges) {
                    this.$productsTablePagesChanges.unsubscribe();
                }
                const loadDataSmartTable = (page = 1) => __awaiter(this, void 0, void 0, function* () {
                    let existedProductsIds = this.selectedWarehouse.products.map((product) => product.productId);
                    if (this.createdProducts) {
                        for (const product of this.createdProducts) {
                            existedProductsIds.push(product.id);
                        }
                    }
                    let products = yield this._productsService
                        .getProducts({
                        skip: perPage * (page - 1),
                        limit: perPage,
                    }, existedProductsIds)
                        .pipe(first())
                        .toPromise();
                    const dataCount = yield this.getDataCount(existedProductsIds);
                    this.productsTable.loadDataSmartTable(products, dataCount, page);
                });
                if (this.productsTable) {
                    this.$productsTablePagesChanges = this.productsTable.pagesChanges$
                        .pipe(takeUntil(this.ngDestroy$))
                        .subscribe((page) => {
                        loadDataSmartTable(page);
                    });
                }
                yield loadDataSmartTable();
            }
        });
    }
    selectedChoice() {
        if (this.choiced) {
            this.onStep1Next();
            this.wizzardFrom.next();
        }
    }
    onStep2Next() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isSetp2 = false;
            if (this.choiced === 'new') {
                if (this.basicInfo.valid) {
                    const productCreateObject = yield this.basicInfoForm.setupProductCreateObject();
                    const product = yield this._productsService
                        .create(productCreateObject)
                        .pipe(first())
                        .toPromise();
                    this.createdProducts.push(product);
                    const message = `Product ${productCreateObject.title[0].value} is created`;
                    this._notifyService.success(message);
                }
            }
            else {
                this.selectedProducts = this.productsTable.selectedProducts;
            }
            const newCreatedProducts = this.createdProducts.map((p) => {
                return {
                    id: p.id,
                    title: p.title[0].value,
                };
            });
            this.addWarehouseProductsTable.loadDataSmartTable([...newCreatedProducts, ...this.selectedProducts], this.warehouseId);
            this.validAllProducts = () => this.addWarehouseProductsTable.productsIsValid();
        });
    }
    onStep2Prev() {
        if (this.choiced === 'existing') {
            this.selectedProducts = [];
            this.hasSelectedProducts = () => true;
        }
        this.choiced = null;
    }
    onStep3Prev() {
        this.isSetp2 = true;
    }
    loadProductCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            this.productsCategories = yield this._productsCategoryService
                .getCategories()
                .pipe(first())
                .toPromise();
        });
    }
    cancel() {
        this._activeModal.dismiss('canceled');
    }
    getDataCount(existedProductsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._productsService.getCountOfProducts(existedProductsIds);
        });
    }
    _translate(key) {
        let translationResult = '';
        this._translateService.get(key).subscribe((res) => {
            translationResult = res;
        });
        return translationResult;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
__decorate([
    ViewChild('warehouseAddChoice', { static: true }),
    __metadata("design:type", WarehouseAddChoiceComponent)
], WarehouseProductCreateComponent.prototype, "warehouseAddChoice", void 0);
__decorate([
    ViewChild('basicInfoForm'),
    __metadata("design:type", BasicInfoFormComponent)
], WarehouseProductCreateComponent.prototype, "basicInfoForm", void 0);
__decorate([
    ViewChild('productsTable'),
    __metadata("design:type", ProductsTableComponent)
], WarehouseProductCreateComponent.prototype, "productsTable", void 0);
__decorate([
    ViewChild('addWarehouseProductsTable'),
    __metadata("design:type", AddWarehouseProductsComponent)
], WarehouseProductCreateComponent.prototype, "addWarehouseProductsTable", void 0);
__decorate([
    ViewChild('wizzardFrom'),
    __metadata("design:type", WizardComponent)
], WarehouseProductCreateComponent.prototype, "wizzardFrom", void 0);
__decorate([
    ViewChild('wizzardFromStep1', { static: true }),
    __metadata("design:type", Object)
], WarehouseProductCreateComponent.prototype, "wizzardFromStep1", void 0);
WarehouseProductCreateComponent = __decorate([
    Component({
        selector: 'ea-warehouse-product-create',
        templateUrl: './warehouse-product-create.component.html',
        styleUrls: ['./warehouse-product-create.component.scss'],
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ProductsService,
        WarehousesService,
        NgbActiveModal,
        TranslateService,
        NbThemeService,
        ProductsCategoryService,
        NotifyService])
], WarehouseProductCreateComponent);
export { WarehouseProductCreateComponent };
//# sourceMappingURL=warehouse-product-create.component.js.map