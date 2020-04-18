var ProductsTableComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsService } from '../../../../@core/data/products.service';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { ProductCategoriesComponent } from '../../../render-component/product-categories/product-categories';
import { ProductsCategoryService } from '../../../../@core/data/productsCategory.service';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfimationModalComponent } from '../../../confirmation-modal/confirmation-modal.component';
import { ProductCheckboxComponent } from '@app/@shared/render-component/product-checkbox/product-checkbox';
import { ProductTitleComponent } from '@app/@shared/render-component/product-title/product-title.component';
import { ProductImageComponent } from '@app/@shared/render-component/product-image/product-image.component';
let ProductsTableComponent = ProductsTableComponent_1 = class ProductsTableComponent {
    constructor(_sanitizer, _productsService, _router, _translateService, _productLocalesService, _productsCategoryService, _notifyService, modalService) {
        this._sanitizer = _sanitizer;
        this._productsService = _productsService;
        this._router = _router;
        this._translateService = _translateService;
        this._productLocalesService = _productLocalesService;
        this._productsCategoryService = _productsCategoryService;
        this._notifyService = _notifyService;
        this.modalService = modalService;
        this.sourceSmartTable = new LocalDataSource();
        this.selectProducts$ = new EventEmitter();
        this.pagesChanges$ = new EventEmitter();
        this.perPage = 0;
        this._selectedProducts = [];
        this.ngDestroy$ = new Subject();
    }
    ngOnInit() {
        this.getCategories();
        this._loadSettingsSmartTable();
        this._applyTranslationOnSmartTable();
        this.smartTableChange();
    }
    edit(event) {
        this._router.navigate(['/products/list/' + event.data.id + '/edit']);
    }
    deleteProduct(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeModal = this.modalService.open(ConfimationModalComponent, {
                size: 'sm',
                container: 'nb-layout',
                backdrop: 'static',
            });
            const modalComponent = activeModal.componentInstance;
            this.confirmSub$ = yield modalComponent.confirmEvent
                .pipe(takeUntil(modalComponent.ngDestroy$))
                .subscribe((dataEvent) => {
                try {
                    this.loading = true;
                    const productTitle = event.data.title || ProductsTableComponent_1.noInfoSign;
                    this._productsService
                        .removeByIds([event.data.id])
                        .pipe(first())
                        .toPromise();
                    this.loading = false;
                    const message = `Product ${productTitle} is deleted`;
                    this._notifyService.success(message);
                }
                catch (error) {
                    let message = `Something went wrong`;
                    if (error.message === 'Validation error') {
                        message = error.message;
                    }
                    this.loading = false;
                    this._notifyService.error(message);
                }
                modalComponent.cancel();
            });
        });
    }
    get hasSelectedProducts() {
        return this._selectedProducts.length > 0;
    }
    get selectedProducts() {
        return [...this._selectedProducts];
    }
    set selectedProducts(products) {
        this._selectedProducts = products;
    }
    getCategories() {
        this._productsCategoryService
            .getCategories()
            .subscribe((categories) => {
            this.categoriesInfo = categories;
            this.loadDataSmartTable(this.products || [], this.dataCount || 0);
        });
    }
    selectProductTmp(ev) {
        if (ev.data) {
            this.selectProducts$.emit({
                current: ev.data,
                allData: ev.source.data,
            });
        }
    }
    loadDataSmartTable(products, dataCount, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataCount = dataCount;
            this.products = products;
            let productsVM = products.map((product) => {
                return {
                    checked: this.selectedProducts.find((d) => d.id === product['id']),
                    title: this.localeTranslate(product.title) ||
                        ProductsTableComponent_1.noInfoSign,
                    description: this.localeTranslate(product.description) ||
                        ProductsTableComponent_1.noInfoSign,
                    details: product.details[0]
                        ? this.localeTranslate(product.details) ||
                            ProductsTableComponent_1.noInfoSign
                        : ProductsTableComponent_1.noInfoSign,
                    categories: {
                        ids: product.categories,
                        search: this.categoriesInfo &&
                            this.categoriesInfo
                                .filter((c) => product.categories.includes(c.id))
                                .map((c) => this._productLocalesService.getTranslate(c.name))
                                .toString(),
                    },
                    image: this.localeTranslate(product.images) ||
                        ProductsTableComponent_1.noInfoSign,
                    id: product.id,
                    allCategories: this.categoriesInfo,
                };
            });
            productsVM = productsVM.filter((p) => p);
            if (this.$subSlectProducts) {
                this.$subSlectProducts.unsubscribe();
            }
            this.$subSlectProducts = this.selectProducts$
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe(({ current, allData }) => {
                allData.find((d) => d && d.id === current['id'])['checked'] = !current.checked;
                if (current.checked) {
                    this._selectedProducts.push(current);
                }
                else {
                    this._selectedProducts = this._selectedProducts.filter((p) => p.id !== current.id);
                }
                this.sourceSmartTable.load(allData);
            });
            const productsData = new Array(dataCount);
            productsData.splice(this.perPage * (page - 1), this.perPage, ...productsVM);
            this.sourceSmartTable.load(productsData);
        });
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    smartTableChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sourceSmartTable
                .onChanged()
                .pipe(takeUntil(this.ngDestroy$))
                .subscribe((event) => __awaiter(this, void 0, void 0, function* () {
                if (event.action === 'page') {
                    const page = event.paging.page;
                    this.pagesChanges$.emit(page);
                }
            }));
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'WAREHOUSE_VIEW.SELECT_PRODUCTS.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(this._translateService.get('Id'), getTranslate('TITLE'), getTranslate('DESCRIPTION'), getTranslate('DETAILS'), getTranslate('IMAGES'), getTranslate('CATEGORY'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([id, name, description, details, images, category]) => {
            this.settingsSmartTable = {
                actions: !this.hiddenTableActions && {
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
                mode: 'external',
                columns: {
                    checkbox: {
                        title: '',
                        filter: false,
                        type: 'custom',
                        renderComponent: ProductCheckboxComponent,
                    },
                    title: {
                        title: name,
                        type: 'custom',
                        renderComponent: ProductTitleComponent,
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
                    images: {
                        title: images,
                        type: 'custom',
                        renderComponent: ProductImageComponent,
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
        this._translateService.onLangChange
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((res) => {
            this._loadSettingsSmartTable();
            this.loadDataSmartTable(this.products || [], this.dataCount || 0);
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
ProductsTableComponent.noInfoSign = '';
__decorate([
    Input(),
    __metadata("design:type", Number)
], ProductsTableComponent.prototype, "perPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ProductsTableComponent.prototype, "hiddenTableActions", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ProductsTableComponent.prototype, "boxShadow", void 0);
ProductsTableComponent = ProductsTableComponent_1 = __decorate([
    Component({
        selector: 'ea-products-table',
        styleUrls: ['./products-table.component.scss'],
        templateUrl: 'products-table.component.html',
    }),
    __metadata("design:paramtypes", [DomSanitizer,
        ProductsService,
        Router,
        TranslateService,
        ProductLocalesService,
        ProductsCategoryService,
        NotifyService,
        NgbModal])
], ProductsTableComponent);
export { ProductsTableComponent };
//# sourceMappingURL=products-table.component.js.map