var CategoriesTableComponent_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsCategoryService } from '@app/@core/data/productsCategory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryEditComponent } from '../category-edit';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductLocalesService } from '@modules/client.common.angular2/locale/product-locales.service';
import { NotifyService } from '@app/@core/services/notify/notify.service';
import { ConfimationModalComponent } from '@app/@shared/confirmation-modal/confirmation-modal.component';
import { CategoryImageComponent } from './category-image.component';
let CategoriesTableComponent = CategoriesTableComponent_1 = class CategoriesTableComponent {
    constructor(_translateService, _productsCategoryService, _productLocalesService, _modalService, _notifyService, modalService) {
        this._translateService = _translateService;
        this._productsCategoryService = _productsCategoryService;
        this._productLocalesService = _productLocalesService;
        this._modalService = _modalService;
        this._notifyService = _notifyService;
        this.modalService = modalService;
        this.selectMode = 'multi';
        this.showPerPage = 7;
        this.editWithModal = true;
        this.editRow = new EventEmitter();
        this.deleteRow = new EventEmitter();
        this.productsCategories = [];
        this.sourceSmartTable = new LocalDataSource();
        this._selectedCategories = [];
        this.ngDestroy$ = new Subject();
        this._translateService.setDefaultLang('en');
        this._translateService.use('en');
    }
    get hasSelectedCategories() {
        return this._selectedCategories.length > 0;
    }
    get selectedCategories() {
        return [...this._selectedCategories];
    }
    ngOnInit() {
        this._loadSettingsSmartTable();
        this._applyTranslationOnSmartTable();
    }
    edit(ev) {
        if (this.editWithModal) {
            const activeModal = this._modalService.open(CategoryEditComponent, {
                size: 'lg',
                container: 'nb-layout',
                backdrop: 'static',
            });
            const modalComponent = activeModal.componentInstance;
            modalComponent.currentCategory = ev.data;
        }
        else {
            this.editRow.emit(ev.data);
        }
    }
    deleteCategory(e) {
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
                const idsArray = [];
                idsArray.push(e.data.id);
                try {
                    this.loading = true;
                    this._productsCategoryService
                        .removeByIds(idsArray)
                        .pipe()
                        .toPromise();
                    this.loading = false;
                    const message = `Category '${e.data.title}' deleted`;
                    this._notifyService.success(message);
                    this.deleteRow.emit(e.data);
                }
                catch (error) {
                    this.loading = false;
                    const message = `Something went wrong!`;
                    this._notifyService.error(message);
                }
                modalComponent.cancel();
            });
        });
    }
    selectCategoryTmp(ev) {
        this._selectedCategories = ev.selected;
    }
    loadDataSmartTable(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            this.productsCategories = categories;
            const categoriesVM = categories.map((category) => {
                return {
                    id: category.id,
                    title: this.localeTranslate(category.name) ||
                        CategoriesTableComponent_1.noInfoSign,
                    image: category.image,
                    _nameLocaleValues: category.name,
                };
            });
            this.sourceSmartTable.load(categoriesVM);
        });
    }
    localeTranslate(member) {
        return this._productLocalesService.getTranslate(member);
    }
    _applyTranslationOnSmartTable() {
        this._translateService.onLangChange.subscribe(() => {
            this._loadSettingsSmartTable();
            this.loadDataSmartTable(this.productsCategories);
        });
    }
    _loadSettingsSmartTable() {
        const columnTitlePrefix = 'CATEGORY_VIEW.';
        const getTranslate = (name) => this._translateService.get(columnTitlePrefix + name);
        forkJoin(getTranslate('IMAGE'), getTranslate('TITLE'))
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(([image, titleTr]) => {
            this.settingsSmartTable = {
                selectMode: this.selectMode,
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
                columns: {
                    image: {
                        title: image,
                        type: 'custom',
                        filter: false,
                        renderComponent: CategoryImageComponent,
                        width: '5%',
                    },
                    title: { title: titleTr },
                },
                pager: {
                    display: true,
                    perPage: this.showPerPage,
                },
            };
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
};
CategoriesTableComponent.noInfoSign = '';
__decorate([
    Input(),
    __metadata("design:type", Object)
], CategoriesTableComponent.prototype, "selectMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CategoriesTableComponent.prototype, "showPerPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CategoriesTableComponent.prototype, "editWithModal", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CategoriesTableComponent.prototype, "editRow", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CategoriesTableComponent.prototype, "deleteRow", void 0);
CategoriesTableComponent = CategoriesTableComponent_1 = __decorate([
    Component({
        selector: 'ea-categories-table',
        styleUrls: ['./categories-table.component.scss'],
        templateUrl: './categories-table.component.html',
    }),
    __metadata("design:paramtypes", [TranslateService,
        ProductsCategoryService,
        ProductLocalesService,
        NgbModal,
        NotifyService,
        NgbModal])
], CategoriesTableComponent);
export { CategoriesTableComponent };
//# sourceMappingURL=categories-table.component.js.map